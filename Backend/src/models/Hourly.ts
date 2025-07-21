import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const hourlySchema = new Schema(
  {
    dateTime: { type: String },
    isDaylight: { type: Boolean },

    temperature: {
      value: { type: Number },
      unit: { type: String },
    },

    realFeelTemperature: {
      value: { type: Number },
      unit: { type: String },
      phrase: { type: String },
    },

    realFeelTemperatureShade: {
      value: { type: Number },
      unit: { type: String },
      phrase: { type: String },
    },

    wind: {
      speed: {
        value: { type: Number },
        unit: { type: String },
      },
      direction: {
        degrees: { type: Number },
        localized: { type: String },
      },
    },

    windGust: {
      speed: {
        value: { type: Number },
        unit: { type: String },
      },
    },

    relativeHumidity: { type: Number },

    visibility: {
      value: { type: Number },
      unit: { type: String },
    },

    uvIndex: { type: Number },
    uvIndexText: { type: String },
    precipitationProbability: { type: Number },
    thunderstormProbability: { type: Number },
    rainProbability: { type: Number },
    snowProbability: { type: Number },
    iceProbability: { type: Number },

    totalLiquid: {
      value: { type: Number },
      unit: { type: String },
    },

    rain: {
      value: { type: Number },
      unit: { type: String },
    },

    snow: {
      value: { type: Number },
      unit: { type: String },
    },

    ice: {
      value: { type: Number },
      unit: { type: String },
    },

    cloudCover: { type: Number },

    solarIrradiance: {
      value: { type: Number },
      unit: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

export default model('Hourly', hourlySchema);
