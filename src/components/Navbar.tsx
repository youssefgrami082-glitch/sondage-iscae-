import React from 'react';
import { Sparkles, Layers, BarChart3, ExternalLink, CheckCircle2 } from 'lucide-react';
import { FORM_METADATA } from '../data/formData';

interface NavbarProps {
  activeTab: 'guided' | 'full' | 'stats';
  setActiveTab: (tab: 'guided' | 'full' | 'stats') => void;
  answeredCount: number;
  totalCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  answeredCount,
  totalCount,
}) => {
  const progressPercent = Math.round((answeredCount / totalCount) * 100);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-1 ring-white/20">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-bold text-white text-xs sm:text-base tracking-tight whitespace-nowrap">
                Forum Management
              </span>
              <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 rounded-full animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                STAY TUNED
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 hidden sm:block">
              Faculté 2026 • Consultation
            </p>
          </div>
        </div>

        {/* View Mode Switcher */}
        <nav className="flex items-center bg-slate-900/90 border border-slate-800 rounded-xl p-0.5 sm:p-1 shadow-inner shrink-0">
          <button
            onClick={() => setActiveTab('guided')}
            className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-medium transition-all ${
              activeTab === 'guided'
                ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-sm font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
            title="Parcours guidé question par question"
          >
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span className="hidden xs:inline">Guidé</span>
          </button>

          <button
            onClick={() => setActiveTab('full')}
            className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-medium transition-all ${
              activeTab === 'full'
                ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-sm font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
            title="Vue globale du formulaire"
          >
            <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span className="hidden xs:inline">Global</span>
          </button>

          <button
            onClick={() => setActiveTab('stats')}
            className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-medium transition-all ${
              activeTab === 'stats'
                ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-sm font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
            title="Statistiques en temps réel"
          >
            <BarChart3 className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span>Stats</span>
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse" />
          </button>
        </nav>

        {/* Right side actions: Progress indicator & GForm button */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl">
            <CheckCircle2 className={`w-3.5 h-3.5 ${answeredCount > 0 ? 'text-emerald-400' : 'text-slate-500'}`} />
            <div className="text-[11px] sm:text-xs">
              <span className="text-slate-200 font-medium">{answeredCount}</span>
              <span className="text-slate-500">/{totalCount}</span>
            </div>
            <div className="hidden sm:block w-10 sm:w-12 h-1.5 bg-slate-800 rounded-full overflow-hidden ml-1">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <a
            href={FORM_METADATA.googleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Ouvrir le formulaire officiel Google Forms"
            className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-900 rounded-lg transition-colors border border-transparent hover:border-slate-800"
          >
            <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </a>
        </div>
      </div>
    </header>
  );
};
