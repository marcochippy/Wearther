export interface DeclareApiData {
  DateTime: string;
  IsDaylight: boolean;
  Temperature: {
    Value: number;
    Unit: string;
  };
  RealFeelTemperature: {
    Value: number;
    Unit: string;
    Phrase: string;
  };
  RealFeelTemperatureShade: {
    Value: number;
    Unit: string;
    Phrase: string;
  };
  Wind: {
    Speed: {
      Value: number;
      Unit: string;
    };
    Direction: {
      Degrees: number;
      Localized: string;
    };
  };
  WindGust: {
    Speed: {
      Value: number;
      Unit: string;
    };
  };
  RelativeHumidity: number;
  Visibility: {
    Value: number;
    Unit: string;
  };
  UVIndex: number;
  UVIndexText: string;
  PrecipitationProbability: number;
  ThunderstormProbability: number;
  RainProbability: number;
  SnowProbability: number;
  IceProbability: number;
  TotalLiquid: {
    Value: number;
    Unit: string;
  };
  Rain: {
    Value: number;
    Unit: string;
  };
  Snow: {
    Value: number;
    Unit: string;
  };
  Ice: {
    Value: number;
    Unit: string;
  };
  CloudCover: number;
  SolarIrradiance: {
    Value: number;
    Unit: string;
  };
}

export interface ApiData {
  dateTime: string;
  isDaylight: boolean;
  temperature: {
    value: number;
    unit: string;
  };
  realFeelTemperature: {
    value: number;
    unit: string;
    phrase: string;
  };
  realFeelTemperatureShade: {
    value: number;
    unit: string;
    phrase: string;
  };
  wind: {
    speed: {
      value: number;
      unit: string;
    };
    direction: {
      degrees: number;
      localized: string;
    };
  };
  windGust: {
    speed: {
      value: number;
      unit: string;
    };
  };
  relativeHumidity: number;
  visibility: {
    value: number;
    unit: string;
  };
  uvIndex: number;
  uvIndexText: string;
  precipitationProbability: number;
  thunderstormProbability: number;
  rainProbability: number;
  snowProbability: number;
  iceProbability: number;
  totalLiquid: {
    value: number;
    unit: string;
  };
  rain: {
    value: number;
    unit: string;
  };
  snow: {
    value: number;
    unit: string;
  };
  ice: {
    value: number;
    unit: string;
  };
  cloudCover: number;
  solarIrradiance: {
    value: number;
    unit: string;
  };
  _id?: string;
  __v?: number;
  createdAt?: string;
  updatedAt?: string;
}
