export default function Segmentation({
  threshold,
  onThresholdChange,
  onThreshold,
  onOtsu,
  disabled,
  loading,
}) {
  return (
    <section className="module-card">
      <div className="module-card__header">
        <h3>Segmentation</h3>
        <p>Quick threshold-based segmentation with Otsu fallback.</p>
      </div>
      <label className="control">
        <span>Threshold</span>
        <input
          type="range"
          min="0"
          max="255"
          step="1"
          value={threshold}
          onChange={(event) => onThresholdChange(Number(event.target.value))}
        />
        <strong>{threshold}</strong>
      </label>
      <div className="actions">
        <button onClick={onThreshold} disabled={disabled || loading}>
          Apply Threshold
        </button>
        <button className="button-secondary" onClick={onOtsu} disabled={disabled || loading}>
          Apply Otsu
        </button>
      </div>
    </section>
  );
}
