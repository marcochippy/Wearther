interface ThermometerProps {
  temperature: number; // Temperature in °C
  min?: number; // Minimum expected temperature
  max?: number; // Maximum expected temperature
}

export const Thermometer: React.FC<ThermometerProps> = ({ temperature, min = -10, max = 40 }) => {
  const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);

  const height = 200;
  const fillPercent = (clamp(temperature, min, max) - min) / (max - min);
  const fillHeight = fillPercent * height;
  const fillY = 250 - fillHeight;

  // Color from blue (cold) to red (hot)
  const interpolateColor = (temp: number) => {
    const clamped = clamp(temp, min, max);
    const percent = (clamped - min) / (max - min);
    const r = Math.round(255 * percent);
    const g = Math.round(50 * (1 - percent));
    const b = Math.round(255 * (1 - percent));
    return `rgb(${r},${g},${b})`;
  };

  return (
    <svg viewBox="0 0 100 300" width="50" height="100" className="-mt-1">
      {/* Outer tube */}
      <rect x="40" y="50" width="20" height="200" rx="10" ry="10" fill="#ccc" stroke="#333" strokeWidth="0" />

      {/* Mercury fill */}
      <rect x="40" y={fillY} width="20" height={fillHeight} rx="10" ry="10" fill={interpolateColor(temperature)} />

      {/* Bulb at bottom */}
      <circle cx="50" cy="260" r="20" fill={interpolateColor(temperature)} stroke="#333" strokeWidth="0" />
    </svg>
  );
};
