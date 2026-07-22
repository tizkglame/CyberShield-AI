import React, { useState } from 'react';
import {
  AlertTriangle,
  ShieldCheck,
  ShieldAlert,
  Shield,
  Zap,
  PhoneCall,
  FileText,
  Upload,
  ArrowRight,
  Copy,
  Check,
  Building2,
  Lock,
  Flame,
  Radio,
  FileCheck
} from 'lucide-react';
import { FraudAnalysisResult, RiskLevel } from '../types';
import { PRESET_SCAM_SAMPLES } from '../data/mockData';

interface CitizenShieldTabProps {
  currentLanguage: string;
  onEvaluate: (content: string, imageBase64?: string) => Promise<void>;
  isLoading: boolean;
  result: FraudAnalysisResult | null;
  onTrigger1930Modal: () => void;
  onNavigateToNCRB: () => void;
  onNavigateToGraph: () => void;
}

export const CitizenShieldTab: React.FC<CitizenShieldTabProps> = ({
  currentLanguage,
  onEvaluate,
  isLoading,
  result,
  onTrigger1930Modal,
  onNavigateToNCRB,
  onNavigateToGraph,
}) => {
  const [inputText, setInputText] = useState<string>(PRESET_SCAM_SAMPLES[0].content);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handlePresetSelect = (presetContent: string) => {
    setInputText(presetContent);
    setImageBase64(null);
    setImagePreview(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImageBase64(base64);
        setImagePreview(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCopyJson = () => {
    if (result) {
      navigator.clipboard.writeText(JSON.stringify(result, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getRiskColor = (level?: RiskLevel) => {
    switch (level) {
      case 'CRITICAL_DIGITAL_ARREST':
        return {
          bg: 'bg-red-950/80',
          border: 'border-red-600',
          badgeBg: 'bg-red-600 text-white',
          text: 'text-red-400',
          ring: 'ring-4 ring-red-600/50 animate-pulse',
        };
      case 'HIGH_DANGER':
        return {
          bg: 'bg-amber-950/80',
          border: 'border-amber-600',
          badgeBg: 'bg-amber-600 text-white',
          text: 'text-amber-400',
          ring: 'ring-2 ring-amber-500/40',
        };
      case 'MODERATE_SUSPICION':
        return {
          bg: 'bg-yellow-950/60',
          border: 'border-yellow-600',
          badgeBg: 'bg-yellow-600 text-white',
          text: 'text-yellow-400',
          ring: 'ring-1 ring-yellow-500/30',
        };
      default:
        return {
          bg: 'bg-emerald-950/60',
          border: 'border-emerald-600',
          badgeBg: 'bg-emerald-600 text-white',
          text: 'text-emerald-400',
          ring: 'ring-1 ring-emerald-500/30',
        };
    }
  };

  return (
    <div className="space-y-5">
      
      {/* Top Banner Context */}
      <div className="bg-[#0D0D0D] border border-[#222222] p-5 rounded-sm shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-amber-500 to-indigo-600"></div>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-red-500 text-[10px] font-mono font-bold tracking-widest uppercase mb-1">
              <Zap className="w-3.5 h-3.5 text-red-500" />
              <span>MODULE 01 // CITIZEN FRAUD TRIAGE & THREAT CLASSIFIER</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase font-sans">
              Real-Time Scam Detection & Digital Arrest Triage
            </h2>
            <p className="text-slate-400 text-xs mt-1 max-w-3xl leading-relaxed">
              Paste suspicious call transcripts, WhatsApp video call demands, SMS messages, or upload screenshots of fake court arrest notices. Powered by Gemini 3.6 Flash fine-tuned on I4C & NCRB cybercrime vectors.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onTrigger1930Modal}
              className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs font-mono px-3.5 py-2 rounded-sm border border-red-500/50 flex items-center space-x-2 transition uppercase tracking-wider"
            >
              <PhoneCall className="w-3.5 h-3.5 animate-bounce" />
              <span>DIAL 1930 HELPLINE</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Column: Input Form & Presets (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Quick Preset Scenarios */}
          <div className="bg-[#0D0D0D] border border-[#222222] rounded-sm p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-red-500" />
                PRESET SCENARIO LIBRARY
              </span>
              <span className="text-[9px] font-mono bg-[#141414] text-slate-400 px-2 py-0.5 rounded-sm border border-[#2A2A2A]">1-CLICK TEST</span>
            </div>

            <div className="space-y-1.5">
              {PRESET_SCAM_SAMPLES.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => handlePresetSelect(sample.content)}
                  className="w-full text-left p-2.5 rounded-sm bg-[#111111] hover:bg-[#1A1A1A] border border-[#222222] hover:border-red-900/60 transition group flex flex-col gap-0.5 font-mono text-xs"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-bold text-slate-200 group-hover:text-amber-400 transition">
                      {sample.title}
                    </span>
                    <span className="text-[9px] text-slate-400 bg-[#050505] px-1.5 py-0.5 rounded-sm border border-[#222]">
                      {sample.type}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Input Box */}
          <div className="bg-[#0D0D0D] border border-[#222222] rounded-sm p-4 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-2">
              <label className="text-xs font-mono font-bold text-slate-200 flex items-center gap-2 uppercase tracking-wider">
                <FileText className="w-4 h-4 text-red-500" />
                Input Threat Communication
              </label>
              <span className="text-[10px] font-mono text-slate-400">LANG: <strong className="text-amber-400">{currentLanguage}</strong></span>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste suspicious text message, WhatsApp threat transcript, call details, or fake warrant details..."
              rows={7}
              className="w-full bg-[#050505] border border-[#222222] focus:border-red-600 rounded-sm p-3 text-xs text-slate-100 placeholder-slate-600 focus:outline-none font-mono resize-none"
            />

            {/* Optional Image Upload */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                Attach Screenshot / Fake Arrest Warrant (Optional)
              </span>
              <div className="flex items-center gap-3">
                <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 rounded-xl px-4 py-2 text-xs font-medium text-slate-200 flex items-center gap-2 transition">
                  <Upload className="w-4 h-4 text-amber-400" />
                  <span>{imagePreview ? 'Change Image' : 'Upload Warrant Image'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>

                {imagePreview && (
                  <div className="relative group">
                    <img
                      src={imagePreview}
                      alt="Warrant preview"
                      className="w-10 h-10 object-cover rounded-lg border border-slate-700"
                    />
                    <button
                      onClick={() => { setImageBase64(null); setImagePreview(null); }}
                      className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Evaluate Trigger Button */}
            <button
              onClick={() => onEvaluate(inputText, imageBase64 || undefined)}
              disabled={isLoading || (!inputText.trim() && !imageBase64)}
              className="w-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-indigo-950/50 flex items-center justify-center space-x-2 border border-indigo-400/30 transition transform active:scale-98 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Radio className="w-5 h-5 animate-spin text-amber-400" />
                  <span className="animate-pulse">Evaluating via Gemini 3.6 Public Safety Engine...</span>
                </>
              ) : (
                <>
                  <ShieldAlert className="w-5 h-5 text-amber-300" />
                  <span>Run AI Fraud & Digital Arrest Evaluation</span>
                </>
              )}
            </button>

          </div>

        </div>

        {/* Right Column: AI Analysis Result Display (7 cols) */}
        <div className="lg:col-span-7">
          {result ? (
            <div className="space-y-5">
              
              {/* Risk Assessment Top Card */}
              {(() => {
                const colors = getRiskColor(result.riskAssessment?.riskLevel);
                return (
                  <div className={`border rounded-2xl p-5 shadow-2xl relative overflow-hidden transition-all duration-300 ${colors.bg} ${colors.border} ${colors.ring}`}>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs font-black uppercase px-2.5 py-1 rounded-md tracking-wider ${colors.badgeBg}`}>
                            {result.riskAssessment?.riskLevel?.replace(/_/g, ' ')}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">
                            Confidence: {result.riskAssessment?.confidenceIndex}%
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-white mt-1.5">
                          {result.riskAssessment?.scamCategory}
                        </h3>
                      </div>

                      {/* Risk Gauge Numerical Score */}
                      <div className="flex items-center space-x-3 bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-2 self-start sm:self-auto">
                        <div className="text-center">
                          <div className={`text-2xl font-black ${colors.text}`}>
                            {result.riskAssessment?.riskScore}/100
                          </div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Risk Score</div>
                        </div>
                      </div>
                    </div>

                    {/* Digital Arrest Flag Highlight */}
                    {result.lawEnforcementIntelligence?.digitalArrestFlag && (
                      <div className="mt-4 bg-red-600/20 border border-red-500/40 rounded-xl p-3 flex items-center space-x-3">
                        <ShieldAlert className="w-6 h-6 text-red-400 flex-shrink-0 animate-bounce" />
                        <div>
                          <div className="text-xs font-bold text-red-300 uppercase tracking-wide">
                            🚨 ACTIVE DIGITAL ARREST PATTERN CONFIRMED
                          </div>
                          <p className="text-xs text-red-200 mt-0.5">
                            Caller/Message uses psychological coercion, claiming government agency authority & video call confinement. Disconnect call immediately!
                          </p>
                        </div>
                      </div>
                    )}

                  </div>
                );
              })()}

              {/* Victim Guidance Box */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    Victim Advisory & Action Plan ({result.victimGuidance?.language || currentLanguage})
                  </h4>
                  <button
                    onClick={handleCopyJson}
                    className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700 transition"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied JSON' : 'Export JSON'}</span>
                  </button>
                </div>

                {/* Explanation */}
                <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-4 text-sm text-slate-200 leading-relaxed">
                  <p className="font-medium text-slate-300">{result.victimGuidance?.explanation}</p>
                </div>

                {/* Immediate Actions Checklist */}
                <div>
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Immediate Action Protocol
                  </h5>
                  <div className="space-y-2">
                    {result.victimGuidance?.immediateActions?.map((action, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3 text-xs text-slate-100 flex items-start space-x-3"
                      >
                        <span className="bg-amber-500/20 text-amber-400 font-bold px-2 py-0.5 rounded text-[11px] mt-0.5">
                          Step {idx + 1}
                        </span>
                        <span className="font-medium">{action}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Public Safety Advisory */}
                <div className="bg-amber-950/40 border border-amber-500/30 rounded-xl p-3.5 text-xs text-amber-200 flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold uppercase tracking-wide block text-amber-300">Public Advisory:</span>
                    <span>{result.victimGuidance?.publicSafetyAdvisory}</span>
                  </div>
                </div>

              </div>

              {/* Law Enforcement Intelligence Cards */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-indigo-400" />
                    Law Enforcement Intelligence & Network Entities
                  </h4>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                    I4C / NCRB Schema
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  
                  {/* Impersonated Agencies */}
                  <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
                    <span className="text-slate-400 font-semibold block mb-1">Impersonated Agencies</span>
                    <div className="flex flex-wrap gap-1">
                      {result.lawEnforcementIntelligence?.networkEntities?.impersonatedAgencies?.map((agency, i) => (
                        <span key={i} className="bg-red-950/60 text-red-300 border border-red-800/60 px-2 py-0.5 rounded text-[11px] font-medium">
                          {agency}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Suspicious Identifiers */}
                  <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
                    <span className="text-slate-400 font-semibold block mb-1">Extracted Identifiers (Phone / UPI)</span>
                    <div className="flex flex-wrap gap-1">
                      {result.lawEnforcementIntelligence?.networkEntities?.suspiciousIdentifiers?.length ? (
                        result.lawEnforcementIntelligence.networkEntities.suspiciousIdentifiers.map((id, i) => (
                          <span key={i} className="bg-amber-950/60 text-amber-300 border border-amber-800/60 px-2 py-0.5 rounded text-[11px] font-mono">
                            {id}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-500 italic">None extracted from text</span>
                      )}
                    </div>
                  </div>

                </div>

                {/* Suggested Legal Crime Head & NCRB Type */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-semibold">NCRB Incident Type:</span>
                    <span className="text-slate-200 font-bold">{result.lawEnforcementIntelligence?.ncrbReportData?.incidentType}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-800/60">
                    <span className="text-slate-400 font-semibold">Suggested BNS / IT Act Head:</span>
                    <span className="text-indigo-300 font-mono font-bold">{result.lawEnforcementIntelligence?.ncrbReportData?.suggestedCrimeHead}</span>
                  </div>
                </div>

                {/* Direct Action Buttons to other modules */}
                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={onNavigateToNCRB}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center space-x-2 transition"
                  >
                    <FileCheck className="w-4 h-4" />
                    <span>Auto-Fill Official NCRB Complaint</span>
                  </button>

                  <button
                    onClick={onNavigateToGraph}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs py-2.5 px-3 rounded-xl border border-slate-700 flex items-center justify-center space-x-2 transition"
                  >
                    <ArrowRight className="w-4 h-4 text-amber-400" />
                    <span>Map Entity in Link Graph</span>
                  </button>
                </div>

              </div>

            </div>
          ) : (
            <div className="bg-slate-900/60 border border-dashed border-slate-800 rounded-2xl p-12 text-center space-y-3">
              <Shield className="w-12 h-12 text-slate-700 mx-auto" />
              <h3 className="text-base font-bold text-slate-400">Awaiting Input Evaluation</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Select a test scenario from the left panel or paste a communication snippet to view real-time risk score, victim guidance, and law enforcement intelligence.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
