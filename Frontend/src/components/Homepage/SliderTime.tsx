import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ApiData } from '@/../../types/hourly';
import { ClothingData } from '@/../../types/clothing';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

type WeatherProps = {
  weatherData: ApiData[];
};

type ClothProps = {
  clothData: ClothingData[];
};

function SlideChangeHooks({ weatherData }: WeatherProps) {
  const [oldSlide, setOldSlide] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0); //This slide right after press for next slide
  const [activeSlide2, setActiveSlide2] = useState(0); //This slide for change after slide

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
    centerPadding: '60px',
    dots: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    beforeChange: (current: number, next: number) => {
      setOldSlide(current);
      setActiveSlide(next);
    },
    afterChange: (current: number) => setActiveSlide2(current)
  };

  return (
    <div>
      <div className="slider-container w-[50%] p-5 m-5 bg-blue-200">
        <Slider {...settings}>
          {weatherData.map(data => (
            <div key={data._id}>
              <h3 className="flex place-content-center mx-auto">
                {new Date(data.dateTime).toLocaleTimeString([], {
                  weekday: 'long',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </h3>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default SlideChangeHooks;
