import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';
import { Recipe } from '@/types/recipe';

const defaultRecipes: Recipe[] = [
  {
    title: 'Pasta Primavera',
    imageUrl: 'https://example.com/images/pasta.jpg',
    ingredients: ['pasta', 'zucchini', 'tomatoes', 'garlic'],
    steps: ['Boil pasta', 'Sauté veggies', 'Combine and serve'],
    dateAdded: new Date(),
    category: 'Meal',
    servings: 2,
  },
  {
    title: 'PB&J Sandwich',
    imageUrl: 'https://example.com/images/pbj.jpg',
    ingredients: ['bread', 'peanut butter', 'jelly'],
    steps: ['Spread PB', 'Spread jelly', 'Stick together'],
    dateAdded: new Date(),
    category: 'Meal',
    servings: 1,
  },
];

export async function POST() {
  const client = await clientPromise;
  const db = client.db('florence');
  const collection = db.collection<Recipe>('recipes_test');

  await collection.insertMany(defaultRecipes);
  return NextResponse.json({ message: 'Recipes seeded' });
}