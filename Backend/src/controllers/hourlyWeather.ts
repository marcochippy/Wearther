import axios from 'axios';
import { Request, Response } from 'express';
import Hourly from '../models/Hourly';
import { ApiData } from '../../../types/hourly';

const accuweatherUrl = process.env.URL_ACCUWEATHER;
const accuweatherKey = process.env.KEY_ACCUWEATHER;
// Wesseling=174545 ; Cologne=180169

// Old get Request to the API directly
// export const getHourlyWeather = async (req: Request, res: Response) => {
//   try {
//     const response = await axios.get(`${accuweatherUrl}/180169?apikey=${accuweatherKey}&details=true&metric=true`);
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).json({ error: 'Ping to NAS failed', details: error instanceof Error ? error.message : error });
//   }
// };

export const getHourly = async (req: Request, res: Response) => {
  const hourly = await Hourly.find();
  res.json(hourly);
};

export const syncFromApi = async (req: Request, res: Response) => {
  try {
    console.log('Starting Api sync...');

    const response = await axios.get(`${accuweatherUrl}/180169?apikey=${accuweatherKey}&details=true&metric=true`); //Axios docu für ts

    const freshApiData = response.data;
    console.log(`Fetched ${freshApiData.length} hours of data from API`);

    await Hourly.deleteMany({});
    console.log('Cleared old data from database');

    const transformedApiData = freshApiData.map((apiData: ApiData) => ({
      dateTime: apiData.DateTime,
      isDaylight: apiData.IsDaylight,

      temperature: {
        value: apiData.Temperature.Value,
        unit: apiData.Temperature.Unit,
      },

      realFeelTemperature: {
        value: apiData.RealFeelTemperature.Value,
        unit: apiData.RealFeelTemperature.Unit,
        phrase: apiData.RealFeelTemperature.Phrase,
      },

      realFeelTemperatureShade: {
        value: apiData.RealFeelTemperatureShade.Value,
        unit: apiData.RealFeelTemperatureShade.Unit,
        phrase: apiData.RealFeelTemperatureShade.Phrase,
      },

      wind: {
        speed: {
          value: apiData.Wind.Speed.Value,
          unit: apiData.Wind.Speed.Unit,
        },
        direction: {
          degrees: apiData.Wind.Direction.Degrees,
          localized: apiData.Wind.Direction.Localized,
        },
      },

      windGust: {
        speed: {
          value: apiData.WindGust.Speed.Value,
          unit: apiData.WindGust.Speed.Unit,
        },
      },

      relativeHumidity: apiData.RelativeHumidity,

      visibility: {
        value: apiData.Visibility.Value,
        unit: apiData.Visibility.Unit,
      },

      uvIndex: apiData.UVIndex,
      uvIndexText: apiData.UVIndexText,
      precipitationProbability: apiData.PrecipitationProbability,
      thunderstormProbability: apiData.ThunderstormProbability,
      rainProbability: apiData.RainProbability,
      snowProbability: apiData.SnowProbability,
      iceProbability: apiData.IceProbability,

      totalLiquid: {
        value: apiData.TotalLiquid.Value,
        unit: apiData.TotalLiquid.Unit,
      },

      rain: {
        value: apiData.Rain.Value,
        unit: apiData.Rain.Unit,
      },

      snow: {
        value: apiData.Snow.Value,
        unit: apiData.Snow.Unit,
      },

      ice: {
        value: apiData.Ice.Value,
        unit: apiData.Ice.Unit,
      },

      cloudCover: apiData.CloudCover,

      solarIrradiance: {
        value: apiData.SolarIrradiance.Value,
        unit: apiData.SolarIrradiance.Unit,
      },
    }));
    await Hourly.insertMany(transformedApiData);

    res.json({
      success: true,
      message: 'Successfully inserted new data into database',
    });
    console.log('Successfully inserted new data into database');
  } catch (error) {
    console.error('Error synchronizing', (error as Error).message);
    res.status(500).json({
      error: 'Failed to synchronize data from API',
      details: (error as Error).message,
    });
  }
};
