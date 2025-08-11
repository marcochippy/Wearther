import { refreshAllData, getHourly, getClothing } from '@/utils/fetch';
import SlideChangeHooks from '@/components/Homepage/SliderTime';
import { useEffect, useState } from 'react';
import { ApiData } from '@/../../types/hourly';
import { ClothingData } from '@/../../types/clothing';
// import Slider from "react-slick";
// refreshAllData(); FULL RESET (MAKE BUTTON OR SWIPE GESTURE FOR MOBILE)

// getHourly(); Get from Backend
// getClothing(); Get from Backend

const Home = () => {
  const [weatherData, setWeatherData] = useState<ApiData[] | null>(null);
  const [clothData, setClothData] = useState<ClothingData[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [weather, clothing] = await Promise.all([getHourly(), getClothing()]);
        setWeatherData(weather);
        setClothData(clothing);
        console.log(weather, clothing);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>LOADING</p>;

  if (!Array.isArray(weatherData) || !Array.isArray(clothData)) return <p>Error: Data is not valid</p>;

  return (
    <div>
      <SlideChangeHooks weatherData={weatherData} />
      <button onClick={refreshAllData} className="p-3 bg-red-300">
        FULL REFRESH
      </button>
    </div>
  );
};

export default Home;
