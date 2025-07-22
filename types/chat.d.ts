export interface ClothingData {
  hour: number;
  items: {
    head_area_mid_layer: object;
    head_area_outer_layer: object;
    face_area_face_mask: object;
    face_area_eye_protection: object;
    upper_body_base_layer: object;
    upper_body_mid_layer: object;
    upper_body_outer_layer: object;
    upper_body_shell_layer: object;
    lower_body_base_layer: object;
    lower_body_mid_layer: object;
    lower_body_outer_layer: object;
    hands_gloves: object;
    feet_shoes: object;
    extras_rain_protection: object;
    extras_warmers_misc: object;
  };
}

export interface ApiResponse {
  clothingData: string;
}
