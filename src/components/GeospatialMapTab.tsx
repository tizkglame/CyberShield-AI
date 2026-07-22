import React, { useState } from 'react';
import {
  MapPin,
  ShieldAlert,
  AlertTriangle,
  Radio,
  Building2,
  DollarSign,
  Activity,
  Filter,
  CheckCircle2,
  Navigation,
  Eye
} from 'lucide-react';
import { GeospatialIncident, RiskLevel } from '../types';
import { MOCK_GEOSPATIAL_INCIDENTS } from '../data/mockData';

export const GeospatialMapTab: React.FC = () => {
  const [incidents, setIncidents] = useState<GeospatialIncident[]>(MOCK_GEOSPATIAL_INCIDENTS);
  const [selectedIncident, setSelectedIncident] = useState<GeospatialIncident>(MOCK_GEOSPATIAL_INCIDENTS[0]);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const filteredIncidents = incidents.filter((inc) => {
    if (filterStatus === 'ALL') return true;
    return inc.status === filterStatus;
  });

  const getStatusBadge = (status: GeospatialIncident['status']) => {
    switch (status) {
      case 'ACTIVE_ARREST':
        return <span className="bg-red-600 text-white font-bold text-[10px] px-2 py-0.5 rounded animate-pulse">ACTIVE DIGITAL ARREST</span>;
      case 'MONEY_FROZEN':
        return <span className="bg-emerald-600 text-white font-bold text-[10px] px-2 py-0.5 rounded">FUNDS FROZEN BY 1930</span>;
      case 'FICN_SEIZED':
        return <span className="bg-amber-600 text-white font-bold text-[10px] px-2 py-0.5 rounded">FICN CURRENCY SEIZED</span>;
      default:
        return <span className="bg-indigo-600 text-white font-bold text-[10px] px-2 py-0.5 rounded">UNDER INVESTIGATION</span>;
    }
  };

  return (
    <div className="space-y-5">
      
      {/* Top Banner Context */}
      <div className="bg-[#0D0D0D] border border-[#222222] p-5 rounded-sm shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-600 via-indigo-600 to-red-600"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 font-mono text-[10px] font-bold tracking-widest uppercase mb-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>MODULE 04 // GEOSPATIAL CYBERCRIME & HOTSPOT COMMAND CENTER</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase font-sans">
              Geospatial Crime Pattern Intelligence
            </h2>
            <p className="text-slate-400 text-xs mt-1 max-w-3xl leading-relaxed">
              Real-time situational awareness mapping active digital arrest calls in progress, 1930 emergency fund liens, FICN seizures, and syndicate operating clusters for patrol prioritization.
            </p>
          </div>

          <div className="flex items-center space-x-2 font-mono text-[10px]">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="font-bold text-red-500 tracking-wider uppercase">LIVE INCIDENT STREAM</span>
          </div>
        </div>
      </div>

      {/* Main Command Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Column: Interactive Map Grid View (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Status Filter Bar */}
          <div className="bg-[#0D0D0D] border border-[#222222] rounded-sm p-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center space-x-2">
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-slate-300 uppercase tracking-wider text-[10px]">INCIDENT STATUS FILTER:</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {[
                { label: 'ALL INCIDENTS', value: 'ALL' },
                { label: 'ACTIVE ARRESTS', value: 'ACTIVE_ARREST' },
                { label: 'FUNDS FROZEN', value: 'MONEY_FROZEN' },
                { label: 'FICN SEIZURES', value: 'FICN_SEIZED' },
              ].map((btn) => (
                <button
                  key={btn.value}
                  onClick={() => setFilterStatus(btn.value)}
                  className={`px-2.5 py-1 rounded-sm text-[10px] font-bold uppercase transition ${
                    filterStatus === btn.value
                      ? 'bg-cyan-600 text-white shadow-md'
                      : 'bg-[#050505] text-slate-400 hover:text-slate-200 border border-[#222222]'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Geospatial Map Representation */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 min-h-[440px] relative overflow-hidden shadow-2xl flex flex-col justify-between">
            <div className="absolute top-3 left-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Navigation className="w-3 h-3 text-indigo-400" />
              INDIA CYBERCRIME HOTSPOT HEATMAP & DIGITAL ARREST MATRIX
            </div>

            {/* Map Plot Pins */}
            <div className="my-auto py-6 grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredIncidents.map((inc) => {
                const isSelected = inc.id === selectedIncident.id;
                return (
                  <button
                    key={inc.id}
                    onClick={() => setSelectedIncident(inc)}
                    className={`p-3.5 rounded-xl border text-left transition duration-200 relative ${
                      isSelected
                        ? 'bg-slate-900 border-indigo-500 ring-2 ring-indigo-500/40 shadow-xl'
                        : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <MapPin className={`w-3.5 h-3.5 ${inc.riskLevel === 'CRITICAL_DIGITAL_ARREST' ? 'text-red-500 animate-bounce' : 'text-amber-400'}`} />
                        {inc.city}
                      </span>
                      {getStatusBadge(inc.status)}
                    </div>

                    <div className="text-xs font-semibold text-slate-300 mt-1">
                      {inc.category}
                    </div>

                    <div className="text-[11px] text-slate-400 mt-1.5 flex items-center justify-between border-t border-slate-800/60 pt-1.5">
                      <span>Reported Loss: <strong className="text-emerald-400">{inc.amountLoss}</strong></span>
                      <span className="font-mono text-[10px] text-slate-500">{inc.timeReported}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Command Footer */}
            <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
              <div>Total Hotspots Tracked: <strong className="text-white">6 Districts</strong></div>
              <div>Patrol Optimization Matrix: <strong className="text-emerald-400">High Readiness</strong></div>
            </div>
          </div>

        </div>

        {/* Right Column: Selected Incident Detail Drawer (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <Activity className="w-4 h-4 text-red-400" />
                Hotspot Incident Detail
              </h3>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                {selectedIncident.id}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 font-semibold block">City & District:</span>
                <span className="text-sm font-bold text-white">{selectedIncident.city}, {selectedIncident.state}</span>
              </div>

              <div>
                <span className="text-slate-400 font-semibold block">Primary Category:</span>
                <span className="text-amber-300 font-bold">{selectedIncident.category}</span>
              </div>

              <div>
                <span className="text-slate-400 font-semibold block">Incident Summary:</span>
                <p className="text-slate-200 bg-slate-950 p-3 rounded-xl border border-slate-800 leading-relaxed mt-1">
                  {selectedIncident.description}
                </p>
              </div>

              <div>
                <span className="text-slate-400 font-semibold block mb-1">Responding Agencies:</span>
                <div className="flex flex-wrap gap-1">
                  {selectedIncident.agenciesInvolved.map((agency, i) => (
                    <span key={i} className="bg-indigo-950 text-indigo-300 border border-indigo-800/80 px-2 py-0.5 rounded text-[11px] font-medium">
                      {agency}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => alert(`Emergency patrol alert dispatched to ${selectedIncident.city} Police Control Room.`)}
                className="w-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center space-x-2 shadow-lg transition"
              >
                <Radio className="w-4 h-4" />
                <span>Dispatch Inter-District Alert</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
