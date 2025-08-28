import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';

export function SampleNextArrow({ onClick }: any) {
  return (
    <div onClick={onClick} className="absolute top-1/2 md:top-1/8 right-0 z-10 cursor-pointer text-black">
      <IoIosArrowDropright size={48} />
    </div>
  );
}

export function SamplePrevArrow({ onClick }: any) {
  return (
    <div onClick={onClick} className="absolute top-1/2 md:top-1/8 left-0 z-10 cursor-pointer text-black">
      <IoIosArrowDropleft size={48} />
    </div>
  );
}
