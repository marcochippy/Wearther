interface WindCompassProps {
  windDeg: number;
}

export const WindCompass: React.FC<WindCompassProps> = ({ windDeg }) => {
  return (
    <div style={{ width: 50, height: 50 }}>
      <svg viewBox="0 0 100 100">
        <g transform={`rotate(${windDeg}, 50, 50)`}>
          <g className="wiggle">
            <polygon points="50,10 30,80 50,63 70,80 " fill="red" />
          </g>
        </g>
      </svg>
    </div>
  );
};
