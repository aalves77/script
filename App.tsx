
import React, { useState, useEffect, useCallback } from 'react';
import { Layout } from './components/Layout';
import { Terminal } from './components/Terminal';
import { SensitivitySettings, DeviceStats, StrategyResponse } from './types';
import { getAIOptimization } from './services/geminiService';

const App: React.FC = () => {
  const [logs, setLogs] = useState<string[]>(['Initializing Nova Pro core...', 'Checking hardware compatibility...', 'Secure tunnel established.']);
  const [isActivating, setIsActivating] = useState(false);
  const [aiResponse, setAiResponse] = useState<StrategyResponse | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);

  const [sens, setSens] = useState<SensitivitySettings>({
    general: 95,
    redDot: 85,
    scope2x: 75,
    scope4x: 70,
    sniper: 50,
    lookFree: 100
  });

  const [stats, setStats] = useState<DeviceStats>({
    ping: 18,
    fps: 60,
    cpuTemp: 38,
    ramUsage: '2.4GB / 8GB'
  });

  const [activeFeatures, setActiveFeatures] = useState({
    autoHeadshot: false,
    noRecoil: false,
    antennaView: false,
    speedRun: false
  });

  const addLog = useCallback((msg: string) => {
    setLogs(prev => [...prev.slice(-49), msg]);
  }, []);

  const simulateActivation = () => {
    setIsActivating(true);
    addLog('> Initiating injection sequence...');
    setTimeout(() => addLog('> Bypassing Vanguard...'), 1000);
    setTimeout(() => addLog('> Memory patching active memory...'), 2000);
    setTimeout(() => {
      addLog('> ALL SYSTEMS OPTIMIZED.');
      setIsActivating(false);
    }, 4000);
  };

  const handleAIAdvice = async () => {
    setLoadingAI(true);
    addLog('> Querying Neural Network for optimal strategies...');
    const result = await getAIOptimization('OnePlus 9 Pro - Snapdragon 888', 'Rusher / Close Range');
    setAiResponse(result);
    setLoadingAI(false);
    addLog('> Strategy report received from AI.');
  };

  // Mock real-time stats updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        ping: Math.floor(Math.random() * (45 - 15) + 15),
        fps: Math.floor(Math.random() * (62 - 58) + 58),
        cpuTemp: Math.floor(Math.random() * (42 - 37) + 37)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleFeature = (feature: keyof typeof activeFeatures) => {
    setActiveFeatures(prev => ({ ...prev, [feature]: !prev[feature] }));
    addLog(`> Feature [${feature}] toggled ${!activeFeatures[feature] ? 'ON' : 'OFF'}`);
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Sensitivity & Stats */}
        <div className="lg:col-span-4 space-y-6">
          <section className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center">
               <span className="w-1 h-4 bg-red-600 mr-3"></span>
               SENSITIVITY ENGINE
            </h2>
            <div className="space-y-4">
              {Object.entries(sens).map(([key, value]) => (
                // Fix: Wrap key in String() to avoid implicit symbol-to-string conversion error on line 76
                <div key={String(key)} className="space-y-1">
                  <div className="flex justify-between text-[10px] uppercase font-bold text-zinc-400 mono-font tracking-widest">
                    <span>{String(key).replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="text-red-500">{value}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={value}
                    onChange={(e) => setSens(prev => ({ ...prev, [key]: parseInt(e.target.value) }))}
                    className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-red-600"
                  />
                </div>
              ))}
            </div>
            <button 
              onClick={() => addLog('> Sensitivity configurations saved to cloud.')}
              className="w-full mt-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-[10px] uppercase tracking-widest rounded transition-all mono-font"
            >
              Apply Config
            </button>
          </section>

          <section className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 backdrop-blur-sm">
             <h2 className="text-lg font-bold text-white mb-6 flex items-center">
               <span className="w-1 h-4 bg-red-600 mr-3"></span>
               DEVICE VITALS
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/50 p-4 border border-zinc-800/50 rounded-lg">
                <p className="text-[10px] uppercase text-zinc-500 mono-font mb-1">Latency</p>
                <p className={`text-xl font-bold ${stats.ping < 30 ? 'text-green-500' : 'text-orange-500'}`}>{stats.ping}ms</p>
              </div>
              <div className="bg-black/50 p-4 border border-zinc-800/50 rounded-lg">
                <p className="text-[10px] uppercase text-zinc-500 mono-font mb-1">Frame Rate</p>
                <p className="text-xl font-bold text-white">{stats.fps} FPS</p>
              </div>
              <div className="bg-black/50 p-4 border border-zinc-800/50 rounded-lg">
                <p className="text-[10px] uppercase text-zinc-500 mono-font mb-1">CPU Temp</p>
                <p className="text-xl font-bold text-blue-400">{stats.cpuTemp}°C</p>
              </div>
              <div className="bg-black/50 p-4 border border-zinc-800/50 rounded-lg">
                <p className="text-[10px] uppercase text-zinc-500 mono-font mb-1">Memory Usage</p>
                <p className="text-[12px] font-bold text-zinc-300 mt-1">{stats.ramUsage}</p>
              </div>
            </div>
          </section>
        </div>

        {/* Center Column: Console & Features */}
        <div className="lg:col-span-5 space-y-6">
          <Terminal logs={logs} />
          
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(activeFeatures).map((feature) => (
              <button
                key={feature}
                onClick={() => toggleFeature(feature as keyof typeof activeFeatures)}
                className={`relative overflow-hidden group p-4 border rounded-xl flex items-center justify-between transition-all duration-300 ${
                  activeFeatures[feature as keyof typeof activeFeatures]
                    ? 'border-red-600/50 bg-red-900/10 shadow-[0_0_15px_rgba(239,68,68,0.1)]'
                    : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
                }`}
              >
                <span className={`text-[10px] uppercase font-bold tracking-widest ${
                  activeFeatures[feature as keyof typeof activeFeatures] ? 'text-red-500' : 'text-zinc-500'
                }`}>
                  {feature.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <div className={`w-3 h-3 rounded-full transition-colors ${
                  activeFeatures[feature as keyof typeof activeFeatures] ? 'bg-red-600 animate-pulse' : 'bg-zinc-800'
                }`}></div>
              </button>
            ))}
          </div>

          <button 
            disabled={isActivating}
            onClick={simulateActivation}
            className={`w-full py-5 rounded-xl font-black text-xl tracking-tighter uppercase transition-all flex items-center justify-center gap-3 relative overflow-hidden group ${
              isActivating 
                ? 'bg-zinc-800 cursor-not-allowed text-zinc-500' 
                : 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/20'
            }`}
          >
            {isActivating ? (
              <>
                <div className="w-5 h-5 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin"></div>
                Initializing...
              </>
            ) : (
              <>
                Inject Script
                <span className="text-xs font-normal opacity-50 tracking-widest animate-pulse">[F10]</span>
              </>
            )}
            {!isActivating && (
               <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>
            )}
          </button>
        </div>

        {/* Right Column: AI & Intelligence */}
        <div className="lg:col-span-3 space-y-6">
           <section className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 backdrop-blur-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 p-2 opacity-10">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" />
                </svg>
             </div>
             <h2 className="text-lg font-bold text-white mb-6 flex items-center">
               <span className="w-1 h-4 bg-red-600 mr-3"></span>
               AI BATTLE INTELLIGENCE
            </h2>
            
            <p className="text-[11px] text-zinc-400 mono-font mb-4 leading-relaxed">
              Our neural network analyzes your current stats to provide game-breaking optimization.
            </p>

            <button 
              onClick={handleAIAdvice}
              disabled={loadingAI}
              className={`w-full py-3 mb-4 rounded border flex items-center justify-center gap-2 transition-all ${
                loadingAI 
                ? 'border-zinc-800 text-zinc-600' 
                : 'border-red-900/50 bg-red-950/20 text-red-500 hover:bg-red-900/30'
              } text-[10px] font-bold uppercase tracking-widest`}
            >
              {loadingAI ? 'Scanning Meta...' : 'Generate Pro Strategy'}
            </button>

            {aiResponse && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-700">
                <div className="p-4 bg-black/40 border border-zinc-800 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                     <span className="text-[10px] text-zinc-500 mono-font font-bold">Recommended Config</span>
                     <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                       aiResponse.dangerLevel === 'Low' ? 'bg-green-900/30 text-green-500' :
                       aiResponse.dangerLevel === 'Medium' ? 'bg-orange-900/30 text-orange-500' : 'bg-red-900/30 text-red-500'
                     }`}>Risk: {aiResponse.dangerLevel}</span>
                  </div>
                  <p className="text-[12px] font-bold text-white mono-font">{aiResponse.recommendedConfig}</p>
                </div>
                <div className="p-4 bg-black/40 border border-zinc-800 rounded-lg">
                  <span className="text-[10px] text-zinc-500 mono-font font-bold block mb-2">Strategy Advice</span>
                  <p className="text-[11px] text-zinc-300 leading-relaxed italic">"{aiResponse.advice}"</p>
                </div>
              </div>
            )}
            
            {!aiResponse && !loadingAI && (
              <div className="h-32 flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 rounded-xl opacity-30">
                 <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">No Data Available</p>
              </div>
            )}
           </section>

           <section className="bg-red-600/5 border border-red-900/20 rounded-xl p-6">
              <h3 className="text-red-500 font-black text-xs uppercase tracking-widest mb-4">Live Threat Status</h3>
              <div className="space-y-3">
                 <div className="flex items-center justify-between">
                    <span className="text-[10px] text-zinc-400 uppercase mono-font">Anti-Ban Bypass</span>
                    <span className="text-[10px] text-green-500 font-black uppercase">Active</span>
                 </div>
                 <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full w-[98%]"></div>
                 </div>
                 <div className="flex items-center justify-between">
                    <span className="text-[10px] text-zinc-400 uppercase mono-font">Script Stealth</span>
                    <span className="text-[10px] text-green-500 font-black uppercase">Max</span>
                 </div>
                 <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full w-[100%]"></div>
                 </div>
              </div>
           </section>
        </div>
      </div>
    </Layout>
  );
};

export default App;
