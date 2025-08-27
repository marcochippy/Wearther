import cron from 'node-cron';
import { refreshAllData } from './refreshAllData';

export const cronSchedule = cron.schedule('08 14 * * *', async () => {
  console.log('=== Cron job started ===', new Date().toISOString());

  try {
    await refreshAllData();
    console.log('=== Cron job finished ===', new Date().toISOString());
  } catch (err) {
    console.error('Cron job error:', err);
  }
});
