import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';
import { Recipe } from '@/app/lib/recipes';

const defaultRecipes: Recipe[] = [
  {
    title: 'Pasta Primavera',
    ingredients: ['pasta', 'zucchini', 'tomatoes', 'garlic'],
    steps: ['Boil pasta', 'Sauté veggies', 'Combine and serve'],
  },
  {
    title: 'PB&J Sandwich',
    ingredients: ['bread', 'peanut butter', 'jelly'],
    steps: ['Spread PB', 'Spread jelly', 'Stick together'],
  },
];

export async function POST() {
  const client = await clientPromise;
  const db = client.db('florence');
  const collection = db.collection<Recipe>('recipes_test');

  await collection.insertMany(defaultRecipes);
  return NextResponse.json({ message: 'Recipes seeded' });
}