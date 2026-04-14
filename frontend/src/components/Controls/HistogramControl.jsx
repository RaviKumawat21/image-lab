export default function HistogramControl({ clipLimit, tileSize, onClipChange, onTileChange }) {
  return (
    <div className="control-stack">
      <label className="control">
        <span>CLAHE Clip Limit</span>
        <input
          type="range"
          min="0.5"
          max="5"
          step="0.5"
          value={clipLimit}
          onChange={(event) => onClipChange(Number(event.target.value))}
        />
        <strong>{clipLimit.toFixed(1)}</strong>
      </label>
      <label className="control">
        <span>Tile Grid Size</span>
        <input
          type="range"
          min="2"
          max="16"
          step="1"
          value={tileSize}
          onChange={(event) => onTileChange(Number(event.target.value))}
        />
        <strong>{tileSize}</strong>
      </label>
    </div>
  );
}
