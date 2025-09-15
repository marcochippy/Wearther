const API_URL = import.meta.env.VITE_API_URL;
if (!API_URL) throw new Error('API URL is required, are you missing a .env file?');

export const getWeather = async () => {
  try {
    const response = await fetch(`${API_URL}/weather`);
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
    console.log('Starting full data refresh');

    const weatherRes = await fetch(`${API_URL}/weather`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!weatherRes.ok) {
      throw new Error(`Weather POST failed with ${weatherRes.status}`);
    }

    console.log('Weather data posted. Next AI clothing data');

    const clothingRes = await fetch(`${API_URL}/ai`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!clothingRes.ok) {
      throw new Error(`AI Clothing POST failed with ${clothingRes.status}`);
    }

    console.log('AI clothing data created. Results next');

    const [weather, clothing] = await Promise.all([getWeather(), getClothing()]);

    console.log('All data refreshed:', { clothing, weather });
    return { weather, clothing };
  } catch (error) {
    console.error('Error in refreshAllData:', error);
    throw error;
  }
};
