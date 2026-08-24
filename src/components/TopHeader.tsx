// import React, { useState, useEffect } from 'react';
// import { ActiveTab, SystemStatus } from '../types';
// import { ASSET_IMAGES } from '../data/mockData';
// import {
//   Bell,
//   Settings,
//   Smartphone,
//   Monitor,
//   Flame,
//   RotateCcw,
//   CheckCircle2,
//   AlertOctagon,
//   Shield,
//   Activity
// } from 'lucide-react';

// interface TopHeaderProps {
//   activeTab: ActiveTab;
//   setActiveTab: (tab: ActiveTab) => void;
//   systemStatus: SystemStatus;
//   unreadCount: number;
//   onOpenNotifications: () => void;
//   onOpenCalibration: () => void;
//   isMobilePreviewMode: boolean;
//   setIsMobilePreviewMode: (val: boolean) => void;
//   onTriggerSimulatedLeak: () => void;
//   onResetSystem: () => void;
// }

// export const TopHeader: React.FC<TopHeaderProps> = ({
//   activeTab,
//   setActiveTab,
//   systemStatus,
//   unreadCount,
//   onOpenNotifications,
//   onOpenCalibration,
//   isMobilePreviewMode,
//   setIsMobilePreviewMode,
//   onTriggerSimulatedLeak,
//   onResetSystem,
// }) => {
//   const [timeString, setTimeString] = useState<string>('');

//   useEffect(() => {
//     const updateTime = () => {
//       const now = new Date();
//       setTimeString(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
//     };
//     updateTime();
//     const interval = setInterval(updateTime, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const getBreadcrumbTitle = () => {
//     switch (activeTab) {
//       case 'dashboard': return 'Dashboard';
//       case 'control': return 'Device Control';
//       case 'analytics': return 'Analytics';
//       case 'logs': return 'Safety Logs';
//       default: return 'Dashboard';
//     }
//   };

//   return (
//     <header
//       id="main-app-header"
//       className="fixed top-0 w-full lg:w-[calc(100%-280px)] lg:left-[280px] z-30 flex justify-between items-center px-4 sm:px-6 h-16 bg-[#0A0B10]/80 backdrop-blur-xl border-b border-white/5 shadow-sm"
//     >
//       {/* Left side: Mobile Brand & Desktop Breadcrumbs */}
//       <div className="flex items-center gap-3">
//         {/* Mobile brand title */}
//         <div className="lg:hidden flex items-center gap-2.5">
//           <div className="w-8 h-8 rounded-xl bg-indigo-600 border border-indigo-400/40 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 overflow-hidden p-1">
//             <img
//               src={ASSET_IMAGES.GastonBadgeLogo}
//               alt="Gaston Logo"
//               className="w-full h-full object-contain"
//               onError={(e) => {
//                 (e.target as HTMLElement).style.display = 'none';
//               }}
//             />
//           </div>
//           <div className="flex flex-col">
//             <span className="font-bold text-base tracking-tight text-white font-sans flex items-center gap-1.5">
//               Gaston
//               <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
//             </span>
//           </div>
//         </div>

//         {/* Desktop Breadcrumbs */}
//         <div className="hidden lg:flex items-center gap-2 text-sm">
//           <span className="text-slate-400">Command Center</span>
//           <span className="text-white/20">/</span>
//           <span className="text-slate-200 font-medium">{getBreadcrumbTitle()}</span>
//           <div className="ml-4 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300 flex items-center gap-2">
//             <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
//             <span className="text-[11px] tracking-wider">GRID LIVE: {timeString}</span>
//           </div>
//         </div>
//       </div>

//       {/* Right side: Simulation, Mode Toggles, Notifications, Profile */}
//       <div className="flex items-center gap-2 sm:gap-3">
//         {/* Quick Simulation controls for testing the app */}
//         <div className="hidden md:flex items-center gap-1.5 bg-white/5 p-1 rounded-full border border-white/10 text-xs font-mono">
//           {systemStatus === 'CRITICAL' || systemStatus === 'EMERGENCY_SHUTDOWN' ? (
//             <button
//               id="btn-quick-reset"
//               onClick={onResetSystem}
//               className="px-3 py-1 rounded-full bg-emerald-500 text-white hover:bg-emerald-400 font-bold flex items-center gap-1.5 transition-colors shadow-md shadow-emerald-500/20"
//               title="Reset system to SAFE state"
//             >
//               <RotateCcw className="w-3.5 h-3.5" />
//               <span>RESET SAFE</span>
//             </button>
//           ) : (
//             <button
//               id="btn-quick-sim-leak"
//               onClick={onTriggerSimulatedLeak}
//               className="px-3 py-1 rounded-full bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 flex items-center gap-1.5 transition-colors"
//               title="Simulate a sudden LPG leak spike to test safety protocols"
//             >
//               <Flame className="w-3.5 h-3.5 text-rose-400" />
//               <span>SIMULATE LEAK</span>
//             </button>
//           )}
//         </div>

//         {/* Device View Mode Switcher (Desktop layout vs Mobile screen mockup) */}
//         <button
//           id="btn-toggle-device-view"
//           onClick={() => setIsMobilePreviewMode(!isMobilePreviewMode)}
//           className={`px-3 py-1.5 rounded-full border transition-all text-xs flex items-center gap-2 ${isMobilePreviewMode
//             ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-500/20'
//             : 'bg-white/5 text-slate-300 border-white/10 hover:text-white hover:bg-white/10'
//             }`}
//           title={isMobilePreviewMode ? "Switch to Wide Dashboard View" : "View in Mobile App Frame"}
//         >
//           {isMobilePreviewMode ? (
//             <>
//               <Monitor className="w-3.5 h-3.5" />
//               <span className="hidden sm:inline font-mono text-[11px]">Wide View</span>
//             </>
//           ) : (
//             <>
//               <Smartphone className="w-3.5 h-3.5 text-slate-400" />
//               <span className="hidden sm:inline font-mono text-[11px]">Mobile View</span>
//             </>
//           )}
//         </button>

//         {/* Notifications Icon Button */}
//         <button
//           id="btn-header-notifications"
//           onClick={onOpenNotifications}
//           className="p-2 text-slate-400 hover:text-white hover:bg-white/5 transition-colors rounded-full relative cursor-pointer active:scale-95 duration-200"
//           title="Recent System Alerts"
//         >
//           <Bell className="w-4 h-4" />
//           {unreadCount > 0 && (
//             <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse ring-2 ring-[#0A0B10]" />
//           )}
//         </button>

//         {/* Calibration / Settings */}
//         <button
//           id="btn-header-settings"
//           onClick={onOpenCalibration}
//           className="p-2 text-slate-400 hover:text-white hover:bg-white/5 transition-colors rounded-full cursor-pointer active:scale-95 duration-200"
//           title="Sensor Diagnostics & Calibration"
//         >
//           <Settings className="w-4 h-4" />
//         </button>

//         {/* Operator Profile Avatar */}
//         <div
//           // onClick={onOpenCalibration}
//           className="w-8 h-8 rounded-full overflow-hidden border border-indigo-400/40 cursor-pointer relative shrink-0 ring-1 ring-white/10"
//           title="Chief Safety Engineer (Station Alpha)"
//         >
//           <img
//             src={ASSET_IMAGES.engineerAvatar}
//             alt="Safety Engineer Profile"
//             className="w-full h-full object-cover"
//           />
//           <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 ring-1 ring-[#0A0B10]" />
//         </div>
//       </div>
//     </header>
//   );
// };


import React, { useState, useEffect } from 'react';
import { ActiveTab, SystemStatus } from '../types';
import { ASSET_IMAGES } from '../data/mockData';

import {
  Bell,
  Settings,
  Smartphone,
  Monitor,
  Flame,
  RotateCcw,
  User,
  Phone,
  ShieldAlert,
  LogOut,
  X,
  Mail,
  MapPin,
  Briefcase,
  ChevronRight,
  PhoneCall,
  Clock,
  ShieldCheck,
} from 'lucide-react';


// ============================================================
// TYPES
// ============================================================

interface TopHeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  systemStatus: SystemStatus;
  unreadCount: number;
  onOpenNotifications: () => void;
  onOpenCalibration: () => void;
  isMobilePreviewMode: boolean;
  setIsMobilePreviewMode: (val: boolean) => void;
  onTriggerSimulatedLeak: () => void;
  onResetSystem: () => void;
}


// ============================================================
// PROFILE DATA
// ============================================================

interface EngineerProfile {
  name: string;
  role: string;
  station: string;
  email: string;
  phone: string;
  location: string;
  employeeId: string;
  shift: string;
}

interface EmergencyContact {
  name: string;
  relation: string;
  phone: string;
  availability: string;
}

const engineerProfile: EngineerProfile = {
  name: 'Chief Safety Engineer',
  role: 'Chief Safety Engineer',
  station: 'Station Alpha',
  email: 'safety.engineer@gaston.com',
  phone: '+91 98765 43210',
  location: 'Surat, Gujarat',
  employeeId: 'VAL-ENG-001',
  shift: '24×7 Safety Operations',
};

const emergencyContact: EmergencyContact = {
  name: 'Emergency Control Room',
  relation: '24×7 Emergency Support',
  phone: '+91 1800 123 4567',
  availability: 'Available 24×7',
};


// ============================================================
// TOP HEADER
// ============================================================

export const TopHeader: React.FC<TopHeaderProps> = ({
  activeTab,
  setActiveTab,
  systemStatus,
  unreadCount,
  onOpenNotifications,
  onOpenCalibration,
  isMobilePreviewMode,
  setIsMobilePreviewMode,
  onTriggerSimulatedLeak,
  onResetSystem,
}) => {

  // ============================================================
  // STATE
  // ============================================================

  const [timeString, setTimeString] = useState<string>('');

  const [isProfileOpen, setIsProfileOpen] =
    useState<boolean>(false);

  const [profileTab, setProfileTab] =
    useState<'profile' | 'emergency'>('profile');


  // ============================================================
  // LIVE CLOCK
  // ============================================================

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      setTimeString(
        now.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);


  // ============================================================
  // BREADCRUMB
  // ============================================================

  const getBreadcrumbTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Dashboard';

      case 'control':
        return 'Device Control';

      case 'analytics':
        return 'Analytics';

      case 'logs':
        return 'Safety Logs';

      default:
        return 'Dashboard';
    }
  };


  // ============================================================
  // OPEN PROFILE
  // ============================================================

  const openProfile = () => {
    setIsProfileOpen(true);
    setProfileTab('profile');
  };


  // ============================================================
  // CLOSE PROFILE
  // ============================================================

  const closeProfile = () => {
    setIsProfileOpen(false);
  };


  // ============================================================
  // EMERGENCY CALL
  // ============================================================

  const callEmergency = () => {
    window.location.href = `tel:${emergencyContact.phone}`;
  };


  // ============================================================
  // LOGOUT
  // ============================================================

  const handleLogout = () => {
    const confirmed = window.confirm(
      'Are you sure you want to logout from the Safety Control Center?'
    );

    if (confirmed) {
      console.log('User logged out');

      // Add your real logout logic here.
      // Example:
      //
      // localStorage.removeItem('token');
      // window.location.href = '/login';

      setIsProfileOpen(false);
    }
  };


  // ============================================================
  // JSX
  // ============================================================

  return (
    <>
      {/* ======================================================
          MAIN HEADER
      ====================================================== */}

      <header
        id="main-app-header"
        className="
          fixed top-0
          w-full lg:w-[calc(100%-280px)]
          lg:left-[280px]
          z-30
          flex justify-between items-center
          px-4 sm:px-6
          h-16
          bg-[#0A0B10]/80
          backdrop-blur-xl
          border-b border-white/5
          shadow-sm
        "
      >

        {/* ====================================================
            LEFT SIDE
        ==================================================== */}

        <div className="flex items-center gap-3">

          {/* MOBILE BRAND */}

          <div className="lg:hidden flex items-center gap-2.5">

            <div
              className="
                w-8 h-8
                rounded-xl
                bg-indigo-600
                border border-indigo-400/40
                flex items-center justify-center
                text-white
                shadow-md shadow-indigo-500/25
                overflow-hidden
                p-1
              "
            >
              <img
                src={ASSET_IMAGES.GastonBadgeLogo}
                alt="Gaston Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            <div className="flex flex-col">

              <span
                className="
                  font-bold
                  text-base
                  tracking-tight
                  text-white
                  font-sans
                  flex items-center gap-1.5
                "
              >
                Gaston

                <span
                  className="
                    w-1.5 h-1.5
                    rounded-full
                    bg-emerald-400
                    animate-pulse
                  "
                />
              </span>

            </div>
          </div>


          {/* DESKTOP BREADCRUMB */}

          <div className="hidden lg:flex items-center gap-2 text-sm">

            <span className="text-slate-400">
              Command Center
            </span>

            <span className="text-white/20">
              /
            </span>

            <span className="text-slate-200 font-medium">
              {getBreadcrumbTitle()}
            </span>

            <div
              className="
                ml-4
                px-3 py-1
                rounded-full
                bg-white/5
                border border-white/10
                text-xs
                font-mono
                text-slate-300
                flex items-center gap-2
              "
            >

              <span
                className="
                  w-1.5 h-1.5
                  rounded-full
                  bg-emerald-400
                  animate-ping
                "
              />

              <span className="text-[11px] tracking-wider">
                GRID LIVE: {timeString}
              </span>

            </div>
          </div>
        </div>


        {/* ====================================================
            RIGHT SIDE
        ==================================================== */}

        <div className="flex items-center gap-2 sm:gap-3">

          {/* ==================================================
              QUICK SIMULATION
          ================================================== */}

          <div
            className="
              hidden md:flex
              items-center gap-1.5
              bg-white/5
              p-1
              rounded-full
              border border-white/10
              text-xs
              font-mono
            "
          >

            {systemStatus === 'CRITICAL' ||
              systemStatus === 'EMERGENCY_SHUTDOWN' ? (

              <button
                id="btn-quick-reset"
                onClick={onResetSystem}
                className="
                  px-3 py-1
                  rounded-full
                  bg-emerald-500
                  text-white
                  hover:bg-emerald-400
                  font-bold
                  flex items-center gap-1.5
                  transition-colors
                  shadow-md shadow-emerald-500/20
                "
                title="Reset system to SAFE state"
              >

                <RotateCcw className="w-3.5 h-3.5" />

                <span>
                  RESET SAFE
                </span>

              </button>

            ) : (

              <button
                id="btn-quick-sim-leak"
                onClick={onTriggerSimulatedLeak}
                className="
                  px-3 py-1
                  rounded-full
                  bg-rose-500/20
                  hover:bg-rose-500/30
                  text-rose-300
                  border border-rose-500/40
                  flex items-center gap-1.5
                  transition-colors
                "
                title="Simulate a sudden LPG leak spike to test safety protocols"
              >

                <Flame
                  className="
                    w-3.5 h-3.5
                    text-rose-400
                  "
                />

                <span>
                  SIMULATE LEAK
                </span>

              </button>

            )}

          </div>


          {/* ==================================================
              DEVICE VIEW MODE
          ================================================== */}

          {/* <button
            id="btn-toggle-device-view"
            onClick={() =>
              setIsMobilePreviewMode(!isMobilePreviewMode)
            }
            className={`
              px-3 py-1.5
              rounded-full
              border
              transition-all
              text-xs
              flex items-center gap-2

              ${isMobilePreviewMode
                ? `
                    bg-indigo-600
                    text-white
                    border-indigo-500
                    shadow-md
                    shadow-indigo-500/20
                  `
                : `
                    bg-white/5
                    text-slate-300
                    border-white/10
                    hover:text-white
                    hover:bg-white/10
                  `
              }
            `}
            title={
              isMobilePreviewMode
                ? 'Switch to Wide Dashboard View'
                : 'View in Mobile App Frame'
            }
          >

            {isMobilePreviewMode ? (

              <>
                <Monitor className="w-3.5 h-3.5" />

                <span
                  className="
                    hidden sm:inline
                    font-mono
                    text-[11px]
                  "
                >
                  Wide View
                </span>
              </>

            ) : (

              <>
                <Smartphone
                  className="
                    w-3.5 h-3.5
                    text-slate-400
                  "
                />

                <span
                  className="
                    hidden sm:inline
                    font-mono
                    text-[11px]
                  "
                >
                  Mobile View
                </span>
              </>

            )}

          </button> */}


          {/* ==================================================
              NOTIFICATIONS
          ================================================== */}

          <button
            id="btn-header-notifications"
            onClick={onOpenNotifications}
            className="
              p-2
              text-slate-400
              hover:text-white
              hover:bg-white/5
              transition-colors
              rounded-full
              relative
              cursor-pointer
              active:scale-95
              duration-200
            "
            title="Recent System Alerts"
          >

            <Bell className="w-4 h-4" />

            {unreadCount > 0 && (

              <span
                className="
                  absolute
                  top-1.5
                  right-1.5
                  w-2 h-2
                  bg-rose-500
                  rounded-full
                  animate-pulse
                  ring-2
                  ring-[#0A0B10]
                "
              />

            )}

          </button>


          {/* ==================================================
              SETTINGS
          ================================================== */}

          <button
            id="btn-header-settings"
            onClick={onOpenCalibration}
            className="
              p-2
              text-slate-400
              hover:text-white
              hover:bg-white/5
              transition-colors
              rounded-full
              cursor-pointer
              active:scale-95
              duration-200
            "
            title="Sensor Diagnostics & Calibration"
          >

            <Settings className="w-4 h-4" />

          </button>


          {/* ==================================================
              PROFILE AVATAR
          ================================================== */}

          <button
            type="button"
            onClick={openProfile}
            className="
              w-8 h-8
              rounded-full
              overflow-hidden
              border border-indigo-400/40
              cursor-pointer
              relative
              shrink-0
              ring-1 ring-white/10
              hover:ring-indigo-400/70
              hover:scale-105
              transition-all
              duration-200
              focus:outline-none
            "
            title="Chief Safety Engineer (Station Alpha)"
          >

            <img
              src={ASSET_IMAGES.engineerAvatar}
              alt="Safety Engineer Profile"
              className="
                w-full
                h-full
                object-cover
              "
            />

            {/* ONLINE STATUS */}

            <span
              className="
                absolute
                bottom-0
                right-0
                w-2
                h-2
                rounded-full
                bg-emerald-400
                ring-1
                ring-[#0A0B10]
              "
            />

          </button>

        </div>

      </header>


      {/* ========================================================
          PROFILE OVERLAY
      ======================================================== */}

      {isProfileOpen && (

        <div
          className="
            fixed
            inset-0
            z-40
            bg-black/30
            backdrop-blur-[2px]
          "
          onClick={closeProfile}
        />

      )}


      {/* ========================================================
          PROFILE PANEL
      ======================================================== */}

      <aside
        className={`
          fixed
          top-1/2
          right-6
          -translate-y-1/2
          z-50

          w-[500px]
          h-[500px]

          max-w-[calc(100vw-32px)]
          max-h-[calc(100vh-32px)]

          rounded-2xl

          bg-[#0A0B10]/98
          backdrop-blur-2xl

          border
          border-white/10

          shadow-[0_25px_80px_rgba(0,0,0,0.70)]

          overflow-hidden

          transition-all
          duration-300
          ease-out

          ${isProfileOpen
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-12 pointer-events-none'
          }
        `}
      >

        {/* ======================================================
            PANEL HEADER
        ====================================================== */}

        <div
          className="
            h-[70px]
            px-5
            flex
            items-center
            justify-between

            border-b
            border-white/10

            bg-white/[0.02]
          "
        >

          <div>

            <p
              className="
                text-[10px]
                uppercase
                tracking-[0.2em]
                text-indigo-300/70
              "
            >
              Safety Control
            </p>

            <h2
              className="
                text-lg
                font-semibold
                text-white
                mt-0.5
              "
            >
              Engineer Account
            </h2>

          </div>


          {/* CLOSE */}

          <button
            type="button"
            onClick={closeProfile}
            className="
              w-9
              h-9
              rounded-lg
              flex
              items-center
              justify-center

              text-slate-400

              hover:text-white
              hover:bg-white/10

              transition
            "
            title="Close"
          >

            <X size={18} />

          </button>

        </div>


        {/* ======================================================
            PROFILE MINI HEADER
        ====================================================== */}

        <div className="px-5 pt-4">

          <div
            className="
              flex
              items-center
              gap-4

              p-3.5

              rounded-xl

              bg-gradient-to-r
              from-indigo-500/10
              to-emerald-500/5

              border
              border-white/10
            "
          >

            {/* PROFILE IMAGE */}

            <div className="relative shrink-0">

              <img
                src={ASSET_IMAGES.engineerAvatar}
                alt="Chief Safety Engineer"
                className="
                  w-14
                  h-14
                  rounded-full
                  object-cover

                  border
                  border-indigo-400/40

                  ring-2
                  ring-indigo-400/10
                "
              />

              <span
                className="
                  absolute
                  bottom-0
                  right-0

                  w-3.5
                  h-3.5

                  rounded-full

                  bg-emerald-400

                  border-2
                  border-[#0A0B10]
                "
              />

            </div>


            {/* PROFILE NAME */}

            <div className="flex-1 min-w-0">

              <h3
                className="
                  text-white
                  font-semibold
                  text-sm
                "
              >
                {engineerProfile.name}
              </h3>

              <p
                className="
                  text-indigo-300
                  text-xs
                  mt-1
                "
              >
                {engineerProfile.station}
              </p>

              <div
                className="
                  flex
                  items-center
                  gap-1.5
                  mt-1.5
                "
              >

                <span
                  className="
                    w-1.5
                    h-1.5
                    rounded-full
                    bg-emerald-400
                  "
                />

                <span
                  className="
                    text-emerald-400
                    text-[10px]
                  "
                >
                  System Operator Online
                </span>

              </div>

            </div>

          </div>

        </div>


        {/* ======================================================
            TABS
        ====================================================== */}

        <div className="px-5 pt-3">

          <div
            className="
              flex
              p-1
              rounded-lg

              bg-white/[0.04]

              border
              border-white/5
            "
          >

            {/* PROFILE TAB */}

            <button
              type="button"
              onClick={() => setProfileTab('profile')}
              className={`
                flex-1
                py-2
                rounded-md

                text-xs
                font-medium

                flex
                items-center
                justify-center
                gap-2

                transition

                ${profileTab === 'profile'
                  ? `
                      bg-indigo-500/20
                      text-indigo-300
                    `
                  : `
                      text-slate-400
                      hover:text-white
                    `
                }
              `}
            >

              <User size={14} />

              Profile

            </button>


            {/* EMERGENCY TAB */}

            <button
              type="button"
              onClick={() => setProfileTab('emergency')}
              className={`
                flex-1
                py-2
                rounded-md

                text-xs
                font-medium

                flex
                items-center
                justify-center
                gap-2

                transition

                ${profileTab === 'emergency'
                  ? `
                      bg-red-500/20
                      text-red-300
                    `
                  : `
                      text-slate-400
                      hover:text-white
                    `
                }
              `}
            >

              <ShieldAlert size={14} />

              Emergency

            </button>

          </div>

        </div>


        {/* ======================================================
            CONTENT
        ====================================================== */}

        <div className="px-5 pt-3">

          {profileTab === 'profile' ? (

            /* ==================================================
               PROFILE CONTENT
            ================================================== */

            <div className="space-y-2">

              {/* ROLE */}

              <div
                className="
                  flex
                  items-center
                  gap-3

                  p-2.5

                  rounded-lg

                  bg-white/[0.03]

                  border
                  border-white/5
                "
              >

                <div
                  className="
                    w-8
                    h-8
                    rounded-lg

                    bg-indigo-500/10

                    flex
                    items-center
                    justify-center
                  "
                >

                  <Briefcase
                    size={15}
                    className="text-indigo-300"
                  />

                </div>

                <div>

                  <p
                    className="
                      text-[9px]
                      text-slate-500
                      uppercase
                      tracking-wider
                    "
                  >
                    Role
                  </p>

                  <p
                    className="
                      text-xs
                      text-slate-200
                      mt-0.5
                    "
                  >
                    {engineerProfile.role}
                  </p>

                </div>

              </div>


              {/* EMAIL */}

              <div
                className="
                  flex
                  items-center
                  gap-3

                  p-2.5

                  rounded-lg

                  bg-white/[0.03]

                  border
                  border-white/5
                "
              >

                <div
                  className="
                    w-8
                    h-8
                    rounded-lg

                    bg-indigo-500/10

                    flex
                    items-center
                    justify-center
                  "
                >

                  <Mail
                    size={15}
                    className="text-indigo-300"
                  />

                </div>

                <div className="min-w-0">

                  <p
                    className="
                      text-[9px]
                      text-slate-500
                      uppercase
                      tracking-wider
                    "
                  >
                    Email
                  </p>

                  <p
                    className="
                      text-xs
                      text-slate-200
                      mt-0.5
                      truncate
                    "
                  >
                    {engineerProfile.email}
                  </p>

                </div>

              </div>


              {/* PHONE */}

              <div
                className="
                  flex
                  items-center
                  gap-3

                  p-2.5

                  rounded-lg

                  bg-white/[0.03]

                  border
                  border-white/5
                "
              >

                <div
                  className="
                    w-8
                    h-8
                    rounded-lg

                    bg-indigo-500/10

                    flex
                    items-center
                    justify-center
                  "
                >

                  <Phone
                    size={15}
                    className="text-indigo-300"
                  />

                </div>

                <div>

                  <p
                    className="
                      text-[9px]
                      text-slate-500
                      uppercase
                      tracking-wider
                    "
                  >
                    Contact
                  </p>

                  <p
                    className="
                      text-xs
                      text-slate-200
                      mt-0.5
                    "
                  >
                    {engineerProfile.phone}
                  </p>

                </div>

              </div>


              {/* LOCATION + ID */}

              <div className="grid grid-cols-2 gap-2">

                <div
                  className="
                    flex
                    items-center
                    gap-2

                    p-2.5

                    rounded-lg

                    bg-white/[0.03]

                    border
                    border-white/5
                  "
                >

                  <MapPin
                    size={14}
                    className="text-indigo-300 shrink-0"
                  />

                  <div className="min-w-0">

                    <p
                      className="
                        text-[8px]
                        text-slate-500
                        uppercase
                      "
                    >
                      Location
                    </p>

                    <p
                      className="
                        text-[11px]
                        text-slate-200
                        truncate
                      "
                    >
                      {engineerProfile.location}
                    </p>

                  </div>

                </div>


                <div
                  className="
                    flex
                    items-center
                    gap-2

                    p-2.5

                    rounded-lg

                    bg-white/[0.03]

                    border
                    border-white/5
                  "
                >

                  <ShieldCheck
                    size={14}
                    className="text-emerald-400 shrink-0"
                  />

                  <div>

                    <p
                      className="
                        text-[8px]
                        text-slate-500
                        uppercase
                      "
                    >
                      Employee ID
                    </p>

                    <p
                      className="
                        text-[11px]
                        text-slate-200
                      "
                    >
                      {engineerProfile.employeeId}
                    </p>

                  </div>

                </div>

              </div>


              {/* SHIFT */}

              <div
                className="
                  flex
                  items-center
                  gap-2

                  px-3
                  py-2

                  rounded-lg

                  bg-emerald-500/5

                  border
                  border-emerald-500/10
                "
              >

                <Clock
                  size={14}
                  className="text-emerald-400"
                />

                <span
                  className="
                    text-[10px]
                    text-emerald-300
                  "
                >
                  {engineerProfile.shift}
                </span>

              </div>

            </div>

          ) : (

            /* ==================================================
               EMERGENCY CONTENT
            ================================================== */

            <div className="space-y-3">

              {/* WARNING */}

              <div
                className="
                  p-3.5
                  rounded-xl

                  bg-red-500/10

                  border
                  border-red-500/20
                "
              >

                <div className="flex items-center gap-3">

                  <div
                    className="
                      w-10
                      h-10
                      rounded-lg

                      bg-red-500/10

                      flex
                      items-center
                      justify-center
                    "
                  >

                    <ShieldAlert
                      size={20}
                      className="text-red-400"
                    />

                  </div>


                  <div>

                    <p
                      className="
                        text-red-300
                        font-semibold
                        text-sm
                      "
                    >
                      Emergency Contact
                    </p>

                    <p
                      className="
                        text-red-300/60
                        text-[10px]
                        mt-0.5
                      "
                    >
                      {emergencyContact.availability}
                    </p>

                  </div>

                </div>

              </div>


              {/* EMERGENCY CONTACT */}

              <div
                className="
                  p-4

                  rounded-xl

                  bg-white/[0.03]

                  border
                  border-white/10
                "
              >

                <div className="flex items-center justify-between">

                  <div>

                    <p
                      className="
                        text-white
                        font-semibold
                        text-sm
                      "
                    >
                      {emergencyContact.name}
                    </p>

                    <p
                      className="
                        text-slate-500
                        text-[10px]
                        mt-1
                      "
                    >
                      {emergencyContact.relation}
                    </p>

                  </div>

                  <div
                    className="
                      w-9
                      h-9
                      rounded-full

                      bg-emerald-500/10

                      flex
                      items-center
                      justify-center
                    "
                  >

                    <Phone
                      size={16}
                      className="text-emerald-400"
                    />

                  </div>

                </div>


                <div
                  className="
                    flex
                    items-center
                    gap-2

                    mt-4

                    px-3
                    py-2

                    rounded-lg

                    bg-black/20

                    border
                    border-white/5
                  "
                >

                  <Phone
                    size={14}
                    className="text-emerald-400"
                  />

                  <span
                    className="
                      text-slate-200
                      text-xs
                    "
                  >
                    {emergencyContact.phone}
                  </span>

                </div>

              </div>


              {/* EMERGENCY CALL */}

              <button
                type="button"
                onClick={callEmergency}
                className="
                  w-full
                  h-11

                  rounded-xl

                  bg-red-500
                  hover:bg-red-400

                  text-white

                  font-semibold
                  text-xs

                  flex
                  items-center
                  justify-center
                  gap-2

                  shadow-lg
                  shadow-red-500/10

                  transition

                  active:scale-[0.98]
                "
              >

                <PhoneCall size={16} />

                Call Emergency Control Room

              </button>


              {/* EMERGENCY NOTE */}

              <div
                className="
                  flex
                  items-start
                  gap-2

                  p-3

                  rounded-lg

                  bg-amber-500/5

                  border
                  border-amber-500/10
                "
              >

                <ShieldAlert
                  size={14}
                  className="
                    text-amber-400
                    mt-0.5
                    shrink-0
                  "
                />

                <p
                  className="
                    text-[9px]
                    leading-relaxed
                    text-amber-200/70
                  "
                >
                  Use the emergency control room for
                  immediate LPG leakage, fire, or
                  automatic shutdown assistance.
                </p>

              </div>

            </div>

          )}

        </div>


        {/* ======================================================
            FOOTER / LOGOUT
        ====================================================== */}

        <div
          className="
            absolute
            bottom-0
            left-0
            right-0

            p-4

            border-t
            border-white/10

            bg-[#0A0B10]/95
          "
        >

          <button
            type="button"
            onClick={handleLogout}
            className="
              w-full
              h-10

              rounded-xl

              bg-white/[0.04]

              hover:bg-red-500/10

              border
              border-white/10

              hover:border-red-500/20

              text-slate-300
              hover:text-red-300

              flex
              items-center
              gap-2

              px-3

              text-xs
              font-medium

              transition
            "
          >

            <LogOut size={15} />

            <span>
              Logout
            </span>

            <ChevronRight
              size={14}
              className="ml-auto"
            />

          </button>

        </div>

      </aside>
    </>
  );
};