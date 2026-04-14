export default function Morphology({
  operation,
  kernelSize,
  iterations,
  onOperationChange,
  onKernelChange,
  onIterationChange,
  onApply,
  disabled,
  loading,
}) {
  return (
    <section className="module-card">
      <div className="module-card__header">
        <h3>Morphology</h3>
        <p>Binary morphology for cleanup and region shaping.</p>
      </div>
      <label className="control">
        <span>Operation</span>
        <select value={operation} onChange={(event) => onOperationChange(event.target.value)}>
          <option value="erode">Erode</option>
          <option value="dilate">Dilate</option>
          <option value="open">Open</option>
          <option value="close">Close</option>
        </select>
      </label>
      <label className="control">
        <span>Kernel Size</span>
        <input
          type="range"
          min="1"
          max="9"
          step="1"
          value={kernelSize}
          onChange={(event) => onKernelChange(Number(event.target.value))}
        />
        <strong>{kernelSize}</strong>
      </label>
      <label className="control">
        <span>Iterations</span>
        <input
          type="range"
          min="1"
          max="5"
          step="1"
          value={iterations}
          onChange={(event) => onIterationChange(Number(event.target.value))}
        />
        <strong>{iterations}</strong>
      </label>
      <div className="actions">
        <button onClick={onApply} disabled={disabled || loading}>
          Apply Morphology
        </button>
      </div>
    </section>
  );
}
