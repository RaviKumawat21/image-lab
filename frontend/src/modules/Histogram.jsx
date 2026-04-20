import HistogramControl from "../components/Controls/HistogramControl";

export default function Histogram({
  clipLimit,
  tileSize,
  onClipChange,
  onTileChange,
  onEqualize,
  onAdaptiveEqualize,
  activeAction,
  disabled,
  loading,
}) {
  return (
    <section className="module-card">
      <div className="module-card__header">
        <h3>Histogram</h3>
        <p>Standard equalization and CLAHE for contrast enhancement.</p>
      </div>
      <HistogramControl
        clipLimit={clipLimit}
        tileSize={tileSize}
        onClipChange={onClipChange}
        onTileChange={onTileChange}
      />
      <div className="actions">
        <button className={activeAction === "equalize" ? "" : "button-secondary"} onClick={onEqualize} disabled={disabled || loading}>
          Equalize
        </button>
        <button className={activeAction === "adaptiveEqualize" ? "" : "button-secondary"} onClick={onAdaptiveEqualize} disabled={disabled || loading}>
          Adaptive Equalize
        </button>
      </div>
    </section>
  );
}
