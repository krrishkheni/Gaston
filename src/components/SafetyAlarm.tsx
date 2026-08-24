import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import criticalSiren from '../assets/critical-siren.mp3';

interface SafetyAlarmProps {
  critical: boolean;
}

// Emergency alarm timing:
// Uploaded Panic Code Red siren (~9.7 sec) + 2.5 sec silent pause, then repeat while critical.
const SIREN_DURATION_MS = 9_744;
const PAUSE_DURATION_MS = 2_500;

export const SafetyAlarm: React.FC<SafetyAlarmProps> = ({ critical }) => {
  const [enabled, setEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<number | null>(null);
  const cycleRef = useRef(0);

  const clearAlarmTimer = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const stopAlarm = () => {
    clearAlarmTimer();
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  };

  const runAlarmCycle = async () => {
    const audio = audioRef.current;
    if (!audio || !critical || !enabled) return;

    const cycle = ++cycleRef.current;
    audio.loop = false;
    audio.currentTime = 0;
    audio.volume = 1.0;

    try {
      await audio.play();
    } catch {
      // Browser may require the Enable Alarm button to be pressed first.
      return;
    }

    // Let the uploaded siren play once, then create a short safety pause.
    timerRef.current = window.setTimeout(() => {
      if (!critical || !enabled || cycle !== cycleRef.current) return;

      audio.pause();
      audio.currentTime = 0;

      timerRef.current = window.setTimeout(() => {
        if (critical && enabled && cycle === cycleRef.current) {
          void runAlarmCycle();
        }
      }, PAUSE_DURATION_MS);
    }, SIREN_DURATION_MS);
  };

  useEffect(() => {
    if (critical && enabled) {
      clearAlarmTimer();
      void runAlarmCycle();
    } else {
      cycleRef.current += 1;
      stopAlarm();
    }

    return () => clearAlarmTimer();
  }, [critical, enabled]);

  useEffect(() => () => stopAlarm(), []);

  const handleToggle = async () => {
    if (enabled) {
      setEnabled(false);
      stopAlarm();
      return;
    }

    // This click is a user gesture, allowing the browser to play the siren.
    setEnabled(true);
    if (critical) {
      await runAlarmCycle();
    }
  };

  return (
    <>
      <audio ref={audioRef} src={criticalSiren} preload="auto" />

      <button
        type="button"
        onClick={() => void handleToggle()}
        title={enabled ? 'Safety alarm enabled. Click to mute.' : 'Enable safety alarm sound'}
        className={`fixed bottom-24 right-4 lg:bottom-6 lg:right-6 z-[10000]
          flex items-center gap-2 rounded-full border px-4 py-2.5
          text-xs font-semibold shadow-lg backdrop-blur-md transition-all
          ${critical
            ? 'border-rose-500/60 bg-rose-500/15 text-rose-200 shadow-rose-500/20'
            : 'border-white/10 bg-[#0A0B10]/90 text-slate-300'
          }`}
      >
        {enabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        {enabled ? (critical ? 'Alarm ON • Mute' : 'Alarm Enabled') : 'Enable Alarm'}
      </button>
    </>
  );
};
