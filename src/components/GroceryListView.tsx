import React from 'react';

type GroceryListProps = {
  groceryList: string[];
  setGroceryList: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function GroceryListView({ groceryList, setGroceryList }: GroceryListProps) {
  const handleClear = () => setGroceryList([]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Grocery List</h2>

      {groceryList.length === 0 ? (
        <p className="text-gray-500">No items in grocery list.</p>
      ) : (
        <>
          <ul className="space-y-2">
            {groceryList.map((name) => (
              <li key={name} className="select-none">
                {name}
              </li>
            ))}
          </ul>
          <button
            onClick={handleClear}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Clear Grocery List
          </button>
        </>
      )}
    </div>
  );
}