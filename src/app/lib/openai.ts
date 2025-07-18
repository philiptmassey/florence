import { OpenAI } from 'openai';
import { Recipe } from '@/types/recipe';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function summarizeRecipe(recipeText: string): Promise<Recipe> {
    if (!process.env.OPENAI_API_KEY) {
        throw new Error('Missing OPENAI_API_KEY');
    }

    const systemMessage = `
You are a recipe extraction assistant.
Your job is to extract structured data from unstructured recipe text.
When adding the ingredients, make them specific but in a format like "4 medium apples" or "8oz of milk"
When writing the instructions, be concise but do not leave out any details.
`;

    const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            { role: 'system', content: systemMessage },
            {
                role: 'user',
                content: `Extract the structured recipe from the following text: \n\n${recipeText}`,
            },
        ],
        tools: [
            {
                type: 'function',
                function: {
                    name: 'extract_recipe',
                    description: 'Extracts a recipe with title, description, ingredients, and steps.',
                    parameters: {
                        type: 'object',
                        properties: {
                            title: { type: 'string', description: 'The name of the recipe' },
                            description: { type: 'string', description: 'A short summary of the dish' },
                            category: {
                                type: 'string',
                                enum: ['MEAL', 'COCKTAIL'],
                                description: 'Whether this is a MEAL or a COCKTAIL',
                            },
                            servings: {
                                type: 'number',
                                description: 'Number of servings this recipe makes (optional)',
                            },
                            ingredients: {
                                type: 'array',
                                items: { type: 'string' },
                                description: 'A list of ingredients needed',
                            },
                            steps: {
                                type: 'array',
                                items: { type: 'string' },
                                description: 'Step-by-step cooking instructions',
                            },
                        },
                        required: ['title', 'description', 'category', 'ingredients', 'steps'],
                    },
                },
            },
        ],
        tool_choice: { type: 'function', function: { name: 'extract_recipe' } },
        temperature: 0.3,
    });

    const toolCall = completion.choices[0]?.message?.tool_calls?.[0];
    if (!toolCall || !toolCall.function?.arguments) {
        throw new Error('Tool call did not return expected arguments');
    }

    const parsed = JSON.parse(toolCall.function.arguments);
    const recipe: Recipe = {
        ...parsed,
        dateAdded: new Date(),
    };

    return recipe;
}