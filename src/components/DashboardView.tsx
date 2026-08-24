// import React, { useEffect, useRef, useState } from 'react';
// import {
//   Cylinder,
//   SafetyLogEvent,
//   SystemStatus,
//   TelemetryPoint,
//   ActiveTab
// } from '../types';

// import {
//   formatUptime,
//   TELEMETRY_24H_DATA,
//   TELEMETRY_1H_DATA,
//   TELEMETRY_7D_DATA
// } from '../data/mockData';

// import {
//   Flame,
//   RotateCw,
//   Sliders,
//   Thermometer,
//   TrendingDown,
//   Power,
//   AlertTriangle,
//   ExternalLink,
//   CheckCircle2,
//   History,
//   Wifi,
//   Layers,
//   Fuel,
//   ShieldCheck
// } from 'lucide-react';

// interface DashboardViewProps {
//   systemStatus: SystemStatus;
//   lpgPpm: number;
//   temperature: number;
//   humidity: number;
//   flameDetected: boolean;
//   cylinders: Cylinder[];
//   onToggleCylinder: (id: string) => void;
//   onEmergencyShutdown: () => void;
//   onSyncTelemetry: () => void;
//   onOpenCalibration: () => void;
//   recentLogs: SafetyLogEvent[];
//   setActiveTab: (tab: ActiveTab) => void;
//   isSyncing: boolean;
// }

// export const DashboardView: React.FC<DashboardViewProps> = ({
//   systemStatus,
//   lpgPpm,
//   temperature,
//   humidity,
//   flameDetected,
//   cylinders,
//   onToggleCylinder,
//   onEmergencyShutdown,
//   onSyncTelemetry,
//   onOpenCalibration,
//   recentLogs,
//   setActiveTab,
//   isSyncing,
// }) => {

//   // ============================================================
//   // STATES
//   // ============================================================

//   const [timeRange, setTimeRange] =
//     useState<'1H' | '24H' | '7D'>('24H');

//   const [hoveredDataPoint, setHoveredDataPoint] =
//     useState<TelemetryPoint | null>(null);

//   const [showFirePopup, setShowFirePopup] =
//     useState(false);

//   const [fireAlertDismissed, setFireAlertDismissed] =
//     useState(false);

//   // ============================================================
//   // 🟡 CALIBRATION THRESHOLD ESCALATION
//   //
//   // Calibration slider ma LPG / Temperature ni value high
//   // set thay etle:
//   //   1) Tarat j WARNING (yellow) batavvu
//   //   2) Jo value 5 second sudhi high j rahe to
//   //      automatically CRITICAL (fire) thai javu + popup
//   // ============================================================

//   const LPG_WARNING_PPM = 20;   // LEL Limit (Image 1 ma "20 ppm (LEL Limit)")
//   const TEMP_WARNING_C = 45;    // Thermal Warning (Image 1 ma "45°C+ (Thermal Warning)")
//   const ESCALATION_DELAY_MS = 5000; // 5 sec hold before auto-critical

//   const [autoWarning, setAutoWarning] = useState(false);
//   const [autoCritical, setAutoCritical] = useState(false);

//   const escalationTimerRef =
//     useRef<ReturnType<typeof setTimeout> | null>(null);

//   const isThresholdBreached =
//     lpgPpm > LPG_WARNING_PPM ||
//     temperature > TEMP_WARNING_C;


//   useEffect(() => {

//     if (isThresholdBreached) {

//       // Value high che -> tarat j yellow warning batavo
//       setAutoWarning(true);

//       // Jo timer already chalu nathi ane haju critical nathi thayu,
//       // to 5 second no countdown chalu karo
//       if (!escalationTimerRef.current && !autoCritical) {
//         escalationTimerRef.current = setTimeout(() => {
//           setAutoCritical(true);
//           escalationTimerRef.current = null;
//         }, ESCALATION_DELAY_MS);
//       }

//     } else {

//       // Value pachi normal thai gai -> badhu reset
//       setAutoWarning(false);
//       setAutoCritical(false);

//       if (escalationTimerRef.current) {
//         clearTimeout(escalationTimerRef.current);
//         escalationTimerRef.current = null;
//       }

//     }

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isThresholdBreached]);

//   // Component unmount thay tyare pending timer clear karo
//   useEffect(() => {
//     return () => {
//       if (escalationTimerRef.current) {
//         clearTimeout(escalationTimerRef.current);
//       }
//     };
//   }, []);

//   // ============================================================
//   // SYSTEM STATUS
//   // ============================================================

//   // displayStatus = jo auto-critical/auto-warning active hoy to
//   // e batavo, nahi to parent e apel actual systemStatus batavo
//   const displayStatus: string = autoCritical
//     ? 'CRITICAL'
//     : autoWarning
//       ? 'WARNING'
//       : systemStatus;

//   const isDisplayCritical =
//     systemStatus === 'CRITICAL' ||
//     systemStatus === 'EMERGENCY_SHUTDOWN' ||
//     autoCritical;

//   const isDisplayWarning =
//     !isDisplayCritical && autoWarning;

//   const isDisplaySafe =
//     !isDisplayCritical && !isDisplayWarning;

//   /*
//    * IMPORTANT:
//    * Popup/red blinking hવે 2 rite trigger thay che:
//    *
//    * 1) flameDetected = true AND systemStatus = CRITICAL (real sensor)
//    * 2) autoCritical = true (calibration threshold 5 sec sudhi high rahyu)
//    *
//    * EMERGENCY_SHUTDOWN પછી popup ફરી નહીં આવે.
//    */
//   const isFireCritical =
//     (flameDetected && systemStatus === 'CRITICAL') ||
//     autoCritical;

//   // ============================================================
//   // AUTOMATIC POPUP
//   // ============================================================

//   useEffect(() => {

//     if (isFireCritical && !fireAlertDismissed) {
//       setShowFirePopup(true);
//     }

//     if (!isFireCritical) {
//       setShowFirePopup(false);
//       setFireAlertDismissed(false);
//     }

//   }, [isFireCritical, fireAlertDismissed]);

//   // ============================================================
//   // DISMISS POPUP
//   // ============================================================

//   const handleDismissFirePopup = () => {
//     setShowFirePopup(false);
//     setFireAlertDismissed(true);
//   };

//   // ============================================================
//   // SHUTDOWN
//   // ============================================================

//   const handleShutdown = () => {

//     // Parent component status update કરશે
//     onEmergencyShutdown();

//     // Popup immediately close
//     setShowFirePopup(false);

//     // Popup ફરી automatic open નહીં થાય
//     setFireAlertDismissed(true);

//     // Auto-escalation states pan reset kariye
//     setAutoWarning(false);
//     setAutoCritical(false);

//     if (escalationTimerRef.current) {
//       clearTimeout(escalationTimerRef.current);
//       escalationTimerRef.current = null;
//     }
//   };

//   // ============================================================
//   // TELEMETRY DATA
//   // ============================================================

//   const getTelemetryData = (): TelemetryPoint[] => {

//     if (timeRange === '1H') {
//       return TELEMETRY_1H_DATA;
//     }

//     if (timeRange === '7D') {
//       return TELEMETRY_7D_DATA;
//     }

//     return TELEMETRY_24H_DATA;
//   };

//   const currentDataset = getTelemetryData();


//   // ============================================================
//   // RETURN
//   // ============================================================

//   return (
//     <>
//       {/* ========================================================
//           🔴 FULL SCREEN RED BLINK

//           આ જ જગ્યાએ તમારો code મૂકવાનો છે.
//           return ની અંદર સૌથી ઉપર.
//           ======================================================== */}

//       {isFireCritical && (
//         <div
//           className="fixed inset-0 z-[9998] pointer-events-none red-blink"
//         />
//       )}

//       {/* ========================================================
//           🔥 FIRE DETECTED POPUP
//           ======================================================== */}

//       {isFireCritical && showFirePopup && (

//         <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">

//           {/* Dark background */}
//           <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

//           {/* Popup */}
//           <div
//             className="
//               relative
//               w-full
//               max-w-md
//               overflow-hidden
//               rounded-3xl
//               border-2
//               border-rose-500/60
//               bg-[#090A0F]
//               shadow-[0_0_80px_rgba(239,68,68,0.55)]
//               animate-fire-popup
//             "
//           >

//             {/* Top red line */}
//             <div className="h-1.5 w-full bg-rose-500 animate-pulse" />

//             <div className="p-7 sm:p-8">

//               {/* Fire icon */}
//               <div className="flex justify-center mb-5">

//                 <div className="relative">

//                   <div className="absolute inset-0 rounded-full bg-rose-500/30 animate-ping" />

//                   <div
//                     className="
//                       relative
//                       w-20
//                       h-20
//                       rounded-full
//                       bg-rose-500/20
//                       border-2
//                       border-rose-500/60
//                       flex
//                       items-center
//                       justify-center
//                       shadow-[0_0_35px_rgba(239,68,68,0.6)]
//                     "
//                   >
//                     <Flame className="w-10 h-10 text-rose-400 animate-pulse" />
//                   </div>

//                 </div>

//               </div>

//               {/* Title */}
//               <div className="text-center">

//                 <div className="font-mono text-xs tracking-[0.3em] text-rose-400 mb-2">
//                   !!! EMERGENCY ALERT !!!
//                 </div>

//                 <h2 className="text-3xl sm:text-4xl font-black text-white">
//                   {autoCritical && !flameDetected
//                     ? 'THRESHOLD BREACH'
//                     : 'FIRE DETECTED'}
//                 </h2>

//                 <p className="mt-2 text-lg font-bold text-rose-400">
//                   CRITICAL SYSTEM STATUS
//                 </p>

//               </div>

//               {/* Warning message */}
//               <div className="mt-6 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4">

//                 <div className="flex items-start gap-3">

//                   <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />

//                   <div>

//                     <p className="text-sm font-semibold text-rose-200">
//                       Immediate attention required
//                     </p>

//                     <p className="text-xs text-slate-300 mt-1 leading-relaxed">
//                       {autoCritical && !flameDetected
//                         ? 'LPG / Temperature reading remained above the safe threshold for 5+ seconds. System has escalated to CRITICAL.'
//                         : 'Flame detection sensors have detected a possible fire while the system is in a critical state.'}
//                     </p>

//                   </div>

//                 </div>

//               </div>

//               {/* Status */}
//               <div className="grid grid-cols-2 gap-3 mt-4">

//                 <div className="rounded-2xl bg-white/5 border border-white/10 p-3">

//                   <p className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">
//                     Flame Sensor
//                   </p>

//                   <p className="text-sm font-bold text-rose-400 mt-1">
//                     {flameDetected ? 'FIRE DETECTED' : 'THRESHOLD TRIGGER'}
//                   </p>

//                 </div>

//                 <div className="rounded-2xl bg-white/5 border border-white/10 p-3">

//                   <p className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">
//                     System
//                   </p>

//                   <p className="text-sm font-bold text-rose-400 mt-1">
//                     {displayStatus}
//                   </p>

//                 </div>

//               </div>

//               {/* LPG */}
//               <div className="mt-3 rounded-2xl bg-white/5 border border-white/10 p-3">

//                 <div className="flex justify-between">

//                   <span className="text-xs text-slate-400 font-mono">
//                     LPG CONCENTRATION
//                   </span>

//                   <span className="text-sm font-bold text-white font-mono">
//                     {lpgPpm} ppm
//                   </span>

//                 </div>

//               </div>

//               {/* Buttons */}
//               <div className="flex flex-col gap-3 mt-6">

//                 {/* SHUTDOWN */}
//                 <button
//                   type="button"
//                   onClick={handleShutdown}
//                   className="
//                     w-full
//                     py-4
//                     rounded-2xl
//                     bg-rose-500
//                     hover:bg-rose-400
//                     text-white
//                     font-black
//                     font-mono
//                     tracking-widest
//                     shadow-lg
//                     shadow-rose-500/30
//                     transition-all
//                     active:scale-[0.98]
//                     flex
//                     items-center
//                     justify-center
//                     gap-2
//                   "
//                 >

//                   <Power className="w-5 h-5" />

//                   SHUTDOWN ALL

//                 </button>

//                 {/* ACKNOWLEDGE */}
//                 <button
//                   type="button"
//                   onClick={handleDismissFirePopup}
//                   className="
//                     w-full
//                     py-3
//                     rounded-2xl
//                     bg-white/5
//                     hover:bg-white/10
//                     border
//                     border-white/10
//                     text-slate-300
//                     hover:text-white
//                     font-mono
//                     text-xs
//                     transition-all
//                   "
//                 >
//                   ACKNOWLEDGE ALERT
//                 </button>

//               </div>

//               <p className="text-center text-[10px] text-slate-500 font-mono mt-4">
//                 DO NOT IGNORE THIS ALERT
//               </p>

//             </div>

//           </div>

//         </div>
//       )}

//       {/* ========================================================
//           MAIN DASHBOARD
//           ======================================================== */}

//       <div className="space-y-6 max-w-[1600px] mx-auto pb-10">

//         {/* ======================================================
//             GLOBAL STATUS
//             ====================================================== */}

//         <section
//           id="section-global-status"
//           className={`
//             glass-card
//             rounded-3xl
//             p-6
//             sm:p-8
//             flex
//             flex-col
//             md:flex-row
//             items-start
//             md:items-center
//             justify-between
//             gap-6
//             relative
//             overflow-hidden
//             transition-all
//             duration-300
//             ${isDisplayCritical
//               ? 'border-rose-500/40 bg-rose-500/10'
//               : isDisplayWarning
//                 ? 'border-amber-500/40 bg-amber-500/10'
//                 : ''
//             }
//           `}
//         >

//           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(99,102,241,0.12),transparent_70%)] pointer-events-none" />

//           <div className="flex items-center gap-5 z-10">

//             <div className="relative flex items-center justify-center w-16 h-16 bg-[#07080C] rounded-2xl border border-white/10 shrink-0">

//               <div
//                 className={`
//                   w-7
//                   h-7
//                   rounded-full
//                   transition-all
//                   duration-300
//                   ${isDisplayCritical
//                     ? 'bg-rose-500 animate-ping glow-danger'
//                     : isDisplayWarning
//                       ? 'bg-amber-400 animate-pulse'
//                       : 'bg-emerald-400 animate-pulse glow-safe'
//                   }
//                 `}
//               />

//               {isDisplaySafe && (
//                 <span className="absolute text-emerald-950">
//                   <ShieldCheck className="w-4 h-4" />
//                 </span>
//               )}

//             </div>

//             <div>

//               <h2 className="font-mono text-xs text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2">

//                 <span>Gaston Status</span>

//                 <span
//                   className={`
//                     w-1.5
//                     h-1.5
//                     rounded-full
//                     ${isDisplayCritical
//                       ? 'bg-rose-400'
//                       : isDisplayWarning
//                         ? 'bg-amber-400'
//                         : 'bg-emerald-400'
//                     }
//                   `}
//                 />

//               </h2>

//               <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">

//                 System:{' '}

//                 <span
//                   className={
//                     isDisplayCritical
//                       ? 'text-rose-400'
//                       : isDisplayWarning
//                         ? 'text-amber-400'
//                         : 'text-emerald-400'
//                   }
//                 >
//                   {displayStatus}
//                 </span>

//               </div>

//             </div>

//           </div>

//           <div className="flex items-center gap-3 z-10 w-full md:w-auto">

//             <button
//               id="btn-sync-telemetry"
//               onClick={onSyncTelemetry}
//               disabled={isSyncing}
//               className="flex-1 md:flex-none px-5 py-2.5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all font-mono text-xs text-slate-200 flex items-center justify-center gap-2"
//             >

//               <RotateCw
//                 className={
//                   isSyncing
//                     ? 'w-4 h-4 animate-spin text-indigo-400'
//                     : 'w-4 h-4'
//                 }
//               />

//               {isSyncing
//                 ? 'SYNCING...'
//                 : 'SYNC'}

//             </button>

//             <button
//               id="btn-calibrate-sensors"
//               onClick={onOpenCalibration}
//               className="flex-1 md:flex-none px-5 py-2.5 bg-indigo-600 border border-indigo-500 rounded-2xl hover:bg-indigo-500 transition-all font-mono text-xs text-white flex items-center justify-center gap-2"
//             >

//               <Sliders className="w-4 h-4" />

//               CALIBRATE

//             </button>

//           </div>

//         </section>

//         {/* ======================================================
//             QUICK STATS
//             ====================================================== */}

//         <section
//           id="section-quick-stats"
//           className="grid grid-cols-1 md:grid-cols-3 gap-5"
//         >

//           {/* LPG */}
//           <div
//             id="card-stat-lpg"
//             className="glass-card glass-card-hover rounded-3xl p-6 cursor-pointer"
//             onClick={() => setActiveTab('analytics')}
//           >

//             <div className="flex justify-between items-start mb-4">

//               <div className="p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-indigo-400">

//                 <Fuel className="w-5 h-5" />

//               </div>

//               <span className="font-mono text-xs text-slate-300 bg-white/5 px-3 py-1 rounded-full border border-white/10">
//                 Zone A
//               </span>

//             </div>

//             <h3 className="font-mono text-xs text-slate-400 mb-1.5 uppercase">
//               Ambient LPG Concentration
//             </h3>

//             <div className="flex items-baseline gap-2">

//               <span
//                 className={`text-3xl font-bold ${lpgPpm > 20
//                   ? 'text-rose-400'
//                   : 'text-white'
//                   }`}
//               >
//                 {lpgPpm}
//               </span>

//               <span className="text-sm text-slate-400 font-mono">
//                 ppm
//               </span>

//             </div>

//             <div className="w-full bg-[#07080C] h-2 rounded-full mt-4">

//               <div
//                 className={`h-full rounded-full ${lpgPpm > 20
//                   ? 'bg-rose-500'
//                   : 'bg-indigo-500'
//                   }`}
//                 style={{
//                   width: `${Math.min(
//                     100,
//                     (lpgPpm / 50) * 100
//                   )}%`
//                 }}
//               />

//             </div>

//           </div>

//           {/* FLAME */}
//           <div
//             id="card-stat-flame"
//             className={`
//               glass-card
//               glass-card-hover
//               rounded-3xl
//               p-6
//               cursor-pointer
//               ${isFireCritical
//                 ? 'border-rose-500/60 bg-rose-500/10'
//                 : ''
//               }
//             `}
//             onClick={onOpenCalibration}
//           >

//             <div className="flex justify-between items-start mb-4">

//               <div
//                 className={`
//                   p-3
//                   rounded-2xl
//                   border
//                   ${flameDetected
//                     ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
//                     : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
//                   }
//                 `}
//               >

//                 <Flame
//                   className={`w-5 h-5 ${flameDetected
//                     ? 'animate-pulse'
//                     : ''
//                     }`}
//                 />

//               </div>

//               <span className="font-mono text-xs text-slate-300 bg-white/5 px-3 py-1 rounded-full border border-white/10">
//                 IR Sensors
//               </span>

//             </div>

//             <h3 className="font-mono text-xs text-slate-400 mb-1.5 uppercase">
//               Flame Detection Status
//             </h3>

//             <span
//               className={`
//                 text-3xl
//                 font-bold
//                 ${flameDetected
//                   ? 'text-rose-400 animate-pulse'
//                   : 'text-emerald-400'
//                 }
//               `}
//             >
//               {flameDetected
//                 ? 'FIRE DETECTED'
//                 : 'CLEAR'}
//             </span>

//             <div className="w-full bg-[#07080C] h-2 rounded-full mt-4 flex gap-1 p-0.5">

//               {[1, 2, 3].map((item) => (

//                 <div
//                   key={item}
//                   className={`
//                     h-full
//                     flex-1
//                     rounded-sm
//                     ${flameDetected
//                       ? 'bg-rose-500'
//                       : 'bg-emerald-400'
//                     }
//                   `}
//                 />

//               ))}

//               <div className="h-full flex-1 rounded-sm bg-white/5" />

//             </div>

//           </div>

//           {/* TEMPERATURE */}
//           <div
//             id="card-stat-temperature"
//             className="glass-card glass-card-hover rounded-3xl p-6 cursor-pointer"
//             onClick={() => setActiveTab('analytics')}
//           >

//             <div className="flex justify-between items-start mb-4">

//               <div className="p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-indigo-400">

//                 <Thermometer className="w-5 h-5" />

//               </div>

//               <span className="font-mono text-xs text-slate-300 bg-white/5 px-3 py-1 rounded-full border border-white/10">
//                 DHT22 Node
//               </span>

//             </div>

//             <h3 className="font-mono text-xs text-slate-400 mb-1.5 uppercase">
//               Environment Temperature
//             </h3>

//             <div className="flex items-baseline gap-2">

//               <span className="text-3xl font-bold text-white">
//                 {temperature.toFixed(1)}
//               </span>

//               <span className="text-sm text-slate-400 font-mono">
//                 °C
//               </span>

//               <span className="text-xs text-slate-400 font-mono ml-auto">
//                 Humidity: {humidity}%
//               </span>

//             </div>

//             <div className="flex items-center gap-1.5 mt-4 text-emerald-400 font-mono text-xs">

//               <TrendingDown className="w-3.5 h-3.5" />

//               -1.2°C from nominal avg

//             </div>

//           </div>

//         </section>

//         {/* ======================================================
//             MANIFOLD
//             ====================================================== */}

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

//           <section className="lg:col-span-8 flex flex-col gap-4">

//             <div className="flex items-center justify-between">

//               <div className="flex items-center gap-2.5">

//                 <Layers className="w-5 h-5 text-indigo-400" />

//                 <h2 className="text-xl sm:text-2xl font-bold text-white">
//                   Manifold Control Unit
//                 </h2>

//               </div>

//               <button
//                 onClick={() => setActiveTab('control')}
//                 className="font-mono text-xs text-indigo-400 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20"
//               >
//                 VIEW ALL VALVES
//               </button>

//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

//               {cylinders.map((cylinder) => {

//                 const isOnline =
//                   cylinder.status === 'ONLINE' &&
//                   cylinder.actuatorActive;

//                 return (

//                   <div
//                     key={cylinder.id}
//                     className={`
//                       glass-card
//                       rounded-3xl
//                       p-5
//                       ${isOnline
//                         ? 'border-indigo-500/40 bg-indigo-500/[0.06]'
//                         : 'opacity-85'
//                       }
//                     `}
//                   >

//                     <div className="flex justify-between items-center mb-5">

//                       <span className="font-mono text-xs px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300">
//                         {cylinder.label}
//                       </span>

//                       <Fuel className="w-5 h-5 text-indigo-400" />

//                     </div>

//                     <div className="space-y-4 mb-5">

//                       <div>

//                         <div className="font-mono text-[11px] text-slate-400">
//                           STATUS
//                         </div>

//                         <div className="text-lg font-bold font-mono text-indigo-300">
//                           {isOnline
//                             ? 'ONLINE'
//                             : 'OFFLINE'}
//                         </div>

//                       </div>

//                       <div>

//                         <div className="font-mono text-[11px] text-slate-400">
//                           UPTIME
//                         </div>

//                         <div className="text-sm font-mono text-slate-200">
//                           {formatUptime(
//                             cylinder.uptimeSeconds
//                           )}
//                         </div>

//                       </div>

//                     </div>

//                     <div className="pt-4 border-t border-white/5 flex items-center justify-between">

//                       <span className="font-mono text-xs text-slate-400">
//                         Valve Actuator
//                       </span>

//                       <button
//                         type="button"
//                         role="switch"
//                         aria-checked={
//                           cylinder.actuatorActive
//                         }
//                         onClick={() =>
//                           onToggleCylinder(
//                             cylinder.id
//                           )
//                         }
//                         className={`
//                           relative
//                           inline-flex
//                           h-7
//                           w-12
//                           rounded-full
//                           ${cylinder.actuatorActive
//                             ? 'bg-indigo-600'
//                             : 'bg-white/10'
//                           }
//                         `}
//                       >

//                         <span
//                           className={`
//                             inline-block
//                             h-6
//                             w-6
//                             rounded-full
//                             bg-white
//                             transition
//                             ${cylinder.actuatorActive
//                               ? 'translate-x-5'
//                               : 'translate-x-0'
//                             }
//                           `}
//                         />

//                       </button>

//                     </div>

//                   </div>

//                 );

//               })}

//             </div>

//           </section>

//           {/* ====================================================
//               EMERGENCY PANEL
//               ==================================================== */}

//           <section className="lg:col-span-4 flex flex-col gap-6">

//             <div className="glass-card rounded-3xl p-6 bg-gradient-to-br from-rose-950/40 via-[#0A0B10] to-[#07080C] border-rose-500/30">

//               <div className="flex flex-col items-center text-center">

//                 <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center mb-3">

//                   <AlertTriangle className="w-6 h-6 text-rose-400" />

//                 </div>

//                 <h3 className="text-xl font-bold text-white mb-2">
//                   CRITICAL OVERRIDE
//                 </h3>

//                 <p className="text-xs text-slate-300 mb-5">
//                   Instantly seals all solenoid valves and triggers
//                   building-wide evacuation alarm.
//                 </p>

//                 <button
//                   onClick={handleShutdown}
//                   className="w-full py-3.5 bg-rose-500 hover:bg-rose-400 text-white rounded-2xl font-bold font-mono flex items-center justify-center gap-2"
//                 >

//                   <Power className="w-5 h-5" />

//                   SHUTDOWN ALL

//                 </button>

//               </div>

//             </div>

//             {/* ==================================================
//                 EVENT LOGS
//                 ================================================== */}

//             <div className="glass-card rounded-3xl p-5">

//               <div className="flex items-center gap-2 mb-4">

//                 <History className="w-4 h-4 text-indigo-400" />

//                 <h3 className="font-bold text-sm text-white">
//                   Event Logs
//                 </h3>

//               </div>

//               <div className="flex flex-col gap-2.5">

//                 {recentLogs.slice(0, 3).map((log) => (

//                   <div
//                     key={log.id}
//                     className="flex items-start gap-3 p-3 bg-white/5 rounded-2xl"
//                   >

//                     {log.badgeType === 'danger' ? (

//                       <AlertTriangle className="w-4 h-4 text-rose-400" />

//                     ) : log.badgeType === 'success' ? (

//                       <CheckCircle2 className="w-4 h-4 text-emerald-400" />

//                     ) : (

//                       <Wifi className="w-4 h-4 text-indigo-400" />

//                     )}

//                     <div className="flex-grow min-w-0">

//                       <div className="flex justify-between">

//                         <span className="font-semibold text-xs text-slate-200 truncate">
//                           {log.title}
//                         </span>

//                         <span className="font-mono text-[10px] text-slate-400">
//                           {log.relativeTime}
//                         </span>

//                       </div>

//                       <p className="text-[11px] text-slate-400">
//                         {log.description}
//                       </p>

//                     </div>

//                   </div>

//                 ))}

//               </div>

//             </div>

//           </section>

//         </div>

//         {/* ======================================================
//             TELEMETRY
//             ====================================================== */}

//         <section className="glass-card rounded-3xl p-6 sm:p-7">

//           <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">

//             <div>

//               <h3 className="text-xl font-bold text-white mb-1">
//                 Environmental Telemetry
//               </h3>

//               <p className="font-mono text-xs text-slate-400">
//                 24-Hour Temperature & Humidity Variance
//               </p>

//             </div>

//             <div className="flex items-center gap-1.5 bg-[#07080C] p-1 rounded-full border border-white/10">

//               {(['1H', '24H', '7D'] as const).map(
//                 (range) => (

//                   <button
//                     key={range}
//                     onClick={() =>
//                       setTimeRange(range)
//                     }
//                     className={`
//                       px-3.5
//                       py-1
//                       rounded-full
//                       font-mono
//                       text-xs
//                       ${timeRange === range
//                         ? 'bg-indigo-600 text-white'
//                         : 'text-slate-400'
//                       }
//                     `}
//                   >
//                     {range}
//                   </button>

//                 )
//               )}

//             </div>

//           </div>

//           <div className="w-full h-56 bg-[#07080C] rounded-2xl border border-white/5 relative overflow-hidden p-4">

//             {hoveredDataPoint && (

//               <div className="absolute top-3 right-4 z-10 bg-[#0A0B10] border border-indigo-500/40 px-3 py-1 rounded-xl text-xs font-mono text-indigo-300">

//                 Time: {hoveredDataPoint.time}
//                 {' | '}
//                 {hoveredDataPoint.temperature}°C
//                 {' | '}
//                 {hoveredDataPoint.humidity}% Hum
//                 {' | '}
//                 {hoveredDataPoint.lpgPpm} ppm

//               </div>

//             )}

//             <svg
//               className="w-full h-40"
//               preserveAspectRatio="none"
//               viewBox="0 0 1000 160"
//             >

//               <defs>

//                 <linearGradient
//                   id="chartGradient"
//                   x1="0"
//                   y1="0"
//                   x2="0"
//                   y2="1"
//                 >

//                   <stop
//                     offset="0%"
//                     stopColor="#6366F1"
//                     stopOpacity="0.35"
//                   />

//                   <stop
//                     offset="100%"
//                     stopColor="#6366F1"
//                     stopOpacity="0"
//                   />

//                 </linearGradient>

//               </defs>

//               <line
//                 x1="0"
//                 y1="35"
//                 x2="1000"
//                 y2="35"
//                 stroke="#F43F5E"
//                 strokeDasharray="4 4"
//                 strokeWidth="1.5"
//               />

//               <path
//                 d="M0,160 L0,100 C150,90 250,110 350,85 C450,60 550,90 650,45 C750,25 850,75 1000,65 L1000,160 Z"
//                 fill="url(#chartGradient)"
//               />

//               <path
//                 d="M0,100 C150,90 250,110 350,85 C450,60 550,90 650,45 C750,25 850,75 1000,65"
//                 fill="none"
//                 stroke="#818CF8"
//                 strokeWidth="2.5"
//               />

//               <path
//                 d="M0,70 C150,75 250,65 350,80 C450,95 550,85 650,110 C750,120 850,90 1000,95"
//                 fill="none"
//                 stroke="#FB7185"
//                 strokeWidth="1.5"
//                 strokeDasharray="2 2"
//               />

//             </svg>

//             <div className="absolute bottom-3 left-4 right-4 flex justify-between">

//               {currentDataset.map((pt, i) => (

//                 <span
//                   key={i}
//                   onMouseEnter={() =>
//                     setHoveredDataPoint(pt)
//                   }
//                   onMouseLeave={() =>
//                     setHoveredDataPoint(null)
//                   }
//                   className="font-mono text-[11px] text-slate-400 cursor-pointer"
//                 >
//                   {pt.time}
//                 </span>

//               ))}

//             </div>

//           </div>

//         </section>

//       </div>
//     </>
//   );
// };




































































import React, { useEffect, useState } from 'react';
import {
  Cylinder,
  SafetyLogEvent,
  SystemStatus,
  TelemetryPoint,
  ActiveTab
} from '../types';

import {
  formatUptime,
  TELEMETRY_24H_DATA,
  TELEMETRY_1H_DATA,
  TELEMETRY_7D_DATA
} from '../data/mockData';

import {
  Flame,
  RotateCw,
  Sliders,
  Thermometer,
  TrendingDown,
  Power,
  AlertTriangle,
  ExternalLink,
  CheckCircle2,
  History,
  Wifi,
  Layers,
  Fuel,
  ShieldCheck
} from 'lucide-react';

import { SafetyAlarm } from './SafetyAlarm';

interface DashboardViewProps {
  systemStatus: SystemStatus;
  lpgPpm: number;
  temperature: number;
  humidity: number;
  flameDetected: boolean;
  cylinders: Cylinder[];
  onToggleCylinder: (id: string) => void;
  onEmergencyShutdown: () => void;
  onSyncTelemetry: () => void;
  onOpenCalibration: () => void;
  recentLogs: SafetyLogEvent[];
  setActiveTab: (tab: ActiveTab) => void;
  isSyncing: boolean;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  systemStatus,
  lpgPpm,
  temperature,
  humidity,
  flameDetected,
  cylinders,
  onToggleCylinder,
  onEmergencyShutdown,
  onSyncTelemetry,
  onOpenCalibration,
  recentLogs,
  setActiveTab,
  isSyncing,
}) => {

  // ============================================================
  // STATES
  // ============================================================

  const [timeRange, setTimeRange] =
    useState<'1H' | '24H' | '7D'>('24H');

  const [hoveredDataPoint, setHoveredDataPoint] =
    useState<TelemetryPoint | null>(null);

  const [showFirePopup, setShowFirePopup] =
    useState(false);

  const [fireAlertDismissed, setFireAlertDismissed] =
    useState(false);

  // ============================================================
  // SYSTEM STATUS
  //
  // App.tsx haવે 'WARNING' status pote j manage kare che
  // (calibration ma LPG/Temp high jay tyare WARNING, ane 5 sec
  // sudhi high j rahe to App.tsx pote CRITICAL + flameDetected
  // set kari de che). Etle ahi apde ફક્ત prop ne render karvanu che.
  // ============================================================

  const isSafe = systemStatus === 'SAFE';

  const isWarning = systemStatus === 'WARNING';

  const isDisplayCritical =
    systemStatus === 'CRITICAL' ||
    systemStatus === 'EMERGENCY_SHUTDOWN';

  const isDisplayWarning = isWarning;

  const isDisplaySafe = isSafe;

  /*
   * IMPORTANT:
   * Popup/red blinking only when:
   *
   * flameDetected = true
   * AND
   * systemStatus = CRITICAL
   *
   * EMERGENCY_SHUTDOWN પછી popup ફરી નહીં આવે.
   */
  const isFireCritical =
    flameDetected &&
    systemStatus === 'CRITICAL';

  // ============================================================
  // AUTOMATIC POPUP
  // ============================================================

  useEffect(() => {

    if (isFireCritical && !fireAlertDismissed) {
      setShowFirePopup(true);
    }

    if (!isFireCritical) {
      setShowFirePopup(false);
      setFireAlertDismissed(false);
    }

  }, [isFireCritical, fireAlertDismissed]);

  // ============================================================
  // DISMISS POPUP
  // ============================================================

  const handleDismissFirePopup = () => {
    setShowFirePopup(false);
    setFireAlertDismissed(true);
  };

  // ============================================================
  // SHUTDOWN
  // ============================================================

  const handleShutdown = () => {

    // Parent component status update કરશે
    onEmergencyShutdown();

    // Popup immediately close
    setShowFirePopup(false);

    // Popup ફરી automatic open નહીં થાય
    setFireAlertDismissed(true);
  };

  // ============================================================
  // TELEMETRY DATA
  // ============================================================

  const getTelemetryData = (): TelemetryPoint[] => {

    if (timeRange === '1H') {
      return TELEMETRY_1H_DATA;
    }

    if (timeRange === '7D') {
      return TELEMETRY_7D_DATA;
    }

    return TELEMETRY_24H_DATA;
  };

  const currentDataset = getTelemetryData();


  // ============================================================
  // RETURN
  // ============================================================

  return (
    <>
      <SafetyAlarm critical={isDisplayCritical} />
      {/* ========================================================
          🔴 FULL SCREEN RED BLINK
          
          આ જ જગ્યાએ તમારો code મૂકવાનો છે.
          return ની અંદર સૌથી ઉપર.
          ======================================================== */}

      {isFireCritical && (
        <div
          className="fixed inset-0 z-[9998] pointer-events-none red-blink"
        />
      )}

      {/* ========================================================
          🔥 FIRE DETECTED POPUP
          ======================================================== */}

      {isFireCritical && showFirePopup && (

        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">

          {/* Dark background */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Popup */}
          <div
            className="
              relative
              w-full
              max-w-md
              overflow-hidden
              rounded-3xl
              border-2
              border-rose-500/60
              bg-[#090A0F]
              shadow-[0_0_80px_rgba(239,68,68,0.55)]
              animate-fire-popup
            "
          >

            {/* Top red line */}
            <div className="h-1.5 w-full bg-rose-500 animate-pulse" />

            <div className="p-7 sm:p-8">

              {/* Fire icon */}
              <div className="flex justify-center mb-5">

                <div className="relative">

                  <div className="absolute inset-0 rounded-full bg-rose-500/30 animate-ping" />

                  <div
                    className="
                      relative
                      w-20
                      h-20
                      rounded-full
                      bg-rose-500/20
                      border-2
                      border-rose-500/60
                      flex
                      items-center
                      justify-center
                      shadow-[0_0_35px_rgba(239,68,68,0.6)]
                    "
                  >
                    <Flame className="w-10 h-10 text-rose-400 animate-pulse" />
                  </div>

                </div>

              </div>

              {/* Title */}
              <div className="text-center">

                <div className="font-mono text-xs tracking-[0.3em] text-rose-400 mb-2">
                  !!! EMERGENCY ALERT !!!
                </div>

                <h2 className="text-3xl sm:text-4xl font-black text-white">
                  FIRE DETECTED
                </h2>

                <p className="mt-2 text-lg font-bold text-rose-400">
                  CRITICAL SYSTEM STATUS
                </p>

              </div>

              {/* Warning message */}
              <div className="mt-6 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4">

                <div className="flex items-start gap-3">

                  <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />

                  <div>

                    <p className="text-sm font-semibold text-rose-200">
                      Immediate attention required
                    </p>

                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Flame detection sensors have detected a possible
                      fire while the system is in a critical state.
                    </p>

                  </div>

                </div>

              </div>

              {/* Status */}
              <div className="grid grid-cols-2 gap-3 mt-4">

                <div className="rounded-2xl bg-white/5 border border-white/10 p-3">

                  <p className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">
                    Flame Sensor
                  </p>

                  <p className="text-sm font-bold text-rose-400 mt-1">
                    FIRE DETECTED
                  </p>

                </div>

                <div className="rounded-2xl bg-white/5 border border-white/10 p-3">

                  <p className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">
                    System
                  </p>

                  <p className="text-sm font-bold text-rose-400 mt-1">
                    {systemStatus}
                  </p>

                </div>

              </div>

              {/* LPG */}
              <div className="mt-3 rounded-2xl bg-white/5 border border-white/10 p-3">

                <div className="flex justify-between">

                  <span className="text-xs text-slate-400 font-mono">
                    LPG CONCENTRATION
                  </span>

                  <span className="text-sm font-bold text-white font-mono">
                    {lpgPpm} ppm
                  </span>

                </div>

              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-3 mt-6">

                {/* SHUTDOWN */}
                <button
                  type="button"
                  onClick={handleShutdown}
                  className="
                    w-full
                    py-4
                    rounded-2xl
                    bg-rose-500
                    hover:bg-rose-400
                    text-white
                    font-black
                    font-mono
                    tracking-widest
                    shadow-lg
                    shadow-rose-500/30
                    transition-all
                    active:scale-[0.98]
                    flex
                    items-center
                    justify-center
                    gap-2
                  "
                >

                  <Power className="w-5 h-5" />

                  SHUTDOWN ALL

                </button>

                {/* ACKNOWLEDGE */}
                <button
                  type="button"
                  onClick={handleDismissFirePopup}
                  className="
                    w-full
                    py-3
                    rounded-2xl
                    bg-white/5
                    hover:bg-white/10
                    border
                    border-white/10
                    text-slate-300
                    hover:text-white
                    font-mono
                    text-xs
                    transition-all
                  "
                >
                  ACKNOWLEDGE ALERT
                </button>

              </div>

              <p className="text-center text-[10px] text-slate-500 font-mono mt-4">
                DO NOT IGNORE THIS ALERT
              </p>

            </div>

          </div>

        </div>
      )}

      {/* ========================================================
          MAIN DASHBOARD
          ======================================================== */}

      <div className="space-y-6 max-w-[1600px] mx-auto pb-10">

        {/* ======================================================
            GLOBAL STATUS
            ====================================================== */}

        <section
          id="section-global-status"
          className={`
            glass-card
            rounded-3xl
            p-6
            sm:p-8
            flex
            flex-col
            md:flex-row
            items-start
            md:items-center
            justify-between
            gap-6
            relative
            overflow-hidden
            transition-all
            duration-300
            ${isDisplayCritical
              ? 'border-rose-500/40 bg-rose-500/10'
              : isDisplayWarning
                ? 'border-amber-500/40 bg-amber-500/10'
                : ''
            }
          `}
        >

          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(99,102,241,0.12),transparent_70%)] pointer-events-none" />

          <div className="flex items-center gap-5 z-10">

            <div className="relative flex items-center justify-center w-16 h-16 bg-[#07080C] rounded-2xl border border-white/10 shrink-0">

              <div
                className={`
                  w-7
                  h-7
                  rounded-full
                  transition-all
                  duration-300
                  ${isDisplayCritical
                    ? 'bg-rose-500 animate-ping glow-danger'
                    : isDisplayWarning
                      ? 'bg-amber-400 animate-pulse'
                      : 'bg-emerald-400 animate-pulse glow-safe'
                  }
                `}
              />

              {isDisplaySafe && (
                <span className="absolute text-emerald-950">
                  <ShieldCheck className="w-4 h-4" />
                </span>
              )}

            </div>

            <div>

              <h2 className="font-mono text-xs text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2">

                <span>Gaston Status</span>

                <span
                  className={`
                    w-1.5
                    h-1.5
                    rounded-full
                    ${isDisplayCritical
                      ? 'bg-rose-400'
                      : isDisplayWarning
                        ? 'bg-amber-400'
                        : 'bg-emerald-400'
                    }
                  `}
                />

              </h2>

              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">

                System:{' '}

                <span
                  className={
                    isDisplayCritical
                      ? 'text-rose-400'
                      : isDisplayWarning
                        ? 'text-amber-400'
                        : 'text-emerald-400'
                  }
                >
                  {systemStatus}
                </span>

              </div>

            </div>

          </div>

          <div className="flex items-center gap-3 z-10 w-full md:w-auto">

            <button
              id="btn-sync-telemetry"
              onClick={onSyncTelemetry}
              disabled={isSyncing}
              className="flex-1 md:flex-none px-5 py-2.5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all font-mono text-xs text-slate-200 flex items-center justify-center gap-2"
            >

              <RotateCw
                className={
                  isSyncing
                    ? 'w-4 h-4 animate-spin text-indigo-400'
                    : 'w-4 h-4'
                }
              />

              {isSyncing
                ? 'SYNCING...'
                : 'SYNC'}

            </button>

            <button
              id="btn-calibrate-sensors"
              onClick={onOpenCalibration}
              className="flex-1 md:flex-none px-5 py-2.5 bg-indigo-600 border border-indigo-500 rounded-2xl hover:bg-indigo-500 transition-all font-mono text-xs text-white flex items-center justify-center gap-2"
            >

              <Sliders className="w-4 h-4" />

              CALIBRATE

            </button>

          </div>

        </section>

        {/* ======================================================
            QUICK STATS
            ====================================================== */}

        <section
          id="section-quick-stats"
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >

          {/* LPG */}
          <div
            id="card-stat-lpg"
            className="glass-card glass-card-hover rounded-3xl p-6 cursor-pointer"
            onClick={() => setActiveTab('analytics')}
          >

            <div className="flex justify-between items-start mb-4">

              <div className="p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-indigo-400">

                <Fuel className="w-5 h-5" />

              </div>

              <span className="font-mono text-xs text-slate-300 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                Zone A
              </span>

            </div>

            <h3 className="font-mono text-xs text-slate-400 mb-1.5 uppercase">
              Ambient LPG Concentration
            </h3>

            <div className="flex items-baseline gap-2">

              <span
                className={`text-3xl font-bold ${lpgPpm > 20
                  ? 'text-rose-400'
                  : 'text-white'
                  }`}
              >
                {lpgPpm}
              </span>

              <span className="text-sm text-slate-400 font-mono">
                ppm
              </span>

            </div>

            <div className="w-full bg-[#07080C] h-2 rounded-full mt-4">

              <div
                className={`h-full rounded-full ${lpgPpm > 20
                  ? 'bg-rose-500'
                  : 'bg-indigo-500'
                  }`}
                style={{
                  width: `${Math.min(
                    100,
                    (lpgPpm / 50) * 100
                  )}%`
                }}
              />

            </div>

          </div>

          {/* FLAME */}
          <div
            id="card-stat-flame"
            className={`
              glass-card
              glass-card-hover
              rounded-3xl
              p-6
              cursor-pointer
              ${isFireCritical
                ? 'border-rose-500/60 bg-rose-500/10'
                : ''
              }
            `}
            onClick={onOpenCalibration}
          >

            <div className="flex justify-between items-start mb-4">

              <div
                className={`
                  p-3
                  rounded-2xl
                  border
                  ${flameDetected
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  }
                `}
              >

                <Flame
                  className={`w-5 h-5 ${flameDetected
                    ? 'animate-pulse'
                    : ''
                    }`}
                />

              </div>

              <span className="font-mono text-xs text-slate-300 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                IR Sensors
              </span>

            </div>

            <h3 className="font-mono text-xs text-slate-400 mb-1.5 uppercase">
              Flame Detection Status
            </h3>

            <span
              className={`
                text-3xl
                font-bold
                ${flameDetected
                  ? 'text-rose-400 animate-pulse'
                  : 'text-emerald-400'
                }
              `}
            >
              {flameDetected
                ? 'FIRE DETECTED'
                : 'CLEAR'}
            </span>

            <div className="w-full bg-[#07080C] h-2 rounded-full mt-4 flex gap-1 p-0.5">

              {[1, 2, 3].map((item) => (

                <div
                  key={item}
                  className={`
                    h-full
                    flex-1
                    rounded-sm
                    ${flameDetected
                      ? 'bg-rose-500'
                      : 'bg-emerald-400'
                    }
                  `}
                />

              ))}

              <div className="h-full flex-1 rounded-sm bg-white/5" />

            </div>

          </div>

          {/* TEMPERATURE */}
          <div
            id="card-stat-temperature"
            className="glass-card glass-card-hover rounded-3xl p-6 cursor-pointer"
            onClick={() => setActiveTab('analytics')}
          >

            <div className="flex justify-between items-start mb-4">

              <div className="p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 text-indigo-400">

                <Thermometer className="w-5 h-5" />

              </div>

              <span className="font-mono text-xs text-slate-300 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                DHT22 Node
              </span>

            </div>

            <h3 className="font-mono text-xs text-slate-400 mb-1.5 uppercase">
              Environment Temperature
            </h3>

            <div className="flex items-baseline gap-2">

              <span className="text-3xl font-bold text-white">
                {temperature.toFixed(1)}
              </span>

              <span className="text-sm text-slate-400 font-mono">
                °C
              </span>

              <span className="text-xs text-slate-400 font-mono ml-auto">
                Humidity: {humidity}%
              </span>

            </div>

            <div className="flex items-center gap-1.5 mt-4 text-emerald-400 font-mono text-xs">

              <TrendingDown className="w-3.5 h-3.5" />

              -1.2°C from nominal avg

            </div>

          </div>

        </section>

        {/* ======================================================
            MANIFOLD
            ====================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          <section className="lg:col-span-8 flex flex-col gap-4">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2.5">

                <Layers className="w-5 h-5 text-indigo-400" />

                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Manifold Control Unit
                </h2>

              </div>

              <button
                onClick={() => setActiveTab('control')}
                className="font-mono text-xs text-indigo-400 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20"
              >
                VIEW ALL VALVES
              </button>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

              {cylinders.map((cylinder) => {

                const isOnline =
                  cylinder.status === 'ONLINE' &&
                  cylinder.actuatorActive;

                return (

                  <div
                    key={cylinder.id}
                    className={`
                      glass-card
                      rounded-3xl
                      p-5
                      ${isOnline
                        ? 'border-indigo-500/40 bg-indigo-500/[0.06]'
                        : 'opacity-85'
                      }
                    `}
                  >

                    <div className="flex justify-between items-center mb-5">

                      <span className="font-mono text-xs px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300">
                        {cylinder.label}
                      </span>

                      <Fuel className="w-5 h-5 text-indigo-400" />

                    </div>

                    <div className="space-y-4 mb-5">

                      <div>

                        <div className="font-mono text-[11px] text-slate-400">
                          STATUS
                        </div>

                        <div className="text-lg font-bold font-mono text-indigo-300">
                          {isOnline
                            ? 'ONLINE'
                            : 'OFFLINE'}
                        </div>

                      </div>

                      <div>

                        <div className="font-mono text-[11px] text-slate-400">
                          UPTIME
                        </div>

                        <div className="text-sm font-mono text-slate-200">
                          {formatUptime(
                            cylinder.uptimeSeconds
                          )}
                        </div>

                      </div>

                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">

                      <span className="font-mono text-xs text-slate-400">
                        Valve Actuator
                      </span>

                      <button
                        type="button"
                        role="switch"
                        aria-checked={
                          cylinder.actuatorActive
                        }
                        onClick={() =>
                          onToggleCylinder(
                            cylinder.id
                          )
                        }
                        className={`
                          relative
                          inline-flex
                          h-7
                          w-12
                          rounded-full
                          ${cylinder.actuatorActive
                            ? 'bg-indigo-600'
                            : 'bg-white/10'
                          }
                        `}
                      >

                        <span
                          className={`
                            inline-block
                            h-6
                            w-6
                            rounded-full
                            bg-white
                            transition
                            ${cylinder.actuatorActive
                              ? 'translate-x-5'
                              : 'translate-x-0'
                            }
                          `}
                        />

                      </button>

                    </div>

                  </div>

                );

              })}

            </div>

          </section>

          {/* ====================================================
              EMERGENCY PANEL
              ==================================================== */}

          <section className="lg:col-span-4 flex flex-col gap-6">

            <div className="glass-card rounded-3xl p-6 bg-gradient-to-br from-rose-950/40 via-[#0A0B10] to-[#07080C] border-rose-500/30">

              <div className="flex flex-col items-center text-center">

                <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center mb-3">

                  <AlertTriangle className="w-6 h-6 text-rose-400" />

                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  CRITICAL OVERRIDE
                </h3>

                <p className="text-xs text-slate-300 mb-5">
                  Instantly seals all solenoid valves and triggers
                  building-wide evacuation alarm.
                </p>

                <button
                  onClick={handleShutdown}
                  className="w-full py-3.5 bg-rose-500 hover:bg-rose-400 text-white rounded-2xl font-bold font-mono flex items-center justify-center gap-2"
                >

                  <Power className="w-5 h-5" />

                  SHUTDOWN ALL

                </button>

              </div>

            </div>

            {/* ==================================================
                EVENT LOGS
                ================================================== */}

            <div className="glass-card rounded-3xl p-5">

              <div className="flex items-center gap-2 mb-4">

                <History className="w-4 h-4 text-indigo-400" />

                <h3 className="font-bold text-sm text-white">
                  Event Logs
                </h3>

              </div>

              <div className="flex flex-col gap-2.5">

                {recentLogs.slice(0, 3).map((log) => (

                  <div
                    key={log.id}
                    className="flex items-start gap-3 p-3 bg-white/5 rounded-2xl"
                  >

                    {log.badgeType === 'danger' ? (

                      <AlertTriangle className="w-4 h-4 text-rose-400" />

                    ) : log.badgeType === 'success' ? (

                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />

                    ) : (

                      <Wifi className="w-4 h-4 text-indigo-400" />

                    )}

                    <div className="flex-grow min-w-0">

                      <div className="flex justify-between">

                        <span className="font-semibold text-xs text-slate-200 truncate">
                          {log.title}
                        </span>

                        <span className="font-mono text-[10px] text-slate-400">
                          {log.relativeTime}
                        </span>

                      </div>

                      <p className="text-[11px] text-slate-400">
                        {log.description}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </section>

        </div>

        {/* ======================================================
            TELEMETRY
            ====================================================== */}

        <section className="glass-card rounded-3xl p-6 sm:p-7">

          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">

            <div>

              <h3 className="text-xl font-bold text-white mb-1">
                Environmental Telemetry
              </h3>

              <p className="font-mono text-xs text-slate-400">
                24-Hour Temperature & Humidity Variance
              </p>

            </div>

            <div className="flex items-center gap-1.5 bg-[#07080C] p-1 rounded-full border border-white/10">

              {(['1H', '24H', '7D'] as const).map(
                (range) => (

                  <button
                    key={range}
                    onClick={() =>
                      setTimeRange(range)
                    }
                    className={`
                      px-3.5
                      py-1
                      rounded-full
                      font-mono
                      text-xs
                      ${timeRange === range
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-400'
                      }
                    `}
                  >
                    {range}
                  </button>

                )
              )}

            </div>

          </div>

          <div className="w-full h-56 bg-[#07080C] rounded-2xl border border-white/5 relative overflow-hidden p-4">

            {hoveredDataPoint && (

              <div className="absolute top-3 right-4 z-10 bg-[#0A0B10] border border-indigo-500/40 px-3 py-1 rounded-xl text-xs font-mono text-indigo-300">

                Time: {hoveredDataPoint.time}
                {' | '}
                {hoveredDataPoint.temperature}°C
                {' | '}
                {hoveredDataPoint.humidity}% Hum
                {' | '}
                {hoveredDataPoint.lpgPpm} ppm

              </div>

            )}

            <svg
              className="w-full h-40"
              preserveAspectRatio="none"
              viewBox="0 0 1000 160"
            >

              <defs>

                <linearGradient
                  id="chartGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >

                  <stop
                    offset="0%"
                    stopColor="#6366F1"
                    stopOpacity="0.35"
                  />

                  <stop
                    offset="100%"
                    stopColor="#6366F1"
                    stopOpacity="0"
                  />

                </linearGradient>

              </defs>

              <line
                x1="0"
                y1="35"
                x2="1000"
                y2="35"
                stroke="#F43F5E"
                strokeDasharray="4 4"
                strokeWidth="1.5"
              />

              <path
                d="M0,160 L0,100 C150,90 250,110 350,85 C450,60 550,90 650,45 C750,25 850,75 1000,65 L1000,160 Z"
                fill="url(#chartGradient)"
              />

              <path
                d="M0,100 C150,90 250,110 350,85 C450,60 550,90 650,45 C750,25 850,75 1000,65"
                fill="none"
                stroke="#818CF8"
                strokeWidth="2.5"
              />

              <path
                d="M0,70 C150,75 250,65 350,80 C450,95 550,85 650,110 C750,120 850,90 1000,95"
                fill="none"
                stroke="#FB7185"
                strokeWidth="1.5"
                strokeDasharray="2 2"
              />

            </svg>

            <div className="absolute bottom-3 left-4 right-4 flex justify-between">

              {currentDataset.map((pt, i) => (

                <span
                  key={i}
                  onMouseEnter={() =>
                    setHoveredDataPoint(pt)
                  }
                  onMouseLeave={() =>
                    setHoveredDataPoint(null)
                  }
                  className="font-mono text-[11px] text-slate-400 cursor-pointer"
                >
                  {pt.time}
                </span>

              ))}

            </div>

          </div>

        </section>

      </div>
    </>
  );
};