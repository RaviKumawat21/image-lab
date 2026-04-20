import GammaControl from "../components/Controls/GammaControl";

export default function Intensity({
  gamma,
  onGammaChange,
  onApplyGamma,
  onApplyNegative,
  activeAction,
  disabled,
  loading,
}) {
  return (
    <section className="module-card">
      <div className="module-card__header">
        <h3>Intensity</h3>
        <p>Gamma correction and image negative with backend OpenCV processing.</p>
      </div>
      <GammaControl value={gamma} onChange={onGammaChange} />
      <div className="actions">
        <button className={activeAction === "gamma" ? "" : "button-secondary"} onClick={onApplyGamma} disabled={disabled || loading}>
          Apply Gamma
        </button>
        <button className={activeAction === "negative" ? "" : "button-secondary"} onClick={onApplyNegative} disabled={disabled || loading}>
          Negative
        </button>
      </div>
    </section>
  );
}
