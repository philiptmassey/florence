'use client';

import { useState } from 'react';
import { Recipe } from '@/types/recipe';

export default function RecipesList() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchRecipes() {
    setLoading(true);
    const res = await fetch('/api/db/fetch');
    const data: Recipe[] = await res.json();
    setRecipes(data);
    setLoading(false);
  }

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Recipes</h2>
        <button
          onClick={fetchRecipes}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          {loading ? 'Loading...' : 'Fetch Recipes'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recipes.map((recipe, i) => (
          <div
            key={recipe._id ?? i}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden border"
          >
            {recipe.imageUrl && (
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">{recipe.title}</h3>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    recipe.category === 'COCKTAIL'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {recipe.category}
                </span>
              </div>

              {recipe.servings && (
                <p className="text-sm text-gray-600">Servings: {recipe.servings}</p>
              )}

              <p className="text-sm">
                <strong>Ingredients:</strong>{' '}
                <span className="text-gray-700">
                  {recipe.ingredients.join(', ')}
                </span>
              </p>

              <p className="text-sm">
                <strong>Steps:</strong>{' '}
                <span className="text-gray-700">
                  {recipe.steps.join(' → ')}
                </span>
              </p>

              <p className="text-xs text-gray-500 mt-2">
                Added: {new Date(recipe.dateAdded).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {recipes.length === 0 && !loading && (
        <p className="text-center text-gray-500">No recipes yet. Try fetching some!</p>
      )}
    </div>
  );
}