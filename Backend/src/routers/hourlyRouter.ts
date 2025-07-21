import { Router } from 'express';
import { getHourly, syncFromApi } from '../controllers/hourlyWeather';

const hourlyRouter = Router();

hourlyRouter.get('/', getHourly);
hourlyRouter.post('/sync', syncFromApi);

export default hourlyRouter;
