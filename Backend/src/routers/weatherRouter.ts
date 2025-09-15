import { Router } from 'express';
import { getWeather, postWeather } from '@/controllers/weather';

const weatherRouter = Router();

weatherRouter.get('/', getWeather).post('/', postWeather);

export default weatherRouter;
