
import { GoogleGenAI } from '@google/genai';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const { refuelRecords, tripLogs } = request.body;
  if (!refuelRecords) {
    return response.status(400).json({ error: 'Missing refuelRecords in request body' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const prompt = `Act as a data analyst for a motorcycle rider. Analyze the following JSON data of refuel records and trip logs. Identify trends in the rider's fuel economy (km/l). Correlate fuel economy with trip characteristics (e.g., distance, implied speed). Provide a concise summary and three actionable, personalized tips for improving fuel efficiency. Data: ${JSON.stringify({ refuelRecords, tripLogs })}`;

    const geminiResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ parts: [{ text: prompt }] }],
    });

    const analysis = geminiResponse.text;
    return response.status(200).json({ analysis });

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return response.status(500).json({ error: 'Failed to communicate with AI service for analysis.' });
  }
}
