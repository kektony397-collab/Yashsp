import { GoogleGenAI } from '@google/genai';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// This file is included as per the blueprint, but not actively used in the UI yet.
// It can be integrated into the app with a useEffect hook that checks mileage.

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const { bikeModel, totalMileage, lastServiceMileage, serviceInterval } = request.body;

  if (!bikeModel || !totalMileage || !lastServiceMileage || !serviceInterval) {
    return response.status(400).json({ error: 'Missing required parameters.' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const prompt = `You are a friendly, helpful assistant for a ${bikeModel} owner. The bike's total mileage is ${totalMileage} km. The last oil change was at ${lastServiceMileage} km, and it is recommended every ${serviceInterval} km. Generate a short, friendly, and non-alarming maintenance reminder for the upcoming oil change. Mention the bike model in the message.`;
    
    const geminiResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const reminder = geminiResponse.text;
    return response.status(200).json({ reminder });

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return response.status(500).json({ error: 'Failed to generate reminder.' });
  }
}