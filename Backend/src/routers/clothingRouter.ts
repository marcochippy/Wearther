import { Router } from 'express';
import { createClothing, getClothing } from '@/controllers/clothing';

const clothingRouter = Router();

clothingRouter.get('/', getClothing).post('/', createClothing);

export default clothingRouter;
