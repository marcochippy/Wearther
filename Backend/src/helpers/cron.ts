import cron from 'node-cron';
import { postHourly } from '@/controllers/hourlyWeather';
import { createClothing } from '@/controllers/clothing';

function makeFakeRes(name: string) {
  return {
    json: (data: any) => console.log(`[${name}] JSON response:`, data),
    status: (code: number) => ({
      json: (msg: any) => console.error(`[${name}] Error ${code}:`, msg)
    })
  };
}

export const cronSchedule = cron.schedule('0 * * * *', async () => {
  console.log('=== Cron job started ===', new Date().toISOString());

  try {
    await postHourly({} as any, makeFakeRes('postHourly') as any);

    await new Promise(r => setTimeout(r, 10_000));

    await createClothing({} as any, makeFakeRes('createClothing') as any);

    console.log('=== Cron job finished ===', new Date().toISOString());
  } catch (err) {
    console.error('Cron job error:', err);
  }
});
