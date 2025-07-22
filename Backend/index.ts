import * as dotenv from 'dotenv';
dotenv.config();
import express, { Express } from 'express';
import './src/db/index';
import errorHandler from './src/middlewares/errorHandler';
import hourlyRouter from './src/routers/hourlyRouter';
import clothingRouter from './src/routers/clothingRouter';
import cors from 'cors';

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(cors({ origin: process.env.SPA_ORIGIN, credentials: true }));
app.use(express.json());

app.use('/hourly', hourlyRouter);
app.use('/ai', clothingRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
