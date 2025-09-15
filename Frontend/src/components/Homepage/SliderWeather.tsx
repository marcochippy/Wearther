import { useContext, useMemo, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Context from '@/utils/Context';
import Avatar from './Avatar';
import { CurrentDate } from './CurrentDate';
import { SampleNextArrow, SamplePrevArrow } from './ForecastInfos/Arrows';
import { HourlyForecastCard } from './HourlyForecastCard';

function SliderWeather() {
  const { setOldSlide, setActiveSlide, setActiveSlide2, weatherData, clothData } = useContext(Context);
  const [currentIndex, setCurrentIndex] = useState(0);

  const slicedWeatherData = useMemo(() => {
    if (!weatherData || !weatherData.length) return [];

    const hourlyData = [];
    for (const weather of weatherData) {
      if (weather?.hourly?.data) {
        hourlyData.push(...weather.hourly.data.slice(0, 12));
      }
    }
    return hourlyData;
  }, [weatherData]);

  const sortedWeatherData = useMemo(
    () => [...slicedWeatherData].sort((a, b) => new Date(a.time * 1000).getTime() - new Date(b.time * 1000).getTime()),
    [slicedWeatherData]
  );

  const clothByHour = useMemo(() => {
    const map = new Map<number, any>();
    for (const c of clothData ?? []) {
      if (typeof c?.hour === 'number') map.set(c.hour, c);
    }
    return map;
  }, [clothData]);

  const settings = {
    className: '',
    centerMode: true,
    centerPadding: '0px',
    // dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    beforeChange: (current: number, next: number) => {
      setOldSlide(current);
      setActiveSlide(next);
    },
    afterChange: (current: number) => {
      setActiveSlide2(current);
      setCurrentIndex(current);
    }
  };

  const currentWeather = sortedWeatherData[currentIndex];
  const currentTimestamp = currentWeather?.time;
  const currentCloth = currentTimestamp != null ? clothByHour.get(currentTimestamp) : undefined;

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl mt-3 ">Hourly forecast</h2>
      <div className="slider-container p-2 sm:p-5 mt-2 mb-2 rounded-2xl ring-1 ring-black/30 bg-gray-200">
        <Slider {...settings}>
          {(sortedWeatherData ?? []).map((data: any, index: number) => (
            <CurrentDate key={data.time || index} data={data} />
          ))}
        </Slider>
        <HourlyForecastCard data={currentWeather} />
        <Avatar currentCloth={currentCloth} />
      </div>
    </div>
  );
}

export default SliderWeather;
