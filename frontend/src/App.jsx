import { useEffect, useMemo, useState } from "react";
import BeforeAfterSlider from "./components/BeforeAfterSlider";
import ImageUploader from "./components/ImageUploader";
import Filtering from "./modules/Filtering";
import Histogram from "./modules/Histogram";
import Intensity from "./modules/Intensity";
import Morphology from "./modules/Morphology";
import Segmentation from "./modules/Segmentation";
import { moduleTabs } from "./routes";
import { imageApi } from "./services/api";
import { debounce } from "./services/debounce";

function App() {
  const [activeTab, setActiveTab] = useState("intensity");
  const [activeAction, setActiveAction] = useState("");
  const [sourceFile, setSourceFile] = useState(null);
  const [beforeSrc, setBeforeSrc] = useState("");
  const [afterSrc, setAfterSrc] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [gamma, setGamma] = useState(1.2);
  const [clipLimit, setClipLimit] = useState(2.0);
  const [tileSize, setTileSize] = useState(8);
  const [blurKernel, setBlurKernel] = useState(5);
  const [sharpenStrength, setSharpenStrength] = useState(1.0);
  const [edgeLow, setEdgeLow] = useState(75);
  const [edgeHigh, setEdgeHigh] = useState(150);
  const [threshold, setThreshold] = useState(127);
  const [morphOperation, setMorphOperation] = useState("open");
  const [morphKernel, setMorphKernel] = useState(3);
  const [morphIterations, setMorphIterations] = useState(1);

  useEffect(() => {
    return () => {
      if (beforeSrc) URL.revokeObjectURL(beforeSrc);
      if (afterSrc) URL.revokeObjectURL(afterSrc);
    };
  }, [beforeSrc, afterSrc]);

  const runProcessing = async (processor) => {
    if (!sourceFile) {
      setError("Upload an image first.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const resultUrl = await processor(sourceFile);
      setAfterSrc((current) => {
        if (current) URL.revokeObjectURL(current);
        return resultUrl;
      });
    } catch {
      setError("Processing failed. Check backend availability.");
    } finally {
      setLoading(false);
    }
  };

  const debouncedGamma = useMemo(() => debounce((file, value) => imageApi.gamma(file, value), 250), []);

  const onFileChange = (file) => {
    setActiveAction("");
    setSourceFile(file);
    setError("");
    setAfterSrc((current) => {
      if (current) URL.revokeObjectURL(current);
      return "";
    });

    setBeforeSrc((current) => {
      if (current) URL.revokeObjectURL(current);
      return file ? URL.createObjectURL(file) : "";
    });
  };

  const tabProps = {
    intensity: (
      <Intensity
        gamma={gamma}
        activeAction={activeAction}
        onGammaChange={(value) => {
          setGamma(value);
          if (sourceFile) {
            setActiveAction("gamma");
            runProcessing((file) => debouncedGamma(file, value));
          }
        }}
        onApplyGamma={() => {
          setActiveAction("gamma");
          runProcessing((file) => imageApi.gamma(file, gamma));
        }}
        onApplyNegative={() => {
          setActiveAction("negative");
          runProcessing((file) => imageApi.negative(file));
        }}
        disabled={!sourceFile}
        loading={loading}
      />
    ),
    histogram: (
      <Histogram
        clipLimit={clipLimit}
        tileSize={tileSize}
        activeAction={activeAction}
        onClipChange={setClipLimit}
        onTileChange={setTileSize}
        onEqualize={() => {
          setActiveAction("equalize");
          runProcessing((file) => imageApi.equalize(file));
        }}
        onAdaptiveEqualize={() => {
          setActiveAction("adaptiveEqualize");
          runProcessing((file) => imageApi.adaptiveEqualize(file, clipLimit, tileSize));
        }}
        disabled={!sourceFile}
        loading={loading}
      />
    ),
    filtering: (
      <Filtering
        blurKernel={blurKernel}
        sharpenStrength={sharpenStrength}
        edgeLow={edgeLow}
        edgeHigh={edgeHigh}
        activeAction={activeAction}
        onBlurChange={setBlurKernel}
        onSharpenChange={setSharpenStrength}
        onEdgeLowChange={setEdgeLow}
        onEdgeHighChange={setEdgeHigh}
        onBlur={() => {
          setActiveAction("blur");
          runProcessing((file) => imageApi.blur(file, blurKernel));
        }}
        onSharpen={() => {
          setActiveAction("sharpen");
          runProcessing((file) => imageApi.sharpen(file, sharpenStrength));
        }}
        onEdge={() => {
          setActiveAction("edge");
          runProcessing((file) => imageApi.edge(file, edgeLow, edgeHigh));
        }}
        disabled={!sourceFile}
        loading={loading}
      />
    ),
    segmentation: (
      <Segmentation
        threshold={threshold}
        activeAction={activeAction}
        onThresholdChange={setThreshold}
        onThreshold={() => {
          setActiveAction("threshold");
          runProcessing((file) => imageApi.threshold(file, threshold));
        }}
        onOtsu={() => {
          setActiveAction("otsu");
          runProcessing((file) => imageApi.otsu(file));
        }}
        disabled={!sourceFile}
        loading={loading}
      />
    ),
    morphology: (
      <Morphology
        operation={morphOperation}
        kernelSize={morphKernel}
        iterations={morphIterations}
        activeAction={activeAction}
        onOperationChange={setMorphOperation}
        onKernelChange={setMorphKernel}
        onIterationChange={setMorphIterations}
        onApply={() => {
          setActiveAction("morphology");
          runProcessing((file) =>
            imageApi.morphology(file, morphOperation, morphKernel, morphIterations),
          );
        }}
        disabled={!sourceFile}
        loading={loading}
      />
    ),
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <h1>Image Lab</h1>
        </div>

        <ImageUploader fileName={sourceFile?.name} onFileChange={onFileChange} />

        <nav className="tab-list">
          {moduleTabs.map((tab) => (
            <button
              key={tab.id}
              className={activeTab === tab.id ? "tab-button tab-button--active" : "tab-button"}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="status-card">
          <span>{loading ? "Processing..." : "Ready"}</span>
          {error && <p className="error-text">{error}</p>}
        </div>

        {tabProps[activeTab]}
      </aside>

      <main className="workspace">
        <BeforeAfterSlider beforeSrc={beforeSrc} afterSrc={afterSrc} />
      </main>
    </div>
  );
}

export default App;
