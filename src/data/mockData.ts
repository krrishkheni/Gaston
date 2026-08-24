import { Cylinder, SafetyLogEvent, TelemetryPoint, DailyUsage } from '../types';

export const ASSET_IMAGES = {
  // Engineer avatar from screenshots
  engineerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCrf-HFNyOAAG0UTkagJQvMwiTr7M088CZrczxU7gKcWNDlWmwsUCzs939jkbTmlZhl3Uebg0CUnpA_s_qBknyRo0o0UJjpBogA7rfYTSJQ9O2DRzOOYEKczdrYrIaOl1EaplLu3f13LNMV71WA8sbgo0dM4Swsnh55p5DTkHE9_TwmxQevwXDZdM8zCnb49_rhyQ3JrPYPoP1LVVAVeXqbTEsSQjItESzDbLIXVYIRDqitML9zzn2-w',
  safetyOfficerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBADSyY6F_2w28VoeP5w7wklg796KfKHZe3_5fAn7pu2ei4Tw7TZkbsfekbJ1IJuTWE57pX8riV1xKGA6kBVSQEO5gP0rEZApKX4MQYRH7cv7Z8VEIQFA0-OVI-_USgQA-sCvOWr6CvoUs3fFwxqqen-peEnxe_vxVMYFRsSsoBrKZRp4m2ez1vzYi1qPQ4OKWoHfsiJmPM159bU5s_NuNdmgRIagxdPu7QfSPpEhtT5ut0fd5RPoQ-1A',
  // Gaston indicator / logo
  sensorLedLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyTWZ4MQpZxB682BMyTRBiz6U_bDhY1_uXInOvnU8Xfy_AaFO1j1IuHuPKOe4uRhq3ux8BpUeukX4HOdT3uVwUIySL6qLWgRngagzRY95TIEiS-6JSJA1h5yibN3GQoSpsWH_M1eAuq-2gNKnqAben9D8GZVgc4nXcO5CQO4zBTtZl6rZiGPkEHuI3DlRkdaU1tIs2_4IJx0zD86qYthd2Fhc443ckKqnPUOjztgxIMD39Fr_jI_y8uQ',
  GastonBadgeLogo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjjYSeYHB_a1keVn8XBQg51roWy9cjYM7Tu9CZ3CswUx6WfeoZcXDK3uqgoeqPUTDHhf3_SOWuGCH9eYKJNteYXGGjRbSRiJOueFU_C7I_KCaR3VDpyT6EVRicC2L3AxpqK3Pwr8b3y6oh8ShjoinuzmiaKITK3ZPSTOOnECXu95s0Lgxa-OfNfIcKlt8_HV35kyPFAGbbofrFCJJaAosTm1rMJcdqcHNrvuDBKwHGYluLLQv4SaLZ9A',
};

export const INITIAL_CYLINDERS: Cylinder[] = [
  {
    id: 'cyl-01',
    label: 'CYL-01',
    name: 'Main Line Alpha',
    status: 'ONLINE',
    uptimeSeconds: 14 * 3600 + 22 * 60, // 14h 22m
    actuatorActive: true,
    gasRemainingPct: 78,
    pressureBar: 6.8,
    zone: 'Zone A - Primary Manifold'
  },
  {
    id: 'cyl-02',
    label: 'CYL-02',
    name: 'Reserve Beta',
    status: 'STANDBY',
    uptimeSeconds: 0,
    actuatorActive: false,
    gasRemainingPct: 92,
    pressureBar: 7.2,
    zone: 'Zone B - High Pressure Reserve'
  },
  {
    id: 'cyl-03',
    label: 'CYL-03',
    name: 'Auxiliary Gamma',
    status: 'STANDBY',
    uptimeSeconds: 0,
    actuatorActive: false,
    gasRemainingPct: 15,
    pressureBar: 2.1,
    zone: 'Zone C - Auxiliary Supply'
  }
];

export const INITIAL_LOG_EVENTS: SafetyLogEvent[] = [
  {
    id: 'log-1',
    timestamp: '12:11 PM, Today',
    relativeTime: '12:11 PM',
    type: 'CRITICAL_LPG_LEAK',
    title: 'Critical LPG Leak',
    description: 'LPG levels exceeded 20% LEL. Emergency protocol engaged.',
    statusText: 'AUTO-TRIGGERED SHUTDOWN',
    badgeType: 'danger',
    zone: 'Zone A - Manifold Header'
  },
  {
    id: 'log-2',
    timestamp: '12:30 PM, Today',
    relativeTime: '12:30 PM',
    type: 'SYSTEM_RESET',
    title: 'System Reset',
    description: 'Environment safe. System back to normal operation.',
    statusText: 'MANUAL',
    badgeType: 'success',
    operator: 'Lead Safety Eng. (ID #408)'
  },
  {
    id: 'log-3',
    timestamp: '10:42 AM, Today',
    relativeTime: '10:42 AM',
    type: 'ROUTINE_DIAGNOSTIC',
    title: 'System Diagnostic',
    description: 'All sensors nominal and optical IR arrays calibrated.',
    statusText: 'AUTOMATED',
    badgeType: 'info'
  },
  {
    id: 'log-4',
    timestamp: '08:15 AM, Today',
    relativeTime: '08:15 AM',
    type: 'MANUAL_OVERRIDE',
    title: 'Manual Override',
    description: 'Valve CYL-01 actuated by admin.',
    statusText: 'MANUAL',
    badgeType: 'neutral',
    operator: 'Admin Console'
  },
  {
    id: 'log-5',
    timestamp: '08:00 AM, Today',
    relativeTime: '08:00 AM',
    type: 'TELEMETRY_SYNC',
    title: 'Telemetry Sync',
    description: 'Connected to cloud grid. 32 telemetry nodes synced.',
    statusText: 'NOMINAL',
    badgeType: 'info'
  },
  {
    id: 'log-6',
    timestamp: '08:00 AM, Yesterday',
    relativeTime: 'Yesterday',
    type: 'ROUTINE_DIAGNOSTIC',
    title: 'Routine Diagnostic',
    description: 'All sensors calibrated and reporting nominal values.',
    statusText: 'AUTOMATED',
    badgeType: 'info'
  },
  {
    id: 'log-7',
    timestamp: '11:45 PM, 2 days ago',
    relativeTime: '2 days ago',
    type: 'TEMP_WARNING',
    title: 'Temp Warning',
    description: 'Ambient temperature reached 45°C. Cooling advised.',
    statusText: 'WARNING LOGGED',
    badgeType: 'warning',
    zone: 'Sector 2 Compressor'
  }
];

export const TELEMETRY_24H_DATA: TelemetryPoint[] = [
  { time: '00:00', temperature: 21.2, humidity: 55, lpgPpm: 12 },
  { time: '02:00', temperature: 20.8, humidity: 58, lpgPpm: 11 },
  { time: '04:00', temperature: 19.5, humidity: 62, lpgPpm: 10 },
  { time: '06:00', temperature: 20.1, humidity: 60, lpgPpm: 12 },
  { time: '08:00', temperature: 22.4, humidity: 52, lpgPpm: 14 },
  { time: '10:00', temperature: 25.8, humidity: 46, lpgPpm: 15 },
  { time: '12:00', temperature: 31.2, humidity: 41, lpgPpm: 18 },
  { time: '14:00', temperature: 45.0, humidity: 36, lpgPpm: 24 }, // Peak warning
  { time: '16:00', temperature: 36.4, humidity: 39, lpgPpm: 19 },
  { time: '18:00', temperature: 28.5, humidity: 45, lpgPpm: 16 },
  { time: '20:00', temperature: 25.1, humidity: 49, lpgPpm: 14 },
  { time: '22:00', temperature: 23.8, humidity: 53, lpgPpm: 13 },
  { time: 'Now',   temperature: 24.5, humidity: 51, lpgPpm: 14 },
];

export const TELEMETRY_1H_DATA: TelemetryPoint[] = [
  { time: '-60m', temperature: 24.1, humidity: 52, lpgPpm: 13 },
  { time: '-45m', temperature: 24.3, humidity: 51, lpgPpm: 14 },
  { time: '-30m', temperature: 24.6, humidity: 50, lpgPpm: 14 },
  { time: '-15m', temperature: 24.4, humidity: 51, lpgPpm: 13 },
  { time: 'Now',  temperature: 24.5, humidity: 51, lpgPpm: 14 },
];

export const TELEMETRY_7D_DATA: TelemetryPoint[] = [
  { time: 'Mon', temperature: 23.4, humidity: 54, lpgPpm: 12 },
  { time: 'Tue', temperature: 24.1, humidity: 52, lpgPpm: 13 },
  { time: 'Wed', temperature: 26.2, humidity: 48, lpgPpm: 15 },
  { time: 'Thu', temperature: 23.9, humidity: 55, lpgPpm: 12 },
  { time: 'Fri', temperature: 28.4, humidity: 44, lpgPpm: 16 },
  { time: 'Sat', temperature: 25.0, humidity: 50, lpgPpm: 14 },
  { time: 'Sun', temperature: 24.5, humidity: 51, lpgPpm: 14 },
];

export const DAILY_USAGE_DATA: DailyUsage[] = [
  { day: 'Mon', hours: 2.4 },
  { day: 'Tue', hours: 1.6 },
  { day: 'Wed', hours: 3.2 },
  { day: 'Thu', hours: 1.2 },
  { day: 'Fri', hours: 3.6 },
  { day: 'Sat', hours: 2.0 },
  { day: 'Sun', hours: 2.8, isToday: true },
];

export function formatUptime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${hours}h ${minutes.toString().padStart(2, '0')}m`;
}
