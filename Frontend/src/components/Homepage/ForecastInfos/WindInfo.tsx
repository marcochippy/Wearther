import { WindCompass } from './WindCompass';

export const WindInfo = ({ wind }: { wind: any }) => (
  <div className="w-1/2 sm:w-30 h-20 sm:h-30 rounded-2xl p-2 sm:p-3 bg-white flex flex-col items-center justify-center">
    <div className="flex">
      <p className=" text-sm sm:text-xl font-bold my-auto">{wind.direction.localized}</p>
      <WindCompass windDeg={wind.direction.degrees} />
    </div>
    <div className="text-xs sm:text-sm mx-auto w-fit -mt-1">
      {wind.speed.value} {wind.speed.unit}
    </div>
  </div>
);
