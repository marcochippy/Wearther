// export interface ApiItems {
//   dateTime: string;
//   isDaylight: boolean;
//   iconPhrase: string;
//   temperature: {
//     value: number;
//     unit: string;
//   };
//   realFeelTemperature: {
//     value: number;
//     unit: string;
//     phrase: string;
//   };
//   realFeelTemperatureShade: {
//     value: number;
//     unit: string;
//     phrase: string;
//   };
//   wind: {
//     speed: {
//       value: number;
//       unit: string;
//     };
//     direction: {
//       degrees: number;
//       localized: string;
//     };
//   };
//   windGust: {
//     speed: {
//       value: number;
//       unit: string;
//     };
//   };
//   relativeHumidity: number;
//   visibility: {
//     value: number;
//     unit: string;
//   };
//   uvIndex: number;
//   uvIndexText: string;
//   precipitationProbability: number;
//   thunderstormProbability: number;
//   rainProbability: number;
//   snowProbability: number;
//   iceProbability: number;
//   totalLiquid: {
//     value: number;
//     unit: string;
//   };
//   rain: {
//     value: number;
//     unit: string;
//   };
//   snow: {
//     value: number;
//     unit: string;
//   };
//   ice: {
//     value: number;
//     unit: string;
//   };
//   cloudCover: number;
//   solarIrradiance: {
//     value: number;
//     unit: string;
//   };
// }

// export interface ApiData {
//   items: ApiItems;
//   dateTime: string;
//   _id?: string;
//   __v?: number;
//   createdAt?: string;
//   updatedAt?: string;
// }

export interface WeatherRoot {
  latitude: number;
  longitude: number;
  timezone: string;
  offset: number;
  elevation: number;
  currently: Currently;
  hourly: Hourly;
  daily: Daily;
  flags: Flags;
}

export interface Currently {
  time: number;
  summary: string;
  icon: string;
  nearestStormDistance: number;
  nearestStormBearing: number;
  precipIntensity: number;
  precipProbability: number;
  precipIntensityError: number;
  precipType: string;
  temperature: number;
  apparentTemperature: number;
  dewPoint: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windGust: number;
  windBearing: number;
  cloudCover: number;
  uvIndex: number;
  visibility: number;
  ozone: number;
}

export interface Hourly {
  summary: string;
  icon: string;
  data: Daum[];
}

export interface Daum {
  time: number;
  summary: string;
  icon: string;
  precipIntensity: number;
  precipProbability: number;
  precipIntensityError: number;
  precipAccumulation: number;
  precipType: string;
  temperature: number;
  apparentTemperature: number;
  dewPoint: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windGust: number;
  windBearing: number;
  cloudCover: number;
  uvIndex: number;
  visibility: number;
  ozone: number;
}

export interface Daily {
  summary: string;
  icon: string;
  data: Daum2[];
}

export interface Daum2 {
  time: number;
  summary: string;
  icon: string;
  sunriseTime: number;
  sunsetTime: number;
  moonPhase: number;
  precipIntensity: number;
  precipIntensityMax: number;
  precipIntensityMaxTime: number;
  precipProbability: number;
  precipAccumulation: number;
  precipType: string;
  temperatureHigh: number;
  temperatureHighTime: number;
  temperatureLow: number;
  temperatureLowTime: number;
  apparentTemperatureHigh: number;
  apparentTemperatureHighTime: number;
  apparentTemperatureLow: number;
  apparentTemperatureLowTime: number;
  dewPoint: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windGust: number;
  windGustTime: number;
  windBearing: number;
  cloudCover: number;
  uvIndex: number;
  uvIndexTime: number;
  visibility: number;
  temperatureMin: number;
  temperatureMinTime: number;
  temperatureMax: number;
  temperatureMaxTime: number;
  apparentTemperatureMin: number;
  apparentTemperatureMinTime: number;
  apparentTemperatureMax: number;
  apparentTemperatureMaxTime: number;
}

export interface Flags {
  sources: string[];
  sourceTimes: SourceTimes;
  'nearest-station': number;
  units: string;
  version: string;
}

export interface SourceTimes {
  gfs: string;
  gefs: string;
}
