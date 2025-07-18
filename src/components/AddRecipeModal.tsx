'use client';

import { useState } from 'react';

type Props = {
    onClose: () => void;
    onSuccess: () => void;
};

export default function AddRecipeModal({ onClose, onSuccess }: Props) {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);

    async function addRecipe() {
        setLoading(true);
        try {
            const fetchRes = await fetch('/api/fetch-recipe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url }),
            });

            const recipeTextData = await fetchRes.json();
            if (recipeTextData.error) throw new Error(recipeTextData.error);

            const recipeData = await fetch('/api/extract-recipe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ recipeText: recipeTextData.text }),
            });

            const { recipe } = await recipeData.json();
            if (!recipe) throw new Error('No recipe returned from extraction.');

            const recordRes = await fetch('/api/db/add-recipe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ recipe }),
            });

            const recordResData = await recordRes.json();
            if (recordResData.error) throw new Error(recordResData.error);

            onSuccess(); // reloads recipe list
            onClose();   // closes modal
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl p-6 w-full max-w-lg relative shadow"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>

                <h2 className="text-xl font-bold mb-4">Add a Recipe from a URL</h2>
                <input
                    type="text"
                    placeholder="Paste website URL"
                    className="border rounded p-2 w-full mb-4"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    disabled={loading}
                />
                <button
                    onClick={addRecipe}
                    disabled={loading || !url.trim()}
                    className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    {loading ? 'Fetching...' : 'Fetch and Save'}
                </button>
            </div>
        </div>
    );
}