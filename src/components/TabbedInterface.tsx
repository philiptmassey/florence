'use client';

import { useState } from 'react';
import RecipesList from './RecipesList';
import GroceryListView from './GroceryListView';

export default function TabbedInterface() {
  const [activeTab, setActiveTab] = useState<'recipes' | 'grocery'>('recipes');
  const [groceryList, setGroceryList] = useState<string[]>([]);

  return (
    <>
      <nav className="mb-6 flex space-x-4 border-b">
        <button
          onClick={() => setActiveTab('recipes')}
          className={`pb-2 font-semibold ${
            activeTab === 'recipes' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-600'
          }`}
        >
          Recipes
        </button>
        <button
          onClick={() => setActiveTab('grocery')}
          className={`pb-2 font-semibold ${
            activeTab === 'grocery' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-600'
          }`}
        >
          Grocery List
        </button>
      </nav>

      {activeTab === 'recipes' ? (
        <RecipesList groceryList={groceryList} setGroceryList={setGroceryList} />
      ) : (
        <GroceryListView groceryList={groceryList} setGroceryList={setGroceryList} />
      )}
    </>
  );
}
