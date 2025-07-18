'use client';

import { useState } from 'react';
import { Recipe } from '@/types/recipe';

export default function FetchRecipeForm() {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [summary, setSummary] = useState<string | null>(null);

    async function fetchTextFromUrl() {
        setLoading(true);
        setSummary(null); // reset previous summary
        try {
            // Fetch the content from the URI.
            const fetchRes = await fetch('/api/fetch-recipe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url }),
            });

            const recipeTextData = await fetchRes.json();

            if (recipeTextData.error) {
                console.error('Error:', recipeTextData.error);
                alert(recipeTextData.error);
            } else {
                // Send the content to get a recipe extracted.
                const recipeData = await fetch('/api/extract-recipe', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ recipeText: recipeTextData.text }),
                });

                const { recipe } = await recipeData.json();
                console.log("back from the parsing", recipe);

                if (!recipe) {
                    console.error('Failed to get parsed recipe.');
                } else {
                    // Record the recipe to the DB.
                    const recordRes = await fetch('/api/db/add-recipe', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ recipe }),
                    });
                    
                    const recordResData = await recordRes.json();

                    if (recordResData.error) {
                        console.error('Error recording recipe: ', recordResData.error);
                    } else {
                        // Success
                    }
                }
            }
        } catch (e) {
            console.error('Fetch failed', e);
            alert('Failed to fetch or summarize the recipe.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-xl mx-auto p-8">
            <h1 className="text-2xl font-bold mb-4">Fetch Text from URL</h1>
            <input
                type="text"
                placeholder="Paste website URL here"
                className="border rounded p-2 w-full mb-4"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={loading}
            />
            <button
                onClick={fetchTextFromUrl}
                disabled={loading || !url.trim()}
                className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
                {loading ? 'Fetching...' : 'Fetch Text'}
            </button>

            {summary && (
                <div className="mt-6 p-4 border rounded bg-gray-50 whitespace-pre-wrap">
                    <h2 className="font-semibold mb-2">Recipe Summary:</h2>
                    <p>{summary}</p>
                </div>
            )}
        </div>
    );
}