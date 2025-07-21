import { Router } from 'express';
import { createSimpleChat } from '../controllers/chats';

const chatRouter = Router();

chatRouter.post('/', createSimpleChat);

export default chatRouter;
