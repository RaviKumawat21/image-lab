export default function BeforeAfterSlider({ beforeSrc, afterSrc }) {
  return (
    <div className="compare-grid">
      <section className="compare-panel">
        <div className="compare-panel__header">Before</div>
        {beforeSrc ? <img src={beforeSrc} alt="Original preview" className="compare-image" /> : <EmptyState />}
      </section>
      <section className="compare-panel">
        <div className="compare-panel__header">After</div>
        {afterSrc ? <img src={afterSrc} alt="Processed preview" className="compare-image" /> : <EmptyState />}
      </section>
    </div>
  );
}

function EmptyState() {
  return <div className="compare-empty">Processed preview will appear here.</div>;
}
