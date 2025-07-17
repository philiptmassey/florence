export type Recipe = {
  _id?: string;  // Populated when fetched from MongoDB.
  title: string;
  imageUrl?: string;
  ingredients: string[];
  steps: string[];
  dateAdded: Date;
  category: 'Meal' | 'Cocktail';
  servings?: number;
};