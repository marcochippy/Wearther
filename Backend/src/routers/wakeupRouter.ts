import { Router } from 'express';
import wakeup from '@/controllers/wakeup';

const wakeupRouter = Router();

wakeupRouter.post('/', wakeup);

export default wakeupRouter;
