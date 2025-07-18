import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';
import { Recipe } from '@/types/recipe';

export async function POST(request: Request) {
    const client = await clientPromise;
    const db = client.db('florence');
    const collection = db.collection<Recipe>('recipes_test');

    try {
        const { recipe } = await request.json();
        if (!recipe) {
            return NextResponse.json({ error: 'Missing recipe' }, { status: 400 });
        }

        await collection.insertOne(recipe);
        return NextResponse.json({ message: 'Recipes recorded' });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message || 'Error' }, { status: 500 });
    }
}