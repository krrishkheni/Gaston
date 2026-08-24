import React, { useState, useEffect } from 'react';
import { AlertOctagon, Power, RotateCcw, ShieldCheck, X, AlertTriangle } from 'lucide-react';
import { SystemStatus } from '../types';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  systemStatus: SystemStatus;
  onConfirmShutdown: () => void;
  onResetSystem: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose,
  systemStatus,
  onConfirmShutdown,
  onResetSystem,
}) => {
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHolding) {
      interval = setInterval(() => {
        setHoldProgress((prev) => {
          if (prev >= 100) {
            onConfirmShutdown();
            setIsHolding(false);
            return 0;
          }
          return prev + 5;
        });
      }, 50);
    } else {
      setHoldProgress(0);
    }
    return () => clearInterval(interval);
  }, [isHolding, onConfirmShutdown]);

  if (!isOpen) return null;

  const isAlreadyShutdown = systemStatus === 'EMERGENCY_SHUTDOWN' || systemStatus === 'CRITICAL';

  return (
    <div 
      id="emergency-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
    >
      <div 
        className="relative w-full max-w-lg rounded-3xl bg-[#0A0B10] border border-rose-500/30 p-6 sm:p-8 shadow-2xl glow-danger overflow-hidden"
      >
        {/* Decorative alert background */}
        <div className="absolute inset-0 bg-gradient-to-b from-rose-500/10 via-transparent to-transparent pointer-events-none" />

        {/* Close button */}
        <button
          id="btn-close-emergency-modal"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content */}
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-rose-500/10 border-2 border-rose-500 flex items-center justify-center mb-4 text-rose-400 animate-pulse">
            <AlertOctagon className="w-8 h-8" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans tracking-tight mb-2">
            {isAlreadyShutdown ? 'SYSTEM IN EMERGENCY SHUTDOWN' : 'CRITICAL SAFETY OVERRIDE'}
          </h2>

          <p className="text-sm text-slate-400 mb-6 leading-relaxed">
            {isAlreadyShutdown
              ? 'All manifold solenoid valves are currently isolated and mechanical seals engaged. Verify sector safety before triggering system reset.'
              : 'Executing emergency override will instantly trip all pneumatic valves, vent auxiliary lines, and trigger building evacuation signals.'}
          </p>

          {/* Action trigger */}
          {isAlreadyShutdown ? (
            <div className="w-full space-y-3">
              <button
                id="btn-confirm-system-reset"
                onClick={() => {
                  onResetSystem();
                  onClose();
                }}
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-[#0A0B10] font-bold font-mono text-sm rounded-full flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.98]"
              >
                <RotateCcw className="w-5 h-5" />
                <span>INITIATE SYSTEM RESET & RE-ARM</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-3 bg-white/5 hover:bg-white/10 text-slate-300 font-mono text-xs rounded-full border border-white/10 transition-colors"
              >
                KEEP VALVES ISOLATED
              </button>
            </div>
          ) : (
            <div className="w-full space-y-4">
              {/* Hold to activate button */}
              <div className="relative">
                <button
                  id="btn-hold-emergency-shutdown"
                  onMouseDown={() => setIsHolding(true)}
                  onMouseUp={() => setIsHolding(false)}
                  onMouseLeave={() => setIsHolding(false)}
                  onTouchStart={() => setIsHolding(true)}
                  onTouchEnd={() => setIsHolding(false)}
                  className="w-full py-4 bg-rose-500 text-white hover:bg-rose-600 font-bold font-mono text-sm sm:text-base tracking-wider rounded-full transition-all shadow-lg shadow-rose-500/30 active:scale-[0.98] flex items-center justify-center gap-2 relative overflow-hidden"
                >
                  {/* Progress bar fill */}
                  <div 
                    className="absolute left-0 top-0 bottom-0 bg-rose-700 transition-all"
                    style={{ width: `${holdProgress}%` }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    <Power className="w-5 h-5" />
                    <span>{holdProgress > 0 ? `HOLDING (${holdProgress}%)` : 'HOLD TO SHUTDOWN ALL'}</span>
                  </span>
                </button>
              </div>

              {/* Instant Shutdown shortcut button */}
              <button
                id="btn-instant-shutdown-confirm"
                onClick={() => {
                  onConfirmShutdown();
                  onClose();
                }}
                className="w-full py-2.5 bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 font-mono text-xs rounded-full border border-rose-500/30 transition-colors flex items-center justify-center gap-1.5"
              >
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>CLICK FOR IMMEDIATE SHUTDOWN</span>
              </button>

              <button
                onClick={onClose}
                className="text-xs font-mono text-slate-400 hover:text-white transition-colors"
              >
                Cancel / Return to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
