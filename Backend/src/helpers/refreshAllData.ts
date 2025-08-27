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

export async function refreshAllData() {
  try {
    console.log('Starting full data refresh');

    await postHourly({} as any, makeFakeRes('postHourly') as any);
    console.log('Weather data posted. Next AI clothing data');

    await createClothing({} as any, makeFakeRes('createClothing') as any);
    console.log('AI clothing data created. Results next');

    // const [weather, clothing] = await Promise.all([
    //   getHourly({} as any, makeFakeRes('getHourly') as any),
    //   getClothing({} as any, makeFakeRes('getClothing') as any)
    // ]);

    console.log('All data refreshed:');
    // return { weather, clothing };
  } catch (err) {
    console.error('Error in refreshAllDataBackend:', err);
    throw err;
  }
}
