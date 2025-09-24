import { GoogleGenAI, Type } from '@google/genai';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const { text, tankCapacity } = request.body;

  if (!text || !tankCapacity) {
    return response.status(400).json({ error: 'Missing text or tankCapacity in request body' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    const prompt = `You are an intelligent assistant for a motorcycle dashboard. Your task is to parse the user's input and extract the amount of fuel added in liters. The bike's tank capacity is ${tankCapacity} liters. If the user indicates they 'filled up', use the tank capacity. Respond ONLY with a valid JSON object in the format { "litersAdded": <number> }. Do not include any other text, explanations, or markdown formatting. User input: '${text}'`;

    const geminiResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            litersAdded: {
              type: Type.NUMBER,
            },
          },
        },
      }
    });
    
    const parsedText = geminiResponse.text.trim();
    const result = JSON.parse(parsedText);

    return response.status(200).json(result);

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return response.status(500).json({ error: 'Failed to communicate with AI service.' });
  }
}