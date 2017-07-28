const tempWeights = {
  68: 1,
  69: 2,
  70: 3,
  71: 4,
  72: 7,
  73: 10,
  74: 13,
  75: 16,
  76: 15,
  77: 14,
  78: 13,
  79: 12,
  80: 11,
  81: 10,
  82: 9,
  83: 8,
  84: 7,
  85: 6,
  86: 5,
  87: 4,
  88: 3,
  89: 2,
  90: 1
};

exports.calculateRoof = (temp, precip, wind, uv) => {
  // Rain change over 35% is a no go
  if (precip >= 0.35) return [false, 0];

  // Get the current weight of the temperature
  const tmpWeight = tempWeights[Math.floor(temp)] || 0;

  // roofday is temperature weight times wind minus UV
  const windWeight = wind > 20 ? 0 : wind * -0.7;
  if (windWeight === 0) return [false, 0];

  // UV Weight is 1.5 * the UV but it's bad so we weight it negatively
  const uvWeight = uv * -1.5;
  const roofday = tmpWeight + (windWeight - uvWeight);

  return [roofday > 9.5, roofday];
};
