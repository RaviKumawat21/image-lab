import { BlurControl, EdgeControl, SharpenControl } from "../components/Controls/FilterControl";

export default function Filtering({
  blurKernel,
  sharpenStrength,
  edgeLow,
  edgeHigh,
  onBlurChange,
  onSharpenChange,
  onEdgeLowChange,
  onEdgeHighChange,
  onBlur,
  onSharpen,
  onEdge,
  disabled,
  loading,
}) {
  return (
    <section className="module-card">
      <div className="module-card__header">
        <h3>Filtering</h3>
        <p>Blur, sharpen, and edge detection in a single panel.</p>
      </div>
      <BlurControl value={blurKernel} onChange={onBlurChange} />
      <SharpenControl value={sharpenStrength} onChange={onSharpenChange} />
      <EdgeControl
        low={edgeLow}
        high={edgeHigh}
        onLowChange={onEdgeLowChange}
        onHighChange={onEdgeHighChange}
      />
      <div className="actions">
        <button onClick={onBlur} disabled={disabled || loading}>
          Blur
        </button>
        <button className="button-secondary" onClick={onSharpen} disabled={disabled || loading}>
          Sharpen
        </button>
        <button className="button-secondary" onClick={onEdge} disabled={disabled || loading}>
          Edge Detect
        </button>
      </div>
    </section>
  );
}
