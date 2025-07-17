import { getRecipes } from './lib/recipes';

export default function HomePage() {
  const recipes = getRecipes();

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Recipes</h1>
      <ul className="space-y-6">
        {recipes.map((recipe, index) => (
          <li key={index} className="border rounded-xl p-4 shadow">
            <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
            <h3 className="font-medium">Ingredients:</h3>
            <ul className="list-disc list-inside mb-2">
              {recipe.ingredients.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <h3 className="font-medium">Steps:</h3>
            <ol className="list-decimal list-inside">
              {recipe.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </li>
        ))}
      </ul>
    </main>
  );
}