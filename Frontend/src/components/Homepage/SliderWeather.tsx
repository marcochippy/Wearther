import { useContext, useMemo, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import Context from '@/utils/Context';
import Avatar from './Avatar';

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

  function SampleNextArrow({ onClick }: any) {
    return (
      <div onClick={onClick} className="absolute top-1/2 right-0 z-10 cursor-pointer text-red-600">
        <FaArrowAltCircleRight size={24} />
      </div>
    );
  }

  function SamplePrevArrow({ onClick }: any) {
    return (
      <div onClick={onClick} className="absolute top-1/2 left-0 z-10 cursor-pointer text-green-600">
        <FaArrowAltCircleLeft size={24} />
      </div>
    );
  }

  const settings = {
    className: 'center  h-[300px]',
    centerMode: true,
    // centerPadding: '60px',
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

  // console.log('Current hour:', currentHour);
  // console.log('Available hours in clothByHour:', Array.from(clothByHour.keys()));
  // console.log('Current cloth:', currentCloth);

  const dateStyling = 'text-2xl text-left mx-auto';

  return (
    <div>
      <div className="slider-container p-5 m-5 rounded-2xl ring-1 ring-black/30 bg-gray-300">
        <Slider {...settings}>
          {(sortedWeatherData ?? []).map((data: any) => (
            <div key={data._id} className="flex">
              <div className="border">
                <h2 className={`${dateStyling}`}>
                  {new Date(data.dateTime).toLocaleDateString([], {
                    weekday: 'long'
                  })}
                </h2>
                <h2 className={`${dateStyling}`}>
                  {new Date(data.dateTime).toLocaleDateString([], {
                    day: '2-digit',
                    month: 'short'
                  })}
                  {''}.{' '}
                  {new Date(data.dateTime).toLocaleDateString([], {
                    year: 'numeric'
                  })}
                </h2>
                <h2 className={`${dateStyling}`}>
                  {new Date(data.dateTime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </h2>
              </div>
              <div className="border">
                <p className="flex  place-content-center">
                  {data.temperature.value}°{data.temperature.unit}
                </p>
                <h3 className="flex text-xs place-content-center">
                  Feels like {data.realFeelTemperature.value}°{data.realFeelTemperature.unit}
                </h3>
              </div>
            </div>
          ))}
        </Slider>
        <Avatar currentCloth={currentCloth} />
      </div>
    </div>
  );
}

export default SliderWeather;
