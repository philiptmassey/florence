import { NextResponse } from 'next/server';
import { addToGroceryList } from '@/app/lib/openai';

export async function POST(request: Request) {
  try {
    const {recipe, groceryList } = await request.json();
    const updatedGroceryList: string[] = await addToGroceryList(recipe, groceryList);
    return NextResponse.json({ updatedGroceryList });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message || 'Error' }, { status: 500 });
  }
}