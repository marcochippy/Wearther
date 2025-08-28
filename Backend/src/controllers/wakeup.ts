import { Request, Response } from 'express';

export const postWakeup = async (req: Request, res: Response): Promise<void> => {
  console.log('Back alive!');
  res.status(204).end();
};

export const getWakeup = async (req: Request, res: Response): Promise<void> => {
  console.log('Back alive!');
  res.status(204).end();
};
