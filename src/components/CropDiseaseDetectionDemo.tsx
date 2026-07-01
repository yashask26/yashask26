import React, { useState } from "react";
import { Leaf, Upload, AlertTriangle, ShieldCheck, HelpCircle, Activity, ChevronRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CROP_SAMPLES, CropSample } from "../data";

export default function CropDiseaseDetectionDemo() {
  const [selectedSample, setSelectedSample] = useState<CropSample | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisLogs, setAnalysisLogs] = useState<string[]>([]);
  const [result, setResult] = useState<CropSample | null>(null);

  const startAnalysis = (sample: CropSample) => {
    setSelectedSample(sample);
    setIsAnalyzing(true);
    setResult(null);
    setAnalysisLogs([]);

    const logs = [
      "[INFO] Loading CNN tensor pipeline...",
      "[INFO] Resizing input image to 224x224x3...",
      "[MODEL] Applying convolutional layers & pooling layers...",
      "[MODEL] Extracting dense feature embeddings...",
      "[CLASSIFIER] Evaluating softmax activation probabilities...",
      "[SUCCESS] Inference complete. Resolving agricultural taxonomy..."
    ];

    // Stagger the logs to look like real-time CNN processing!
    logs.forEach((log, index) => {
      setTimeout(() => {
        setAnalysisLogs((prev) => [...prev, log]);
      }, (index + 1) * 350);
    });

    // Complete the analysis
    setTimeout(() => {
      setResult(sample);
      setIsAnalyzing(false);
    }, logs.length * 350 + 200);
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

      {/* Main Grid */}
      <div id="crop_grid" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Select Leaf and Scanning Bay */}
        <div className="lg:col-span-6 space-y-5">
          <div className="space-y-2">
            <h4 className="font-sans font-semibold text-white text-xs uppercase tracking-wider">Select a Specimen to Diagnose</h4>
            
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
                      <span className="text-[10px] text-slate-500 font-mono mt-1">Accuracy: {result.confidence}%</span>
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
              CNN Model trained manually in TensorFlow • Accuracy ~93.8%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
