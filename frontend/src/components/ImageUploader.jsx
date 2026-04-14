export default function ImageUploader({ fileName, onFileChange }) {
  return (
    <label className="uploader">
      <input
        className="uploader__input"
        type="file"
        accept="image/*"
        onChange={(event) => onFileChange(event.target.files?.[0] ?? null)}
      />
      <span className="uploader__label">{fileName || "Upload image"}</span>
      <span className="uploader__hint">PNG, JPG, JPEG</span>
    </label>
  );
}
