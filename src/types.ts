export type RiskLevel = 'SAFE' | 'MODERATE_SUSPICION' | 'HIGH_DANGER' | 'CRITICAL_DIGITAL_ARREST';

export interface RiskAssessment {
  riskScore: number; // 0 to 100
  riskLevel: RiskLevel;
  scamCategory: string;
  confidenceIndex: number; // 0 to 100
}

export interface VictimGuidance {
  language: string;
  explanation: string;
  immediateActions: string[];
  publicSafetyAdvisory: string;
}

export interface NetworkEntities {
  impersonatedAgencies: string[];
  suspiciousIdentifiers: string[];
  threatVectors: string[];
}

export interface NCRBReportData {
  incidentType: string;
  suspectDetailsSummary: string;
  suggestedCrimeHead: string;
}

export interface LawEnforcementIntelligence {
  digitalArrestFlag: boolean;
  mhaEscalationRequired: boolean;
  networkEntities: NetworkEntities;
  ncrbReportData: NCRBReportData;
}

export interface FraudAnalysisResult {
  riskAssessment: RiskAssessment;
  victimGuidance: VictimGuidance;
  lawEnforcementIntelligence: LawEnforcementIntelligence;
}

// FICN Counterfeit Currency Types
export interface FICNSecurityCheck {
  featureName: string;
  expectedStandard: string;
  observedStatus: 'PASS' | 'SUSPECT' | 'FAIL';
  technicalDetails: string;
}

export interface FICNAnalysisResult {
  denomination: string;
  serialNumber: string;
  authenticityScore: number; // 0-100
  verdict: 'GENUINE_LIKELY' | 'SUSPECT_FICN' | 'CONFIRMED_COUNTERFEIT';
  securityFeatureChecks: FICNSecurityCheck[];
  detectedAnomalies: string[];
  bankTellerGuidance: string;
  lawEnforcementNotes: string;
}

// Graph Intelligence Types
export interface GraphNode {
  id: string;
  label: string;
  type: 'PHONE' | 'BANK_ACCOUNT' | 'UPI_ID' | 'IP_ADDRESS' | 'TELEGRAM_HANDLE' | 'VICTIM_CASE' | 'MULE_NETWORK';
  riskScore: number;
  details: string;
  location?: string;
  flaggedDate: string;
}

export interface GraphEdge {
  source: string;
  target: string;
  relation: string; // e.g. 'TRANSFERRED_TO', 'CALLED_FROM', 'USED_DEVICE', 'REGISTERED_WITH'
  amount?: string;
  timestamp?: string;
}

export interface FraudNetworkGraph {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

// Geospatial Incident
export interface GeospatialIncident {
  id: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  category: string;
  riskLevel: RiskLevel;
  amountLoss: string;
  status: 'ACTIVE_ARREST' | 'MONEY_FROZEN' | 'UNDER_INVESTIGATION' | 'FICN_SEIZED';
  timeReported: string;
  agenciesInvolved: string[];
  description: string;
}
