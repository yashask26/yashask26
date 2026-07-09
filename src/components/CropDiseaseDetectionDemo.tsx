import React, { useState } from "react";
import { Leaf, Upload, AlertTriangle, ShieldCheck, HelpCircle, Activity, ChevronRight, Check, Brain, Play, RotateCcw, Sliders, Settings } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CROP_SAMPLES, CropSample } from "../data";

export default function CropDiseaseDetectionDemo() {
  const [activeTab, setActiveTab] = useState<"diagnose" | "train">("diagnose");

  // Diagnosis states
  const [selectedSample, setSelectedSample] = useState<CropSample | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisLogs, setAnalysisLogs] = useState<string[]>([]);
  const [result, setResult] = useState<CropSample | null>(null);

  // Hyperparameters
  const [lr, setLr] = useState<string>("0.001");
  const [batchSize, setBatchSize] = useState<number>(32);
  const [epochs, setEpochs] = useState<number>(12);
  const [optimizer, setOptimizer] = useState<string>("Adam");

  // Training states
  const [isTraining, setIsTraining] = useState<boolean>(false);
  const [currentEpoch, setCurrentEpoch] = useState<number>(1);
  const [activeBatch, setActiveBatch] = useState<number>(0);
  const [trainingLogs, setTrainingLogs] = useState<string[]>([]);
  const [history, setHistory] = useState<Array<{
    epoch: number;
    accuracy: number;
    loss: number;
    valAccuracy: number;
    valLoss: number;
  }>>([]);

  // Saved weights states
  const [trainedAccuracy, setTrainedAccuracy] = useState<number | null>(null);
  const [trainedLoss, setTrainedLoss] = useState<number | null>(null);
  const [fitQuality, setFitQuality] = useState<string | null>(null);

  // Helper to generate realistic epochs metrics based on user configuration
  const getEpochMetrics = (e: number, lrVal: string, optVal: string, bsVal: number) => {
    let finalAcc = 0;
    let finalLoss = 0;
    let valAcc = 0;
    let valLoss = 0;

    const jitter = (Math.random() - 0.5) * (bsVal === 16 ? 3.0 : bsVal === 64 ? 0.8 : 1.5);
    const lossJitter = (Math.random() - 0.5) * (bsVal === 16 ? 0.05 : bsVal === 64 ? 0.01 : 0.02);

    let optModifier = 1.0;
    if (optVal === "SGD") optModifier = 0.82;
    if (optVal === "RMSprop") optModifier = 0.92;

    if (lrVal === "0.1") {
      // Diverged/Exploded gradients
      finalAcc = 28 + Math.random() * 12 + jitter;
      finalLoss = 2.1 + Math.random() * 0.5 + lossJitter;
      valAcc = finalAcc - 3 - Math.random() * 3;
      valLoss = finalLoss + 0.15;
    } else if (lrVal === "0.0001") {
      // Underfitted / Slower rate
      const rate = 0.06 * optModifier;
      finalAcc = 30 + (e * rate * 38) + jitter;
      finalLoss = Math.max(0.4, 1.8 - (e * rate * 0.95) + lossJitter);
      valAcc = finalAcc - 1.2;
      valLoss = finalLoss + 0.04;
    } else if (lrVal === "0.01") {
      // Fast but slightly noisy/overfitting
      const rate = 0.42 * optModifier;
      const progress = 1 - Math.pow(1 - rate, e);
      finalAcc = 35 + progress * 55 + jitter;
      finalLoss = Math.max(0.12, 1.6 * Math.pow(0.58, e) + lossJitter + 0.1);
      valAcc = finalAcc - 2.5;
      valLoss = finalLoss + 0.04;
    } else {
      // "0.001" - Recommended (Optimal path)
      const rate = 0.33 * optModifier;
      const progress = 1 - Math.pow(1 - rate, e);
      finalAcc = 35 + progress * 62.5 + jitter;
      finalLoss = Math.max(0.04, 1.7 * Math.pow(0.52, e) + lossJitter + 0.03);
      valAcc = finalAcc - 0.7;
      valLoss = finalLoss + 0.01;
    }

    // Boundaries safety
    finalAcc = parseFloat(Math.min(99.8, Math.max(12.0, finalAcc)).toFixed(1));
    finalLoss = parseFloat(Math.max(0.005, finalLoss).toFixed(3));
    valAcc = parseFloat(Math.min(99.5, Math.max(10.0, valAcc)).toFixed(1));
    valLoss = parseFloat(Math.max(0.005, valLoss).toFixed(3));

    return { accuracy: finalAcc, loss: finalLoss, valAccuracy: valAcc, valLoss };
  };

  const handleStartTraining = () => {
    setIsTraining(true);
    setCurrentEpoch(1);
    setActiveBatch(0);
    setHistory([]);
    setTrainingLogs([
      `[SYSTEM] Init: Initializing TensorFlow JS sequential layer backend...`,
      `[SYSTEM] Architecture: [Conv2D(32, 3x3) -> ReLU] -> MaxPool -> [Conv2D(64, 3x3) -> ReLU] -> MaxPool -> Dense(128) -> Softmax(3)`,
      `[SYSTEM] Parameters: Optimizer=${optimizer} | LearningRate=${lr} | BatchSize=${batchSize} | Epochs=${epochs}`,
      `[SYSTEM] Loss Target: Categorical Crossentropy | Categorizing 3 leaf taxonomy classes...`,
      `[SYSTEM] Dataset: Loaded 1,520 high-res leaf training matrices and 380 validation specimens.`,
      `[TRAIN] Commencing training epochs sequence...`
    ]);

    let e = 1;
    const runEpoch = () => {
      if (e > epochs) {
        setIsTraining(false);
        const finalMetrics = getEpochMetrics(epochs, lr, optimizer, batchSize);
        setTrainedAccuracy(finalMetrics.valAccuracy);
        setTrainedLoss(finalMetrics.valLoss);

        let quality = "";
        if (lr === "0.1") {
          quality = "Diverged (Gradient Explosion)";
        } else if (lr === "0.0001") {
          quality = "Underfitted (Incomplete Convergence)";
        } else if (lr === "0.01") {
          quality = "Overfitted (High Validation Jitter)";
        } else {
          quality = "Optimal Fit (Superb Convergence!)";
        }
        setFitQuality(quality);

        setTrainingLogs((prev) => [
          ...prev,
          `[SUCCESS] CNN training cycle fully completed!`,
          `[EVALUATION] Validation Accuracy: ${finalMetrics.valAccuracy}% | Loss: ${finalMetrics.valLoss}`,
          `[SYSTEM] Customized weights state successfully applied. Active diagnoses will utilize these parameters.`
        ]);
        return;
      }

      setCurrentEpoch(e);
      let batch = 1;
      const totalBatches = Math.ceil(1520 / batchSize);

      const runBatches = setInterval(() => {
        if (batch > totalBatches) {
          clearInterval(runBatches);
          
          const metrics = getEpochMetrics(e, lr, optimizer, batchSize);
          setHistory((prev) => [
            ...prev,
            { epoch: e, ...metrics }
          ]);

          setTrainingLogs((prev) => [
            ...prev,
            `[EPOCH ${e}/${epochs}] Loss: ${metrics.loss.toFixed(3)} - Accuracy: ${metrics.accuracy.toFixed(1)}% - Val Loss: ${metrics.valLoss.toFixed(3)} - Val Accuracy: ${metrics.valAccuracy.toFixed(1)}%`
          ]);

          e++;
          setTimeout(runEpoch, 150);
          return;
        }
        setActiveBatch(batch);
        batch += Math.max(1, Math.floor(totalBatches / 12));
      }, 25);
    };

    setTimeout(runEpoch, 1000);
  };

  const startAnalysis = (sample: CropSample) => {
    setSelectedSample(sample);
    setIsAnalyzing(true);
    setResult(null);
    setAnalysisLogs([]);

    const logs = [
      "[INFO] Loading active CNN weights from local session scope...",
      trainedAccuracy !== null 
        ? `[INFO] Running model trained manually (Acc: ${trainedAccuracy}%, Loss: ${trainedLoss})...` 
        : "[INFO] Running baseline model weights (TensorFlow, Acc: 93.8%, Loss: 0.082)...",
      "[INFO] Resizing input leaf image to 224x224x3 tensors...",
      "[MODEL] Evaluating convolutional feature maps & pooling weights...",
      "[CLASSIFIER] Applying fully-connected classification weights with softmax activation...",
      "[SUCCESS] Inference successfully completed. Resolving taxonomy pathogen..."
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setAnalysisLogs((prev) => [...prev, log]);
      }, (index + 1) * 300);
    });

    setTimeout(() => {
      setResult(sample);
      setIsAnalyzing(false);
    }, logs.length * 300 + 100);
  };

  const getConfidence = (baseConf: number) => {
    if (trainedAccuracy !== null) {
      const scale = trainedAccuracy / 93.8;
      const finalConf = Math.min(99.9, Math.max(15.0, baseConf * scale));
      return parseFloat(finalConf.toFixed(1));
    }
    return baseConf;
  };

  return (
    <div id="crop_disease_demo_wrapper" className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-3xl shadow-xl space-y-6">
      
      {/* Header Section */}
      <div id="crop_header" className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-blue-400 font-mono text-xs">
            <Leaf className="w-3.5 h-3.5 animate-pulse text-blue-400" />
            Interactive Machine Learning Simulator
          </div>
          <h3 className="font-sans font-bold text-white text-2xl tracking-tight">Crop Disease Detection</h3>
          <p className="font-sans text-sm text-slate-300">
            A Convolutional Neural Network (CNN) prototype designed to diagnose plant pathogens instantly from leaf foliage photographs.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10">
        <button
          onClick={() => !isTraining && setActiveTab("diagnose")}
          disabled={isTraining}
          className={`flex-1 py-3 text-sm font-sans font-semibold border-b-2 transition-all cursor-pointer text-center ${
            isTraining ? "opacity-50 cursor-not-allowed text-slate-600" : "text-slate-400 hover:text-slate-300"
          } ${
            activeTab === "diagnose" && !isTraining
              ? "border-blue-500 text-blue-400 font-bold"
              : "border-transparent"
          }`}
        >
          🔍 Diagnosis Bay
        </button>
        <button
          onClick={() => setActiveTab("train")}
          className={`flex-1 py-3 text-sm font-sans font-semibold border-b-2 transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === "train"
              ? "border-blue-500 text-blue-400 font-bold"
              : "border-transparent text-slate-400 hover:text-slate-300"
          }`}
        >
          <Brain className="w-4 h-4 text-blue-400" />
          🧠 CNN Training Lab
        </button>
      </div>

      {activeTab === "diagnose" ? (
        /* DIAGNOSIS TAB */
        <div id="crop_grid" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Side: Select Leaf and Scanning Bay */}
          <div className="lg:col-span-6 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-sans font-semibold text-white text-xs uppercase tracking-wider">Select a Specimen to Diagnose</h4>
                {trainedAccuracy !== null && (
                  <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <Check className="w-2.5 h-2.5" /> Manual Weights Active ({trainedAccuracy}%)
                  </span>
                )}
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                {CROP_SAMPLES.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => startAnalysis(sample)}
                    disabled={isAnalyzing}
                    className={`p-2 rounded-xl border flex flex-col items-center gap-2 text-center transition-all cursor-pointer ${
                      selectedSample?.id === sample.id
                        ? "bg-white/15 border-blue-500 shadow-md shadow-blue-500/10"
                        : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10"
                    }`}
                  >
                    <img
                      src={sample.imageUrl}
                      alt={sample.name}
                      className="w-16 h-16 object-cover rounded-lg border border-white/10"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="font-sans text-[10px] text-slate-400 truncate max-w-[80px]">{sample.cropType}</div>
                      <div className="font-sans font-medium text-[9px] text-white truncate max-w-[80px]">{sample.name.split(" ")[2] || "Specimen"}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Diagnostic Scanning Bay */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 h-[280px] relative overflow-hidden flex flex-col justify-center items-center">
              
              {/* Analyzer Background Laser animation */}
              <AnimatePresence>
                {isAnalyzing && selectedSample && (
                  <motion.div
                    key="analyzer-laser"
                    initial={{ top: "0%" }}
                    animate={{ top: "100%" }}
                    exit={{ opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="absolute inset-x-0 h-1 bg-blue-500 shadow-[0_0_12px_#3b82f6] z-10"
                  ></motion.div>
                )}
              </AnimatePresence>

              {selectedSample ? (
                <div className="relative w-full h-full flex flex-col md:flex-row items-center justify-center gap-5">
                  <div className="relative flex-shrink-0 w-36 h-36 rounded-xl overflow-hidden border border-white/10">
                    <img
                      src={selectedSample.imageUrl}
                      alt={selectedSample.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {isAnalyzing && (
                      <div className="absolute inset-0 bg-blue-500/10 flex items-center justify-center">
                        <span className="font-mono text-[9px] text-blue-400 bg-[#0a0a14]/80 px-2 py-0.5 rounded border border-blue-500/20 uppercase tracking-widest animate-pulse">Scanning</span>
                      </div>
                    )}
                  </div>

                  {/* Analysis Console logs */}
                  <div className="flex-1 w-full bg-[#0a0a14]/60 border border-white/10 p-3 rounded-xl font-mono text-[9px] text-slate-300 space-y-1 overflow-y-auto h-36">
                    {analysisLogs.length === 0 ? (
                      <p className="text-slate-500 italic">[SYSTEM] Click any leaf specimen above to begin CNN prediction sequence...</p>
                    ) : (
                      analysisLogs.map((log, index) => (
                        <p key={index} className={log.includes("SUCCESS") ? "text-blue-400 font-semibold" : ""}>
                          {log}
                        </p>
                      ))
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 space-y-3">
                  <Upload className="w-12 h-12 text-slate-600 mx-auto animate-bounce" />
                  <div className="space-y-1">
                    <p className="font-sans font-semibold text-xs text-slate-400">CNN Diagnostics Bay Ready</p>
                    <p className="font-sans text-[10px] text-slate-500 max-w-[250px] mx-auto">Select a tomato, corn, or potato leaf to start scanning using Yashas's ML algorithm.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side: Diagnostics Report */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex-1 flex flex-col justify-between space-y-4">
              
              <div className="space-y-4">
                <h4 className="font-sans font-semibold text-white text-xs uppercase tracking-wider flex items-center gap-1.5 border-b border-white/10 pb-2">
                  <Activity className="w-4 h-4 text-blue-400" />
                  Inference Results
                </h4>

                {result ? (
                  <div className="space-y-4 font-sans">
                    {/* Status & Name Card */}
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h5 className="font-sans font-bold text-base text-white">{result.name}</h5>
                        <p className="text-xs text-slate-400">Diagnostic Category: <span className="font-semibold">{result.cropType}</span></p>
                      </div>

                      <div className="flex flex-col items-end">
                        <div className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                          result.status === "Healthy"
                            ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        }`}>
                          {result.status === "Healthy" ? <ShieldCheck className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                          {result.status}
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono mt-1">Accuracy: {getConfidence(result.confidence)}%</span>
                      </div>
                    </div>

                    {result.status === "Diseased" && (
                      <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl text-xs space-y-1">
                        <p className="font-semibold text-amber-400">Pathogen Identified:</p>
                        <p className="text-slate-300 font-medium italic">{result.diseaseName}</p>
                      </div>
                    )}

                    {/* Symptoms description */}
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Observed Pathology</p>
                      <p className="text-xs text-slate-400 leading-relaxed bg-[#0a0a14]/60 p-3 rounded-xl border border-white/10">{result.symptoms}</p>
                    </div>

                    {/* Recommendations */}
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Remediation Protocol</p>
                      <div className="space-y-1.5">
                        {result.recommendations.map((rec, index) => (
                          <div key={index} className="flex gap-2 text-xs text-slate-300 items-start">
                            <div className="p-0.5 bg-blue-500/10 text-blue-400 rounded-md mt-0.5">
                              <Check className="w-3 h-3" />
                            </div>
                            <span className="leading-relaxed">{rec}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-slate-600 text-center space-y-2 h-[220px]">
                    <HelpCircle className="w-12 h-12 text-slate-800" />
                    <div className="space-y-1">
                      <p className="font-sans text-xs font-semibold text-slate-500">Waiting For Diagnosis</p>
                      <p className="font-sans text-[10px] text-slate-500 max-w-[200px] mx-auto">No metrics generated yet. Run a leaf scanner diagnostic on the left to review metrics.</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="text-[10px] font-mono text-slate-500 border-t border-white/10 pt-3 text-center">
                {trainedAccuracy !== null 
                  ? `Active Model weights manually trained • Session Accuracy ~${trainedAccuracy}%` 
                  : "CNN Model trained manually in TensorFlow • Accuracy ~93.8%"}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* INTERACTIVE MANUAL TRAINING CENTER */
        <div id="training_center" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Hyperparameters Form */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-4">
              <h4 className="font-sans font-semibold text-white text-xs uppercase tracking-wider flex items-center gap-2 border-b border-white/10 pb-2">
                <Settings className="w-4 h-4 text-blue-400" />
                Hyperparameter Tuning
              </h4>

              {/* Learning Rate Selector */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-300">Learning Rate (η)</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: "0.1", label: "0.1 (High)" },
                    { value: "0.01", label: "0.01 (Fast)" },
                    { value: "0.001", label: "0.001 (Best)" },
                    { value: "0.0001", label: "0.0001 (Slow)" }
                  ].map((option) => (
                    <button
                      key={option.value}
                      disabled={isTraining}
                      onClick={() => setLr(option.value)}
                      className={`py-1.5 px-2 rounded-xl text-[10px] font-mono border text-center transition-all cursor-pointer ${
                        lr === option.value
                          ? "bg-blue-500/20 border-blue-500 text-blue-400 font-bold"
                          : "bg-white/5 border-white/5 text-slate-400 hover:border-white/15"
                      } ${isTraining ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Optimizer */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-300">Optimizer</label>
                <div className="grid grid-cols-3 gap-2">
                  {["Adam", "SGD", "RMSprop"].map((opt) => (
                    <button
                      key={opt}
                      disabled={isTraining}
                      onClick={() => setOptimizer(opt)}
                      className={`py-1.5 px-1 rounded-xl text-[10px] font-sans font-semibold border text-center transition-all cursor-pointer ${
                        optimizer === opt
                          ? "bg-blue-500/20 border-blue-500 text-blue-400 font-bold"
                          : "bg-white/5 border-white/5 text-slate-400 hover:border-white/15"
                      } ${isTraining ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Batch Size Selection */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-300">Batch Size</label>
                <div className="grid grid-cols-3 gap-2">
                  {[16, 32, 64].map((size) => (
                    <button
                      key={size}
                      disabled={isTraining}
                      onClick={() => setBatchSize(size)}
                      className={`py-1.5 px-1 rounded-xl text-[10px] font-mono border text-center transition-all cursor-pointer ${
                        batchSize === size
                          ? "bg-blue-500/20 border-blue-500 text-blue-400 font-bold"
                          : "bg-white/5 border-white/5 text-slate-400 hover:border-white/15"
                      } ${isTraining ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Epoch Count Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium text-slate-300">
                  <span>Training Epochs</span>
                  <span className="font-mono text-blue-400">{epochs} epochs</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="20"
                  value={epochs}
                  disabled={isTraining}
                  onChange={(e) => setEpochs(parseInt(e.target.value))}
                  className={`w-full accent-blue-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer ${
                    isTraining ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                />
              </div>

              <button
                onClick={handleStartTraining}
                disabled={isTraining}
                className={`w-full py-2.5 rounded-xl font-sans font-bold text-xs text-white flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  isTraining
                    ? "bg-blue-500/10 text-blue-400 border border-blue-500/20 cursor-not-allowed"
                    : "bg-gradient-to-tr from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500"
                }`}
              >
                {isTraining ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-blue-400/20 border-t-blue-400 animate-spin rounded-full"></div>
                    Fitting Epoch {currentEpoch}/{epochs}...
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    Start Manual CNN Training
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Training Live Progress & Charts */}
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-4">
              <h4 className="font-sans font-semibold text-white text-xs uppercase tracking-wider flex items-center justify-between border-b border-white/10 pb-2">
                <span className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-400" />
                  Training Dashboard
                </span>
                {isTraining && (
                  <span className="font-mono text-[9px] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full animate-pulse">
                    Running Epoch {currentEpoch}/{epochs} (Batch {activeBatch})
                  </span>
                )}
              </h4>

              {/* Dynamic SVG Plotting chart */}
              <div className="bg-[#0a0a14]/20 p-2.5 border border-white/5 rounded-2xl">
                {history.length >= 1 ? (
                  <svg viewBox="0 0 300 150" className="w-full h-40 bg-[#0a0a14]/60 rounded-xl border border-white/10 p-2 overflow-visible">
                    {/* Grid lines */}
                    <line x1="20" y1="10" x2="280" y2="10" stroke="rgba(255,255,255,0.05)" strokeDasharray="3" />
                    <line x1="20" y1="75" x2="280" y2="75" stroke="rgba(255,255,255,0.05)" strokeDasharray="3" />
                    <line x1="20" y1="140" x2="280" y2="140" stroke="rgba(255,255,255,0.1)" />
                    
                    {/* Labels */}
                    <text x="285" y="15" className="text-[8px] fill-slate-500 font-mono">100%</text>
                    <text x="285" y="78" className="text-[8px] fill-slate-500 font-mono">50%</text>
                    <text x="285" y="143" className="text-[8px] fill-slate-500 font-mono">0%</text>
                    
                    <text x="5" y="143" className="text-[8px] fill-slate-500 font-mono">E1</text>
                    <text x="270" y="143" className="text-[8px] fill-slate-500 font-mono">E{epochs}</text>

                    {/* Guidelines/Legend */}
                    <line x1="30" y1="147" x2="50" y2="147" stroke="#3b82f6" strokeWidth="2" />
                    <text x="55" y="149" className="text-[7px] fill-blue-400 font-mono font-medium">Accuracy</text>
                    
                    <line x1="120" y1="147" x2="140" y2="147" stroke="#f43f5e" strokeWidth="2" strokeDasharray="2" />
                    <text x="145" y="149" className="text-[7px] fill-rose-400 font-mono font-medium">Loss x50</text>

                    {/* Polyline for Accuracy */}
                    {history.length >= 2 && (
                      <polyline
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points={history.map((h, idx) => {
                          const x = 20 + (idx / (epochs - 1)) * 260;
                          const y = 140 - (h.valAccuracy / 100) * 120;
                          return `${x},${y}`;
                        }).join(" ")}
                      />
                    )}

                    {/* Polyline for Loss */}
                    {history.length >= 2 && (
                      <polyline
                        fill="none"
                        stroke="#f43f5e"
                        strokeWidth="1.5"
                        strokeDasharray="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points={history.map((h, idx) => {
                          const x = 20 + (idx / (epochs - 1)) * 260;
                          const y = 140 - (Math.min(2.0, h.valLoss) / 2.0) * 120;
                          return `${x},${y}`;
                        }).join(" ")}
                      />
                    )}

                    {/* Dots for Accuracy */}
                    {history.map((h, idx) => {
                      const x = 20 + (idx / (epochs - 1)) * 260;
                      const y = 140 - (h.valAccuracy / 100) * 120;
                      return (
                        <circle
                          key={`dot-acc-${idx}`}
                          cx={x}
                          cy={y}
                          r="3"
                          className="fill-blue-500 stroke-[#0a0a14] stroke-2"
                        />
                      );
                    })}
                  </svg>
                ) : (
                  <div className="w-full h-40 bg-[#0a0a14]/60 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center p-4">
                    <div className="w-8 h-8 rounded-full border border-dashed border-slate-700 flex items-center justify-center text-slate-500 mb-2">
                      📈
                    </div>
                    <span className="font-sans text-[10px] text-slate-500 font-medium">Real-Time Loss & Accuracy Plot</span>
                    <span className="font-sans text-[8px] text-slate-600 max-w-[180px]">Loss and accuracy validation trends will plot dynamically here in real-time as training progress triggers.</span>
                  </div>
                )}
              </div>

              {/* Console Output Logs */}
              <div className="bg-[#0a0a14]/60 border border-white/10 rounded-2xl p-4 font-mono text-[9px] text-slate-300 h-32 overflow-y-auto space-y-1.5">
                {trainingLogs.length === 0 ? (
                  <p className="text-slate-500 italic">[SYSTEM] Click "Start Manual CNN Training" to begin feeding batches into the convolutional layers.</p>
                ) : (
                  trainingLogs.map((log, index) => (
                    <p key={index} className={
                      log.includes("[SUCCESS]") || log.includes("completed!")
                        ? "text-emerald-400 font-semibold"
                        : log.includes("[EVALUATION]")
                        ? "text-blue-400 font-semibold"
                        : "text-slate-300"
                    }>
                      {log}
                    </p>
                  ))
                )}
              </div>

              {/* Training Finished Evaluation Report Card */}
              {!isTraining && trainedAccuracy !== null && (
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-3 font-sans">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Model Evaluation Report</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      Weights Synced
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-[#0a0a14]/60 p-2.5 rounded-xl border border-white/5">
                      <div className="text-[8px] text-slate-400 font-medium uppercase">Val Accuracy</div>
                      <div className="text-sm font-extrabold text-blue-400">{trainedAccuracy}%</div>
                    </div>
                    <div className="bg-[#0a0a14]/60 p-2.5 rounded-xl border border-white/5">
                      <div className="text-[8px] text-slate-400 font-medium uppercase">Val Loss</div>
                      <div className="text-sm font-extrabold text-rose-400">{trainedLoss}</div>
                    </div>
                    <div className="bg-[#0a0a14]/60 p-2.5 rounded-xl border border-white/5">
                      <div className="text-[8px] text-slate-400 font-medium uppercase">Fit Quality</div>
                      <div className="text-[9px] font-extrabold text-amber-400 truncate mt-0.5">{fitQuality?.split(" ")[0]}</div>
                    </div>
                  </div>

                  <div className="text-xs leading-relaxed bg-[#0a0a14]/40 p-3 rounded-xl border border-white/5 text-slate-300 space-y-1">
                    <span className="font-bold text-slate-200">Session Review:</span>
                    <p className="italic text-slate-300">
                      {lr === "0.1" && "The learning rate was too high. The loss exploded as gradients diverged. Future diagnoses using this configuration may report highly unreliable metrics."}
                      {lr === "0.0001" && "The learning rate was too low. The model did not fully converge. Future diagnoses using this configuration will note underfitting."}
                      {lr === "0.01" && "The learning rate was fast, yielding decent results but minor validation overfitting. Future diagnoses are operational but sub-optimal."}
                      {lr === "0.001" && "Perfect fit achieved! Balanced learning rate and adaptive Adam momentum converged beautifully. Future diagnoses are highly accurate and generalizable!"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
