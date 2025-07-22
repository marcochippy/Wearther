import { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import Clothing from '@/models/Clothing';
import { aiPrompt } from '@/helpers/aiInstruction';
import { ClothingData, ApiResponse } from '@/../../types/clothing';
import Hourly from '../models/Hourly';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const model = 'gemini-2.5-flash';
const systemInstruction = `${aiPrompt}`;

export const createClothing = async (req: Request, res: Response): Promise<void> => {
  // Error case definen (express checken)

  try {
    const hourlyForecast = await Hourly.find();

    const message = JSON.stringify(hourlyForecast);

    const chat = ai.chats.create({
      model,
      config: {
        systemInstruction
      }
    });

    console.log('Starting Gemini Prompt');
    const aiResponse: any = await chat.sendMessage({ message: [{ text: message }] });
    const clearedResponse: ApiResponse | any = aiResponse.text.replace('```json', '').replace('```', '').trim();
    const polishedResponse: ClothingData = JSON.parse(clearedResponse);

    await Clothing.deleteMany({});
    await Clothing.create(polishedResponse);
    console.log('Created new Clothing data for database');

    res.json({
      success: true,
      message: 'Successfully created ClothingData',
      polishedResponse
    });
    console.log('Successfully created ClothingData');
  } catch (error) {
    console.error('Error in createSimpleChat:', error);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
};

export const getClothing = async (req: Request, res: Response): Promise<void> => {
  const clothing = await Clothing.find();
  res.json(clothing);
};
