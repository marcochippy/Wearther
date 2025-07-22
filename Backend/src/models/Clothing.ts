import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const ClothingItemSchema = new Schema(
  {
    hour: {
      type: Number,
      required: true,
      min: 0,
      max: 23
    },
    items: {
      head_area: {
        mid_layer: {
          type: String,
          default: 'none'
        },
        outer_layer: {
          type: String,
          default: 'none'
        }
      },
      face_area: {
        face_mask: {
          type: String,
          default: 'none'
        },
        eye_protection: {
          type: String,
          default: 'none'
        }
      },
      upper_body: {
        base_layer: {
          type: String,
          default: 'none'
        },
        mid_layer: {
          type: String,
          default: 'none'
        },
        outer_layer: {
          type: String,
          default: 'none'
        },
        shell_layer: {
          type: String,
          default: 'none'
        }
      },
      lower_body: {
        base_layer: {
          type: String,
          default: 'none'
        },
        mid_layer: {
          type: String,
          default: 'none'
        },
        outer_layer: {
          type: String,
          default: 'none'
        }
      },
      hands: {
        gloves: {
          type: String,
          default: 'none'
        }
      },
      feet: {
        shoes: {
          type: String,
          default: 'none'
        }
      },
      extras: {
        rain_protection: {
          type: String,
          default: 'none'
        },
        warmers_misc: {
          type: String,
          default: 'none'
        }
      }
    }
  },
  { timestamps: true }
);

export default model('Clothing', ClothingItemSchema);
