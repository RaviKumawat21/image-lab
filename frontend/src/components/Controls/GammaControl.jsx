export default function GammaControl({ value, onChange }) {
  return (
    <label className="control">
      <span>Gamma</span>
      <input
        type="range"
        min="0.1"
        max="3"
        step="0.1"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <strong>{value.toFixed(1)}</strong>
    </label>
  );
}
