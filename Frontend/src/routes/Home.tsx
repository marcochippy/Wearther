import { refreshAllData, getHourly, getClothing } from '@/utils/fetch';
import SlideChangeHooks from '@/components/Homepage/SliderTime';
import { useEffect, useState } from 'react';
import { ApiData } from '@/../../types/hourly';
// import Slider from "react-slick";
// refreshAllData(); FULL RESET (MAKE BUTTON OR SWIPE GESTURE FOR MOBILE)

// getHourly(); Get from Backend
// getClothing(); Get from Backend

const Home = () => {
  const [weatherData, setWeatherData] = useState<ApiData[] | null>(null);
  const [clothData, setClothData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [weather, clothing] = await Promise.all([getHourly(), getClothing()]);
        setWeatherData(weather);
        setClothData(clothing);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>LOADING</p>;

  if (!Array.isArray(weatherData)) return <p>Error: Weather data is not valid</p>;
  return (
    <div>
      <SlideChangeHooks weatherData={weatherData} />
    </div>
  );
};

export default Home;
