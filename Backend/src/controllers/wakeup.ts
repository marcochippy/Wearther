import { Request, Response } from 'express';

export const wakeup = async (req: Request, res: Response): Promise<void> => {
  console.log('Back alive!');
  res.status(204).end();
};

export default wakeup;
