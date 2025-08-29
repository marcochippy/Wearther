import { Thermometer } from './Thermometer';

export const TemperatureInfo = ({ data }: { data: any }) => (
  <div className="my-auto w-1/2 sm:w-50 h-20 sm:h-30 rounded-2xl p-2 sm:p-3 place-content-center bg-white items-center flex">
    <div className=" sm:block">
      <Thermometer temperature={data.temperature.value} />
    </div>
    <div className="w-full">
      <p className="text-lg sm:text-2xl font-semibold">
        {data.temperature.value}°{data.temperature.unit}
      </p>
      <p className="text-xs sm:text-sm/4.5">
        Feels like {data.realFeelTemperature.value}°{data.realFeelTemperature.unit}
      </p>
    </div>
  </div>
);
