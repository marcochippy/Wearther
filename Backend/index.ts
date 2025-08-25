import * as dotenv from 'dotenv';
dotenv.config();
import express, { Express } from 'express';
import '@/db/index';
import errorHandler from '@/middlewares/errorHandler';
import hourlyRouter from '@/routers/hourlyRouter';
import clothingRouter from '@/routers/clothingRouter';
import cors from 'cors';
import cron from 'node-cron';
import { postHourly } from '@/controllers/hourlyWeather';
import { createClothing } from '@/controllers/clothing';

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(cors({ origin: process.env.SPA_ORIGIN, credentials: true }));
app.use(express.json());

app.use('/hourly', hourlyRouter);
app.use('/ai', clothingRouter);

function makeFakeRes(name: string) {
  return {
    json: (data: any) => console.log(`[${name}] JSON response:`, data),
    status: (code: number) => ({
      json: (msg: any) => console.error(`[${name}] Error ${code}:`, msg)
    })
  };
}

cron.schedule('0 * * * *', async () => {
  console.log('=== Cron job started ===', new Date().toISOString());

  try {
    await postHourly({} as any, makeFakeRes('postHourly') as any);

    await new Promise(r => setTimeout(r, 60_000));

    await createClothing({} as any, makeFakeRes('createClothing') as any);

    console.log('=== Cron job finished ===', new Date().toISOString());
  } catch (err) {
    console.error('Cron job error:', err);
  }
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
