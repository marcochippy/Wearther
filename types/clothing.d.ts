export interface ClothingItems {
  hour: number;
  items: {
    head_area: {
      mid_layer: string;
      outer_layer: string;
    };
    face_area: {
      face_mask: string;
      eye_protection: string;
    };
    upper_body: {
      base_layer: string;
      mid_layer: string;
      outer_layer: string;
      shell_layer: string;
    };
    lower_body: {
      base_layer: string;
      mid_layer: string;
      outer_layer: string;
    };
    hands: {
      gloves: string;
    };
    feet: {
      shoes: string;
    };
    extras: {
      rain_protection: string;
      warmers_misc: string;
    };
  };
}

export interface ClothingData {
  hour: number;
  items: ClothingItems;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ApiResponse {
  clothingData: string;
}
