import { WindCompass } from './WindCompass';

export const WindInfo = ({ data }: { data: any }) => {
  const getWindDirection = (deg: number): string => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
  };

  const direction = getWindDirection(data.windBearing);

  return (
    <div className="w-1/2 sm:w-50 h-20 sm:h-30 rounded-2xl p-2 sm:p-3 bg-white flex flex-col items-center justify-center">
      <div className="flex">
        <p className=" text-sm sm:text-xl font-bold my-auto">{direction}</p>
        <WindCompass windDeg={data.windBearing} />
      </div>
      <div className="text-xs sm:text-sm mx-auto w-fit -mt-1">Speed {data.windSpeed} km/h</div>
      <div className="text-xs sm:text-sm mx-auto w-fit ">Gust {data.windGust} km/h</div>
    </div>
  );
};
