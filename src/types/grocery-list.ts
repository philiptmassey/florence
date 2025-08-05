import { ObjectId } from 'mongodb';

export type GroceryItem = {
    name: string;
    checked: boolean;
}

export type GroceryList = {
  _id?: ObjectId;
  items: GroceryItem[];
}