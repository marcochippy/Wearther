export interface ApiData {
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
