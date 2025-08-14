import { refreshAllData, getHourly, getClothing } from '@/utils/fetch';
import SliderTime from '@/components/Homepage/SliderWeather';
import { useEffect, useState } from 'react';
import { ApiData } from '@/../../types/hourly';
import { ClothingData } from '@/../../types/clothing';
import Context, { SlideContextValue } from '@/utils/Context';

const Home = () => {
  const [weatherData, setWeatherData] = useState<ApiData[] | null>(null);
  const [clothData, setClothData] = useState<ClothingData[] | null>(null);
  const [loading, setLoading] = useState(true);

  const [oldSlide, setOldSlide] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0); //This slide right after press for next slide
  const [activeSlide2, setActiveSlide2] = useState(0); //This slide for change after slide

  const contextValue: SlideContextValue = {
    oldSlide,
    setOldSlide,
    activeSlide,
    setActiveSlide,
    activeSlide2,
    setActiveSlide2,
    weatherData,
    clothData,
    setLoading
  };

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
    <Context.Provider value={contextValue}>
      <div>
        <SliderTime />
        <button onClick={refreshAllData} className="p-3 bg-red-300">
          FULL REFRESH
        </button>
      </div>
    </Context.Provider>
  );
};

export default Home;
