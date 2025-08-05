import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';
import { ObjectId } from 'mongodb';
import { Recipe } from '@/types/recipe';

export async function DELETE(request: Request) {
    const client = await clientPromise;
    const db = client.db('florence');
    const collection = db.collection<Recipe>('recipes_test');

    try {
        const { id } = await request.json();

        if (!id || typeof id !== 'string') {
            return NextResponse.json({ error: 'Missing or invalid recipe ID' }, { status: 400 });
        }

        const objectId = new ObjectId(id);
        const result = await collection.deleteOne({ _id: objectId });

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message || 'Error' }, { status: 500 });
    }
}