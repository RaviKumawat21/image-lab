export function BlurControl({ value, onChange }) {
  return (
    <label className="control">
      <span>Blur Kernel</span>
      <input
        type="range"
        min="1"
        max="21"
        step="2"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <strong>{value}</strong>
    </label>
  );
}

export function SharpenControl({ value, onChange }) {
  return (
    <label className="control">
      <span>Sharpen Strength</span>
      <input
        type="range"
        min="0.5"
        max="3"
        step="0.1"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <strong>{value.toFixed(1)}</strong>
    </label>
  );
}

export function EdgeControl({ low, high, onLowChange, onHighChange }) {
  return (
    <div className="control-stack">
      <label className="control">
        <span>Low Threshold</span>
        <input
          type="range"
          min="0"
          max="255"
          step="1"
          value={low}
          onChange={(event) => onLowChange(Number(event.target.value))}
        />
        <strong>{low}</strong>
      </label>
      <label className="control">
        <span>High Threshold</span>
        <input
          type="range"
          min="0"
          max="255"
          step="1"
          value={high}
          onChange={(event) => onHighChange(Number(event.target.value))}
        />
        <strong>{high}</strong>
      </label>
    </div>
  );
}
