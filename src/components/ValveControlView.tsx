import React from 'react';
import { Cylinder, SystemStatus } from '../types';
import { formatUptime } from '../data/mockData';
import { 
  AlertTriangle, 
  Power, 
  Fuel, 
  Gauge, 
  CheckCircle2, 
  ShieldAlert, 
  RotateCw,
  Sparkles,
  Zap
} from 'lucide-react';

interface ValveControlViewProps {
  cylinders: Cylinder[];
  onToggleCylinder: (id: string) => void;
  onShutAllValves: () => void;
  onOpenAllValves: () => void;
  systemStatus: SystemStatus;
}

export const ValveControlView: React.FC<ValveControlViewProps> = ({
  cylinders,
  onToggleCylinder,
  onShutAllValves,
  onOpenAllValves,
  systemStatus,
}) => {
  const allShut = cylinders.every((c) => !c.actuatorActive);
  const anyActive = cylinders.some((c) => c.actuatorActive);

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header Info & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Valve Control
          </h1>
          <p className="font-mono text-xs text-slate-400 mt-1">
            Individual solenoid actuators & manifold line isolation
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {allShut ? (
            <button
              id="btn-open-primary-valve"
              onClick={onOpenAllValves}
              className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs px-5 py-2.5 rounded-full hover:bg-emerald-500/30 active:scale-95 transition-all flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>ENABLE PRIMARY VALVES</span>
            </button>
          ) : (
            <button
              id="btn-shut-all-valves"
              onClick={onShutAllValves}
              className="bg-rose-500/20 border border-rose-500/40 text-rose-300 font-mono text-xs px-5 py-2.5 rounded-full hover:bg-rose-500/30 active:scale-95 transition-all flex items-center gap-2 shadow-lg shadow-rose-500/10"
            >
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span className="font-bold tracking-wider">SHUT ALL VALVES</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Cylinder Valve Cards List */}
      <div className="space-y-4">
        {cylinders.map((cyl) => {
          const isOnline = cyl.status === 'ONLINE' && cyl.actuatorActive;
          return (
            <div
              key={cyl.id}
              id={`valve-card-${cyl.id}`}
              className={`glass-card rounded-3xl p-6 sm:p-7 flex flex-col gap-4 relative overflow-hidden transition-all duration-300 ${
                isOnline
                  ? 'glow-active border-indigo-500/40 bg-indigo-500/[0.05]'
                  : 'opacity-85'
              }`}
            >
              {/* Decorative radial blur in top-right when active */}
              {isOnline && (
                <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
              )}

              {/* Card Header: LED Indicator, Name, Status Badge */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                      isOnline
                        ? 'bg-emerald-400 status-led-online animate-pulse'
                        : 'bg-slate-500 status-led-offline'
                    }`}
                  />
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold font-sans text-white">
                      {cyl.label}
                    </h2>
                    <span className="text-xs text-slate-400 font-mono">
                      {cyl.name}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`font-mono text-xs px-3.5 py-1 rounded-full font-bold tracking-wider ${
                      isOnline
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-white/5 text-slate-400 border border-white/10'
                    }`}
                  >
                    {isOnline ? 'ONLINE' : 'OFFLINE'}
                  </span>
                </div>
              </div>

              {/* Telemetry Gauge and Valve Status */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 border-t border-white/5">
                {/* Usage Duration */}
                <div>
                  <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider block mb-1">
                    USAGE DURATION
                  </span>
                  <span
                    className={`text-2xl sm:text-3xl font-bold font-mono tracking-tight ${
                      isOnline ? 'text-indigo-300' : 'text-slate-400'
                    }`}
                  >
                    {formatUptime(cyl.uptimeSeconds)}
                  </span>
                </div>

                {/* Line Pressure */}
                <div>
                  <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider block mb-1">
                    PRESSURE
                  </span>
                  <span className="text-xl sm:text-2xl font-bold font-mono text-white">
                    {isOnline ? cyl.pressureBar.toFixed(1) : '0.0'}{' '}
                    <span className="text-xs text-slate-400 font-sans font-normal">bar</span>
                  </span>
                </div>

                {/* Gas Tank Level */}
                <div className="col-span-2 sm:col-span-1">
                  <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider block mb-1">
                    TANK LEVEL
                  </span>
                  <div className="flex items-center gap-2.5">
                    <div className="flex-grow bg-[#07080C] h-2 rounded-full overflow-hidden border border-white/5">
                      <div
                        className={`h-full rounded-full transition-all ${
                          cyl.gasRemainingPct < 20
                            ? 'bg-rose-500'
                            : cyl.gasRemainingPct < 50
                            ? 'bg-indigo-400'
                            : 'bg-emerald-400'
                        }`}
                        style={{ width: `${cyl.gasRemainingPct}%` }}
                      />
                    </div>
                    <span className="font-mono text-xs text-slate-200 font-semibold shrink-0">
                      {cyl.gasRemainingPct}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Interactive Solenoid Actuator Switch */}
              <div className="flex justify-between items-center pt-3 border-t border-white/5 mt-1">
                <span className="font-mono text-xs text-slate-400 flex items-center gap-1.5">
                  <Power className="w-3.5 h-3.5" />
                  <span>Solenoid Sol-Valve State</span>
                </span>

                <label 
                  htmlFor={`valve-switch-${cyl.id}`}
                  className="relative inline-flex items-center cursor-pointer select-none"
                >
                  <input
                    id={`valve-switch-${cyl.id}`}
                    type="checkbox"
                    checked={cyl.actuatorActive}
                    onChange={() => onToggleCylinder(cyl.id)}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-indigo-600 shadow-inner" />
                </label>
              </div>
            </div>
          );
        })}
      </div>

      {/* Safety Interlock Notice */}
      <div className="p-5 rounded-3xl bg-white/5 border border-white/10 text-xs text-slate-300 flex items-start gap-3.5">
        <ShieldAlert className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-semibold text-white block mb-0.5">
            Automatic High-Pressure Safety Interlock Active
          </span>
          All solenoid valves are coupled to the optical IR flame array and catalytic LPG sensors. Any breach in nominal thresholds automatically trips the pneumatic master seal within 180 milliseconds.
        </div>
      </div>
    </div>
  );
};
