import { getHourly, getClothing } from '@/utils/fetch';
import SliderWeather from '@/components/Homepage/SliderWeather';
import { useCallback, useEffect, useState } from 'react';
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
    setClothData,
    getClothing,
    loading,
    setLoading
  };

  const loadAll = useCallback(async () => {
    try {
      const [weather, clothing] = await Promise.all([getHourly(), getClothing()]);
      setWeatherData(weather);
      setClothData(clothing);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        await loadAll();
      } finally {
        setLoading(false);
      }
    })();
  }, [loadAll]);

  return (
    <Context.Provider value={contextValue}>
      <div>
        <SliderWeather />
      </div>
    </Context.Provider>
  );
};

export default Home;
