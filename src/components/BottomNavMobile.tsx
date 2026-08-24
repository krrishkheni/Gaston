import React from 'react';
import { ActiveTab } from '../types';
import { 
  Home, 
  Settings2, 
  BarChart2, 
  History 
} from 'lucide-react';

interface BottomNavMobileProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const BottomNavMobile: React.FC<BottomNavMobileProps> = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <nav 
      id="mobile-bottom-nav"
      className="lg:hidden fixed bottom-0 left-0 w-full z-40 flex justify-around items-center py-3 px-4 bg-[#0A0B10]/90 backdrop-blur-xl border-t border-white/10 rounded-t-3xl shadow-[0_-4px_25px_rgba(0,0,0,0.8)]"
    >
      {/* Home Tab */}
      <button
        id="mobile-tab-home"
        onClick={() => setActiveTab('dashboard')}
        className={`flex flex-col items-center justify-center p-2 rounded-full transition-all ${
          activeTab === 'dashboard'
            ? 'bg-indigo-600 text-white px-5 py-1.5 shadow-lg shadow-indigo-600/30 scale-105'
            : 'text-slate-400 hover:text-white'
        }`}
      >
        <Home className={`w-5 h-5 ${activeTab === 'dashboard' ? 'stroke-[2.5]' : ''}`} />
        <span className="font-mono text-[11px] font-semibold mt-0.5">Home</span>
      </button>

      {/* Control Tab */}
      <button
        id="mobile-tab-control"
        onClick={() => setActiveTab('control')}
        className={`flex flex-col items-center justify-center p-2 rounded-full transition-all ${
          activeTab === 'control'
            ? 'bg-indigo-600 text-white px-5 py-1.5 shadow-lg shadow-indigo-600/30 scale-105'
            : 'text-slate-400 hover:text-white'
        }`}
      >
        <Settings2 className={`w-5 h-5 ${activeTab === 'control' ? 'stroke-[2.5]' : ''}`} />
        <span className="font-mono text-[11px] font-semibold mt-0.5">Control</span>
      </button>

      {/* Data / Analytics Tab */}
      <button
        id="mobile-tab-analytics"
        onClick={() => setActiveTab('analytics')}
        className={`flex flex-col items-center justify-center p-2 rounded-full transition-all ${
          activeTab === 'analytics'
            ? 'bg-indigo-600 text-white px-5 py-1.5 shadow-lg shadow-indigo-600/30 scale-105'
            : 'text-slate-400 hover:text-white'
        }`}
      >
        <BarChart2 className={`w-5 h-5 ${activeTab === 'analytics' ? 'stroke-[2.5]' : ''}`} />
        <span className="font-mono text-[11px] font-semibold mt-0.5">Data</span>
      </button>

      {/* Logs Tab */}
      <button
        id="mobile-tab-logs"
        onClick={() => setActiveTab('logs')}
        className={`flex flex-col items-center justify-center p-2 rounded-full transition-all ${
          activeTab === 'logs'
            ? 'bg-indigo-600 text-white px-5 py-1.5 shadow-lg shadow-indigo-600/30 scale-105'
            : 'text-slate-400 hover:text-white'
        }`}
      >
        <History className={`w-5 h-5 ${activeTab === 'logs' ? 'stroke-[2.5]' : ''}`} />
        <span className="font-mono text-[11px] font-semibold mt-0.5">Logs</span>
      </button>
    </nav>
  );
};
