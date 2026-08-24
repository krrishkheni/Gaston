
// import React, { useState, useEffect } from 'react';
// import { ActiveTab, Cylinder, SafetyLogEvent, SystemStatus } from './types';
// import { INITIAL_CYLINDERS, INITIAL_LOG_EVENTS } from './data/mockData';
// import { SidebarNav } from './components/SidebarNav';
// import { TopHeader } from './components/TopHeader';
// import { BottomNavMobile } from './components/BottomNavMobile';
// import { DashboardView } from './components/DashboardView';
// import { ValveControlView } from './components/ValveControlView';
// import { AnalyticsLogsView } from './components/AnalyticsLogsView';
// import { EmergencyModal } from './components/EmergencyModal';
// import { CalibrationModal } from './components/CalibrationModal';
// import { NotificationDrawer } from './components/NotificationDrawer';
// import { MobileDeviceFrame } from './components/MobileDeviceFrame';

// export default function App() {
//   const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
//   const [systemStatus, setSystemStatus] = useState<SystemStatus>('SAFE');

//   // Real-time sensor state
//   const [lpgPpm, setLpgPpm] = useState<number>(14);
//   const [temperature, setTemperature] = useState<number>(24.5);
//   const [humidity, setHumidity] = useState<number>(51);
//   const [flameDetected, setFlameDetected] = useState<boolean>(false);

//   // Manifold Cylinders & Event Logs
//   const [cylinders, setCylinders] = useState<Cylinder[]>(INITIAL_CYLINDERS);
//   const [logs, setLogs] = useState<SafetyLogEvent[]>(INITIAL_LOG_EVENTS);

//   // Modals & UI View Modes
//   const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState<boolean>(false);
//   const [isCalibrationModalOpen, setIsCalibrationModalOpen] = useState<boolean>(false);
//   const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
//   const [isMobilePreviewMode, setIsMobilePreviewMode] = useState<boolean>(false);
//   const [isSyncing, setIsSyncing] = useState<boolean>(false);

//   // Uptime ticker for active cylinders
//   useEffect(() => {
//     const timer = setInterval(() => {
//       if (systemStatus !== 'EMERGENCY_SHUTDOWN') {
//         setCylinders((prevCyls) =>
//           prevCyls.map((c) => {
//             if (c.actuatorActive) {
//               return { ...c, uptimeSeconds: c.uptimeSeconds + 1 };
//             }
//             return c;
//           })
//         );
//       }
//     }, 1000);
//     return () => clearInterval(timer);
//   }, [systemStatus]);

//   // Handle Cylinder Valve Toggle
//   const handleToggleCylinder = (id: string) => {
//     if (systemStatus === 'EMERGENCY_SHUTDOWN') {
//       alert('Safety Interlock Active: System is in Emergency Shutdown. Please initiate System Reset first.');
//       return;
//     }

//     setCylinders((prev) =>
//       prev.map((cyl) => {
//         if (cyl.id === id) {
//           const nextActive = !cyl.actuatorActive;
//           const nextStatus = nextActive ? 'ONLINE' : 'STANDBY';

//           // Add event log
//           const newLog: SafetyLogEvent = {
//             id: `log-${Date.now()}`,
//             timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
//             relativeTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//             type: 'MANUAL_OVERRIDE',
//             title: 'Manual Valve Actuation',
//             description: `Valve ${cyl.label} (${cyl.name}) switched to ${nextStatus} by operator.`,
//             statusText: 'MANUAL',
//             badgeType: 'neutral',
//             operator: 'Admin Console'
//           };
//           setLogs((prevLogs) => [newLog, ...prevLogs]);

//           return {
//             ...cyl,
//             actuatorActive: nextActive,
//             status: nextStatus,
//           };
//         }
//         return cyl;
//       })
//     );
//   };

//   // Handle Emergency Master Shutdown
//   const handleEmergencyShutdown = () => {
//     setSystemStatus('EMERGENCY_SHUTDOWN');

//     // Shut all cylinders
//     setCylinders((prev) =>
//       prev.map((c) => ({
//         ...c,
//         actuatorActive: false,
//         status: 'OFFLINE',
//       }))
//     );

//     // Create Critical Alert Log
//     const newLog: SafetyLogEvent = {
//       id: `log-${Date.now()}`,
//       timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
//       relativeTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       type: 'EMERGENCY_SHUTDOWN',
//       title: 'Emergency Master Shutdown',
//       description: 'Critical override engaged. All manifold solenoid valves sealed instantly.',
//       statusText: 'AUTO-TRIGGERED SHUTDOWN',
//       badgeType: 'danger',
//       zone: 'All Sectors'
//     };
//     setLogs((prevLogs) => [newLog, ...prevLogs]);
//     setIsEmergencyModalOpen(true);
//   };

//   // Handle System Reset Protocol
//   const handleResetSystem = () => {
//     setSystemStatus('SAFE');
//     setLpgPpm(14);
//     setFlameDetected(false);

//     // Re-arm Cylinder 1 as Primary Online
//     setCylinders((prev) =>
//       prev.map((c, i) => ({
//         ...c,
//         status: i === 0 ? 'ONLINE' : 'STANDBY',
//         actuatorActive: i === 0,
//       }))
//     );

//     const newLog: SafetyLogEvent = {
//       id: `log-${Date.now()}`,
//       timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
//       relativeTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       type: 'SYSTEM_RESET',
//       title: 'System Reset & Re-Arm',
//       description: 'Environment safe. Manifold line pressure normalized. System back to nominal operation.',
//       statusText: 'MANUAL',
//       badgeType: 'success',
//       operator: 'Lead Safety Eng. (ID #408)'
//     };
//     setLogs((prevLogs) => [newLog, ...prevLogs]);
//   };

//   // Handle Simulated Leak Trigger for testing
//   const handleTriggerSimulatedLeak = () => {
//     setLpgPpm(38);
//     setSystemStatus('CRITICAL');

//     const newLog: SafetyLogEvent = {
//       id: `log-${Date.now()}`,
//       timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
//       relativeTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       type: 'CRITICAL_LPG_LEAK',
//       title: 'Critical LPG Leak',
//       description: 'LPG levels exceeded 20% LEL (38 ppm detected). Emergency protocol engaged.',
//       statusText: 'AUTO-TRIGGERED SHUTDOWN',
//       badgeType: 'danger',
//       zone: 'Zone A - Manifold Header'
//     };
//     setLogs((prevLogs) => [newLog, ...prevLogs]);
//     setIsEmergencyModalOpen(true);
//   };

//   // Shut all valves from valve control
//   const handleShutAllValves = () => {
//     setCylinders((prev) =>
//       prev.map((c) => ({
//         ...c,
//         actuatorActive: false,
//         status: 'OFFLINE',
//       }))
//     );

//     const newLog: SafetyLogEvent = {
//       id: `log-${Date.now()}`,
//       timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
//       relativeTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       type: 'MANUAL_OVERRIDE',
//       title: 'Shut All Valves Engaged',
//       description: 'Manual isolation command received. All manifold cylinders offline.',
//       statusText: 'MANUAL',
//       badgeType: 'neutral',
//       operator: 'Admin Console'
//     };
//     setLogs((prevLogs) => [newLog, ...prevLogs]);
//   };

//   // Open primary cylinders
//   const handleOpenAllValves = () => {
//     setCylinders((prev) =>
//       prev.map((c, idx) => ({
//         ...c,
//         actuatorActive: idx === 0 || idx === 2,
//         status: idx === 0 || idx === 2 ? 'ONLINE' : 'STANDBY',
//       }))
//     );
//   };

//   // Sync Telemetry simulation
//   const handleSyncTelemetry = () => {
//     setIsSyncing(true);
//     setTimeout(() => {
//       setIsSyncing(false);
//       const newLog: SafetyLogEvent = {
//         id: `log-${Date.now()}`,
//         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
//         relativeTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//         type: 'TELEMETRY_SYNC',
//         title: 'Telemetry Sync',
//         description: 'Synchronized with cloud grid. All 32 field nodes calibrated.',
//         statusText: 'NOMINAL',
//         badgeType: 'info'
//       };
//       setLogs((prevLogs) => [newLog, ...prevLogs]);
//     }, 600);
//   };

//   // Export CSV download
//   const handleExportCSV = () => {
//     const headers = ['Timestamp', 'Event Type', 'Description', 'Status', 'Operator'];
//     const rows = logs.map((l) => [
//       `"${l.timestamp}"`,
//       `"${l.title}"`,
//       `"${l.description.replace(/"/g, '""')}"`,
//       `"${l.statusText}"`,
//       `"${l.operator || 'System Automated'}"`,
//     ]);
//     const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement('a');
//     link.setAttribute('href', encodedUri);
//     link.setAttribute('download', `Gaston_safety_event_log_${Date.now()}.csv`);
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   // Sensor Calibration handler
//   const handleApplyCalibration = (lpg: number, temp: number, hum: number) => {
//     setLpgPpm(lpg);
//     setTemperature(temp);
//     setHumidity(hum);
//     if (lpg > 20) {
//       setSystemStatus('WARNING');
//     } else if (systemStatus === 'WARNING') {
//       setSystemStatus('SAFE');
//     }
//   };

//   // Flame test pulse
//   const handleTriggerFlameTest = () => {
//     setFlameDetected(true);
//     setSystemStatus('CRITICAL');
//     const newLog: SafetyLogEvent = {
//       id: `log-${Date.now()}`,
//       timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
//       relativeTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       type: 'CRITICAL_LPG_LEAK',
//       title: 'IR Flame Sensor Triggered',
//       description: 'Optical flame sensor tripped in Zone A. Safety circuit alerted.',
//       statusText: 'AUTO-TRIGGERED SHUTDOWN',
//       badgeType: 'danger'
//     };
//     setLogs((prev) => [newLog, ...prev]);
//     setIsCalibrationModalOpen(false);
//     setIsEmergencyModalOpen(true);
//   };

//   // Run self diagnostic
//   const handleRunDiagnostic = () => {
//     setIsCalibrationModalOpen(false);
//     handleSyncTelemetry();
//   };

//   const unreadAlertsCount = logs.filter((l) => l.badgeType === 'danger' || l.badgeType === 'warning').length;

//   return (
//     <div className="min-h-screen bg-[#0A0B10] text-[#E2E8F0] font-sans selection:bg-indigo-500/30 selection:text-white">
//       {/* Sidebar Navigation for Desktop */}
//       <SidebarNav
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         systemStatus={systemStatus}
//         onEmergencyClick={() => setIsEmergencyModalOpen(true)}
//         unreadCount={unreadAlertsCount}
//       />

//       {/* Top Header Bar */}
//       <TopHeader
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         systemStatus={systemStatus}
//         unreadCount={unreadAlertsCount}
//         onOpenNotifications={() => setIsNotificationOpen(true)}
//         onOpenCalibration={() => setIsCalibrationModalOpen(true)}
//         isMobilePreviewMode={isMobilePreviewMode}
//         setIsMobilePreviewMode={setIsMobilePreviewMode}
//         onTriggerSimulatedLeak={handleTriggerSimulatedLeak}
//         onResetSystem={handleResetSystem}
//       />

//       {/* Main Content Area */}
//       <main className="lg:ml-[280px] pt-20 sm:pt-24 px-4 sm:px-6 lg:px-8 pb-28 lg:pb-12 min-h-screen">
//         {/* If Mobile Preview Mode is toggled on, show simulated phone container */}
//         {isMobilePreviewMode ? (
//           <MobileDeviceFrame
//             activeTab={activeTab}
//             setActiveTab={setActiveTab}
//             systemStatus={systemStatus}
//             lpgPpm={lpgPpm}
//             temperature={temperature}
//             humidity={humidity}
//             flameDetected={flameDetected}
//             cylinders={cylinders}
//             onToggleCylinder={handleToggleCylinder}
//             onEmergencyShutdown={() => setIsEmergencyModalOpen(true)}
//             onShutAllValves={handleShutAllValves}
//             logs={logs}
//           />
//         ) : (
//           <>
//             {/* View Tab 1: Command Center Dashboard */}
//             {activeTab === 'dashboard' && (
//               <DashboardView
//                 systemStatus={systemStatus}
//                 lpgPpm={lpgPpm}
//                 temperature={temperature}
//                 humidity={humidity}
//                 flameDetected={flameDetected}
//                 cylinders={cylinders}
//                 onToggleCylinder={handleToggleCylinder}
//                 onEmergencyShutdown={() => setIsEmergencyModalOpen(true)}
//                 onSyncTelemetry={handleSyncTelemetry}
//                 onOpenCalibration={() => setIsCalibrationModalOpen(true)}
//                 recentLogs={logs}
//                 setActiveTab={setActiveTab}
//                 isSyncing={isSyncing}
//               />
//             )}

//             {/* View Tab 2: Valve Control */}
//             {activeTab === 'control' && (
//               <ValveControlView
//                 cylinders={cylinders}
//                 onToggleCylinder={handleToggleCylinder}
//                 onShutAllValves={handleShutAllValves}
//                 onOpenAllValves={handleOpenAllValves}
//                 systemStatus={systemStatus}
//               />
//             )}

//             {/* View Tab 3 & 4: Analytics & Safety Logs */}
//             {(activeTab === 'analytics' || activeTab === 'logs') && (
//               <AnalyticsLogsView
//                 logs={logs}
//                 cylinders={cylinders}
//                 onExportCSV={handleExportCSV}
//               />
//             )}
//           </>
//         )}
//       </main>

//       {/* Bottom Navigation for Mobile screen sizes */}
//       <BottomNavMobile
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//       />

//       {/* Emergency Modal Alert Dialog */}
//       <EmergencyModal
//         isOpen={isEmergencyModalOpen}
//         onClose={() => setIsEmergencyModalOpen(false)}
//         systemStatus={systemStatus}
//         onConfirmShutdown={handleEmergencyShutdown}
//         onResetSystem={handleResetSystem}
//       />

//       {/* Sensor Calibration & Test Bench Modal */}
//       <CalibrationModal
//         isOpen={isCalibrationModalOpen}
//         onClose={() => setIsCalibrationModalOpen(false)}
//         currentLpg={lpgPpm}
//         currentTemp={temperature}
//         currentHumidity={humidity}
//         onApplyCalibration={handleApplyCalibration}
//         onTriggerFlameTest={handleTriggerFlameTest}
//         onRunDiagnostic={handleRunDiagnostic}
//       />

//       {/* Safety Notification Popover Drawer */}
//       <NotificationDrawer
//         isOpen={isNotificationOpen}
//         onClose={() => setIsNotificationOpen(false)}
//         logs={logs}
//         onClearAll={() => setLogs([])}
//       />
//     </div>
//   );
// }

































































import React, { useState, useEffect } from 'react';
import { ActiveTab, Cylinder, SafetyLogEvent, SystemStatus } from './types';
import { INITIAL_CYLINDERS, INITIAL_LOG_EVENTS } from './data/mockData';
import { SidebarNav } from './components/SidebarNav';
import { TopHeader } from './components/TopHeader';
import { BottomNavMobile } from './components/BottomNavMobile';
import { DashboardView } from './components/DashboardView';
import { ValveControlView } from './components/ValveControlView';
import { AnalyticsLogsView } from './components/AnalyticsLogsView';
import { EmergencyModal } from './components/EmergencyModal';
import { CalibrationModal } from './components/CalibrationModal';
import { NotificationDrawer } from './components/NotificationDrawer';
import { MobileDeviceFrame } from './components/MobileDeviceFrame';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [systemStatus, setSystemStatus] = useState<SystemStatus>('SAFE');

  // Real-time sensor state
  const [lpgPpm, setLpgPpm] = useState<number>(14);
  const [temperature, setTemperature] = useState<number>(24.5);
  const [humidity, setHumidity] = useState<number>(51);
  const [flameDetected, setFlameDetected] = useState<boolean>(false);

  // Manifold Cylinders & Event Logs
  const [cylinders, setCylinders] = useState<Cylinder[]>(INITIAL_CYLINDERS);
  const [logs, setLogs] = useState<SafetyLogEvent[]>(INITIAL_LOG_EVENTS);

  // Modals & UI View Modes
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState<boolean>(false);
  const [isCalibrationModalOpen, setIsCalibrationModalOpen] = useState<boolean>(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [isMobilePreviewMode, setIsMobilePreviewMode] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Uptime ticker for active cylinders
  useEffect(() => {
    const timer = setInterval(() => {
      if (systemStatus !== 'EMERGENCY_SHUTDOWN') {
        setCylinders((prevCyls) =>
          prevCyls.map((c) => {
            if (c.actuatorActive) {
              return { ...c, uptimeSeconds: c.uptimeSeconds + 1 };
            }
            return c;
          })
        );
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [systemStatus]);

  // ============================================================
  // 🟡 WARNING -> 🔴 CRITICAL AUTO-ESCALATION
  //
  // Calibration ma LPG/Temp high set thay etle handleApplyCalibration
  // status ne 'WARNING' kari de che. Jo status 5 second sudhi
  // 'WARNING' j rahe (operator e value normal na kari), to system
  // pote j CRITICAL thai jay + flame detected trigger thay,
  // je DashboardView na fire popup ne automatically khole che.
  // ============================================================
  useEffect(() => {
    if (systemStatus === 'WARNING') {
      const escalationTimer = setTimeout(() => {
        setSystemStatus('CRITICAL');
        setFlameDetected(true);

        const newLog: SafetyLogEvent = {
          id: `log-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
          relativeTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'CRITICAL_LPG_LEAK',
          title: 'Warning Escalated to Critical',
          description: `LPG/Temperature stayed above the safe threshold for 5+ seconds (LPG: ${lpgPpm} ppm, Temp: ${temperature}°C). Auto-escalated to CRITICAL.`,
          statusText: 'AUTO-TRIGGERED SHUTDOWN',
          badgeType: 'danger',
          zone: 'Zone A - Manifold Header'
        };
        setLogs((prevLogs) => [newLog, ...prevLogs]);
        setIsEmergencyModalOpen(true);
      }, 5000);

      // Jo status WARNING mathi hati jay (recalibrate/reset thay)
      // to timer cancel thai jashe
      return () => clearTimeout(escalationTimer);
    }
  }, [systemStatus, lpgPpm, temperature]);

  // Handle Cylinder Valve Toggle
  const handleToggleCylinder = (id: string) => {
    if (systemStatus === 'EMERGENCY_SHUTDOWN') {
      alert('Safety Interlock Active: System is in Emergency Shutdown. Please initiate System Reset first.');
      return;
    }

    setCylinders((prev) =>
      prev.map((cyl) => {
        if (cyl.id === id) {
          const nextActive = !cyl.actuatorActive;
          const nextStatus = nextActive ? 'ONLINE' : 'STANDBY';

          // Add event log
          const newLog: SafetyLogEvent = {
            id: `log-${Date.now()}`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
            relativeTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'MANUAL_OVERRIDE',
            title: 'Manual Valve Actuation',
            description: `Valve ${cyl.label} (${cyl.name}) switched to ${nextStatus} by operator.`,
            statusText: 'MANUAL',
            badgeType: 'neutral',
            operator: 'Admin Console'
          };
          setLogs((prevLogs) => [newLog, ...prevLogs]);

          return {
            ...cyl,
            actuatorActive: nextActive,
            status: nextStatus,
          };
        }
        return cyl;
      })
    );
  };

  // Handle Emergency Master Shutdown
  const handleEmergencyShutdown = () => {
    setSystemStatus('EMERGENCY_SHUTDOWN');

    // Shut all cylinders
    setCylinders((prev) =>
      prev.map((c) => ({
        ...c,
        actuatorActive: false,
        status: 'OFFLINE',
      }))
    );

    // Create Critical Alert Log
    const newLog: SafetyLogEvent = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
      relativeTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'EMERGENCY_SHUTDOWN',
      title: 'Emergency Master Shutdown',
      description: 'Critical override engaged. All manifold solenoid valves sealed instantly.',
      statusText: 'AUTO-TRIGGERED SHUTDOWN',
      badgeType: 'danger',
      zone: 'All Sectors'
    };
    setLogs((prevLogs) => [newLog, ...prevLogs]);
    setIsEmergencyModalOpen(true);
  };

  // ============================================================
  // 🟢 IMMEDIATE SHUTDOWN -> FULL RESET TO SAFE
  //
  // EmergencyModal ("CRITICAL SAFETY OVERRIDE" popup) ma
  // "CLICK FOR IMMEDIATE SHUTDOWN" button click thata,
  // aakhi system tarat j reset thai SAFE baseline par aavi jay.
  // ============================================================
  const handleImmediateShutdown = () => {
    setSystemStatus('SAFE');
    setLpgPpm(14);
    setTemperature(24.5);
    setHumidity(51);
    setFlameDetected(false);

    // Cylinder 1 ne pachu online kari, baki standby par rakho
    setCylinders((prev) =>
      prev.map((c, i) => ({
        ...c,
        status: i === 0 ? 'ONLINE' : 'STANDBY',
        actuatorActive: i === 0,
      }))
    );

    const newLog: SafetyLogEvent = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
      relativeTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'SYSTEM_RESET',
      title: 'Immediate Shutdown & Reset',
      description: 'Immediate shutdown executed from Critical Override panel. All valves sealed and system reset to SAFE baseline.',
      statusText: 'MANUAL',
      badgeType: 'success',
      operator: 'Admin Console'
    };
    setLogs((prevLogs) => [newLog, ...prevLogs]);

    setIsEmergencyModalOpen(false);
  };

  // Handle System Reset Protocol
  const handleResetSystem = () => {
    setSystemStatus('SAFE');
    setLpgPpm(14);
    setFlameDetected(false);

    // Re-arm Cylinder 1 as Primary Online
    setCylinders((prev) =>
      prev.map((c, i) => ({
        ...c,
        status: i === 0 ? 'ONLINE' : 'STANDBY',
        actuatorActive: i === 0,
      }))
    );

    const newLog: SafetyLogEvent = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
      relativeTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'SYSTEM_RESET',
      title: 'System Reset & Re-Arm',
      description: 'Environment safe. Manifold line pressure normalized. System back to nominal operation.',
      statusText: 'MANUAL',
      badgeType: 'success',
      operator: 'Lead Safety Eng. (ID #408)'
    };
    setLogs((prevLogs) => [newLog, ...prevLogs]);
  };

  // Handle Simulated Leak Trigger for testing
  const handleTriggerSimulatedLeak = () => {
    setLpgPpm(38);
    setSystemStatus('CRITICAL');

    const newLog: SafetyLogEvent = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
      relativeTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'CRITICAL_LPG_LEAK',
      title: 'Critical LPG Leak',
      description: 'LPG levels exceeded 20% LEL (38 ppm detected). Emergency protocol engaged.',
      statusText: 'AUTO-TRIGGERED SHUTDOWN',
      badgeType: 'danger',
      zone: 'Zone A - Manifold Header'
    };
    setLogs((prevLogs) => [newLog, ...prevLogs]);
    setIsEmergencyModalOpen(true);
  };

  // Shut all valves from valve control
  const handleShutAllValves = () => {
    setCylinders((prev) =>
      prev.map((c) => ({
        ...c,
        actuatorActive: false,
        status: 'OFFLINE',
      }))
    );

    const newLog: SafetyLogEvent = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
      relativeTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'MANUAL_OVERRIDE',
      title: 'Shut All Valves Engaged',
      description: 'Manual isolation command received. All manifold cylinders offline.',
      statusText: 'MANUAL',
      badgeType: 'neutral',
      operator: 'Admin Console'
    };
    setLogs((prevLogs) => [newLog, ...prevLogs]);
  };

  // Open primary cylinders
  const handleOpenAllValves = () => {
    setCylinders((prev) =>
      prev.map((c, idx) => ({
        ...c,
        actuatorActive: idx === 0 || idx === 2,
        status: idx === 0 || idx === 2 ? 'ONLINE' : 'STANDBY',
      }))
    );
  };

  // Sync Telemetry simulation
  const handleSyncTelemetry = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      const newLog: SafetyLogEvent = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
        relativeTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'TELEMETRY_SYNC',
        title: 'Telemetry Sync',
        description: 'Synchronized with cloud grid. All 32 field nodes calibrated.',
        statusText: 'NOMINAL',
        badgeType: 'info'
      };
      setLogs((prevLogs) => [newLog, ...prevLogs]);
    }, 600);
  };

  // Export CSV download
  const handleExportCSV = () => {
    const headers = ['Timestamp', 'Event Type', 'Description', 'Status', 'Operator'];
    const rows = logs.map((l) => [
      `"${l.timestamp}"`,
      `"${l.title}"`,
      `"${l.description.replace(/"/g, '""')}"`,
      `"${l.statusText}"`,
      `"${l.operator || 'System Automated'}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Gaston_safety_event_log_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Sensor Calibration handler
  const handleApplyCalibration = (lpg: number, temp: number, hum: number) => {
    setLpgPpm(lpg);
    setTemperature(temp);
    setHumidity(hum);

    const isThresholdBreached = lpg > 20 || temp > 45;

    if (isThresholdBreached) {
      setSystemStatus('WARNING');
    } else if (systemStatus === 'WARNING') {
      setSystemStatus('SAFE');
    }
  };

  // Flame test pulse
  const handleTriggerFlameTest = () => {
    setFlameDetected(true);
    setSystemStatus('CRITICAL');
    const newLog: SafetyLogEvent = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
      relativeTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'CRITICAL_LPG_LEAK',
      title: 'IR Flame Sensor Triggered',
      description: 'Optical flame sensor tripped in Zone A. Safety circuit alerted.',
      statusText: 'AUTO-TRIGGERED SHUTDOWN',
      badgeType: 'danger'
    };
    setLogs((prev) => [newLog, ...prev]);
    setIsCalibrationModalOpen(false);
    setIsEmergencyModalOpen(true);
  };

  // Run self diagnostic
  const handleRunDiagnostic = () => {
    setIsCalibrationModalOpen(false);
    handleSyncTelemetry();
  };

  const unreadAlertsCount = logs.filter((l) => l.badgeType === 'danger' || l.badgeType === 'warning').length;

  return (
    <div className="min-h-screen bg-[#0A0B10] text-[#E2E8F0] font-sans selection:bg-indigo-500/30 selection:text-white">
      {/* Sidebar Navigation for Desktop */}
      <SidebarNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        systemStatus={systemStatus}
        onEmergencyClick={() => setIsEmergencyModalOpen(true)}
        unreadCount={unreadAlertsCount}
      />

      {/* Top Header Bar */}
      <TopHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        systemStatus={systemStatus}
        unreadCount={unreadAlertsCount}
        onOpenNotifications={() => setIsNotificationOpen(true)}
        onOpenCalibration={() => setIsCalibrationModalOpen(true)}
        isMobilePreviewMode={isMobilePreviewMode}
        setIsMobilePreviewMode={setIsMobilePreviewMode}
        onTriggerSimulatedLeak={handleTriggerSimulatedLeak}
        onResetSystem={handleResetSystem}
      />

      {/* Main Content Area */}
      <main className="lg:ml-[280px] pt-20 sm:pt-24 px-4 sm:px-6 lg:px-8 pb-28 lg:pb-12 min-h-screen">
        {/* If Mobile Preview Mode is toggled on, show simulated phone container */}
        {isMobilePreviewMode ? (
          <MobileDeviceFrame
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            systemStatus={systemStatus}
            lpgPpm={lpgPpm}
            temperature={temperature}
            humidity={humidity}
            flameDetected={flameDetected}
            cylinders={cylinders}
            onToggleCylinder={handleToggleCylinder}
            onEmergencyShutdown={() => setIsEmergencyModalOpen(true)}
            onShutAllValves={handleShutAllValves}
            logs={logs}
          />
        ) : (
          <>
            {/* View Tab 1: Command Center Dashboard */}
            {activeTab === 'dashboard' && (
              <DashboardView
                systemStatus={systemStatus}
                lpgPpm={lpgPpm}
                temperature={temperature}
                humidity={humidity}
                flameDetected={flameDetected}
                cylinders={cylinders}
                onToggleCylinder={handleToggleCylinder}
                onEmergencyShutdown={() => setIsEmergencyModalOpen(true)}
                onSyncTelemetry={handleSyncTelemetry}
                onOpenCalibration={() => setIsCalibrationModalOpen(true)}
                recentLogs={logs}
                setActiveTab={setActiveTab}
                isSyncing={isSyncing}
              />
            )}

            {/* View Tab 2: Valve Control */}
            {activeTab === 'control' && (
              <ValveControlView
                cylinders={cylinders}
                onToggleCylinder={handleToggleCylinder}
                onShutAllValves={handleShutAllValves}
                onOpenAllValves={handleOpenAllValves}
                systemStatus={systemStatus}
              />
            )}

            {/* View Tab 3 & 4: Analytics & Safety Logs */}
            {(activeTab === 'analytics' || activeTab === 'logs') && (
              <AnalyticsLogsView
                logs={logs}
                cylinders={cylinders}
                onExportCSV={handleExportCSV}
              />
            )}
          </>
        )}
      </main>

      {/* Bottom Navigation for Mobile screen sizes */}
      <BottomNavMobile
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Emergency Modal Alert Dialog */}
      <EmergencyModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
        systemStatus={systemStatus}
        onConfirmShutdown={handleEmergencyShutdown}
        onImmediateShutdown={handleImmediateShutdown}
        onResetSystem={handleResetSystem}
      />

      {/* Sensor Calibration & Test Bench Modal */}
      <CalibrationModal
        isOpen={isCalibrationModalOpen}
        onClose={() => setIsCalibrationModalOpen(false)}
        currentLpg={lpgPpm}
        currentTemp={temperature}
        currentHumidity={humidity}
        onApplyCalibration={handleApplyCalibration}
        onTriggerFlameTest={handleTriggerFlameTest}
        onRunDiagnostic={handleRunDiagnostic}
      />

      {/* Safety Notification Popover Drawer */}
      <NotificationDrawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        logs={logs}
        onClearAll={() => setLogs([])}
      />
    </div>
  );
}
