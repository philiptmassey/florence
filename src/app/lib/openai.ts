import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function summarizeRecipe(recipeText: string): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('Missing OPENAI_API_KEY');
  }

  const prompt = `Please provide a concise summary of the following recipe:\n\n${recipeText}`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });

  const summary = completion.choices[0].message?.content?.trim();

  if (!summary) {
    throw new Error('No summary generated');
  }

  return summary;
}