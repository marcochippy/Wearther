import { useContext, useMemo, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import Context from '@/utils/Context';

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
    className: 'center',
    centerMode: true,
    // centerPadding: '60px',
    // dots: true,
    infinite: false,
    speed: 1000,
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
      <div className="slider-container p-5 m-5 bg-blue-200">
        <Slider {...settings}>
          {(sortedWeatherData ?? []).map((data: any) => (
            <div key={data._id}>
              <h3 className="flex place-content-center mx-auto h-[300px]">
                {new Date(data.dateTime).toLocaleTimeString([], {
                  weekday: 'long',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </h3>
            </div>
          ))}
        </Slider>
        <div className="mt-4 flex place-content-center">
          {currentCloth ? (
            <h3 className="text-base">Hour: {currentCloth.hour}</h3>
          ) : (
            <h3 className="text-base opacity-70">No matching cloth for this hour</h3>
          )}
        </div>
      </div>
    </div>
  );
}

export default SliderWeather;
