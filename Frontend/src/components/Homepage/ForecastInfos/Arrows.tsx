import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';

export function SampleNextArrow({ onClick }: any) {
  return (
    <div
      onClick={onClick}
      className="absolute top-1/4 md:top-1/5 right-0 z-10 cursor-pointer text-black bg-white rounded-full"
    >
      <IoIosArrowDropright size={36} className="sm:w-12 sm:h-12" />
    </div>
  );
}

export function SamplePrevArrow({ onClick }: any) {
  return (
    <div
      onClick={onClick}
      className="absolute top-1/4 md:top-1/5 left-0 z-10 cursor-pointer text-black bg-white rounded-full"
    >
      <IoIosArrowDropleft size={36} className="sm:w-12 sm:h-12" />
    </div>
  );
}
