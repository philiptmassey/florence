import { getRecipes } from './lib/recipes';
import FetchRecipeForm  from '@/components/FetchRecipeForm'
import RecipesList from '@/components/RecipesList';

export default function HomePage() {
  const recipes = getRecipes();

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Recipes</h1>
      <FetchRecipeForm />
      <RecipesList />
    </main>
  );
}