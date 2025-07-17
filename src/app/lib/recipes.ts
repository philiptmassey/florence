export type Recipe = {
  title: string;
  ingredients: string[];
  steps: string[];
};

export function getRecipes(): Recipe[] {
  return [
    {
      title: "Apple Pie",
      ingredients: ["3 apples", "1 cup sugar", "1 pie crust"],
      steps: ["Slice the apples", "Mix with sugar", "Fill pie crust", "Bake at 350°F for 45 minutes"]
    },
    {
      title: "Smoothie",
      ingredients: ["1 banana", "1 cup milk", "5 strawberries"],
      steps: ["Blend all ingredients until smooth", "Serve chilled"]
    }
  ];
}