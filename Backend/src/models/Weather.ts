import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const weatherSchema = new Schema(
  {
    latitude: {
      type: 'Number'
    },
    longitude: {
      type: 'Number'
    },
    timezone: {
      type: 'String'
    },
    offset: {
      type: 'Number'
    },
    elevation: {
      type: 'Number'
    },
    currently: {
      time: {
        type: 'Number'
      },
      summary: {
        type: 'String'
      },
      icon: {
        type: 'String'
      },
      nearestStormDistance: {
        type: 'Number'
      },
      nearestStormBearing: {
        type: 'Number'
      },
      precipIntensity: {
        type: 'Number'
      },
      precipProbability: {
        type: 'Number'
      },
      precipIntensityError: {
        type: 'Number'
      },
      precipType: {
        type: 'String'
      },
      temperature: {
        type: 'Number'
      },
      apparentTemperature: {
        type: 'Number'
      },
      dewPoint: {
        type: 'Number'
      },
      humidity: {
        type: 'Number'
      },
      pressure: {
        type: 'Number'
      },
      windSpeed: {
        type: 'Number'
      },
      windGust: {
        type: 'Number'
      },
      windBearing: {
        type: 'Number'
      },
      cloudCover: {
        type: 'Number'
      },
      uvIndex: {
        type: 'Number'
      },
      visibility: {
        type: 'Number'
      },
      ozone: {
        type: 'Number'
      }
    },
    hourly: {
      summary: {
        type: 'String'
      },
      icon: {
        type: 'String'
      },
      data: {
        type: ['Mixed']
      }
    },
    daily: {
      summary: {
        type: 'String'
      },
      icon: {
        type: 'String'
      },
      data: {
        type: ['Mixed']
      }
    },
    flags: {
      sources: {
        type: ['String']
      },
      sourceTimes: {
        gfs: {
          type: 'String'
        },
        gefs: {
          type: 'String'
        }
      },
      'nearest-station': {
        type: 'Number'
      },
      units: {
        type: 'String'
      },
      version: {
        type: 'String'
      }
    }
  },
  { timestamps: true }
);

export default model('Weather', weatherSchema);
// import mongoose from 'mongoose';
// const { Schema, model } = mongoose;

// const hourlySchema = new Schema(
//   {
//     dateTime: { type: String },
//     isDaylight: { type: Boolean },
//     iconPhrase: { type: String },

//     temperature: {
//       value: { type: Number },
//       unit: { type: String }
//     },

//     realFeelTemperature: {
//       value: { type: Number },
//       unit: { type: String },
//       phrase: { type: String }
//     },

//     realFeelTemperatureShade: {
//       value: { type: Number },
//       unit: { type: String },
//       phrase: { type: String }
//     },

//     wind: {
//       speed: {
//         value: { type: Number },
//         unit: { type: String }
//       },
//       direction: {
//         degrees: { type: Number },
//         localized: { type: String }
//       }
//     },

//     windGust: {
//       speed: {
//         value: { type: Number },
//         unit: { type: String }
//       }
//     },

//     relativeHumidity: { type: Number },

//     visibility: {
//       value: { type: Number },
//       unit: { type: String }
//     },

//     uvIndex: { type: Number },
//     uvIndexText: { type: String },
//     precipitationProbability: { type: Number },
//     thunderstormProbability: { type: Number },
//     rainProbability: { type: Number },
//     snowProbability: { type: Number },
//     iceProbability: { type: Number },

//     totalLiquid: {
//       value: { type: Number },
//       unit: { type: String }
//     },

//     rain: {
//       value: { type: Number },
//       unit: { type: String }
//     },

//     snow: {
//       value: { type: Number },
//       unit: { type: String }
//     },

//     ice: {
//       value: { type: Number },
//       unit: { type: String }
//     },

//     cloudCover: { type: Number },

//     solarIrradiance: {
//       value: { type: Number },
//       unit: { type: String }
//     }
//   },
//   { timestamps: true }
// );

// export default model('Hourly', hourlySchema);
