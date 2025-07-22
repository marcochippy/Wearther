import { Router } from 'express';
import { getHourly, postHourly } from '../controllers/hourlyWeather';

const hourlyRouter = Router();

hourlyRouter.get('/', getHourly).post('/', postHourly);

export default hourlyRouter;
