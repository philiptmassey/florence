export type Recipe = {
  _id?: string;  // Populated when fetched from MongoDB.
  title: string;
  imageUrl?: string;
  ingredients: string[];
  steps: string[];
  dateAdded: Date;
  category: 'MEAL' | 'COCKTAIL';
  servings?: number;
};