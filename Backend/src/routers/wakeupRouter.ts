import { Router } from 'express';
import { getWakeup, postWakeup } from '@/controllers/wakeup';

const wakeupRouter = Router();

wakeupRouter.get('/', getWakeup).post('/', postWakeup);

export default wakeupRouter;
