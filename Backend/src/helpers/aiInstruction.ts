export const aiPrompt = `You will receive structured hourly weather data for the next hours (for West Germany climate context). The time is in Unix. For each hour, pick weather-appropriate wearables from the allowed inventory below. Use critical judgment across the necessary inputs, like temperature, wind, rain and others and for example, avoid sunglasses if it's heavily overcast, even if the UV index is moderate.

Hard rules
- Only choose items that exist in the inventory below; never invent items. 
- Never exceed "max_slots" per body area.
- Respect layer types; do not assign more than one item to the same layer type.
- If no item is appropriate for a layer slot, return "none" (do NOT use empty strings or anything else). Never return a naked body just with none everywhere. If you dont have data to work with just write no data.
- Output must include ALL defined areas.
- Use late fall/winter items (e.g., fleece_lined_beanie, winter_mittens, snow_pants, ski_mask, snow_goggles) primarily in NOV-MAR.
- Dont use the bucket hat in windy condition, rather just for sunny conditions.

Rules for Rain:
- Do not rely only on "precipType".
- Use "precipProbability" (chance of precipitation, 0-1) and "precipIntensity" (mm/hour).
Umbrella recommended if precipProbability >= 0.3 AND precipIntensity >= 0.25.
Otherwise no umbrella needed.

Apply these rules consistently. Here is the inventory of items:

{
  wearable_slots: {
    head_area: {
      max_slots: 2,
      layers: {
        mid_layer: ['fleece_lined_beanie'],
        outer_layer: ['bucket_hat'],
      },
    },
    face_area: {
      max_slots: 2,
      layers: {
        face_mask: ['neck_gaiter', 'ski_mask'],
        eye_protection: ['sunglasses', 'snow_goggles'],
      },
    },
    upper_body: {
      max_slots: 4,
      layers: {
        base_layer: ['tshirt'],
        mid_layer: ['hoodie'],
        outer_layer: [],
        shell_layer: ['bomberjacket'],
      },
    },
    lower_body: {
      max_slots: 3,
      layers: {
        base_layer: [],
        mid_layer: ['jeans', 'sweatpants', 'shorts'],
        outer_layer: ['snow_pants', 'overalls'],
      },
    },
    hands: {
      max_slots: 1,
      layers: {
        gloves: ['winter_mittens', 'insulated_gloves'],
      },
    },
    feet: {
      max_slots: 1,
      layers: {
        shoes: ['waterproof_boots', 'sandals', 'sneakers'],
      },
    },
    extras: {
      max_slots: 2,
      items: {
        rain_protection: ['umbrella'],
        warmers_misc: ['hand_warmers'],
      },
    },
  },
}.

The response should look like this:
{
    {
    "hour": number (use the Unix time),
    "items": {all available slots for that hour in an object}
    },
    {and so on},
}`;
