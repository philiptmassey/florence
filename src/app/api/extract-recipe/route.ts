import { NextResponse } from 'next/server';
import { summarizeRecipe } from '@/app/lib/openai';
import { Recipe } from '@/types/recipe';

export async function POST(request: Request) {
  try {
    const {url, websiteText } = await request.json();
    if (!websiteText) {
      return NextResponse.json({ error: 'Missing recipe' }, { status: 400 });
    }

    const recipe: Recipe = await summarizeRecipe(url, websiteText);
    return NextResponse.json({ recipe });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message || 'Error' }, { status: 500 });
  }
}