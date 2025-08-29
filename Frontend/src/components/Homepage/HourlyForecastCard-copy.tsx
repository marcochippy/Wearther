import RainInfo from './ForecastInfos/RainInfo';
import { TemperatureInfo } from './ForecastInfos/TemperatureInfo';
import { WindInfo } from './ForecastInfos/WindInfo';

export const HourlyForecastCard2 = ({ data }: { data: any }) => (
  <div className="">
    <div className="w-[88%] flex gap-15 mx-auto">
      <TemperatureInfo data={data} />
      <WindInfo wind={data.wind} />
      <RainInfo rain={data.rainProbability} />
    </div>
  </div>
);
