// import React from 'react';
// import { ActiveTab, SystemStatus } from '../types';
// import { ASSET_IMAGES } from '../data/mockData';
// import {
//   LayoutDashboard,
//   Radio,
//   TrendingUp,
//   ClipboardList,
//   AlertTriangle,
//   HelpCircle,
//   LogOut,
//   ShieldCheck
// } from 'lucide-react';

// interface SidebarNavProps {
//   activeTab: ActiveTab;
//   setActiveTab: (tab: ActiveTab) => void;
//   systemStatus: SystemStatus;
//   onEmergencyClick: () => void;
//   unreadCount: number;
// }

// export const SidebarNav: React.FC<SidebarNavProps> = ({
//   activeTab,
//   setActiveTab,
//   systemStatus,
//   onEmergencyClick,
//   unreadCount,
// }) => {
//   const isEmergency = systemStatus === 'CRITICAL' || systemStatus === 'EMERGENCY_SHUTDOWN';

//   return (
//     <nav
//       id="desktop-sidebar-nav"
//       className="hidden lg:flex flex-col h-screen p-5 gap-4 fixed left-0 top-0 w-[280px] bg-[#07080C] border-r border-white/5 z-40 select-none overflow-y-auto"
//     >
//       {/* Brand Header */}
//       <div className="flex items-center gap-3 mb-6 mt-1 px-1">
//         <div className="relative w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20 overflow-hidden">
//           <img
//             src={"../assets/img/logo.jpeg"}
//             alt="Gaston Sensor LED Indicator"
//             className="w-full h-full object-cover mix-blend-screen opacity-90"
//             onError={(e) => {
//               (e.target as HTMLElement).style.display = 'none';
//             }}
//           />
//           <div className="absolute inset-0 bg-indigo-500/20 pointer-events-none" />
//         </div>
//         <div>
//           <div className="flex items-center gap-1.5">
//             <h1 className="text-white font-bold text-base tracking-tight font-sans">Gaston</h1>
//             <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
//           </div>
//           <p className="font-mono text-[11px] text-indigo-400 font-medium tracking-wide">
//             {isEmergency ? 'ALARM ENGAGED' : 'SAFETY AT EVERY BREATH'}
//           </p>
//         </div>
//       </div>

//       {/* Main Navigation Links */}
//       <div className="flex flex-col gap-1.5 flex-grow font-mono text-xs">
//         <button
//           id="nav-tab-dashboard"
//           onClick={() => setActiveTab('dashboard')}
//           className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-all duration-200 text-left active:scale-[0.98] ${activeTab === 'dashboard'
//             ? 'bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-500/25 border border-indigo-400/30'
//             : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
//             }`}
//         >
//           <LayoutDashboard className={`w-4 h-4 shrink-0 ${activeTab === 'dashboard' ? 'stroke-[2.5]' : ''}`} />
//           <span className="text-sm font-sans tracking-normal">Dashboard</span>
//         </button>

//         <button
//           id="nav-tab-control"
//           onClick={() => setActiveTab('control')}
//           className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-all duration-200 text-left active:scale-[0.98] ${activeTab === 'control'
//             ? 'bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-500/25 border border-indigo-400/30'
//             : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
//             }`}
//         >
//           <Radio className={`w-4 h-4 shrink-0 ${activeTab === 'control' ? 'stroke-[2.5]' : ''}`} />
//           <span className="text-sm font-sans tracking-normal">Device Control</span>
//         </button>

//         <button
//           id="nav-tab-analytics"
//           onClick={() => setActiveTab('analytics')}
//           className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-all duration-200 text-left active:scale-[0.98] ${activeTab === 'analytics'
//             ? 'bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-500/25 border border-indigo-400/30'
//             : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
//             }`}
//         >
//           <TrendingUp className={`w-4 h-4 shrink-0 ${activeTab === 'analytics' ? 'stroke-[2.5]' : ''}`} />
//           <span className="text-sm font-sans tracking-normal">Analytics & Safety Logs</span>
//         </button>

//         {/* <button
//           id="nav-tab-logs"
//           onClick={() => setActiveTab('logs')}
//           className={`flex items-center justify-between px-4 py-3 rounded-2xl font-medium transition-all duration-200 text-left active:scale-[0.98] ${activeTab === 'logs'
//             ? 'bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-500/25 border border-indigo-400/30'
//             : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
//             }`}
//         >
//           <div className="flex items-center gap-3">
//             <ClipboardList className={`w-4 h-4 shrink-0 ${activeTab === 'logs' ? 'stroke-[2.5]' : ''}`} />
//             <span className="text-sm font-sans tracking-normal">Safety Logs</span>
//           </div>
//           {unreadCount > 0 && (
//             <span className="px-2 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 font-mono text-[10px] font-bold">
//               {unreadCount}
//             </span>
//           )}
//         </button> */}
//       </div>

//       {/* Bottom Emergency Button & Secondary Links */}
//       <div className="mt-auto flex flex-col gap-3 pt-4">
//         <button
//           id="btn-sidebar-emergency-off"
//           onClick={onEmergencyClick}
//           className={`w-full py-3.5 px-4 rounded-2xl font-bold font-mono text-xs tracking-wider flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${isEmergency
//             ? 'bg-rose-500 text-white animate-pulse glow-danger'
//             : 'bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30 glow-danger shadow-lg shadow-rose-500/10'
//             }`}
//         >
//           <AlertTriangle className="w-4 h-4 shrink-0" />
//           <span>EMERGENCY OFF</span>
//         </button>

//         <div className="flex flex-col gap-1 font-mono text-xs border-t border-white/5 pt-3">
//           <button
//             id="btn-sidebar-support"
//             onClick={() => alert('Gaston Emergency Support Line: +1 (800) 555-SAFE\nField Dispatch: 24/7 Monitored Command Center')}
//             className="flex items-center gap-3 px-3.5 py-2.5 text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-xl transition-colors text-left"
//           >
//             <HelpCircle className="w-4 h-4" />
//             <span className="font-sans text-xs">Support</span>
//           </button>

//           <button
//             id="btn-sidebar-signout"
//             onClick={() => alert('Session active for Station Alpha. Operator locked in monitoring duty.')}
//             className="flex items-center gap-3 px-3.5 py-2.5 text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-xl transition-colors text-left"
//           >
//             <LogOut className="w-4 h-4" />
//             <span className="font-sans text-xs">Sign Out</span>
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };




import React, { useState } from 'react';
import { ActiveTab, SystemStatus } from '../types';
import { ASSET_IMAGES } from '../data/mockData';
import { Cylinder } from '../types';
// export const SidebarNav: React.FC<SidebarNavProps>
import {
  LayoutDashboard,
  Radio,
  TrendingUp,
  ClipboardList,
  AlertTriangle,
  HelpCircle,
  LogOut,
  ShieldCheck,
  X,
  Phone,
  Flame,
  Ambulance,
  ShieldAlert
} from 'lucide-react';

interface SidebarNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  systemStatus: SystemStatus;
  onEmergencyClick: () => void;
  unreadCount: number;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activeTab,
  setActiveTab,
  systemStatus,
  onEmergencyClick,
  unreadCount,
}) => {

  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  const isEmergency =
    systemStatus === 'CRITICAL' ||
    systemStatus === 'EMERGENCY_SHUTDOWN';

  return (
    <>
      <nav
        id="desktop-sidebar-nav"
        className="hidden lg:flex flex-col h-screen p-5 gap-4 fixed left-0 top-0 w-[280px] bg-[#07080C] border-r border-white/5 z-40 select-none overflow-y-auto"
      >

        {/* Brand Header */}
        <div className="flex items-center gap-3 mb-6 mt-1 px-1">
          <div className="relative w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20 overflow-hidden">

            <img
              src={"../assets/img/logo.jpeg"}
              alt="Gaston Sensor LED Indicator"
              className="w-full h-full object-cover mix-blend-screen opacity-90"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />

            <div className="absolute inset-0 bg-indigo-500/20 pointer-events-none" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-white font-bold text-base tracking-tight font-sans">
                Gaston
              </h1>

              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <p className="font-mono text-[11px] text-indigo-400 font-medium tracking-wide">
              {isEmergency
                ? 'ALARM ENGAGED'
                : 'SAFETY AT EVERY BREATH'}
            </p>
          </div>
        </div>


        {/* Main Navigation */}
        <div className="flex flex-col gap-1.5 flex-grow font-mono text-xs">

          <button
            id="nav-tab-dashboard"
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-all duration-200 text-left active:scale-[0.98] ${activeTab === 'dashboard'
              ? 'bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-500/25 border border-indigo-400/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
          >
            <LayoutDashboard className="w-4 h-4 shrink-0" />

            <span className="text-sm font-sans tracking-normal">
              Dashboard
            </span>
          </button>


          <button
            id="nav-tab-control"
            onClick={() => setActiveTab('control')}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-all duration-200 text-left active:scale-[0.98] ${activeTab === 'control'
              ? 'bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-500/25 border border-indigo-400/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
          >
            <Radio className="w-4 h-4 shrink-0" />

            <span className="text-sm font-sans tracking-normal">
              Device Control
            </span>
          </button>


          <button
            id="nav-tab-analytics"
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-all duration-200 text-left active:scale-[0.98] ${activeTab === 'analytics'
              ? 'bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-500/25 border border-indigo-400/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
          >
            <TrendingUp className="w-4 h-4 shrink-0" />

            <span className="text-sm font-sans tracking-normal">
              Analytics & Safety Logs
            </span>
          </button>

        </div>


        {/* Bottom */}
        <div className="mt-auto flex flex-col gap-3 pt-4">

          {/* Emergency */}
          <button
            id="btn-sidebar-emergency-off"
            onClick={onEmergencyClick}
            className={`w-full py-3.5 px-4 rounded-2xl font-bold font-mono text-xs tracking-wider flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${isEmergency
              ? 'bg-rose-500 text-white animate-pulse glow-danger'
              : 'bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30 glow-danger shadow-lg shadow-rose-500/10'
              }`}
          >
            <AlertTriangle className="w-4 h-4 shrink-0" />

            <span>EMERGENCY OFF</span>
          </button>


          {/* Support + Sign Out */}
          <div className="flex flex-col gap-1 font-mono text-xs border-t border-white/5 pt-3">

            <button
              id="btn-sidebar-support"
              onClick={() => setShowSupportModal(true)}
              className="flex items-center gap-3 px-3.5 py-2.5 text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-xl transition-colors text-left"
            >
              <HelpCircle className="w-4 h-4" />

              <span className="font-sans text-xs">
                Support
              </span>
            </button>


            {/* <button
              id="btn-sidebar-signout"
              onClick={() =>
                alert(
                  'Session active for Station Alpha. Operator locked in monitoring duty.'
                )
              }
              className="flex items-center gap-3 px-3.5 py-2.5 text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-xl transition-colors text-left"
            >
              <LogOut className="w-4 h-4" />

              <span className="font-sans text-xs">
                Sign Out
              </span>
            </button> */}

            <button
              id="btn-sidebar-signout"
              onClick={() => setShowSignOutModal(true)}
              className="flex items-center gap-3 px-3.5 py-2.5 text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-xl transition-colors text-left"
            >
              <LogOut className="w-4 h-4" />

              <span className="font-sans text-xs">
                Sign Out
              </span>
            </button>

            {showSignOutModal && (
              <div
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md px-4"
                onClick={() => setShowSignOutModal(false)}
              >
                <div
                  className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#080B12] shadow-2xl shadow-black/60 overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >

                  {/* Top Glow */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-24 bg-indigo-600/10 blur-3xl pointer-events-none" />

                  {/* Header */}
                  <div className="relative flex items-center justify-between px-6 py-5 border-b border-white/10">

                    <div className="flex items-center gap-4">

                      <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                        <LogOut className="w-5 h-5 text-indigo-400" />
                      </div>

                      <div>
                        <h2 className="text-white font-semibold text-base">
                          Sign Out
                        </h2>

                        <p className="font-mono text-[10px] text-slate-500 mt-1">
                          OPERATOR SESSION
                        </p>
                      </div>

                    </div>

                    <button
                      onClick={() => setShowSignOutModal(false)}
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/5 transition-all"
                    >
                      <X className="w-5 h-5" />
                    </button>

                  </div>


                  {/* Content */}
                  <div className="p-6">

                    {/* Session Status */}
                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">

                      <div className="flex items-center gap-3">

                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                        </span>

                        <span className="text-xs font-mono text-emerald-300">
                          SESSION ACTIVE
                        </span>

                      </div>

                      <div className="mt-4">

                        <p className="text-[11px] text-slate-500">
                          Current Station
                        </p>

                        <p className="mt-1 text-sm font-mono text-slate-200">
                          Station Alpha
                        </p>

                      </div>

                    </div>


                    {/* Warning */}
                    <div className="mt-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">

                      <div className="flex gap-3">

                        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />

                        <div>

                          <p className="text-xs font-medium text-amber-300">
                            Confirm Sign Out
                          </p>

                          <p className="mt-1 text-[11px] leading-5 text-slate-500">
                            Signing out will end your current operator
                            session and return you to the login screen.
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>


                  {/* Footer Buttons */}
                  <div className="px-6 py-4 border-t border-white/10 flex justify-end gap-3">

                    <button
                      onClick={() => setShowSignOutModal(false)}
                      className="px-5 py-2.5 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 text-xs font-medium transition-all"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={() => {
                        setShowSignOutModal(false);

                        console.log('Operator signed out');
                      }}
                      className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>

                  </div>

                </div>
              </div>
            )}

          </div>
        </div>

      </nav>


      {/* =====================================================
          SUPPORT MODAL
      ====================================================== */}

      {showSupportModal && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md px-4"
          onClick={() => setShowSupportModal(false)}
        >

          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-indigo-500/20 bg-[#080B12] shadow-2xl shadow-indigo-950/50"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Top Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-24 bg-indigo-600/10 blur-3xl pointer-events-none" />


            {/* Modal Header */}
            <div className="relative flex items-center justify-between px-6 py-5 border-b border-white/10">

              <div className="flex items-center gap-4">

                <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shadow-lg shadow-indigo-500/10">

                  <ShieldCheck className="w-6 h-6 text-indigo-400" />

                </div>

                <div>
                  <h2 className="text-white font-semibold text-base">
                    Safety & Emergency Support
                  </h2>

                  <p className="font-mono text-[10px] text-indigo-400 mt-1 tracking-wider">
                    GASTON SECURITY COMMAND CENTER
                  </p>
                </div>

              </div>


              <button
                onClick={() => setShowSupportModal(false)}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/5 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

            </div>


            {/* Status */}
            <div className="px-6 pt-5">

              <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">

                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                </span>

                <span className="text-xs text-emerald-300 font-mono">
                  EMERGENCY SERVICES AVAILABLE 24/7
                </span>

              </div>

            </div>


            {/* Contact Grid */}
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">


              {/* Fire */}
              <a
                href="tel:101"
                className="group rounded-2xl border border-white/10 bg-white/[0.025] p-5 hover:bg-rose-500/5 hover:border-rose-500/30 transition-all"
              >

                <div className="flex items-center justify-between">

                  <div className="w-11 h-11 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                    <Flame className="w-5 h-5 text-rose-400" />
                  </div>

                  <Phone className="w-4 h-4 text-slate-600 group-hover:text-rose-400 transition-colors" />

                </div>

                <p className="mt-4 text-xs text-slate-400">
                  Fire & Rescue
                </p>

                <p className="mt-1 text-xl font-mono font-bold text-white">
                  101
                </p>

                <p className="mt-1 text-[10px] text-slate-600 font-mono">
                  FIRE EMERGENCY
                </p>

              </a>


              {/* Ambulance */}
              <a
                href="tel:108"
                className="group rounded-2xl border border-white/10 bg-white/[0.025] p-5 hover:bg-emerald-500/5 hover:border-emerald-500/30 transition-all"
              >

                <div className="flex items-center justify-between">

                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <Ambulance className="w-5 h-5 text-emerald-400" />
                  </div>

                  <Phone className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition-colors" />

                </div>

                <p className="mt-4 text-xs text-slate-400">
                  Ambulance
                </p>

                <p className="mt-1 text-xl font-mono font-bold text-white">
                  108
                </p>

                <p className="mt-1 text-[10px] text-slate-600 font-mono">
                  MEDICAL EMERGENCY
                </p>

              </a>


              {/* Police */}
              <a
                href="tel:112"
                className="group rounded-2xl border border-white/10 bg-white/[0.025] p-5 hover:bg-indigo-500/5 hover:border-indigo-500/30 transition-all"
              >

                <div className="flex items-center justify-between">

                  <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                    <ShieldAlert className="w-5 h-5 text-indigo-400" />
                  </div>

                  <Phone className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 transition-colors" />

                </div>

                <p className="mt-4 text-xs text-slate-400">
                  Police / Emergency
                </p>

                <p className="mt-1 text-xl font-mono font-bold text-white">
                  112
                </p>

                <p className="mt-1 text-[10px] text-slate-600 font-mono">
                  NATIONAL EMERGENCY
                </p>

              </a>


              {/* Gaston Support */}
              <a
                href="tel:+18005557233"
                className="group rounded-2xl border border-white/10 bg-white/[0.025] p-5 hover:bg-cyan-500/5 hover:border-cyan-500/30 transition-all"
              >

                <div className="flex items-center justify-between">

                  <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-cyan-400" />
                  </div>

                  <Phone className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />

                </div>

                <p className="mt-4 text-xs text-slate-400">
                  Gaston Company Support
                </p>

                <p className="mt-1 text-lg font-mono font-bold text-cyan-400">
                  1800-11-1363
                </p>

                <p className="mt-1 text-[10px] text-slate-600 font-mono">
                  24/7 MONITORED SUPPORT
                </p>

              </a>

            </div>


            {/* Additional Safety Contacts */}
            <div className="px-6 pb-6">

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">

                <div className="flex items-center gap-2 mb-4">

                  <ShieldCheck className="w-4 h-4 text-indigo-400" />

                  <span className="text-xs font-semibold text-slate-300">
                    Additional Safety Contacts
                  </span>

                </div>


                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                  <div className="rounded-xl bg-white/[0.03] border border-white/5 px-4 py-3">
                    <p className="text-[10px] text-slate-500">
                      Disaster Management
                    </p>
                    <p className="mt-1 text-sm font-mono text-slate-300">
                      1078
                    </p>
                  </div>


                  <div className="rounded-xl bg-white/[0.03] border border-white/5 px-4 py-3">
                    <p className="text-[10px] text-slate-500">
                      Women Helpline
                    </p>
                    <p className="mt-1 text-sm font-mono text-slate-300">
                      181
                    </p>
                  </div>


                  <div className="rounded-xl bg-white/[0.03] border border-white/5 px-4 py-3">
                    <p className="text-[10px] text-slate-500">
                      Child Helpline
                    </p>
                    <p className="mt-1 text-sm font-mono text-slate-300">
                      1098
                    </p>
                  </div>

                </div>

              </div>

            </div>


            {/* Footer */}
            <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between">

              <p className="text-[10px] text-slate-600 font-mono">
                GASTON • SUPPORT CHANNEL ACTIVE
              </p>

              <button
                onClick={() => setShowSupportModal(false)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-colors shadow-lg shadow-indigo-500/20"
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}

    </>
  );
};