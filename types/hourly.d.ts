export interface ApiItems {
  dateTime: string;
  isDaylight: boolean;
  iconPhrase: string;
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
}

export interface ApiData {
  items: ApiItems;
  dateTime: string;
  _id?: string;
  __v?: number;
  createdAt?: string;
  updatedAt?: string;
}
