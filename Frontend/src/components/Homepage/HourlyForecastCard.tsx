import CloudCover from './ForecastInfos/CloudCover';
import RainInfo from './ForecastInfos/RainInfo';
import { TemperatureInfo } from './ForecastInfos/TemperatureInfo';
import { WindInfo } from './ForecastInfos/WindInfo';

export const HourlyForecastCard = ({ data }: { data: any }) => {
  if (!data) {
    return (
      <div className="">
        <div className="w-[95%] sm:w-[88%] flex flex-col sm:flex-row gap-3 sm:gap-15 mx-auto">
          <div>Loading weather data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="mt-2 sm:mt-5 w-[95%] sm:w-fit flex flex-col sm:flex-row gap-3 sm:gap-15 mx-auto">
        <div className="flex gap-3 sm:gap-15">
          <TemperatureInfo data={data} />
          <WindInfo wind={data.wind} />
        </div>
        <RainInfo rain={data.rainProbability} />
        <CloudCover cloud={data.cloudCover} />
      </div>
    </div>
  );
};
