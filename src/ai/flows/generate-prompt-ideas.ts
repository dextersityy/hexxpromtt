'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating prompt ideas based on a topic or keyword.
 *
 * The flow takes a topic or keyword as input and returns a list of prompt ideas.
 *
 * @interface GeneratePromptIdeasInput - Defines the input schema for the generatePromptIdeas flow.
 * @interface GeneratePromptIdeasOutput - Defines the output schema for the generatePromptIdeas flow.
 * @function generatePromptIdeas - The main function to trigger the prompt generation flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePromptIdeasInputSchema = z.object({
  topic: z.string().describe('The topic or keyword to generate prompt ideas for.'),
});
export type GeneratePromptIdeasInput = z.infer<typeof GeneratePromptIdeasInputSchema>;

const GeneratePromptIdeasOutputSchema = z.object({
  ideas: z.array(z.string()).describe('A list of prompt ideas based on the topic.'),
});
export type GeneratePromptIdeasOutput = z.infer<typeof GeneratePromptIdeasOutputSchema>;

export async function generatePromptIdeas(input: GeneratePromptIdeasInput): Promise<GeneratePromptIdeasOutput> {
  return generatePromptIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePromptIdeasPrompt',
  input: {schema: GeneratePromptIdeasInputSchema},
  output: {schema: GeneratePromptIdeasOutputSchema},
  prompt: `You are an expert prompt idea generator. Given a topic or keyword, you will generate a list of prompt ideas related to that topic.

Topic: {{{topic}}}

Generate 5 prompt ideas related to the topic above.`,
});

const generatePromptIdeasFlow = ai.defineFlow(
  {
    name: 'generatePromptIdeasFlow',
    inputSchema: GeneratePromptIdeasInputSchema,
    outputSchema: GeneratePromptIdeasOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
