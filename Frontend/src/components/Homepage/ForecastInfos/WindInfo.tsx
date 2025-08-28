import { WindCompass } from './WindCompass';

export const WindInfo = ({ wind }: { wind: any }) => (
  <div className="w-30 h-30 rounded-2xl p-3 place-content-center bg-white items-center">
    <div className="flex">
      <p className="mx-auto text-xl font-bold my-auto">{wind.direction.localized}</p>
      <WindCompass windDeg={wind.direction.degrees} />
    </div>
    <div className="text-md mx-auto w-fit">
      {wind.speed.value} {wind.speed.unit}
    </div>
  </div>
);
