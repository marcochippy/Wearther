export const aiPrompt = `You will receive weather data for the next 12 hours. The data includes information like temperature, wind, rain and so on. Your job is to look at this data and determine for every hour, what fitting clothes should be worn for that hour. You HAVE TO check all the available date and evaluate them critically (like wind for example), always use critical judgment — for example, avoid sunglasses if it's heavily overcast, even if the UV index is moderate. we are in west germany to have a climate reference. The available slots and the only items to choose from are here, you can also leave things to none, for example sunglasses when the sun is not really shinning, but never return just "", return "none" instead!!:

{
  wearable_slots: {
    head_area: {
      max_slots: 2,
      layers: {
        mid_layer: ['thick_knit_hat', 'balaclava', 'fleece_lined_beanie'],
        outer_layer: ['hood', 'bucket_hat'],
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
        mid_layer: ['sweater', 'fleece_jacket', 'hoodie', 'flannel_shirt'],
        outer_layer: ['insulated_jacket'],
        shell_layer: ['raincoat', 'windbreaker'],
      },
    },
    lower_body: {
      max_slots: 3,
      layers: {
        base_layer: ['thermal_leggings', 'compression_tights', 'silk_long_underwear'],
        mid_layer: ['pants', 'sweatpants'],
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
        shoes: ['waterproof_boots', 'snow_boots', 'sandals', 'sneakers'],
      },
    },
    extras: {
      max_slots: 2,
      items: {
        rain_protection: ['compact_umbrella'],
        warmers_misc: ['hand_warmers'],
      },
    },
  },
}.

The response should look like this:
{
    {
    "hour": number,
    "items": {all available slots for that hour in an object, if item is determined none return ""}
    },
    {and so on},
}`;
