import { Thermometer } from './Thermometer';

export const TemperatureInfo = ({ data }: { data: any }) => (
  <div className="my-auto w-40 h-30 rounded-2xl p-3 place-content-center pl-5 bg-white items-center flex">
    <div className="">
      <p className="text-2xl font-semibold">
        {data.temperature.value}°{data.temperature.unit}
      </p>
      <p className="text-sm/4.5">
        Feels like {data.realFeelTemperature.value}°{data.realFeelTemperature.unit}
      </p>
    </div>
    <Thermometer temperature={data.temperature.value} />
  </div>
);
