const API_URL = import.meta.env.VITE_API_URL;
if (!API_URL) throw new Error('API URL is required, are you missing a .env file?');

export const getHourly = async () => {
  try {
    const response = await fetch(`${API_URL}/hourly`);
    const data = await response.json();
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
    await getWeatherData.json();
    console.log('Got Weather data, Next Clothing data');

    const getClothingData = await fetch(`${API_URL}/ai`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    await getClothingData.json();

    console.log('Created Clothing Data, next Results:');
    const data = await getClothing();
    const weatherData = await getHourly();
    console.log('Refreshed data:', data, weatherData);
  } catch (error) {
    console.log(error);
  }
};
