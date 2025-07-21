import { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import Chat from '../models/Chat';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const model = 'gemini-2.0-flash';
const systemInstruction =
  'I will try to send you some weather data from my backend. Can you look at the data, analyse the different aspects like rain, wind etc. and responde with ONLY THREE WORDS, what upperpart and lowerpart chlothing aswell as what type of shoes I should wear';

const question = `{
        "temperature": {
            "value": 30.6,
            "unit": "C"
        },
        "realFeelTemperature": {
            "value": 30.2,
            "unit": "C",
            "phrase": "Pleasant"
        },
        "realFeelTemperatureShade": {
            "value": 13,
            "unit": "C",
            "phrase": "Pleasant"
        },
        "wind": {
            "speed": {
                "value": 13,
                "unit": "km/h"
            },
            "direction": {
                "degrees": 337,
                "localized": "NNW"
            }
        },
        "windGust": {
            "speed": {
                "value": 24.1,
                "unit": "km/h"
            }
        },
        "visibility": {
            "value": 16.1,
            "unit": "km"
        },
        "totalLiquid": {
            "value": 0,
            "unit": "mm"
        },
        "rain": {
            "value": 0,
            "unit": "mm"
        },
        "snow": {
            "value": 0,
            "unit": "cm"
        },
        "ice": {
            "value": 0,
            "unit": "mm"
        },
        "solarIrradiance": {
            "value": 43.7,
            "unit": "W/m²"
        },
        "_id": "686e634b659f8559f2c74fe7",
        "dateTime": "2025-07-09T15:00:00+02:00",
        "isDaylight": true,
        "relativeHumidity": 55,
        "uvIndex": 1,
        "uvIndexText": "Low",
        "precipitationProbability": 0,
        "thunderstormProbability": 0,
        "rainProbability": 0,
        "snowProbability": 0,
        "iceProbability": 0,
        "cloudCover": 100,
        "__v": 0,
        "createdAt": "2025-07-09T12:40:43.631Z",
        "updatedAt": "2025-07-09T12:40:43.631Z"
    },`;

export const createSimpleChat = async (req: Request, res: Response): Promise<void> => {
  // Error case definen (express checken)
  try {
    const message = question;
    // const { message } = req.body;

    const chat = ai.chats.create({
      model,
      config: {
        systemInstruction,
      },
    });

    const aiResponse = await chat.sendMessage({ message: [{ text: message }] });

    res.json({
      aiResponse: aiResponse.text,
    });
    console.log(aiResponse.text);
  } catch (error) {
    console.error('Error in createSimpleChat:', error);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
};
