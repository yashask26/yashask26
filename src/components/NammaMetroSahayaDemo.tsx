import React, { useState } from "react";
import { 
  Compass, MapPin, Navigation, Info, ArrowRight, Train, Check, 
  Smartphone, Battery, Wifi, Signal, Sparkles, MessageSquare 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { METRO_STATIONS, METRO_ROUTES_DB, MetroStation } from "../data";

export default function NammaMetroSahayaDemo() {
  const [startStation, setStartStation] = useState<string>("jayanagar");
  const [endStation, setEndStation] = useState<string>("indiranagar");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [currentRoute, setCurrentRoute] = useState<any | null>(null);

  const handleGenerateRoute = () => {
    setIsGenerating(true);
    setCurrentRoute(null);

    setTimeout(() => {
      const routeKey = `${startStation}-${endStation}`;
      const revRouteKey = `${endStation}-${startStation}`;
      
      let routeData = METRO_ROUTES_DB[routeKey] || METRO_ROUTES_DB[revRouteKey];
      
      if (!routeData) {
        // Generate a standard procedural route
        const start = METRO_STATIONS.find(s => s.id === startStation);
        const end = METRO_STATIONS.find(s => s.id === endStation);
        const needsInterchange = start?.line !== end?.line && start?.line !== "Interchange" && end?.line !== "Interchange";
        
        routeData = {
          duration: needsInterchange ? 35 : 20,
          fare: needsInterchange ? 50 : 30,
          stationsCount: needsInterchange ? 12 : 6,
          interchangeNeeded: needsInterchange,
          instructions: needsInterchange ? [
            `Board train at ${start?.name} Station (${start?.line} Line).`,
            "De-board at Majestic (Kempegowda) Interchange.",
            "Change platforms following overhead guide markers.",
            `Board train heading towards ${end?.name} (${end?.line} Line).`,
            `Arrive at ${end?.name} Station. Exit via local guidance signs.`
          ] : [
            `Board train at ${start?.name} Station (${start?.line} Line).`,
            `Travel directly to ${end?.name} Station.`,
            `Arrive at ${end?.name} Station. Exit via local guidance signs.`
          ],
          chatResponse: `Hello! To go from ${start?.name} to ${end?.name}: Board the train at ${start?.name}. ${
            needsInterchange 
              ? `Since they are on different lines, you will need to change trains at Majestic (Kempegowda) station. Switch from the ${start?.line} Line to the ${end?.line} Line.` 
              : `This is a direct route on the ${start?.line} Line, so no interchanges are required.`
          } Your trip will take about ${needsInterchange ? "35" : "20"} minutes and costs ₹${needsInterchange ? "50" : "30"}.`
        };
      }

      setCurrentRoute(routeData);
      setIsGenerating(false);
    }, 1200);
  };

  const getStationColor = (line: string) => {
    switch (line) {
      case "Purple": return "bg-purple-500 shadow-purple-500/20";
      case "Green": return "bg-emerald-500 shadow-emerald-500/20";
      default: return "bg-blue-500 shadow-blue-500/20";
    }
  };

  return (
    <div id="metro_sahaya_demo_wrapper" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-3xl shadow-xl">
      
      {/* Description Panel */}
      <div id="metro_description" className="lg:col-span-5 space-y-5">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-blue-400 font-mono text-xs">
          <Smartphone className="w-3.5 h-3.5" />
          Live Android Mockup
        </div>
        <h3 className="font-sans font-bold text-white text-2xl tracking-tight">
          Namma Metro Sahaya
        </h3>
        <p className="font-sans text-sm text-slate-300 leading-relaxed">
          This is an interactive simulation of Yashas K's internship project at <strong>MindMatrix</strong>. It represents a <strong>GenAI-powered Android App</strong> designed to streamline transit navigation in Bangalore.
        </p>
        <p className="font-sans text-sm text-slate-400 leading-relaxed">
          The app parses user origin/destination requests and leverages an embedded LLM to render bespoke exit/platform advice, particularly tailored for rural citizens who may feel intimidated by modern metro layouts.
        </p>

        <div className="space-y-3 pt-2">
          <h4 className="font-sans font-semibold text-white text-xs uppercase tracking-wider">Key Project Capabilities</h4>
          <ul className="space-y-2 font-sans text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-blue-400" />
              Dynamic Station Interchanging Advice
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-blue-400" />
              Fare, Duration, & Route Calculation
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-blue-400" />
              Generative AI-driven Exit/Platform Guidance
            </li>
          </ul>
        </div>
      </div>

      {/* Simulator Panel (Smartphone Mockup) */}
      <div id="phone_mockup" className="lg:col-span-7 flex justify-center">
        <div className="w-[330px] h-[610px] bg-white/5 backdrop-blur-2xl border-4 border-white/10 rounded-[42px] shadow-2xl relative overflow-hidden flex flex-col ring-8 ring-white/5">
          
          {/* Speaker, Notch, and Status Bar */}
          <div className="absolute top-0 inset-x-0 h-6 bg-transparent flex justify-between px-6 items-center text-[10px] text-slate-300 font-mono z-50">
            <span>9:30 AM</span>
            {/* Camera Notch */}
            <div className="w-20 h-4 bg-[#0a0a14]/60 backdrop-blur-md rounded-b-xl absolute top-0 left-1/2 -translate-x-1/2"></div>
            <div className="flex items-center gap-1.5">
              <Wifi className="w-3 h-3" />
              <Signal className="w-3 h-3" />
              <Battery className="w-3 h-3" />
            </div>
          </div>

          {/* App Window */}
          <div className="flex-1 mt-6 flex flex-col bg-[#0a0a14]/40 text-white overflow-hidden relative">
            
            {/* App Header */}
            <div className="px-4 py-3 border-b border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-500/20 text-blue-400 rounded-lg">
                  <Train className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-xs tracking-wide">Namma Metro Sahaya</h4>
                  <p className="font-sans text-[8px] text-blue-400 font-medium">BMRCL Companion v2.0</p>
                </div>
              </div>
              <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            </div>

            {/* App Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none pb-12">
              
              {/* Trip Selection Card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-1.5 text-[10px] text-blue-400 font-mono font-semibold uppercase">
                  <Navigation className="w-3 h-3" />
                  Route Planner
                </div>
                
                <div className="space-y-2">
                  {/* Start Station */}
                  <div className="space-y-1">
                    <label className="block text-[9px] text-slate-400 font-medium">Starting From:</label>
                    <select 
                      value={startStation} 
                      onChange={(e) => setStartStation(e.target.value)}
                      className="w-full bg-[#0a0a14]/60 border border-white/10 focus:border-blue-500 rounded-xl py-1.5 px-2 text-xs text-white focus:outline-none transition-colors"
                    >
                      {METRO_STATIONS.map((station) => (
                        <option key={station.id} value={station.id} disabled={station.id === endStation}>
                          {station.name} ({station.line})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* End Station */}
                  <div className="space-y-1">
                    <label className="block text-[9px] text-slate-400 font-medium">Going To:</label>
                    <select 
                      value={endStation} 
                      onChange={(e) => setEndStation(e.target.value)}
                      className="w-full bg-[#0a0a14]/60 border border-white/10 focus:border-blue-500 rounded-xl py-1.5 px-2 text-xs text-white focus:outline-none transition-colors"
                    >
                      {METRO_STATIONS.map((station) => (
                        <option key={station.id} value={station.id} disabled={station.id === startStation}>
                          {station.name} ({station.line})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button 
                  onClick={handleGenerateRoute}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-tr from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 py-2 rounded-xl text-xs font-semibold text-white shadow-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {isGenerating ? "Consulting GenAI Assistant..." : "Generate Guidance"}
                </button>
              </div>

              {/* Progress Sweep */}
              <AnimatePresence>
                {isGenerating && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-8 space-y-3"
                  >
                    <div className="w-10 h-10 rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin"></div>
                    <div className="text-center">
                      <p className="text-[10px] font-mono text-slate-300">Initializing Gemini model...</p>
                      <p className="text-[8px] text-slate-500">Mapping Bangalore Metro topology</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Route Response Display */}
              <AnimatePresence>
                {currentRoute && !isGenerating && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    {/* Metrics Dashboard */}
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl">
                        <div className="text-[8px] text-slate-400 font-medium uppercase">Est. Time</div>
                        <div className="text-xs font-bold text-blue-400">{currentRoute.duration}m</div>
                      </div>
                      <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl">
                        <div className="text-[8px] text-slate-400 font-medium uppercase">Fare</div>
                        <div className="text-xs font-bold text-blue-400">₹{currentRoute.fare}</div>
                      </div>
                      <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl">
                        <div className="text-[8px] text-slate-400 font-medium uppercase">Stops</div>
                        <div className="text-xs font-bold text-blue-400">{currentRoute.stationsCount}</div>
                      </div>
                    </div>

                    {/* GenAI Chat Box */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 space-y-2">
                      <div className="flex items-center gap-1.5 text-[9px] text-blue-400 font-semibold">
                        <MessageSquare className="w-3 h-3" />
                        GenAI Assistant Response
                      </div>
                      <p className="text-[10px] text-slate-200 leading-relaxed font-sans italic">
                        "{currentRoute.chatResponse}"
                      </p>
                    </div>

                    {/* Step-by-Step Instructions */}
                    <div className="space-y-2">
                      <h5 className="text-[9px] font-mono font-semibold uppercase tracking-wider text-slate-400">Step-by-Step Pathway</h5>
                      <div className="space-y-1.5 border-l border-white/10 pl-3 ml-1">
                        {currentRoute.instructions.map((step: string, index: number) => (
                          <div key={index} className="relative text-[10px] text-slate-300 leading-snug">
                            <span className="absolute -left-[16.5px] top-1 w-2.5 h-2.5 rounded-full border border-slate-900 bg-blue-500 flex items-center justify-center text-[6px] text-white"></span>
                            {step}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Inactive State Display */}
              {!currentRoute && !isGenerating && (
                <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500 space-y-3">
                  <Compass className="w-10 h-10 text-slate-700 animate-pulse" />
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-slate-400">Ready to Navigate</p>
                    <p className="text-[9px] text-slate-500 max-w-[200px] mx-auto">Select your stations and tap Generate Route to query the simulated assistant.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Pill Indicator */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/10 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
