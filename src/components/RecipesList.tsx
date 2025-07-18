'use client';

import { useState, useEffect } from 'react';
import { Recipe } from '@/types/recipe';
import RecipeModal from '@/components/RecipeModal';
import AddRecipeModal from '@/components/AddRecipeModal';

export default function RecipesList() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);

  async function fetchRecipes() {
    setLoading(true);
    const res = await fetch('/api/db/fetch');
    const data: Recipe[] = await res.json();
    setRecipes(data);
    setLoading(false);
  }

  // Optionally fetch recipes on mount:
  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-semibold">Recipes</h2>

      <ul className="space-y-2">
        {/* First element: Add Recipe button styled like recipe */}
        <li>
          <button
            onClick={() => setShowAddModal(true)}
            className="text-left w-full px-4 py-4 bg-white border rounded shadow hover:bg-gray-50 flex items-center justify-center text-green-800 font-semibold text-lg"
          >
            + Add New Recipe
          </button>
        </li>

        {/* Render actual recipes */}
        {recipes.map((recipe, i) => (
          <li key={recipe._id ?? i}>
            <button
              onClick={() => setSelectedRecipe(recipe)}
              className="text-left w-full px-4 py-4 bg-white border rounded shadow hover:bg-gray-50"
            >
              <span className="font-medium text-lg text-green-800">{recipe.title}</span>
            </button>
          </li>
        ))}
      </ul>

      {selectedRecipe && (
        <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
      )}

      {showAddModal && (
        <AddRecipeModal
          onClose={() => setShowAddModal(false)}
          onSuccess={fetchRecipes}
        />
      )}
    </div>
  );
}