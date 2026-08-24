import React, { useState } from 'react';
import { X, Sliders, RotateCcw, Flame, CheckCircle2, RefreshCw, Cpu, Radio, ShieldCheck } from 'lucide-react';

interface CalibrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLpg: number;
  currentTemp: number;
  currentHumidity: number;
  onApplyCalibration: (lpg: number, temp: number, humidity: number) => void;
  onTriggerFlameTest: () => void;
  onRunDiagnostic: () => void;
}

export const CalibrationModal: React.FC<CalibrationModalProps> = ({
  isOpen,
  onClose,
  currentLpg,
  currentTemp,
  currentHumidity,
  onApplyCalibration,
  onTriggerFlameTest,
  onRunDiagnostic,
}) => {
  const [lpgVal, setLpgVal] = useState(currentLpg);
  const [tempVal, setTempVal] = useState(currentTemp);
  const [humVal, setHumVal] = useState(currentHumidity);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [calibrationSuccess, setCalibrationSuccess] = useState(false);

  if (!isOpen) return null;

  const handleZeroSensors = () => {
    setIsCalibrating(true);
    setTimeout(() => {
      setLpgVal(10);
      setTempVal(24.0);
      setHumVal(50);
      onApplyCalibration(10, 24.0, 50);
      setIsCalibrating(false);
      setCalibrationSuccess(true);
      setTimeout(() => setCalibrationSuccess(false), 2500);
    }, 800);
  };

  const handleApply = () => {
    onApplyCalibration(lpgVal, tempVal, humVal);
    onClose();
  };

  return (
    <div 
      id="calibration-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
    >
      <div className="relative w-full max-w-xl rounded-3xl bg-[#0A0B10] border border-white/10 p-6 sm:p-8 shadow-2xl overflow-hidden glass-card">
        {/* Close Button */}
        <button
          id="btn-close-calibration-modal"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400 border border-indigo-500/20">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Sensor Calibration & Test Bench
            </h2>
            <p className="text-xs font-mono text-slate-400">
              Station Alpha Diagnostic Bus • Firmware v4.8.2
            </p>
          </div>
        </div>

        {/* Sliders / Sensor adjustments */}
        <div className="space-y-5 bg-white/5 p-5 rounded-2xl border border-white/5 mb-6">
          {/* LPG Sensor Adjustment */}
          <div>
            <div className="flex justify-between items-center mb-1.5 text-xs font-mono">
              <span className="text-slate-200 font-semibold">LPG Gas Concentration Level</span>
              <span className={`font-bold ${lpgVal > 20 ? 'text-rose-400' : 'text-indigo-400'}`}>
                {lpgVal} ppm ({(lpgVal * 0.05).toFixed(2)}% LEL)
              </span>
            </div>
            <input
              id="slider-calibrate-lpg"
              type="range"
              min="0"
              max="60"
              step="1"
              value={lpgVal}
              onChange={(e) => setLpgVal(Number(e.target.value))}
              className="w-full h-2 bg-[#07080C] rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
              <span>0 ppm (Zero Baseline)</span>
              <span>20 ppm (LEL Limit)</span>
              <span>60 ppm (Critical)</span>
            </div>
          </div>

          {/* Temperature Sensor Adjustment */}
          <div>
            <div className="flex justify-between items-center mb-1.5 text-xs font-mono">
              <span className="text-slate-200 font-semibold">Ambient Temperature</span>
              <span className={`font-bold ${tempVal > 40 ? 'text-rose-400' : 'text-amber-400'}`}>
                {tempVal.toFixed(1)} °C
              </span>
            </div>
            <input
              id="slider-calibrate-temp"
              type="range"
              min="15"
              max="55"
              step="0.5"
              value={tempVal}
              onChange={(e) => setTempVal(Number(e.target.value))}
              className="w-full h-2 bg-[#07080C] rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
              <span>15°C (Cool)</span>
              <span>24.5°C (Nominal)</span>
              <span>45°C+ (Thermal Warning)</span>
            </div>
          </div>
        </div>

        {/* Diagnostics & Self-Test Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <button
            id="btn-trigger-flame-test"
            onClick={onTriggerFlameTest}
            className="p-3.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-2xl text-left transition-colors flex items-start gap-3 group"
          >
            <Flame className="w-5 h-5 text-rose-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
            <div>
              <span className="text-xs font-bold text-white block">Test IR Flame Optical Array</span>
              <span className="text-[11px] text-slate-400">Inject optical test pulse</span>
            </div>
          </button>

          <button
            id="btn-run-self-diagnostic"
            onClick={onRunDiagnostic}
            className="p-3.5 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 rounded-2xl text-left transition-colors flex items-start gap-3 group"
          >
            <Cpu className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
            <div>
              <span className="text-xs font-bold text-white block">Run System Diagnostic</span>
              <span className="text-[11px] text-slate-400">Calibrate optical & MQ-6 nodes</span>
            </div>
          </button>
        </div>

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <button
            id="btn-zero-baseline"
            onClick={handleZeroSensors}
            disabled={isCalibrating}
            className="text-xs font-mono text-slate-400 hover:text-emerald-400 flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isCalibrating ? 'animate-spin text-emerald-400' : ''}`} />
            <span>{calibrationSuccess ? 'Zeroed & Calibrated!' : 'Zero Baseline (Auto-Cal)'}</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full text-xs font-mono text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              id="btn-save-calibration"
              onClick={handleApply}
              className="px-5 py-2.5 rounded-full text-xs font-mono font-bold bg-indigo-600 text-white hover:bg-indigo-500 transition-colors shadow-md shadow-indigo-600/20"
            >
              Save Calibration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
