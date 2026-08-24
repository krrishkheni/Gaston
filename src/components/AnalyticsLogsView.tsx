import React, { useState } from 'react';
import { SafetyLogEvent, Cylinder } from '../types';
import { DAILY_USAGE_DATA } from '../data/mockData';
import {
  History,
  Download,
  Flame,
  RotateCcw,
  Info,
  Thermometer,
  BarChart3,
  TrendingUp,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Fuel,
  Calendar
} from 'lucide-react';

interface AnalyticsLogsViewProps {
  logs: SafetyLogEvent[];
  cylinders: Cylinder[];
  onExportCSV: () => void;
}

export const AnalyticsLogsView: React.FC<AnalyticsLogsViewProps> = ({
  logs,
  cylinders,
  onExportCSV,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('ALL');
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);

  const filteredLogs = logs.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.statusText.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterType === 'ALL') return matchesSearch;
    if (filterType === 'CRITICAL') return matchesSearch && item.badgeType === 'danger';
    if (filterType === 'WARNING') return matchesSearch && item.badgeType === 'warning';
    if (filterType === 'SYSTEM') return matchesSearch && (item.badgeType === 'info' || item.badgeType === 'success');
    return matchesSearch;
  });

  const getEventIcon = (type: SafetyLogEvent['type'], badgeType: SafetyLogEvent['badgeType']) => {
    if (badgeType === 'danger' || type === 'CRITICAL_LPG_LEAK') {
      return <Flame className="w-4 h-4 text-rose-400" />;
    }
    if (type === 'SYSTEM_RESET' || badgeType === 'success') {
      return <RotateCcw className="w-4 h-4 text-emerald-400" />;
    }
    if (type === 'TEMP_WARNING' || badgeType === 'warning') {
      return <Thermometer className="w-4 h-4 text-amber-400" />;
    }
    return <Info className="w-4 h-4 text-indigo-400" />;
  };

  const getStatusBadgeClass = (badgeType: SafetyLogEvent['badgeType']) => {
    switch (badgeType) {
      case 'danger':
        return 'bg-rose-500/20 text-rose-300 border border-rose-500/30';
      case 'success':
        return 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold';
      case 'warning':
        return 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold';
      case 'info':
        return 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30';
      default:
        return 'bg-white/5 text-slate-400 border border-white/10';
    }
  };

  // Average gas remaining across all cylinders
  const totalGasPct = Math.round(
    cylinders.reduce((acc, c) => acc + c.gasRemainingPct, 0) / (cylinders.length || 1)
  );

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto pb-14">
      {/* Top Header info */}
      <div className="mb-2">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
          Analytics & Safety Logs
        </h1>
        <p className="text-sm sm:text-base text-slate-400 mt-2">
          Comprehensive data history and critical event tracking.
        </p>
      </div>

      {/* SECTION 1: Detailed Safety Log Table */}
      <section
        id="section-system-event-log"
        className="glass-card rounded-3xl p-6 sm:p-8 overflow-hidden flex flex-col"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <History className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              System Event Log
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="input-log-search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search event logs..."
                className="pl-10 pr-3.5 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 w-48 sm:w-60 transition-colors"
              />
            </div>

            {/* Filter Selector */}
            <select
              id="select-log-filter"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs font-mono text-slate-300 focus:outline-none focus:border-indigo-500 transition-colors"
            >
              <option value="ALL" className="bg-[#0A0B10] text-slate-200">All Events</option>
              <option value="CRITICAL" className="bg-[#0A0B10] text-slate-200">Critical Leaks</option>
              <option value="WARNING" className="bg-[#0A0B10] text-slate-200">Warnings</option>
              <option value="SYSTEM" className="bg-[#0A0B10] text-slate-200">System & Resets</option>
            </select>

            {/* Export CSV Button */}
            <button
              id="btn-export-csv"
              onClick={onExportCSV}
              className="px-4 py-2 border border-white/10 text-slate-300 font-mono text-xs rounded-full hover:bg-white/5 transition-colors flex items-center gap-2 active:scale-95 duration-150"
            >
              <Download className="w-3.5 h-3.5 text-indigo-400" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Table container */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b border-white/10 font-mono text-xs text-slate-400">
                <th className="py-3 px-4 font-medium">Timestamp</th>
                <th className="py-3 px-4 font-medium">Event Type</th>
                <th className="py-3 px-4 font-medium">Description</th>
                <th className="py-3 px-4 font-medium text-right sm:text-left">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-300">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                  >
                    {/* Timestamp */}
                    <td className="py-4 px-4 whitespace-nowrap font-mono text-xs text-slate-400">
                      {item.timestamp}
                    </td>

                    {/* Event Type with Icon */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        {getEventIcon(item.type, item.badgeType)}
                        <span className={`font-semibold ${item.badgeType === 'danger'
                          ? 'text-rose-400'
                          : item.badgeType === 'success'
                            ? 'text-emerald-400'
                            : item.badgeType === 'warning'
                              ? 'text-amber-400'
                              : 'text-indigo-400'
                          }`}>
                          {item.title}
                        </span>
                      </div>
                    </td>

                    {/* Description */}
                    <td className="py-4 px-4 text-slate-400 text-xs sm:text-sm">
                      {item.description}
                    </td>

                    {/* Status Pill */}
                    <td className="py-4 px-4 text-right sm:text-left">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-wider ${getStatusBadgeClass(item.badgeType)}`}>
                        {item.badgeType === 'danger' && (
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                        )}
                        {item.statusText}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-400 font-mono text-xs">
                    No matching logs found for query "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Grid for Section 2 (Usage Metrics) and Section 3 (Environment Trend) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* SECTION 2: Usage Analytics & Metrics (4 cols) */}
        <section
          id="section-usage-metrics"
          className="xl:col-span-4 glass-card rounded-3xl p-6 sm:p-7 flex flex-col gap-6"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-white">
              Usage Metrics
            </h2>
          </div>

          {/* Quick Metrics 2-Card Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
              <div className="font-mono text-xs text-slate-400 mb-1">
                Est. Gas Remaining
              </div>
              <div className="text-3xl font-bold font-mono text-emerald-400">
                42%
              </div>
              <div className="w-full bg-[#07080C] h-1.5 mt-2 rounded-full overflow-hidden border border-white/5">
                <div
                  className="bg-emerald-400 h-full rounded-full shadow-[0_0_8px_rgba(52,211,153,0.5)]"
                  style={{ width: '42%' }}
                />
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
              <div className="font-mono text-xs text-slate-400 mb-1">
                Avg. Daily Usage
              </div>
              <div className="text-3xl font-bold font-mono text-indigo-400">
                3.2<span className="text-base text-slate-400 ml-1 font-sans font-normal">hrs</span>
              </div>
              <div className="text-[11px] font-mono text-slate-400 mt-2">
                Nominal Flow Rate
              </div>
            </div>
          </div>

          {/* 7-Day Cylinder Usage Bar Chart */}
          <div className="flex-1 mt-2">
            <div className="font-mono text-xs text-slate-400 mb-4 flex justify-between items-center">
              <span>Cylinder Usage (Last 7 Days)</span>
              <span className="text-[11px] text-indigo-400">Weekly Total: 16.8h</span>
            </div>

            <div className="h-44 w-full flex items-end justify-between gap-2 px-2 border-b border-white/10 pb-2 relative">
              {DAILY_USAGE_DATA.map((item, idx) => {
                const heightPct = Math.round((item.hours / 4) * 100);
                const isToday = item.isToday;
                return (
                  <div
                    key={item.day}
                    onMouseEnter={() => setHoveredBarIndex(idx)}
                    onMouseLeave={() => setHoveredBarIndex(null)}
                    className="w-full flex flex-col items-center justify-end h-full relative group cursor-pointer"
                  >
                    {/* Tooltip on hover */}
                    <div className={`absolute -top-7 px-2 py-0.5 rounded bg-[#0A0B10] border border-indigo-500/40 font-mono text-[10px] text-indigo-300 shadow transition-opacity ${hoveredBarIndex === idx ? 'opacity-100' : 'opacity-0 pointer-events-none'
                      }`}>
                      {item.hours}h
                    </div>

                    <div
                      className={`w-full rounded-t-lg transition-all duration-300 ${isToday
                        ? 'bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.5)]'
                        : 'bg-indigo-500/30 hover:bg-indigo-500/50'
                        }`}
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Days labels */}
            <div className="flex justify-between mt-2 font-mono text-[11px] text-slate-400 px-2">
              {DAILY_USAGE_DATA.map((item) => (
                <span
                  key={item.day}
                  className={item.isToday ? 'text-indigo-400 font-bold' : ''}
                >
                  {item.day}
                </span>
              ))}
            </div>
          </div>

          {/* Cylinder Status Breakdown Bars */}
          <div className="space-y-3 pt-4 border-t border-white/5">
            <div className="font-mono text-xs text-slate-400 uppercase">
              Cylinder Status Breakdown
            </div>

            <div className="space-y-3 bg-white/5 p-4 rounded-2xl border border-white/5">
              {/* Alpha */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold text-slate-200">Cylinder 1</span>
                  <span className="font-mono font-bold text-indigo-400">78%</span>
                </div>
                <div className="w-full bg-[#07080C] h-1.5 rounded-full overflow-hidden border border-white/5">
                  <div className="bg-indigo-500 h-full rounded-full" style={{ width: '78%' }} />
                </div>
              </div>

              {/* Beta */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold text-slate-200">Cylinder 2</span>
                  <span className="font-mono font-bold text-emerald-400">92%</span>
                </div>
                <div className="w-full bg-[#07080C] h-1.5 rounded-full overflow-hidden border border-white/5">
                  <div className="bg-emerald-400 h-full rounded-full" style={{ width: '92%' }} />
                </div>
              </div>

              {/* Gamma (Low Warning) */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold text-rose-400 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Cylinder 3</span>
                  </span>
                  <span className="font-mono font-bold text-rose-400">15%</span>
                </div>
                <div className="w-full bg-[#07080C] h-1.5 rounded-full overflow-hidden border border-white/5">
                  <div className="bg-rose-500 h-full rounded-full animate-pulse" style={{ width: '15%' }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Environment Trend (24h) Chart (8 cols) */}
        <section
          id="section-environment-trend-24h"
          className="xl:col-span-8 glass-card rounded-3xl p-6 sm:p-7 flex flex-col"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-white">
                Environment Trend (24h)
              </h2>
            </div>

            <div className="flex gap-4 font-mono text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
                <span>Temp (°C)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                <span>Humidity (%)</span>
              </div>
            </div>
          </div>

          {/* Chart Container with SVG & Grid */}
          <div className="relative flex-1 min-h-[320px] chart-grid border-l border-b border-white/10 p-4 ml-6 mb-6">
            {/* Y-axis labels */}
            <div className="absolute -left-7 top-0 bottom-0 flex flex-col justify-between font-mono text-[11px] text-slate-400 items-end pr-2 pointer-events-none">
              <span>50</span>
              <span>40</span>
              <span>30</span>
              <span>20</span>
              <span>10</span>
            </div>

            {/* SVG Line & Mountain Fill Area */}
            <svg
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <defs>
                <linearGradient id="tempGradientEnv" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Threshold Line at 45°C (Y=10) */}
              <line
                x1="0"
                y1="10"
                x2="100"
                y2="10"
                stroke="#f43f5e"
                strokeDasharray="2,2"
                strokeWidth="0.75"
                opacity="0.8"
              />

              {/* Temperature Area Gradient */}
              <path
                d="M0,75 C12,70 25,75 35,60 C45,45 55,55 65,20 C75,10 82,45 92,60 L100,70 L100,100 L0,100 Z"
                fill="url(#tempGradientEnv)"
              />

              {/* Temperature Primary Line */}
              <path
                d="M0,75 C12,70 25,75 35,60 C45,45 55,55 65,20 C75,10 82,45 92,60 L100,70"
                fill="none"
                stroke="#6366f1"
                strokeWidth="2"
              />

              {/* Humidity Line */}
              <path
                d="M0,45 C20,42 40,50 60,46 C80,42 90,38 100,42"
                fill="none"
                stroke="#f43f5e"
                strokeWidth="1.2"
                strokeDasharray="1.5 1.5"
                opacity="0.8"
              />
            </svg>

            {/* Peak 45°C Warning Badge Callout */}
            <div className="absolute top-[8%] left-[65%] -translate-x-1/2 flex flex-col items-center z-20">
              <div className="w-3.5 h-3.5 rounded-full bg-rose-500 border-2 border-[#0A0B10] animate-pulse" />
              <div className="bg-[#0A0B10] border border-rose-500/80 font-mono text-[10px] text-rose-300 px-3 py-1 rounded-full mt-1 shadow-xl font-bold tracking-wide">
                Peak 45°C
              </div>
            </div>

            {/* X-axis time marks */}
            <div className="absolute -bottom-6 left-0 right-0 flex justify-between font-mono text-[11px] text-slate-400 px-2">
              <span>00:00</span>
              <span>06:00</span>
              <span>12:00</span>
              <span>18:00</span>
              <span>Now</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
