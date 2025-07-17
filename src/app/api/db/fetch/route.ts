import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';
import { Recipe } from '@/app/lib/recipes';

export async function GET() {
  const client = await clientPromise;
  const db = client.db('florence');
  const recipes = await db.collection<Recipe>('recipes_test').find().toArray();
  console.log(recipes);

  return NextResponse.json(recipes);
}