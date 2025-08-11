const API_URL = import.meta.env.VITE_API_URL;
if (!API_URL) throw new Error('API URL is required, are you missing a .env file?');

export const getHourly = async () => {
  try {
    const response = await fetch(`${API_URL}/hourly`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getClothing = async () => {
  try {
    const response = await fetch(`${API_URL}/ai`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const refreshAllData = async () => {
  try {
    console.log('Starting Big Refresh');
    const getWeatherData = await fetch(`${API_URL}/hourly`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const weatherData: any = await getWeatherData.json();
    console.log('Got Weather data:', weatherData);
    if (weatherData) {
      const getClothingData = await fetch(`${API_URL}/ai`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      await getClothingData.json();
      const data = getClothing();
      console.log('Created Clothing Data:', data);
    }
  } catch (error) {
    console.log(error);
  }
};
