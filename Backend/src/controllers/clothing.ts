import { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import Clothing from '@/models/Clothing';
import { aiPrompt } from '@/helpers/aiInstruction';
import { ClothingItems, ApiResponse } from '@/../../types/clothing';
import Weather from '../models/Weather';
import { WeatherRoot } from '../../../types/weather';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const model = 'gemini-2.5-pro';
const systemInstruction = `${aiPrompt}`;

export const createClothing = async (req: Request, res: Response): Promise<void> => {
  // Error case definen (express checken)

  try {
    const weatherForecast = await Weather.find();
    // console.log(weatherForecast);

    if (!weatherForecast.length) {
      res.status(404).json({ error: 'No weather data found' });
      return;
    }

    if (!weatherForecast[0]?.hourly?.data) {
      res.status(400).json({ error: 'Weather data structure is invalid' });
      return;
    }

    const hourlyData = weatherForecast[0].hourly.data.slice(0, 13);
    const message = JSON.stringify(hourlyData);
    // console.log(hourlyData);

    const chat = ai.chats.create({
      model,
      config: {
        systemInstruction
      }
    });

    console.log('Starting Gemini Prompt');
    // console.log(message);
    const aiResponse: any = await chat.sendMessage({ message: [{ text: message }] });
    const clearedResponse: ApiResponse | any = aiResponse.text.replace('```json', '').replace('```', '').trim();
    const polishedResponse: ClothingItems = JSON.parse(clearedResponse);

    await Clothing.deleteMany({});
    await Clothing.create(polishedResponse);
    console.log('Created new Clothing data for database');

    res.json({
      success: true,
      message: 'Successfully created ClothingData',
      data: polishedResponse
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
