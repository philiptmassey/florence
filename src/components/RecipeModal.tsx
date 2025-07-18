'use client';

import { Recipe } from '@/types/recipe';

type Props = {
  recipe: Recipe;
  onClose: () => void;
};

export default function RecipeModal({ recipe, onClose }: Props) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>

        {recipe.imageUrl && (
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-48 object-cover rounded mb-4"
          />
        )}

        <h3 className="text-2xl font-bold mb-2">{recipe.title}</h3>

        <div className="flex items-center justify-between text-sm mb-2">
          <span className="bg-gray-100 px-2 py-1 rounded">{recipe.category}</span>
          {recipe.servings && (
            <span className="text-gray-600">Servings: {recipe.servings}</span>
          )}
        </div>

        <p className="text-sm text-gray-700 mb-2">
          <strong>Ingredients:</strong> {recipe.ingredients.join(', ')}
        </p>

        <p className="text-sm text-gray-700 mb-2">
          <strong>Steps:</strong> {recipe.steps.join(' → ')}
        </p>

        <p className="text-xs text-gray-500 mt-4">
          Added: {new Date(recipe.dateAdded).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}