import React from 'react';
import { ActiveTab, Cylinder, SafetyLogEvent, SystemStatus } from '../types';
import { ASSET_IMAGES, formatUptime } from '../data/mockData';
import { 
  ShieldCheck, 
  Bell, 
  Flame, 
  Thermometer, 
  Power, 
  Home, 
  Settings2, 
  BarChart2, 
  History, 
  AlertTriangle, 
  Fuel, 
  TrendingDown, 
  CheckCircle2, 
  RotateCcw,
  Sparkles,
  ArrowDown
} from 'lucide-react';

interface MobileDeviceFrameProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  systemStatus: SystemStatus;
  lpgPpm: number;
  temperature: number;
  humidity: number;
  flameDetected: boolean;
  cylinders: Cylinder[];
  onToggleCylinder: (id: string) => void;
  onEmergencyShutdown: () => void;
  onShutAllValves: () => void;
  logs: SafetyLogEvent[];
}

export const MobileDeviceFrame: React.FC<MobileDeviceFrameProps> = ({
  activeTab,
  setActiveTab,
  systemStatus,
  lpgPpm,
  temperature,
  humidity,
  flameDetected,
  cylinders,
  onToggleCylinder,
  onEmergencyShutdown,
  onShutAllValves,
  logs,
}) => {
  const isSafe = systemStatus === 'SAFE';
  const isEmergency = systemStatus === 'CRITICAL' || systemStatus === 'EMERGENCY_SHUTDOWN';

  return (
    <div className="flex flex-col items-center justify-center py-6">
      {/* Device Bezel / Wrapper */}
      <div className="w-full max-w-[390px] min-h-[780px] bg-[#0A0B10] border-[8px] border-slate-800 rounded-[48px] shadow-2xl overflow-hidden flex flex-col relative ring-1 ring-white/10">
        
        {/* Dynamic Island / Speaker notch */}
        <div className="w-full pt-3 pb-1 flex justify-center bg-[#0A0B10] z-50">
          <div className="w-24 h-4 bg-black rounded-full flex items-center justify-end px-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500/80" />
          </div>
        </div>

        {/* Mobile App Header (Safety Guard) */}
        <header className="px-5 py-3.5 flex justify-between items-center bg-[#0A0B10]/90 border-b border-white/5 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="text-indigo-400">
              <ShieldCheck className="w-6 h-6 stroke-[2]" />
            </div>
            <h1 className="font-bold text-lg text-white tracking-tight font-sans">
              {activeTab === 'control' ? 'Valve Control' : 'Safety Guard'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Gaston Logo avatar */}
            <div className="w-7 h-7 rounded-full overflow-hidden border border-white/20 bg-[#0A0B10] p-0.5">
              <img 
                src={ASSET_IMAGES.GastonBadgeLogo} 
                alt="Gaston Logo" 
                className="w-full h-full object-contain" 
              />
            </div>
            <button className="text-slate-400 hover:text-white">
              <Bell className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Mobile Main Screen Body based on activeTab */}
        <div className="flex-1 overflow-y-auto px-5 py-4 pb-24 space-y-5">
          {/* TAB 1: HOME SCREEN */}
          {activeTab === 'dashboard' && (
            <>
              {/* Central Status Glow Ring */}
              <div className="flex flex-col items-center justify-center pt-4 pb-2">
                <div className={`relative w-44 h-44 rounded-3xl border-2 flex items-center justify-center transition-all duration-300 ${
                  isEmergency
                    ? 'border-rose-500/40 bg-rose-500/10 glow-danger'
                    : 'border-emerald-500/30 bg-white/5 glow-safe'
                }`}>
                  <div className="flex flex-col items-center justify-center text-center p-4">
                    <ShieldCheck className={`w-12 h-12 mb-1.5 ${isEmergency ? 'text-rose-400 animate-pulse' : 'text-emerald-400'}`} />
                    <span className={`text-3xl font-bold font-sans tracking-wide ${isEmergency ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {isEmergency ? 'DANGER' : 'SAFE'}
                    </span>
                    <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mt-1">
                      SYSTEM STATUS
                    </span>
                  </div>
                </div>
                <p className="text-slate-400 font-mono text-[10px] uppercase tracking-widest mt-4">
                  LAST UPDATED: JUST NOW
                </p>
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 gap-3.5">
                {/* LPG Level */}
                <div className="glass-card rounded-3xl p-4 flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                      LPG LEVEL
                    </span>
                    <Fuel className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-white">{lpgPpm}</span>
                      <span className="text-xs text-slate-400 font-mono">ppm</span>
                    </div>
                    <div className="mt-2 w-full bg-[#07080C] rounded-full h-1.5 overflow-hidden border border-white/5">
                      <div 
                        className="bg-indigo-500 h-full rounded-full" 
                        style={{ width: `${Math.min(100, (lpgPpm / 50) * 100)}%` }} 
                      />
                    </div>
                  </div>
                </div>

                {/* Temperature */}
                <div className="glass-card rounded-3xl p-4 flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                      TEMPERATURE
                    </span>
                    <Thermometer className="w-4 h-4 text-rose-400" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-white">{temperature.toFixed(1)}</span>
                      <span className="text-xs text-slate-400 font-mono">°C</span>
                    </div>
                    <div className="mt-1.5 text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
                      <ArrowDown className="w-3 h-3" />
                      <span>Stable</span>
                    </div>
                  </div>
                </div>

                {/* Flame Status */}
                <div className="glass-card rounded-3xl p-4 col-span-2 flex justify-between items-center">
                  <div>
                    <span className="font-mono text-[10px] text-slate-400 uppercase block mb-1">
                      FLAME STATUS
                    </span>
                    <span className={`text-xl font-bold tracking-tight ${
                      flameDetected ? 'text-rose-400' : 'text-emerald-400'
                    }`}>
                      {flameDetected ? 'FIRE DETECTED' : 'CLEAR'}
                    </span>
                  </div>
                  <div className={`h-11 w-11 rounded-2xl flex items-center justify-center ${
                    flameDetected ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    <Flame className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Emergency Shutdown Button */}
              <div className="pt-2">
                <button
                  onClick={onEmergencyShutdown}
                  className="w-full py-4 bg-rose-500 hover:bg-rose-600 text-white font-bold text-base rounded-full flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-rose-500/30 active:scale-95"
                >
                  <Power className="w-5 h-5" />
                  <span>EMERGENCY SHUTDOWN</span>
                </button>
                <p className="text-center font-mono text-[10px] text-slate-400 mt-2 uppercase opacity-80">
                  TAP TO ENGAGE SAFETY PROTOCOL
                </p>
              </div>
            </>
          )}

          {/* TAB 2: VALVE CONTROL */}
          {activeTab === 'control' && (
            <div className="space-y-4">
              <div className="flex justify-end">
                <button
                  onClick={onShutAllValves}
                  className="border border-rose-500/40 text-rose-300 font-mono text-[11px] px-4 py-2 rounded-full hover:bg-rose-500/20 flex items-center gap-1.5 transition-colors"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>SHUT ALL VALVES</span>
                </button>
              </div>

              {cylinders.map((cyl) => {
                const isOnline = cyl.status === 'ONLINE' && cyl.actuatorActive;
                return (
                  <div
                    key={cyl.id}
                    className={`glass-card rounded-3xl p-4 flex flex-col gap-3 relative overflow-hidden transition-all ${
                      isOnline ? 'border-indigo-500/30 glow-active' : 'opacity-85'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-2.5 h-2.5 rounded-full ${
                          isOnline ? 'bg-emerald-400 status-led-online' : 'bg-slate-500'
                        }`} />
                        <span className="font-bold text-sm text-white">{cyl.label}</span>
                      </div>
                      <span className={`font-mono text-[10px] font-bold ${
                        isOnline ? 'text-emerald-400' : 'text-slate-400'
                      }`}>
                        {isOnline ? 'ONLINE' : 'OFFLINE'}
                      </span>
                    </div>

                    <div className="flex justify-between items-end pt-1">
                      <div>
                        <span className="font-mono text-[9px] text-slate-400 uppercase block">
                          USAGE DURATION
                        </span>
                        <span className={`text-xl font-bold font-mono ${
                          isOnline ? 'text-indigo-300' : 'text-slate-400'
                        }`}>
                          {formatUptime(cyl.uptimeSeconds)}
                        </span>
                      </div>

                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={cyl.actuatorActive}
                          onChange={() => onToggleCylinder(cyl.id)}
                          className="sr-only peer"
                        />
                        <div className="w-12 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600" />
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 3 & 4: ANALYTICS & LOGS */}
          {(activeTab === 'analytics' || activeTab === 'logs') && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-white">Analytics & Logs</h2>
                <p className="text-xs text-slate-400">System performance and event history.</p>
              </div>

              {/* 24h Temp Trend SVG */}
              <div className="glass-card rounded-3xl p-4 space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-400 uppercase text-[10px]">24H TEMPERATURE TREND</span>
                  <span className="text-emerald-400 flex items-center gap-1 text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Optimal
                  </span>
                </div>
                <div className="w-full h-24 relative">
                  <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                    <path
                      d="M0,70 Q50,50 100,75 T200,40 T300,30"
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="2"
                    />
                    <circle cx="300" cy="30" r="3" fill="#6366f1" />
                  </svg>
                </div>
                <div className="flex justify-between text-[9px] font-mono text-slate-400">
                  <span>00:00</span>
                  <span>06:00</span>
                  <span>12:00</span>
                  <span>18:00</span>
                  <span>Now</span>
                </div>
              </div>

              {/* Cylinder status */}
              <div className="space-y-2">
                <span className="font-mono text-[10px] text-slate-400 uppercase pl-1">
                  CYLINDER STATUS
                </span>
                <div className="glass-card rounded-3xl p-4 space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-200">Main Line Alpha</span>
                      <span className="font-mono font-bold text-indigo-400">78%</span>
                    </div>
                    <div className="w-full bg-[#07080C] h-1.5 rounded-full overflow-hidden border border-white/5">
                      <div className="bg-indigo-500 h-full rounded-full" style={{ width: '78%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-200">Reserve Beta</span>
                      <span className="font-mono font-bold text-emerald-400">92%</span>
                    </div>
                    <div className="w-full bg-[#07080C] h-1.5 rounded-full overflow-hidden border border-white/5">
                      <div className="bg-emerald-400 h-full rounded-full" style={{ width: '92%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-rose-400">Auxiliary Gamma</span>
                      <span className="font-mono font-bold text-rose-400">15%</span>
                    </div>
                    <div className="w-full bg-[#07080C] h-1.5 rounded-full overflow-hidden border border-white/5">
                      <div className="bg-rose-500 h-full rounded-full" style={{ width: '15%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Events List */}
              <div className="space-y-2">
                <span className="font-mono text-[10px] text-slate-400 uppercase pl-1">
                  RECENT SAFETY EVENTS
                </span>
                <div className="space-y-2">
                  {logs.slice(0, 3).map((log) => (
                    <div key={log.id} className="glass-card rounded-2xl p-3 flex items-start gap-2.5">
                      <div className="mt-0.5">
                        {log.badgeType === 'danger' ? (
                          <Flame className="w-4 h-4 text-rose-400" />
                        ) : log.badgeType === 'success' ? (
                          <RotateCcw className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between text-xs mb-0.5">
                          <span className="font-bold text-white truncate">{log.title}</span>
                          <span className="font-mono text-[10px] text-slate-400 shrink-0">{log.relativeTime}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 line-clamp-1">{log.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Rounded Bottom Tab Bar */}
        <nav className="absolute bottom-0 left-0 w-full bg-[#0A0B10]/95 backdrop-blur-xl border-t border-white/10 rounded-t-3xl py-2 px-3 flex justify-around items-center z-40">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center justify-center p-1.5 rounded-full transition-all ${
              activeTab === 'dashboard'
                ? 'bg-indigo-600 text-white px-4 py-1 font-bold'
                : 'text-slate-400'
            }`}
          >
            <Home className="w-4 h-4" />
            <span className="font-mono text-[9px]">Home</span>
          </button>

          <button
            onClick={() => setActiveTab('control')}
            className={`flex flex-col items-center justify-center p-1.5 rounded-full transition-all ${
              activeTab === 'control'
                ? 'bg-indigo-600 text-white px-4 py-1 font-bold'
                : 'text-slate-400'
            }`}
          >
            <Settings2 className="w-4 h-4" />
            <span className="font-mono text-[9px]">Control</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex flex-col items-center justify-center p-1.5 rounded-full transition-all ${
              activeTab === 'analytics'
                ? 'bg-indigo-600 text-white px-4 py-1 font-bold'
                : 'text-slate-400'
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            <span className="font-mono text-[9px]">Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('logs')}
            className={`flex flex-col items-center justify-center p-1.5 rounded-full transition-all ${
              activeTab === 'logs'
                ? 'bg-indigo-600 text-white px-4 py-1 font-bold'
                : 'text-slate-400'
            }`}
          >
            <History className="w-4 h-4" />
            <span className="font-mono text-[9px]">Logs</span>
          </button>
        </nav>
      </div>
    </div>
  );
};
