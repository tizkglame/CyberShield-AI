import React, { useState } from 'react';
import {
  Network,
  Search,
  Plus,
  Filter,
  ShieldAlert,
  FileCheck2,
  ExternalLink,
  Share2,
  Phone,
  CreditCard,
  AtSign,
  Globe,
  MessageSquare,
  FileText,
  UserCheck,
  CheckCircle2,
  Download
} from 'lucide-react';
import { FraudNetworkGraph, GraphNode } from '../types';
import { INITIAL_NETWORK_GRAPH } from '../data/mockData';

interface NetworkGraphTabProps {
  onNavigateToNCRB: () => void;
}

export const NetworkGraphTab: React.FC<NetworkGraphTabProps> = ({ onNavigateToNCRB }) => {
  const [graphData, setGraphData] = useState<FraudNetworkGraph>(INITIAL_NETWORK_GRAPH);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('PHONE_01');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('ALL');
  const [newNodeLabel, setNewNodeLabel] = useState<string>('');
  const [newNodeType, setNewNodeType] = useState<GraphNode['type']>('PHONE');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [copiedDossier, setCopiedDossier] = useState<boolean>(false);

  const selectedNode = graphData.nodes.find((n) => n.id === selectedNodeId) || graphData.nodes[0];

  const filteredNodes = graphData.nodes.filter((node) => {
    const matchesSearch = node.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'ALL' || node.type === filterType;
    return matchesSearch && matchesType;
  });

  const connectedEdges = graphData.edges.filter(
    (e) => e.source === selectedNodeId || e.target === selectedNodeId
  );

  const handleAddNode = () => {
    if (!newNodeLabel.trim()) return;
    const newId = `CUSTOM_${Date.now()}`;
    const newNode: GraphNode = {
      id: newId,
      label: newNodeLabel,
      type: newNodeType,
      riskScore: 88,
      details: 'User-submitted operational marker linked to active digital arrest investigation.',
      location: 'Field Investigation Input',
      flaggedDate: new Date().toISOString().split('T')[0],
    };

    // Add node and link to existing selected node
    const newEdge = {
      source: selectedNodeId,
      target: newId,
      relation: 'LINKED_IN_INVESTIGATION',
    };

    setGraphData((prev) => ({
      nodes: [...prev.nodes, newNode],
      edges: [...prev.edges, newEdge],
    }));

    setSelectedNodeId(newId);
    setNewNodeLabel('');
    setShowAddModal(false);
  };

  const handleExportDossier = () => {
    const dossier = {
      evidencePackageTitle: "COURT-ADMISSIBLE FRAUD NETWORK INTELLIGENCE DOSSIER",
      generatedTimestamp: new Date().toISOString(),
      primaryEntity: selectedNode,
      connectedLinksCount: connectedEdges.length,
      connectedEntities: connectedEdges.map(e => {
        const otherId = e.source === selectedNodeId ? e.target : e.source;
        const otherNode = graphData.nodes.find(n => n.id === otherId);
        return {
          relation: e.relation,
          amount: e.amount || 'N/A',
          linkedEntity: otherNode
        };
      }),
      investigationNote: "Certified for cross-jurisdictional police evidence sharing under Section 65B Indian Evidence Act."
    };

    navigator.clipboard.writeText(JSON.stringify(dossier, null, 2));
    setCopiedDossier(true);
    setTimeout(() => setCopiedDossier(false), 2000);
  };

  const getNodeIcon = (type: GraphNode['type']) => {
    switch (type) {
      case 'PHONE': return <Phone className="w-4 h-4 text-emerald-400" />;
      case 'BANK_ACCOUNT': return <CreditCard className="w-4 h-4 text-amber-400" />;
      case 'UPI_ID': return <AtSign className="w-4 h-4 text-indigo-400" />;
      case 'IP_ADDRESS': return <Globe className="w-4 h-4 text-cyan-400" />;
      case 'TELEGRAM_HANDLE': return <MessageSquare className="w-4 h-4 text-purple-400" />;
      case 'VICTIM_CASE': return <FileText className="w-4 h-4 text-rose-400" />;
      case 'MULE_NETWORK': return <UserCheck className="w-4 h-4 text-red-500" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner Context */}
      <div className="bg-[#0D0D0D] border border-[#222222] p-5 rounded-sm shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-red-600"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-indigo-400 font-mono text-[10px] font-bold tracking-widest uppercase mb-1">
              <Network className="w-3.5 h-3.5 text-indigo-400" />
              <span>MODULE 02 // CROSS-JURISDICTIONAL LINK ANALYSIS & EVIDENCE PACKAGING</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase font-sans">
              Fraud Network Graph Intelligence
            </h2>
            <p className="text-slate-400 text-xs mt-1 max-w-3xl leading-relaxed">
              Maps coordinated scam campaigns, money mule bank accounts, spoofed VoIP phone numbers, and cross-state victim cases into court-admissible evidence packages for police & financial intelligence units.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-[10px]">
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3.5 py-2 rounded-sm border border-indigo-500/40 flex items-center space-x-2 transition uppercase tracking-wider"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Inject Verified Suspect</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Graph Canvas + Controls & Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Column: Search Filter & Interactive Visual Graph Canvas (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Controls Bar */}
          <div className="bg-[#0D0D0D] border border-[#222222] rounded-sm p-3 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
            <div className="flex items-center space-x-2 flex-1 min-w-[200px] bg-[#050505] px-3 py-1.5 rounded-sm border border-[#222222]">
              <Search className="w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search phone number, UPI ID, A/C, or location..."
                className="bg-transparent text-xs text-slate-100 placeholder-slate-600 focus:outline-none w-full font-mono"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-[#050505] text-xs font-mono text-slate-200 border border-[#222222] rounded-sm px-2.5 py-1.5 focus:outline-none cursor-pointer"
              >
                <option value="ALL">All Entity Types</option>
                <option value="PHONE">Phone Numbers</option>
                <option value="BANK_ACCOUNT">Bank Mule Accounts</option>
                <option value="UPI_ID">UPI IDs</option>
                <option value="IP_ADDRESS">IP Addresses</option>
                <option value="TELEGRAM_HANDLE">Telegram Channels</option>
                <option value="VICTIM_CASE">Victim Cases</option>
                <option value="MULE_NETWORK">Mule Syndicates</option>
              </select>
            </div>
          </div>

          {/* Interactive Graph Canvas Area */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 min-h-[460px] relative overflow-hidden shadow-2xl flex flex-col justify-between">
            <div className="absolute top-3 left-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              GRAPH NODE CANVAS (CLICK ANY NODE TO INSPECT LINKAGE)
            </div>

            {/* SVG Visual Node & Edge Network Representation */}
            <div className="my-auto py-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {filteredNodes.map((node) => {
                  const isSelected = node.id === selectedNodeId;
                  return (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all duration-200 relative group flex flex-col justify-between ${
                        isSelected
                          ? 'bg-slate-900 border-amber-500 shadow-xl shadow-amber-950/40 ring-2 ring-amber-500/50 scale-102'
                          : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="p-1.5 rounded-lg bg-slate-950 border border-slate-800">
                          {getNodeIcon(node.type)}
                        </div>
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            node.riskScore > 90
                              ? 'bg-red-950 text-red-400 border border-red-800'
                              : 'bg-amber-950 text-amber-400 border border-amber-800'
                          }`}
                        >
                          Risk {node.riskScore}
                        </span>
                      </div>

                      <div className="font-mono text-xs font-bold text-slate-100 truncate w-full">
                        {node.label}
                      </div>

                      <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-between">
                        <span>{node.type.replace('_', ' ')}</span>
                        {node.location && <span className="text-indigo-400 font-semibold">{node.location}</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Graph Stats */}
            <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
              <div>Total Nodes Loaded: <span className="text-white font-bold">{graphData.nodes.length}</span></div>
              <div>Active Edges Mapped: <span className="text-amber-400 font-bold">{graphData.edges.length}</span></div>
              <div className="text-emerald-400 font-mono text-[11px]">CERT-In & Police Inter-State Database Synced</div>
            </div>
          </div>

        </div>

        {/* Right Column: Node Inspector Drawer (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                Selected Entity Inspector
              </h3>
              <span className="text-[10px] bg-slate-800 text-amber-400 font-mono px-2 py-0.5 rounded border border-slate-700">
                {selectedNode.type}
              </span>
            </div>

            {/* Entity Main Badge */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-base font-black text-amber-300 break-all">
                  {selectedNode.label}
                </span>
                <span className="text-xs font-bold text-red-400 bg-red-950/80 border border-red-800 px-2 py-0.5 rounded">
                  Score {selectedNode.riskScore}/100
                </span>
              </div>
              
              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                {selectedNode.details}
              </p>

              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80">
                <span>Location Hub: <strong className="text-slate-200">{selectedNode.location || 'Unknown'}</strong></span>
                <span>Flagged: <strong className="text-slate-200">{selectedNode.flaggedDate}</strong></span>
              </div>
            </div>

            {/* Linked Entities / Edges List */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Connected Network Links ({connectedEdges.length})
              </h4>
              
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {connectedEdges.map((edge, idx) => {
                  const targetId = edge.source === selectedNodeId ? edge.target : edge.source;
                  const targetNode = graphData.nodes.find((n) => n.id === targetId);

                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedNodeId(targetId)}
                      className="bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl p-2.5 text-xs cursor-pointer transition flex items-center justify-between"
                    >
                      <div>
                        <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                          {edge.relation}
                        </span>
                        <span className="font-mono text-slate-200 font-bold">
                          {targetNode?.label || targetId}
                        </span>
                      </div>

                      {edge.amount && (
                        <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                          {edge.amount}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dossier Export Button */}
            <div className="pt-2 space-y-2">
              <button
                onClick={handleExportDossier}
                className="w-full bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white font-bold text-xs py-3 px-3 rounded-xl flex items-center justify-center space-x-2 shadow-lg transition"
              >
                <Download className="w-4 h-4" />
                <span>{copiedDossier ? 'Dossier JSON Copied!' : 'Export Court-Admissible Dossier'}</span>
              </button>

              <button
                onClick={onNavigateToNCRB}
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs py-2.5 px-3 rounded-xl border border-slate-700 flex items-center justify-center space-x-2 transition"
              >
                <FileCheck2 className="w-4 h-4 text-indigo-400" />
                <span>Transfer to NCRB Complaint Docket</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Add Suspect Marker Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-indigo-400" />
              Add Suspect Operational Entity
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Entity Type</label>
                <select
                  value={newNodeType}
                  onChange={(e) => setNewNodeType(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-200 focus:outline-none"
                >
                  <option value="PHONE">Phone Number / Spoofed Line</option>
                  <option value="BANK_ACCOUNT">Bank Account (Money Mule)</option>
                  <option value="UPI_ID">UPI Handle</option>
                  <option value="IP_ADDRESS">IP Subnet / Proxy</option>
                  <option value="TELEGRAM_HANDLE">Telegram / WhatsApp Handle</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Marker Value / Identifier</label>
                <input
                  type="text"
                  value={newNodeLabel}
                  onChange={(e) => setNewNodeLabel(e.target.value)}
                  placeholder="e.g. +91 99120 48192 or mule.pay@icici"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 placeholder-slate-500 focus:outline-none font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNode}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg"
              >
                Link Marker
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
