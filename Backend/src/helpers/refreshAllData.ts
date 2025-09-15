import { postWeather } from '@/controllers/weather';
import { createClothing } from '@/controllers/clothing';

function makeFakeRes(name: string) {
  return {
    json: (data: any) => console.log(`[${name}] JSON response:`, data),
    status: (code: number) => ({
      json: (msg: any) => console.error(`[${name}] Error ${code}:`, msg)
    })
  };
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function refreshAllData() {
  try {
    console.log('Starting full data refresh');

    await postWeather({} as any, makeFakeRes('postHourly') as any);
    console.log('Weather data posted. Next AI clothing data');

    await sleep(5000);

    await createClothing({} as any, makeFakeRes('createClothing') as any);
    console.log('AI clothing data created. Results next');

    console.log('All data refreshed:');
  } catch (err) {
    console.error('Error in refreshAllDataBackend:', err);
    throw err;
  }
}
