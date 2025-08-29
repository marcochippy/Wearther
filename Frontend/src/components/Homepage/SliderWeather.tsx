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

  const sortedWeatherData = useMemo(
    () => [...(weatherData ?? [])].sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()),
    [weatherData]
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
  const currentHour = currentWeather ? new Date(currentWeather.dateTime).getHours() : undefined;
  const currentCloth = currentHour != null ? clothByHour.get(currentHour) : undefined;

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl mt-3 ">Hourly forecast</h2>
      <div className="slider-container p-2 sm:p-5 mt-2 mb-2 rounded-2xl ring-1 ring-black/30 bg-gray-200">
        <Slider {...settings}>
          {(sortedWeatherData ?? []).map((data: any) => (
            <CurrentDate key={data._id} data={data} />
          ))}
        </Slider>
        <HourlyForecastCard data={currentWeather} />
        <Avatar currentCloth={currentCloth} />
      </div>
    </div>
  );
}

export default SliderWeather;
