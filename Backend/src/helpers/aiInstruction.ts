export const aiPrompt = `You will receive structured hourly weather data for the next 12 hours (for West Germany climate context). For each hour, pick weather-appropriate wearables from the allowed inventory below. Use critical judgment across the necessary inputs, like temperature, wind, rain and others and for example, avoid sunglasses if it's heavily overcast, even if the UV index is moderate.

Hard rules
- Only choose items that exist in the inventory below; never invent items. 
- Never exceed "max_slots" per body area.
- Respect layer types; do not assign more than one item to the same layer type.
- If no item is appropriate for a layer slot, return "none" (do NOT use empty strings or anything else). Never return a naked body just with none everywhere. If you dont have data to work with just write no data.
- Output must include ALL defined areas.
- Use late fall/winter items (e.g., fleece_lined_beanie, winter_mittens, snow_pants, ski_mask, snow_goggles) primarily in NOV-MAR.
- Dont use the bucket hat in windy condition, rather just for sunny conditions.
- Be aware, that the databse works with EU Time, so from 0-23 for the hours.

Here is a Decision guide which you can follow:
## Decision guide (West Germany context)
Temperature bands (use feels_like_c when present):
- ≥ 26°C: head: none (unless sun rules), face: none, upper: tshirt only; lower: shorts; feet: sandals; extras: none.
- 18-25°C: upper: tshirt; lower: shorts (if ≥22°C) or jeans; feet: sneakers; head/face: sun rules may apply.
- 12-17°C: upper: tshirt + (flannel_shirt OR light hoodie) based on wind (>6 m/s ⇒ hoodie); lower: jeans; feet: sneakers.
- 6-11°C: upper: tshirt + hoodie; consider bomberjacket if wind_m_s > 7 or rain; lower: jeans or sweatpants; feet: sneakers.
- 1-5°C: upper: tshirt + hoodie + bomberjacket; lower: jeans or sweatpants; feet: sneakers or waterproof_boots if wet.
- ≤ 0°C: winter logic: see cold/wind/snow rules; layering likely hoodie + bomberjacket; consider beanie, gloves, gaiter.

Wind & chill adjustments:
- If wind_m_s ≥ 8 OR gust_m_s ≥ 12: add one warmth step (e.g., add bomberjacket or switch flannel_shirt → hoodie).
- If feels_like_c ≤ 2°C due to wind: consider neck_gaiter and insulated_gloves.

Rain/snow/ground:
- Rain likely: precip_prob ≥ 50% AND precip_mm_h ≥ 0.2 ⇒ umbrella.
- Heavy rain: precip_mm_h ≥ 2.0 ⇒ waterproof_boots; avoid sandals.
- Snowing: precip_type = snow OR snow_depth_cm > 0 ⇒ avoid sandals; consider waterproof_boots. If feels_like_c ≤ -3°C and steady snow (precip_mm_h ≥ 0.5) ⇒ snow_pants or overalls.
- Sleet/icy mix: treat as snow+rain; prioritize waterproof_boots and warmth.

Sun/UV/overcast:
- Sunglasses only if uv_index ≥ 3 AND cloud_cover_pct ≤ 60 AND visibility_km is not poor.
- Bucket_hat if uv_index ≥ 5 AND cloud_cover_pct ≤ 40 AND wind_m_s < 9 AND temp_c ≥ 15.
- Snow_goggles only for blowing snow (precip_type = snow AND (wind_m_s ≥ 10 OR gust_m_s ≥ 14)); otherwise "none".

Seasonality (months):
- Beanie (fleece_lined_beanie): prefer months 11-3, or any month with feels_like_c ≤ 3°C.
- Winter_mittens: feels_like_c ≤ -5°C; otherwise insulated_gloves at ≤ 2°C.
- Ski_mask: extreme: feels_like_c ≤ -10°C AND (snowing OR wind_m_s ≥ 10).

Feet:
- Sandals: temp_c ≥ 26°C, no rain/snow, precip_prob < 30, cloud_cover_pct ≤ 60.
- Waterproof_boots: any significant precip (see above), slush, snow, or visibility_km poor due to rain/snow.
- Sneakers: default otherwise.

Lower body:
- Shorts: ≥ 22°C and low precip (prob < 40, precip_mm_h < 0.5).
- Jeans: 8-21°C or mild precip.
- Sweatpants: ≤ 7°C or windy (≥ 8 m/s) or damp/cold comfort preference.
- Snow_pants/overalls: see snow rule above.

Hands:
- Insulated_gloves: feels_like_c ≤ 7°C
- Winter_mittens: feels_like_c ≤ -5°C, especially with snow.

Upper body layering preferences (do not exceed max_slots=4 and respect layer keys):
- Base always "tshirt" unless feels_like_c ≤ -5°C AND rain/snow (you may still keep tshirt for layering—prefer to include it).
- Mid layer: choose ONE: hoodie (warmer/windier/wet) OR flannel_shirt (milder/drier).
- Shell layer: "bomberjacket" when feels_like_c ≤ 11°C, or wind_m_s ≥ 8, or any steady precip.
- Outer_layer is empty in inventory; set to "none".

Face area:
- Face_mask: "neck_gaiter" as above; "ski_mask" only in extreme cold rule.
- Eye_protection: "sunglasses" per sun rule; "snow_goggles" per snow/wind rule; else "none".

Head area:
- Mid_layer: beanie per season/cold rules; else "none".
- Outer_layer: bucket_hat per sun rule; else "none".
- Do not select both beanie and bucket_hat simultaneously unless conditions justify (rare). If both are valid, prefer beanie when feels_like_c ≤ 5°C, otherwise bucket_hat.

Extras:
- Umbrella per rain rule.
- Hand_warmers if feels_like_c ≤ -10°C.

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
    "hour": number (from 0-23),
    "items": {all available slots for that hour in an object}
    },
    {and so on},
}`;
