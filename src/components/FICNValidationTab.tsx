import React, { useState } from 'react';
import {
  Banknote,
  Search,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Eye,
  ShieldAlert,
  FileCheck,
  Building,
  Upload,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { FICNAnalysisResult } from '../types';

export const FICNValidationTab: React.FC = () => {
  const [denomination, setDenomination] = useState<string>('₹500 (Mahatma Gandhi New Series)');
  const [serialNumber, setSerialNumber] = useState<string>('9AB 482103');
  const [observations, setObservations] = useState<string>(
    'Security thread lacks green-to-blue color shift on tilt. Mahatma Gandhi portrait watermark appears opaque printed. Intaglio bleed lines flat to touch.'
  );
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ficnResult, setFicnResult] = useState<FICNAnalysisResult | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeFICN = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/evaluate-ficn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          denomination,
          serialNumber,
          featureObservations: observations,
          imageBase64: imagePreview || undefined,
        }),
      });
      const data = await response.json();
      setFicnResult(data);
    } catch (err) {
      console.error('FICN Analysis failed', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getVerdictStyle = (verdict?: string) => {
    switch (verdict) {
      case 'CONFIRMED_COUNTERFEIT':
      case 'SUSPECT_FICN':
        return {
          bg: 'bg-red-950/80',
          border: 'border-red-600',
          badge: 'bg-red-600 text-white',
          text: 'text-red-400',
          label: 'SUSPECT COUNTERFEIT (FICN ANOMALY DETECTED)',
        };
      default:
        return {
          bg: 'bg-emerald-950/80',
          border: 'border-emerald-600',
          badge: 'bg-emerald-600 text-white',
          text: 'text-emerald-400',
          label: 'GENUINE CURRENCY NOTE (ALL FEATURES VERIFIED)',
        };
    }
  };

  return (
    <div className="space-y-5">
      
      {/* Top Banner Context */}
      <div className="bg-[#0D0D0D] border border-[#222222] p-5 rounded-sm shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-red-500 to-indigo-600"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 font-mono text-[10px] font-bold tracking-widest uppercase mb-1">
              <Banknote className="w-3.5 h-3.5 text-amber-400" />
              <span>MODULE 03 // PHYSICAL & VISUAL BANKNOTE FORENSIC VALIDATOR</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase font-sans">
              Counterfeit Currency (FICN) Validation Advisory
            </h2>
            <p className="text-slate-400 text-xs mt-1 max-w-3xl leading-relaxed">
              Forensic verification for bank tellers, cash counting machines, and field officers. Evaluates serial number syntax, Mahatma Gandhi watermark, windowed security thread color-shift, microprint, and intaglio bleed lines against RBI benchmarks.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-[#111111] text-amber-400 font-mono px-3 py-1.5 rounded-sm border border-[#222222]">
              RBI CIRCULAR RBI/2023-24/31 COMPLIANT
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Column: Input Form (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-[#0D0D0D] border border-[#222222] rounded-sm p-4 space-y-4 shadow-xl">
            <h3 className="text-xs font-mono font-bold text-slate-200 flex items-center gap-2 uppercase tracking-wider border-b border-[#1F1F1F] pb-2">
              <Search className="w-4 h-4 text-amber-400" />
              Physical Note Parameter Scanner
            </h3>

            {/* Denomination Select */}
            <div className="space-y-1 text-xs font-mono">
              <label className="text-slate-400 text-[10px] uppercase tracking-wider block">Denomination & Series</label>
              <select
                value={denomination}
                onChange={(e) => setDenomination(e.target.value)}
                className="w-full bg-[#050505] border border-[#222222] rounded-sm p-2 text-slate-100 focus:outline-none cursor-pointer"
              >
                <option value="₹500 (Mahatma Gandhi New Series)">₹500 (Mahatma Gandhi New Series)</option>
                <option value="₹2000 (Mahatma Gandhi New Series)">₹2000 (Mahatma Gandhi New Series)</option>
                <option value="₹200 (Mahatma Gandhi New Series)">₹200 (Mahatma Gandhi New Series)</option>
                <option value="₹100 (Mahatma Gandhi New Series)">₹100 (Mahatma Gandhi New Series)</option>
              </select>
            </div>

            {/* Serial Number Input */}
            <div className="space-y-1 text-xs font-mono">
              <label className="text-slate-400 text-[10px] uppercase tracking-wider block">Serial Number Syntax</label>
              <input
                type="text"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                placeholder="e.g. 9AB 482103"
                className="w-full bg-[#050505] border border-[#222222] rounded-sm p-2 text-slate-100 placeholder-slate-600 focus:outline-none font-mono font-bold"
              />
              <span className="text-[9px] text-slate-500 block">Check serial font progression left to right</span>
            </div>

            {/* Physical Feature Observations */}
            <div className="space-y-1 text-xs">
              <label className="text-slate-300 font-semibold block">Feature Observations / Defect Description</label>
              <textarea
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                rows={4}
                placeholder="Describe tactile feel, security thread color, watermark clarity, or microprinting legibility..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 placeholder-slate-500 focus:outline-none resize-none font-mono"
              />
            </div>

            {/* Note Image Upload */}
            <div className="space-y-2 text-xs">
              <label className="text-slate-300 font-semibold block">Upload Banknote Image (Optional)</label>
              <div className="flex items-center gap-3">
                <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-200 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-amber-400" />
                  <span>{imagePreview ? 'Change Image' : 'Select Note Photo'}</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>

                {imagePreview && (
                  <div className="relative">
                    <img src={imagePreview} alt="Note preview" className="w-12 h-8 object-cover rounded border border-slate-700" />
                    <button onClick={() => setImagePreview(null)} className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">×</button>
                  </div>
                )}
              </div>
            </div>

            {/* Analyze FICN Button */}
            <button
              onClick={handleAnalyzeFICN}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-amber-600 via-amber-500 to-red-600 hover:from-amber-500 hover:to-red-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg flex items-center justify-center space-x-2 transition cursor-pointer"
            >
              {isLoading ? (
                <Sparkles className="w-5 h-5 animate-spin text-white" />
              ) : (
                <Banknote className="w-5 h-5 text-amber-200" />
              )}
              <span>{isLoading ? 'Scanning RBI Security Benchmarks...' : 'Run Forensic FICN Verification'}</span>
            </button>

          </div>

        </div>

        {/* Right Column: Forensic Results & Impoundment Directive (7 cols) */}
        <div className="lg:col-span-7">
          {ficnResult ? (
            <div className="space-y-5">
              
              {/* Verdict Header Card */}
              {(() => {
                const style = getVerdictStyle(ficnResult.verdict);
                return (
                  <div className={`border rounded-2xl p-5 shadow-2xl ${style.bg} ${style.border}`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-black uppercase px-2.5 py-1 rounded-md ${style.badge}`}>
                        {style.label}
                      </span>
                      <div className="text-right">
                        <div className={`text-2xl font-black ${style.text}`}>
                          {ficnResult.authenticityScore}/100
                        </div>
                        <div className="text-[10px] text-slate-400 uppercase font-bold">Authenticity Rating</div>
                      </div>
                    </div>

                    <div className="mt-3 text-xs text-slate-200 space-y-1">
                      <div>Note Denomination: <strong className="text-white">{ficnResult.denomination}</strong></div>
                      <div>Serial Number Syntax: <strong className="font-mono text-amber-300">{ficnResult.serialNumber}</strong></div>
                    </div>
                  </div>
                );
              })()}

              {/* Security Feature Verification Matrix */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
                <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-3">
                  <Eye className="w-4 h-4 text-indigo-400" />
                  RBI Security Feature Inspection Checklist
                </h4>

                <div className="space-y-2.5">
                  {ficnResult.securityFeatureChecks?.map((check, idx) => (
                    <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-200">{check.featureName}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                          check.observedStatus === 'PASS' 
                            ? 'bg-emerald-950 text-emerald-400 border-emerald-800' 
                            : 'bg-red-950 text-red-400 border-red-800'
                        }`}>
                          {check.observedStatus}
                        </span>
                      </div>
                      <p className="text-slate-400 text-[11px]">Benchmark: {check.expectedStandard}</p>
                      <p className="text-slate-300 font-mono text-[11px] pt-0.5">{check.technicalDetails}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bank Teller Impoundment Directive */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
                <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                  <Building className="w-4 h-4 text-amber-400" />
                  Bank Teller & Cash Desk Directive (RBI Circular RBI/2023-24/31)
                </h4>

                <div className="bg-amber-950/40 border border-amber-500/30 rounded-xl p-3.5 text-xs text-amber-200 leading-relaxed">
                  <p className="font-semibold">{ficnResult.bankTellerGuidance}</p>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 space-y-1">
                  <span className="text-slate-400 font-semibold block">Law Enforcement Intelligence Notes:</span>
                  <p>{ficnResult.lawEnforcementNotes}</p>
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-slate-900/60 border border-dashed border-slate-800 rounded-2xl p-12 text-center space-y-3">
              <Banknote className="w-12 h-12 text-slate-700 mx-auto" />
              <h3 className="text-base font-bold text-slate-400">Ready for Note Inspection</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Select denomination, input serial number syntax, and describe physical feature observations to trigger forensic RBI benchmark verification.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
