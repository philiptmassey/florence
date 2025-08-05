import { ObjectId } from 'mongodb';

export type Recipe = {
  _id?: ObjectId;
  title: string;
  imageUrl?: string;
  ingredients: string[];
  steps: string[];
  dateAdded: Date;
  category: 'MEAL' | 'COCKTAIL';
  servings?: number;
  originalUrl: string;
};