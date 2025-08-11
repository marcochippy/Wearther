import axios from 'axios';
import { Request, Response } from 'express';
import Hourly from '@/models/Hourly';
import { ApiItems } from '@/../../types/hourly';

const accuweatherUrl = process.env.URL_ACCUWEATHER;
const accuweatherKey = process.env.KEY_ACCUWEATHER;
const accuweatherZip = process.env.ZIP_WEATHERBIT;

export const getHourly = async (req: Request, res: Response) => {
  const hourly = await Hourly.find();
  res.json(hourly);
};

export const postHourly = async (req: Request, res: Response) => {
  try {
    console.log('Starting Api sync...');

    const response = await axios.get(
      `${accuweatherUrl}/${accuweatherZip}?apikey=${accuweatherKey}&details=true&metric=true`
    ); //Axios docu für ts

    const freshApiData = response.data;
    console.log(`Fetched ${freshApiData.length} hours of data from API`);

    await Hourly.deleteMany({});
    console.log('Cleared old data from database');

    const transformedApiData = freshApiData.map((apiData: ApiItems) => ({
      dateTime: apiData.dateTime,
      isDaylight: apiData.isDaylight,

      temperature: {
        value: apiData.temperature.value,
        unit: apiData.temperature.unit
      },

      realFeelTemperature: {
        value: apiData.realFeelTemperature.value,
        unit: apiData.realFeelTemperature.unit,
        phrase: apiData.realFeelTemperature.phrase
      },

      realFeelTemperatureShade: {
        value: apiData.realFeelTemperatureShade.value,
        unit: apiData.realFeelTemperatureShade.unit,
        phrase: apiData.realFeelTemperatureShade.phrase
      },

      wind: {
        speed: {
          value: apiData.wind.speed.value,
          unit: apiData.wind.speed.unit
        },
        direction: {
          degrees: apiData.wind.direction.degrees,
          localized: apiData.wind.direction.localized
        }
      },

      windGust: {
        speed: {
          value: apiData.windGust.speed.value,
          unit: apiData.windGust.speed.unit
        }
      },

      relativeHumidity: apiData.relativeHumidity,

      visibility: {
        value: apiData.visibility.value,
        unit: apiData.visibility.unit
      },

      uvIndex: apiData.uvIndex,
      uvIndexText: apiData.uvIndexText,
      precipitationProbability: apiData.precipitationProbability,
      thunderstormProbability: apiData.thunderstormProbability,
      rainProbability: apiData.rainProbability,
      snowProbability: apiData.snowProbability,
      iceProbability: apiData.iceProbability,

      totalLiquid: {
        value: apiData.totalLiquid.value,
        unit: apiData.totalLiquid.unit
      },

      rain: {
        value: apiData.rain.value,
        unit: apiData.rain.unit
      },

      snow: {
        value: apiData.snow.value,
        unit: apiData.snow.unit
      },

      ice: {
        value: apiData.ice.value,
        unit: apiData.ice.unit
      },

      cloudCover: apiData.cloudCover,

      solarIrradiance: {
        value: apiData.solarIrradiance.value,
        unit: apiData.solarIrradiance.unit
      }
    }));
    await Hourly.insertMany(transformedApiData);

    res.json({
      success: true,
      message: 'Successfully inserted new data into database',
      transformedApiData
    });
    console.log('Successfully inserted new data into database');
  } catch (error) {
    console.error('Error synchronizing', (error as Error).message);
    res.status(500).json({
      error: 'Failed to synchronize data from API',
      details: (error as Error).message
    });
  }
};
