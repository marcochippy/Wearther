import { Thermometer } from './Thermometer';

export const TemperatureInfo = ({ data }: { data: any }) => {
  const roundedTemperature = Math.round(data.temperature * 10) / 10;
  const roundedApparentTemperature = Math.round(data.apparentTemperature * 10) / 10;

  return (
    <div className="my-auto w-1/2 sm:w-50 h-20 sm:h-30 rounded-2xl p-2 sm:p-3 place-content-center bg-white items-center flex">
      <div className=" sm:block">
        <Thermometer temperature={roundedTemperature} />
      </div>
      <div className="w-full">
        <p className="text-lg sm:text-2xl font-semibold">{roundedTemperature}°C</p>
        <p className="text-xs sm:text-sm/4.5">Feels like {roundedApparentTemperature}°C</p>
      </div>
    </div>
  );
};
