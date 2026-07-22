import React, { useState } from 'react';
import {
  FileCheck2,
  Shield,
  Copy,
  Check,
  Building2,
  Download,
  Scale,
  ExternalLink,
  PhoneCall,
  AlertOctagon,
  FileText
} from 'lucide-react';
import { FraudAnalysisResult } from '../types';

interface NCRBDirectiveTabProps {
  evaluationResult: FraudAnalysisResult | null;
  onTrigger1930Modal: () => void;
}

export const NCRBDirectiveTab: React.FC<NCRBDirectiveTabProps> = ({
  evaluationResult,
  onTrigger1930Modal,
}) => {
  const [copiedText, setCopiedText] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  const ncrbData = evaluationResult?.lawEnforcementIntelligence?.ncrbReportData;
  const networkData = evaluationResult?.lawEnforcementIntelligence?.networkEntities;

  const prefilledComplaintText = `NATIONAL CYBER CRIME REPORTING PORTAL (cybercrime.gov.in) - COMPLAINT DRAFT
--------------------------------------------------------------------------------
COMPLAINT CATEGORY: ${ncrbData?.incidentType || 'Digital Arrest & Financial Cyber Fraud'}
DATE/TIME OF INCIDENT: ${new Date().toLocaleString('en-IN')}
TARGETED CITIZEN STATE: Delhi NCR / Pan-India

SUGGESTED LEGAL SECTIONS (BNS & IT ACT):
- ${ncrbData?.suggestedCrimeHead || 'BNS Section 318(4) (Cheating) & IT Act Section 66D'}
- BNS Section 319 (Cheating by Personation)
- BNS Section 308 (Extortion via Psychological Threats)

SUSPECT OPERATIONAL IDENTIFIERS:
- Impersonated Agencies: ${networkData?.impersonatedAgencies?.join(', ') || 'CBI / Customs / Police'}
- Suspect Phone/VoIP Numbers: ${networkData?.suspiciousIdentifiers?.join(', ') || '+91 98231 04921'}
- Threat Vectors: ${networkData?.threatVectors?.join(', ') || 'WhatsApp Video Call / Fake Document'}

INCIDENT SUMMARY & OFFENDER MODUS OPERANDI:
${ncrbData?.suspectDetailsSummary || evaluationResult?.victimGuidance?.explanation || 'Suspect impersonated government officials over video call, claiming illegal MDMA parcel seized under citizen Aadhaar, demanding continuous video detention (Digital Arrest) and money transfer to fake verification accounts.'}

REQUESTED ACTION:
1. Issue immediate freezing lien on beneficiary bank account under 1930 Emergency Protocol.
2. Issue block order for suspect phone numbers via Telecom Enforcement Resource & Monitoring (TERM) cell.
3. Lodge FIR under relevant BNS and IT Act sections.
--------------------------------------------------------------------------------`;

  const handleCopyComplaint = () => {
    navigator.clipboard.writeText(prefilledComplaintText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleCopyJson = () => {
    if (evaluationResult) {
      navigator.clipboard.writeText(JSON.stringify(evaluationResult, null, 2));
      setCopiedJson(true);
      setTimeout(() => setCopiedJson(false), 2000);
    }
  };

  return (
    <div className="space-y-5">
      
      {/* Top Banner Context */}
      <div className="bg-[#0D0D0D] border border-[#222222] p-5 rounded-sm shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-indigo-600 to-red-600"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-emerald-400 font-mono text-[10px] font-bold tracking-widest uppercase mb-1">
              <Scale className="w-3.5 h-3.5 text-emerald-400" />
              <span>MODULE 05 // STATUTORY COMPLAINT DIRECTIVES & BNS LEGAL SECTION MAPPING</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase font-sans">
              NCRB Directive & Portal Complaint Builder
            </h2>
            <p className="text-slate-400 text-xs mt-1 max-w-3xl leading-relaxed">
              Formats victim statements into official complaint drafts ready for direct filing on cybercrime.gov.in, maps offences to Bharatiya Nyaya Sanhita (BNS) & IT Act 2000, and triggers MHA I4C escalation.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-[10px]">
            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3.5 py-2 rounded-sm border border-emerald-500/40 flex items-center space-x-2 transition uppercase tracking-wider"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>CYBERCRIME.GOV.IN PORTAL</span>
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Complaint Draft & Quick Actions (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                Pre-Filled NCRB Official Complaint Draft
              </h3>
              <button
                onClick={handleCopyComplaint}
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition"
              >
                {copiedText ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copiedText ? 'Copied to Clipboard' : 'Copy Complaint Text'}</span>
              </button>
            </div>

            <textarea
              value={prefilledComplaintText}
              readOnly
              rows={14}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-200 leading-relaxed resize-none focus:outline-none"
            />

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <button
                onClick={onTrigger1930Modal}
                className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center space-x-2 shadow-lg transition"
              >
                <PhoneCall className="w-4 h-4 animate-bounce" />
                <span>Trigger Emergency Helpline 1930 Line</span>
              </button>

              {evaluationResult && (
                <button
                  onClick={handleCopyJson}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs px-4 py-2.5 rounded-xl border border-slate-700 flex items-center space-x-2 transition"
                >
                  {copiedJson ? <Check className="w-4 h-4 text-emerald-400" /> : <Download className="w-4 h-4" />}
                  <span>{copiedJson ? 'JSON Copied' : 'Download Complete JSON Payload'}</span>
                </button>
              )}
            </div>

          </div>

        </div>

        {/* Right Column: BNS Legal Section Reference Matrix (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2 border-b border-slate-800 pb-3">
              <Scale className="w-4 h-4 text-amber-400" />
              Bharatiya Nyaya Sanhita (BNS) & IT Act Mapper
            </h3>

            <div className="space-y-3 text-xs">
              
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-1">
                <span className="font-mono text-indigo-400 font-bold block">
                  BNS Section 318(4) - Cheating & Dishonestly Inducing Delivery
                </span>
                <p className="text-slate-300">
                  Applies to money transfers coerced under fake threat of arrest, customs parcel seizure, or part-time deposit scams.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-1">
                <span className="font-mono text-indigo-400 font-bold block">
                  BNS Section 319 - Cheating by Personation
                </span>
                <p className="text-slate-300">
                  Impersonating Police, CBI, ED, or Customs officers over video call, phone, or written summons.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-1">
                <span className="font-mono text-indigo-400 font-bold block">
                  IT Act Section 66D - Personation by Computer Resource
                </span>
                <p className="text-slate-300">
                  Using VoIP number spoofing, WhatsApp video calls, or phishing websites to defraud citizens.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-1">
                <span className="font-mono text-indigo-400 font-bold block">
                  BNS Section 308 - Extortion via Coercion
                </span>
                <p className="text-slate-300">
                  Psychological hostage tactics ("Digital Arrest") forcing victims to remain on video call under threat of criminal prosecution.
                </p>
              </div>

            </div>

            <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-xl p-3 text-xs text-indigo-200">
              <span className="font-bold block text-indigo-300 mb-0.5">I4C Escalation Protocol:</span>
              <p>
                Cases tagged with CRITICAL_DIGITAL_ARREST are auto-routed to Ministry of Home Affairs (MHA) Cyber Crime Coordination Centre for immediate SIM and IMEI blacklisting.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
