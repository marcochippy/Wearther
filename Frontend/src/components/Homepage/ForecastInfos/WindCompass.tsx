interface WindCompassProps {
  windDeg: number;
}

export const WindCompass: React.FC<WindCompassProps> = ({ windDeg }) => {
  return (
    <div style={{ width: 50, height: 50 }}>
      <svg viewBox="0 0 100 100">
        {/* Compass Circle */}
        {/* <circle cx="50" cy="50" r="48" stroke="black" strokeWidth="1" fill="#f0f0f0" /> */}

        {/* Cardinal Points */}
        {/* <text x="50" y="12" textAnchor="middle" fontSize="6">
          N
        </text>
        <text x="50" y="94" textAnchor="middle" fontSize="6">
          S
        </text>
        <text x="90" y="54" textAnchor="middle" fontSize="6">
          E
        </text>
        <text x="10" y="54" textAnchor="middle" fontSize="6">
          W
        </text> */}
        <g transform={`rotate(${windDeg}, 50, 50)`}>
          <g className="wiggle">
            <polygon points="50,10 30,80 50,63 70,80 " fill="red" />
          </g>
        </g>
      </svg>
    </div>
  );
};
