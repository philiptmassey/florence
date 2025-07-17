'use client';

import { useState } from 'react';

export default function FetchRecipeForm() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);

  async function fetchTextFromUrl() {
    setLoading(true);
    setSummary(null); // reset previous summary
    try {
      const fetchRes = await fetch('/api/fetch-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const recipeData = await fetchRes.json();
      if (recipeData.error) {
        console.error('Error:', recipeData.error);
        alert(recipeData.error);
      } else {
        // Send the extracted text to the summary API
        const summaryRes = await fetch('/api/extract-recipe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ recipe: recipeData.text }),
        });

        const summaryData = await summaryRes.json();

        if (summaryData.error) {
          console.error('Summary error:', summaryData.error);
          alert(summaryData.error);
        } else {
          setSummary(summaryData.summary);
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