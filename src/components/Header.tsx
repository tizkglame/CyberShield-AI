import React from 'react';
import { Shield, PhoneCall, Globe, Cpu, Radio, AlertCircle } from 'lucide-react';

interface HeaderProps {
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
  onTrigger1930Modal: () => void;
}

const LANGUAGES = [
  { code: 'English', label: 'English' },
  { code: 'Hindi', label: 'हिंदी (Hindi)' },
  { code: 'Marathi', label: 'मराठी (Marathi)' },
  { code: 'Tamil', label: 'தமிழ் (Tamil)' },
  { code: 'Telugu', label: 'తెలుగు (Telugu)' },
  { code: 'Bengali', label: 'বাংলা (Bengali)' },
  { code: 'Kannada', label: 'கன்னட (Kannada)' },
  { code: 'Gujarati', label: 'ગુજરાતી (Gujarati)' },
];

export const Header: React.FC<HeaderProps> = ({
  currentLanguage,
  onLanguageChange,
  onTrigger1930Modal,
}) => {
  return (
    <header className="border-b border-[#222222] bg-[#050505] text-slate-100 sticky top-0 z-40">
      
      {/* Top Utility Technical Status Strip */}
      <div className="bg-[#0D0D0D] border-b border-[#1F1F1F] px-4 py-1.5 font-mono text-[10px] text-slate-400 flex flex-wrap items-center justify-between gap-2 uppercase tracking-widest">
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1.5 text-red-500 font-bold">
            <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse"></span>
            <span>SYSTEM STATE: ACTIVE // SECURE ACCESS PORTAL</span>
          </span>
          <span className="hidden sm:inline text-[#333]">|</span>
          <span className="hidden sm:inline text-slate-400">RESTRICTED GOVERNMENT CLASSIFIED L7</span>
        </div>

        <div className="flex items-center space-x-4">
          <span className="hidden md:inline text-slate-400">LATENCY: <strong className="text-emerald-400">12ms</strong></span>
          <span className="hidden md:inline text-slate-400">GEMINI ENGINE: <strong className="text-amber-400">3.6 FLASH</strong></span>
          <button
            onClick={onTrigger1930Modal}
            className="text-red-400 hover:text-red-300 font-bold flex items-center space-x-1 bg-red-950/60 border border-red-800/80 px-2 py-0.5 rounded-sm transition"
          >
            <PhoneCall className="w-3 h-3 text-red-500 animate-pulse" />
            <span>DIAL 1930 HELPLINE</span>
          </button>
        </div>
      </div>

      {/* Main Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Logo & Agency Title */}
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-red-600 rounded-sm flex items-center justify-center font-bold text-xs text-white shadow-lg shadow-red-950/50 border border-red-500/30">
              MHA
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-white uppercase font-sans">
                  Digital Public Safety & Citizen Fraud Shield
                </h1>
                <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold tracking-widest uppercase bg-red-950/80 text-red-400 border border-red-800 rounded-sm">
                  NCRB / I4C ALIGNED
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono tracking-tight">
                Sovereign Threat Neutralisation Engine for Citizens, Banks & Cyber Crime Cells
              </p>
            </div>
          </div>

          {/* Right Controls & Ticker Metrics */}
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px]">
            
            {/* Ticker Metrics */}
            <div className="hidden xl:flex items-center space-x-4 bg-[#0D0D0D] border border-[#222222] px-3 py-1.5 rounded-sm">
              <div>
                <span className="text-slate-500 text-[9px] block uppercase">Daily Blocked UPIs</span>
                <span className="text-emerald-400 font-bold">4,281</span>
              </div>
              <div className="w-px h-6 bg-[#222]"></div>
              <div>
                <span className="text-slate-500 text-[9px] block uppercase">Active Link Correlations</span>
                <span className="text-amber-400 font-bold">82,901</span>
              </div>
            </div>

            {/* Language Selector */}
            <div className="flex items-center space-x-1.5 bg-[#0D0D0D] border border-[#222222] rounded-sm px-2.5 py-1 text-slate-200">
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <select
                value={currentLanguage}
                onChange={(e) => onLanguageChange(e.target.value)}
                className="bg-transparent text-slate-100 font-medium focus:outline-none cursor-pointer text-xs"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-[#0D0D0D] text-slate-100">
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Helpline Emergency Trigger Button */}
            <button
              onClick={onTrigger1930Modal}
              className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-3.5 py-2 rounded-sm shadow-md border border-red-500/40 flex items-center space-x-2 transition uppercase tracking-wider"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>EMERGENCY 1930</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};

