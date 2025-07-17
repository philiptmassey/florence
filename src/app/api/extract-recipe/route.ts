import { NextResponse } from 'next/server';
import { summarizeRecipe } from '@/app/lib/openai';

export async function POST(request: Request) {
  try {
    const { recipe } = await request.json();
    if (!recipe) {
      return NextResponse.json({ error: 'Missing recipe' }, { status: 400 });
    }

    const summary = await summarizeRecipe(recipe);
    return NextResponse.json({ summary });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message || 'Error' }, { status: 500 });
  }
}