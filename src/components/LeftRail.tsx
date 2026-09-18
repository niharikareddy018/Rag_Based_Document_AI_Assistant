import React from 'react';
import {
  FileText,
  BarChart3,
  Scale,
  Globe2,
  Sliders,
  ChevronDown,
  Settings,
  LogOut,
  Layers,
  Wrench,
  BookOpen,
} from 'lucide-react';
import { AppView } from '../types';

interface LeftRailProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  onOpenSettings: () => void;
  onOpenDocuments: () => void;
}

export const LeftRail: React.FC<LeftRailProps> = ({
  currentView,
  onNavigate,
  onOpenSettings,
  onOpenDocuments,
}) => {
  return (
    <aside className="w-16 shrink-0 flex flex-col items-center justify-between py-6 select-none">
      {/* Top Action Icons */}
      <div className="flex flex-col items-center gap-3">
        {/* Tool/Pipeline */}
        <button
          onClick={() => onNavigate('dashboard')}
          title="Pipeline & Models"
          className="w-10 h-10 rounded-full bg-[#0d1610] border border-[#1b2b20] hover:border-[#22c55e]/50 hover:bg-[#142618] text-neutral-400 hover:text-[#4ade80] flex items-center justify-center transition-all cursor-pointer shadow-xs group"
        >
          <Wrench className="w-4 h-4 group-hover:scale-110 transition-transform" />
        </button>

        {/* Analytics / Metrics */}
        <button
          onClick={() => onNavigate('dashboard')}
          title="Vector Retrieval Metrics"
          className="w-10 h-10 rounded-full bg-[#0d1610] border border-[#1b2b20] hover:border-[#22c55e]/50 hover:bg-[#142618] text-neutral-400 hover:text-[#4ade80] flex items-center justify-center transition-all cursor-pointer shadow-xs group"
        >
          <BarChart3 className="w-4 h-4 group-hover:scale-110 transition-transform" />
        </button>

        {/* Document Knowledge Base */}
        <button
          onClick={onOpenDocuments}
          title="Document Library & Ingestion"
          className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer shadow-xs group ${
            currentView === 'documents' || currentView === 'upload'
              ? 'bg-[#15271a] border-[#22c55e] text-[#4ade80] shadow-[0_0_12px_rgba(34,197,94,0.3)]'
              : 'bg-[#0d1610] border-[#1b2b20] hover:border-[#22c55e]/50 hover:bg-[#142618] text-neutral-400 hover:text-[#4ade80]'
          }`}
        >
          <FileText className="w-4 h-4 group-hover:scale-110 transition-transform" />
        </button>

        {/* Citation & Grounding Scales */}
        <button
          onClick={() => onNavigate('split')}
          title="Verified Citations / Split Reader"
          className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer shadow-xs group ${
            currentView === 'split'
              ? 'bg-[#15271a] border-[#22c55e] text-[#4ade80] shadow-[0_0_12px_rgba(34,197,94,0.3)]'
              : 'bg-[#0d1610] border-[#1b2b20] hover:border-[#22c55e]/50 hover:bg-[#142618] text-neutral-400 hover:text-[#4ade80]'
          }`}
        >
          <Scale className="w-4 h-4 group-hover:scale-110 transition-transform" />
        </button>

        {/* Knowledge Web */}
        <button
          onClick={() => onNavigate('dashboard')}
          title="Global Vector Spaces"
          className="w-10 h-10 rounded-full bg-[#0d1610] border border-[#1b2b20] hover:border-[#22c55e]/50 hover:bg-[#142618] text-neutral-400 hover:text-[#4ade80] flex items-center justify-center transition-all cursor-pointer shadow-xs group"
        >
          <Globe2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
        </button>

        {/* Advanced RAG Tuning */}
        <button
          onClick={onOpenSettings}
          title="RAG Hyperparameters"
          className="w-10 h-10 rounded-full bg-[#0d1610] border border-[#1b2b20] hover:border-[#22c55e]/50 hover:bg-[#142618] text-neutral-400 hover:text-[#4ade80] flex items-center justify-center transition-all cursor-pointer shadow-xs group"
        >
          <Sliders className="w-4 h-4 group-hover:scale-110 transition-transform" />
        </button>

        {/* Expand / Down */}
        <button
          onClick={() => onNavigate('dashboard')}
          title="More modules"
          className="w-10 h-10 rounded-full bg-[#0a120c] border border-[#16241b] text-neutral-500 hover:text-neutral-300 flex items-center justify-center transition-all cursor-pointer"
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bottom Icons: Settings & LogOut */}
      <div className="flex flex-col items-center gap-3">
        <button
          onClick={onOpenSettings}
          title="Settings"
          className="w-10 h-10 rounded-full bg-[#0d1610] border border-[#1b2b20] hover:border-[#22c55e]/50 hover:bg-[#142618] text-neutral-400 hover:text-[#4ade80] flex items-center justify-center transition-all cursor-pointer shadow-xs group"
        >
          <Settings className="w-4 h-4 group-hover:rotate-45 transition-transform" />
        </button>

        <button
          onClick={() => onNavigate('chat')}
          title="Sign out / Reset"
          className="w-10 h-10 rounded-full bg-[#0d1610] border border-[#1b2b20] hover:border-red-500/40 hover:bg-[#201111] text-neutral-400 hover:text-red-400 flex items-center justify-center transition-all cursor-pointer shadow-xs group"
        >
          <LogOut className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        </button>
      </div>
    </aside>
  );
};
