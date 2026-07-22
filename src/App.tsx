import React, { useState } from 'react';
import { Header } from './components/Header';
import { CitizenShieldTab } from './components/CitizenShieldTab';
import { NetworkGraphTab } from './components/NetworkGraphTab';
import { FICNValidationTab } from './components/FICNValidationTab';
import { GeospatialMapTab } from './components/GeospatialMapTab';
import { NCRBDirectiveTab } from './components/NCRBDirectiveTab';
import { Helpline1930Modal } from './components/Helpline1930Modal';
import { FraudAnalysisResult } from './types';
import { ShieldAlert, Network, Banknote, MapPin, Scale } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'SHIELD' | 'GRAPH' | 'FICN' | 'GEOSPATIAL' | 'NCRB'>('SHIELD');
  const [currentLanguage, setCurrentLanguage] = useState<string>('English');
  const [is1930ModalOpen, setIs1930ModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<FraudAnalysisResult | null>(null);

  const handleEvaluate = async (content: string, imageBase64?: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          imageBase64,
          targetLanguage: currentLanguage,
        }),
      });
      const data = await response.json();
      setEvaluationResult(data);
    } catch (err) {
      console.error('Failed to evaluate content', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#e0e0e0] flex flex-col font-sans selection:bg-red-600 selection:text-white">
      
      {/* Header Bar */}
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        onTrigger1930Modal={() => setIs1930ModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-5">
        
        {/* Module Navigation Tabs */}
        <div className="bg-[#0D0D0D] border border-[#222222] p-1 rounded-sm flex flex-wrap items-center justify-between gap-1 shadow-2xl">
          
          <button
            onClick={() => setActiveTab('SHIELD')}
            className={`flex-1 min-w-[150px] py-2 px-3 rounded-sm text-xs font-mono uppercase tracking-wider transition flex items-center justify-center space-x-2 ${
              activeTab === 'SHIELD'
                ? 'bg-[#1A1A1A] text-white border border-[#333333] font-bold shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#111111]'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
            <span>Citizen Fraud Shield</span>
          </button>

          <button
            onClick={() => setActiveTab('GRAPH')}
            className={`flex-1 min-w-[150px] py-2 px-3 rounded-sm text-xs font-mono uppercase tracking-wider transition flex items-center justify-center space-x-2 ${
              activeTab === 'GRAPH'
                ? 'bg-[#1A1A1A] text-white border border-[#333333] font-bold shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#111111]'
            }`}
          >
            <Network className="w-3.5 h-3.5 text-indigo-400" />
            <span>Fraud Network Graph</span>
          </button>

          <button
            onClick={() => setActiveTab('FICN')}
            className={`flex-1 min-w-[150px] py-2 px-3 rounded-sm text-xs font-mono uppercase tracking-wider transition flex items-center justify-center space-x-2 ${
              activeTab === 'FICN'
                ? 'bg-[#1A1A1A] text-white border border-[#333333] font-bold shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#111111]'
            }`}
          >
            <Banknote className="w-3.5 h-3.5 text-amber-400" />
            <span>FICN Note Validator</span>
          </button>

          <button
            onClick={() => setActiveTab('GEOSPATIAL')}
            className={`flex-1 min-w-[150px] py-2 px-3 rounded-sm text-xs font-mono uppercase tracking-wider transition flex items-center justify-center space-x-2 ${
              activeTab === 'GEOSPATIAL'
                ? 'bg-[#1A1A1A] text-white border border-[#333333] font-bold shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#111111]'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span>LE Command Center</span>
          </button>

          <button
            onClick={() => setActiveTab('NCRB')}
            className={`flex-1 min-w-[150px] py-2 px-3 rounded-sm text-xs font-mono uppercase tracking-wider transition flex items-center justify-center space-x-2 ${
              activeTab === 'NCRB'
                ? 'bg-[#1A1A1A] text-white border border-[#333333] font-bold shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-[#111111]'
            }`}
          >
            <Scale className="w-3.5 h-3.5 text-emerald-400" />
            <span>NCRB Directive Portal</span>
          </button>

        </div>

        {/* Tab Content Rendering */}
        {activeTab === 'SHIELD' && (
          <CitizenShieldTab
            currentLanguage={currentLanguage}
            onEvaluate={handleEvaluate}
            isLoading={isLoading}
            result={evaluationResult}
            onTrigger1930Modal={() => setIs1930ModalOpen(true)}
            onNavigateToNCRB={() => setActiveTab('NCRB')}
            onNavigateToGraph={() => setActiveTab('GRAPH')}
          />
        )}

        {activeTab === 'GRAPH' && (
          <NetworkGraphTab
            onNavigateToNCRB={() => setActiveTab('NCRB')}
          />
        )}

        {activeTab === 'FICN' && (
          <FICNValidationTab />
        )}

        {activeTab === 'GEOSPATIAL' && (
          <GeospatialMapTab />
        )}

        {activeTab === 'NCRB' && (
          <NCRBDirectiveTab
            evaluationResult={evaluationResult}
            onTrigger1930Modal={() => setIs1930ModalOpen(true)}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-[#1F1F1F] bg-[#0A0A0A] py-3.5 text-center text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            RESTRICTED ACCESS // MINISTRY OF HOME AFFAIRS (MHA) & I4C CYBER CRIME CELL
          </span>
          <span className="text-slate-400">
            EMERGENCY HELPLINE: <strong className="text-red-400 font-bold">DIAL 1930</strong> | CYBERCRIME.GOV.IN
          </span>
        </div>
      </footer>

      {/* Helpline 1930 Emergency Modal */}
      <Helpline1930Modal
        isOpen={is1930ModalOpen}
        onClose={() => setIs1930ModalOpen(false)}
      />

    </div>
  );
}

