import React, { useState } from 'react';
import {
  PhoneCall,
  X,
  ShieldAlert,
  Lock,
  Building2,
  CheckCircle2,
  AlertTriangle,
  Volume2,
  FileText
} from 'lucide-react';

interface Helpline1930ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Helpline1930Modal: React.FC<Helpline1930ModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<number>(1);
  const [utrNumber, setUtrNumber] = useState<string>('');
  const [bankName, setBankName] = useState<string>('State Bank of India (SBI)');
  const [isLienTriggered, setIsLienTriggered] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleTriggerLien = () => {
    setIsLienTriggered(true);
    setStep(3);
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0D0D0D] border border-[#222222] rounded-sm max-w-xl w-full p-6 space-y-5 shadow-2xl relative overflow-hidden">
        
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-amber-500 to-red-600"></div>

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-600 rounded-sm shadow-md">
              <PhoneCall className="w-5 h-5 text-white animate-bounce" />
            </div>
            <div>
              <h3 className="text-base font-black text-white uppercase tracking-tight font-sans">
                National Cyber Crime Emergency Helpline 1930
              </h3>
              <p className="text-[10px] font-mono text-red-500 uppercase tracking-widest font-bold">
                Golden Window Emergency Lien & Beneficiary Account Freeze Protocol
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-sm bg-[#111111] border border-[#222222] transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content Steps */}
        <div className="space-y-4 text-xs">
          
          {step === 1 && (
            <div className="space-y-4">
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
                <div className="flex items-center space-x-2 text-amber-400 font-bold uppercase tracking-wider">
                  <Volume2 className="w-4 h-4 text-amber-400" />
                  <span>Interactive IVR Guidance (1930 Helpline Voice Simulator)</span>
                </div>
                <p className="text-slate-300 leading-relaxed font-medium">
                  "Welcome to the National Cyber Crime Reporting Portal Helpline 1930. If you have been defrauded or coerced into transferring money during a Digital Arrest call, DO NOT PANIC. Transactions reported within 1 hour can be frozen at the recipient bank before fraudsters withdraw cash via mule accounts."
                </p>
              </div>

              <div className="bg-red-950/40 border border-red-500/30 rounded-2xl p-4 space-y-3">
                <span className="font-bold text-red-300 uppercase tracking-wide block">
                  Step 1: Input Transaction Details for Immediate Bank Freeze
                </span>

                <div className="space-y-2">
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Your Bank Name</label>
                    <select
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 focus:outline-none"
                    >
                      <option value="State Bank of India (SBI)">State Bank of India (SBI)</option>
                      <option value="HDFC Bank">HDFC Bank</option>
                      <option value="ICICI Bank">ICICI Bank</option>
                      <option value="Axis Bank">Axis Bank</option>
                      <option value="Punjab National Bank (PNB)">Punjab National Bank (PNB)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Transaction Ref / UTR Number</label>
                    <input
                      type="text"
                      value={utrNumber}
                      onChange={(e) => setUtrNumber(e.target.value)}
                      placeholder="e.g. 420193029102 or UPI/29310"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 font-mono focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!utrNumber.trim()}
                className="w-full bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition"
              >
                Proceed to Freeze Lien Request
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
                <span className="font-bold text-indigo-400 uppercase tracking-wide block">
                  Step 2: Confirm Emergency Inter-Bank Hold Request
                </span>

                <div className="space-y-1 text-slate-300">
                  <div>Victim Bank: <strong className="text-white">{bankName}</strong></div>
                  <div>Transaction UTR: <strong className="text-amber-400 font-mono">{utrNumber}</strong></div>
                  <div>Target Portal: <strong className="text-emerald-400">1930 Citizen Financial Cyber Fraud Reporting System (CFCFRMS)</strong></div>
                </div>
              </div>

              <button
                onClick={handleTriggerLien}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg flex items-center justify-center space-x-2 transition"
              >
                <Lock className="w-5 h-5 text-white" />
                <span>Simulate Immediate Lien Trigger on Mule Account</span>
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 text-center py-4">
              <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-10 h-10 animate-pulse" />
              </div>

              <div>
                <h4 className="text-base font-black text-white">EMERGENCY LIEN SIGNAL DISPATCHED TO 1930 GATEWAY</h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto mt-1 leading-relaxed">
                  Lien hold alert sent to recipient bank fraud control node for UTR <span className="text-amber-400 font-mono font-bold">{utrNumber}</span>. Beneficiary mule account funds locked under 1930 Citizen Protection Protocol.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3.5 text-xs text-left text-slate-300 space-y-1">
                <span className="text-slate-400 font-semibold block">Next Step for Victim:</span>
                <p>
                  Visit <strong className="text-white">cybercrime.gov.in</strong> or your nearest Cyber Crime Police Station within 24 hours to file the formal FIR using your pre-filled complaint text.
                </p>
              </div>

              <button
                onClick={onClose}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs py-2.5 px-6 rounded-xl border border-slate-700 transition"
              >
                Close 1930 Simulator
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
