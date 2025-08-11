import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ApiData } from '@/../../types/hourly';

type Props = {
  weatherData: ApiData[];
};

function SlideChangeHooks({ weatherData }: Props) {
  const [oldSlide, setOldSlide] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0); //This slide right after press for next slide
  const [activeSlide2, setActiveSlide2] = useState(0); //This slide for change after slide

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current: number, next: number) => {
      setOldSlide(current);
      setActiveSlide(next);
    },
    afterChange: (current: number) => setActiveSlide2(current)
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {weatherData.map(data => (
          <div key={data._id}>
            <h3>
              {new Date(data.dateTime).toLocaleTimeString([], { weekday: 'long', hour: '2-digit', minute: '2-digit' })}
            </h3>
            {/* <p>
              Temp: {data.temperature.value}°{data.temperature.unit}
            </p>
            <p>
              Feels like: {data.realFeelTemperature.value}°{data.realFeelTemperature.unit}
            </p>
            <p>
              Wind: {data.wind.speed.value} {data.wind.speed.unit} from {data.wind.direction.localized}
            </p>
            <p>UV Index: {data.uvIndexText}</p> */}
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SlideChangeHooks;
