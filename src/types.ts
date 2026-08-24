export type SystemStatus = 'SAFE' | 'WARNING' | 'CRITICAL' | 'EMERGENCY_SHUTDOWN';

export type ActiveTab = 'dashboard' | 'control' | 'analytics' | 'logs';

export interface Cylinder {
  id: string;
  label: string;
  name: string;
  status: 'ONLINE' | 'STANDBY' | 'OFFLINE';
  uptimeSeconds: number;
  actuatorActive: boolean;
  gasRemainingPct: number;
  pressureBar: number;
  zone: string;
}

export interface SafetyLogEvent {
  id: string;
  timestamp: string;
  relativeTime: string;
  type: 'CRITICAL_LPG_LEAK' | 'SYSTEM_RESET' | 'ROUTINE_DIAGNOSTIC' | 'TEMP_WARNING' | 'MANUAL_OVERRIDE' | 'TELEMETRY_SYNC' | 'EMERGENCY_SHUTDOWN' | 'VALVE_TOGGLED';
  title: string;
  description: string;
  statusText: string;
  badgeType: 'danger' | 'success' | 'info' | 'warning' | 'neutral';
  zone?: string;
  operator?: string;
}

export interface TelemetryPoint {
  time: string;
  temperature: number; // in °C
  humidity: number;    // in %
  lpgPpm: number;      // in ppm
}

export interface DailyUsage {
  day: string;
  hours: number;
  isToday?: boolean;
}
