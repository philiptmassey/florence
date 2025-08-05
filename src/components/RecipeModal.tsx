'use client';

import { Recipe } from '@/types/recipe';

type Props = {
  recipe: Recipe;
  onClose: () => void;
  onDelete?: (id: string) => void;
  onAddToGroceryList: (ingredients: string[]) => void;
};

export default function RecipeModal({ recipe, onClose, onDelete, onAddToGroceryList }: Props) {
  const handleDelete = () => {
    if (recipe._id && onDelete) {
      onDelete(recipe._id.toString());
    }
  };

  const handleAddToGroceryList = () => {
    onAddToGroceryList(recipe.ingredients);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Image */}
        {recipe.imageUrl && (
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-48 object-cover rounded mb-4"
          />
        )}

        {/* Title */}
        <h3 className="text-2xl font-bold mb-2">{recipe.title}</h3>

        {/* Category and servings */}
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="bg-gray-100 px-2 py-1 rounded">{recipe.category}</span>
          {recipe.servings && (
            <span className="text-gray-600">Servings: {recipe.servings}</span>
          )}
        </div>

        {/* Ingredients */}
        <div className="mb-2">
          <p className="text-sm font-semibold text-gray-700 mb-1">Ingredients:</p>
          <ul className="list-disc list-inside text-sm text-gray-700">
            {recipe.ingredients.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Steps */}
        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-1">Steps:</p>
          <ol className="list-decimal list-inside text-sm text-gray-700">
            {recipe.steps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </div>

        {/* Original URL */}
        {recipe.originalUrl && (
          <p className="text-xs text-blue-600 hover:underline mb-2">
            <a href={recipe.originalUrl} target="_blank" rel="noopener noreferrer">
              View original recipe
            </a>
          </p>
        )}

        {/* Date Added */}
        <p className="text-xs text-gray-500 mt-4 mb-4">
          Added: {new Date(recipe.dateAdded).toLocaleDateString()}
        </p>

        {/* Buttons: Add to Grocery List & Delete */}
        <div className="flex justify-center space-x-4">
          {
            <button
              onClick={handleAddToGroceryList}
              className="text-green-600 border border-green-300 px-4 py-2 rounded hover:bg-green-50 text-sm font-medium"
            >
              Add to Grocery List
            </button>
          }
          {onDelete && recipe._id && (
            <button
              onClick={handleDelete}
              className="text-red-600 border border-red-300 px-4 py-2 rounded hover:bg-red-50 text-sm font-medium"
            >
              Delete Recipe
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
