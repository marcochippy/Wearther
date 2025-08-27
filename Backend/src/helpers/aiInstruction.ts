// export const aiPrompt = `You will receive weather data for the next 12 hours. The data includes information like temperature, wind, rain and so on. Your job is to look at this data and determine for every hour, what fitting clothes should be worn for that hour. You HAVE TO check all the available date and evaluate them critically (like wind for example), beanie and winter equipment only in late fall or winter, always use critical judgment — for example, avoid sunglasses if it's heavily overcast, even if the UV index is moderate. we are in west germany to have a climate reference. The available slots and the only items to choose from are here, you can also leave things to none, for example sunglasses when the sun is not really shinning, but never return just "", return "none" instead!!:

// {
//   wearable_slots: {
//     head_area: {
//       max_slots: 2,
//       layers: {
//         mid_layer: ['fleece_lined_beanie'],
//         outer_layer: ['bucket_hat'],
//       },
//     },
//     face_area: {
//       max_slots: 2,
//       layers: {
//         face_mask: ['neck_gaiter', 'ski_mask'],
//         eye_protection: ['sunglasses', 'snow_goggles'],
//       },
//     },
//     upper_body: {
//       max_slots: 4,
//       layers: {
//         base_layer: ['tshirt'],
//         mid_layer: ['hoodie'],
//         outer_layer: [],
//         shell_layer: ['bomberjacket'],
//       },
//     },
//     lower_body: {
//       max_slots: 3,
//       layers: {
//         base_layer: [],
//         mid_layer: ['jeans', 'sweatpants', 'shorts'],
//         outer_layer: ['snow_pants', 'overalls'],
//       },
//     },
//     hands: {
//       max_slots: 1,
//       layers: {
//         gloves: ['winter_mittens', 'insulated_gloves'],
//       },
//     },
//     feet: {
//       max_slots: 1,
//       layers: {
//         shoes: ['waterproof_boots', 'sandals', 'sneakers'],
//       },
//     },
//     extras: {
//       max_slots: 2,
//       items: {
//         rain_protection: ['umbrella'],
//         warmers_misc: ['hand_warmers'],
//       },
//     },
//   },
// }.

// The response should look like this:
// {
//     {
//     "hour": number,
//     "items": {all available slots for that hour in an object, if item is determined none return ""}
//     },
//     {and so on},
// }`;

export const aiPrompt = `You will receive structured hourly weather data for the next 12 hours (for West Germany climate context). For each hour, pick weather-appropriate wearables from the allowed inventory below. Use critical judgment across ALL inputs (temperature, feels_like, wind, gusts, precipitation, precipitation_probability, precipitation_type, cloud_cover, UV index, humidity, snow_depth/ice, visibility). Prioritize safety and comfort.

Hard rules
- Only choose items that exist in the inventory below; never invent items. 
- Never exceed "max_slots" per body area.
- Respect layer types; do not assign more than one item to the same layer type.
- If no item is appropriate for a slot, return "none" (do NOT use empty strings or anything else).
- Output must include ALL defined areas and their layer keys each hour. If a layer has no suitable item, set it to "none". But never return a full list just with "none".
- Use late fall/winter items (e.g., fleece_lined_beanie, winter_mittens, snow_pants, ski_mask, snow_goggles) primarily in NOV–MAR, or whenever feels_like is sufficiently cold per thresholds below.
- Sunglasses require both adequate sunlight and usefulness; do not suggest them for heavy overcast even if UV is moderate.
- Be aware, that the databse works with EU Time, so from 0-23 for the hours.

Apply these rules consistently. If conflicting signals arise, prioritize safety (warmth and dryness) over style. Always return "none" rather than an empty string for unselected layers/items.

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
    "hour": number (from 0-23),
    "items": {all available slots for that hour in an object}
    },
    {and so on},
}`;
