import React from 'react';
import { X, Bell, AlertTriangle, CheckCircle2, Info, Flame, Shield, Check } from 'lucide-react';
import { SafetyLogEvent } from '../types';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  logs: SafetyLogEvent[];
  onClearAll: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  logs,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div 
      id="notification-drawer-overlay"
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md h-full bg-[#0A0B10] border-l border-white/10 p-6 flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-2xl">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Safety Alerts & Notifications</h3>
              <p className="text-xs font-mono text-slate-400">{logs.length} logged events</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Alerts List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {logs.length > 0 ? (
            logs.map((log) => (
              <div
                key={log.id}
                className={`p-4 rounded-2xl border transition-all ${
                  log.badgeType === 'danger'
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-200'
                    : log.badgeType === 'warning'
                    ? 'bg-amber-500/10 border-amber-500/30 text-slate-200'
                    : 'bg-white/5 border-white/5 text-slate-200'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center gap-2">
                    {log.badgeType === 'danger' ? (
                      <Flame className="w-4 h-4 text-rose-400" />
                    ) : log.badgeType === 'warning' ? (
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                    ) : log.badgeType === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Info className="w-4 h-4 text-indigo-400" />
                    )}
                    <span className="font-bold text-xs text-white">{log.title}</span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-400">{log.timestamp}</span>
                </div>
                <p className="text-xs text-slate-400 pl-6 leading-relaxed">{log.description}</p>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-slate-400 text-xs font-mono">
              No recent unread alerts.
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={onClearAll}
            className="text-xs font-mono text-slate-400 hover:text-rose-400 transition-colors"
          >
            Clear Log View
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-indigo-600 text-white font-mono text-xs font-bold rounded-full hover:bg-indigo-500 transition-colors shadow-md shadow-indigo-600/20"
          >
            Acknowledge All
          </button>
        </div>
      </div>
    </div>
  );
};
