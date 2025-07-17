'use client';

import { useState } from 'react';
import { Recipe } from '@/types/recipe';

export default function RecipesList() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  async function seedRecipes() {
    await fetch('/api/seed-test-recipes', { method: 'POST' });
    fetchRecipes(); // Refresh
  }

  async function fetchRecipes() {
    const res = await fetch('/api/db/fetch');
    const data: Recipe[] = await res.json();
    setRecipes(data);
  }

  return (
    <div className="p-4 space-y-4">
      <div className="space-x-2">
        <button
          onClick={seedRecipes}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Seed Recipes
        </button>
        <button
          onClick={fetchRecipes}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Fetch Recipes
        </button>
      </div>

      <ul className="mt-4 space-y-2">
        {recipes.map((recipe, i) => (
          <li key={i} className="border p-4 rounded shadow">
            <h3 className="text-lg font-bold">{recipe.title}</h3>
            <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
            <p><strong>Steps:</strong> {recipe.steps.join(' → ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}