'use client';

import { useState, useEffect } from 'react';
import { Recipe } from '@/types/recipe';
import RecipeModal from '@/components/RecipeModal';
import AddRecipeModal from '@/components/AddRecipeModal';

type Props = {
  groceryList: string[];
  setGroceryList: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function RecipesList({ groceryList, setGroceryList }: Props) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  async function fetchRecipes() {
    const res = await fetch('/api/db/fetch');
    const data: Recipe[] = await res.json();
    setRecipes(data);
  }

  async function handleDelete(id: string) {
    try {
      await fetch('/api/db/delete-recipe', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      setSelectedRecipe(null);
      fetchRecipes(); // Refresh list
    } catch (error) {
      console.error('Failed to delete recipe:', error);
    }
  }

  async function handleAddToGroceryList(ingredients: string[]) {
    try {
      const res = await fetch('/api/add-to-grocery-list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipe: { ingredients }, groceryList }),
      });
      const json = await res.json();
      if (res.ok) {
        setGroceryList(json.updatedGroceryList);
      } else {
        console.error('Failed to add to grocery list:', json.error);
      }
    } catch (error) {
      console.error('Failed to add to grocery list:', error);
    }
  }

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-semibold">Recipes</h2>

      <ul className="space-y-2">
        {/* Add New Recipe button */}
        <li>
          <button
            onClick={() => setShowAddModal(true)}
            className="text-left w-full px-4 py-4 bg-white border rounded shadow hover:bg-gray-50 flex items-center justify-center text-green-800 font-semibold text-lg"
          >
            + Add New Recipe
          </button>
        </li>

        {/* Recipe list */}
        {recipes.map((recipe, i) => (
          <li key={recipe._id?.toString() ?? i}>
            <button
              onClick={() => setSelectedRecipe(recipe)}
              className="text-left w-full px-4 py-4 bg-white border rounded shadow hover:bg-gray-50"
            >
              <span className="font-medium text-lg text-green-800">{recipe.title}</span>
            </button>
          </li>
        ))}
      </ul>

      {/* Recipe Modal */}
      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          onDelete={(id) => handleDelete(id)}
          onAddToGroceryList={(ingredients) => {
            handleAddToGroceryList(ingredients);
            setSelectedRecipe(null);
          }}
        />
      )}

      {/* Add Modal */}
      {showAddModal && (
        <AddRecipeModal
          onClose={() => setShowAddModal(false)}
          onSuccess={fetchRecipes}
        />
      )}
    </div>
  );
}
