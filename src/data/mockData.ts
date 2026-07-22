import { FraudAnalysisResult, FraudNetworkGraph, GeospatialIncident, FICNAnalysisResult } from '../types';

export const PRESET_SCAM_SAMPLES = [
  {
    id: 'digital-arrest-cbi',
    title: '🚨 Digital Arrest: Fake CBI/Customs MDMA Courier',
    type: 'WhatsApp Video / Digital Arrest Call',
    content: `Caller claiming to be Inspector Inspector R.K. Sharma from Mumbai Customs & CBI.
"A FedEx package containing 500 grams MDMA, 5 counterfeit passports, and 3 credit cards registered under your Aadhaar card has been seized at Mumbai Airport. You are under immediate Digital Arrest by order of Delhi High Court.
You must stay on this WhatsApp Video Call continuously. Do not disconnect or talk to anyone.
Transfer ₹2,500,000 immediately to the Reserve Bank of India verification clearance account (A/C: 98102831201, IFSC: SBIN0001820, UPI: clearance.rbi@sbi) to avoid immediate arrest team dispatch to your address."`,
    language: 'English',
  },
  {
    id: 'part-time-task',
    title: '💼 Task Scam: Telegram Hotel Rating & Crypto Deposit',
    type: 'Telegram / WhatsApp Message',
    content: `Hello! I am Priya from HR Operations at Digital Media Services Pvt Ltd.
Earn ₹3,000 to ₹10,000 daily by simply rating hotels on Google Maps!
Task 1 complete: You earned ₹500 (credited to your UPI).
Now to unlock VIP Level 2 tasks, deposit ₹15,000 to our merchant account (UPI: merchant.pay99@ybl, Account: 50100239102319, HDFC Bank).
You will receive 140% returns (₹21,000) within 15 minutes! Hurry, limited slots!`,
    language: 'English',
  },
  {
    id: 'banking-apk-scam',
    title: '📱 Banking App Impersonation & Malicious APK',
    type: 'SMS / WhatsApp Link',
    content: `Dear Customer, Your SBI YONO account will be blocked today due to pending PAN card update.
To prevent permanent account lock and debit card suspension, download and install the official SBI Update Assistant app immediately:
http://sbi-pan-update-verif.apk
After installation, open app and enter your netbanking ID, password and transaction profile PIN.`,
    language: 'English',
  },
  {
    id: 'fake-police-warrant',
    title: '⚖️ Fake Cyber Crime Arrest Notice (Bilingual)',
    type: 'Fake Document / WhatsApp PDF',
    content: `NATIONAL CYBER CRIME REPORTING PORTAL - ARREST WARRANT
SUBJECT: IMMEDIATE SUMMONS FOR MONEY LAUNDERING & TERROR FINANCING
To the Citizen: Your Bank Account (A/C ****4892) has received illicit proceeds from interstate gaming syndicate.
You are instructed to report via Skype Video Call to Cyber Cell New Delhi immediately. Failure to comply within 2 hours will result in non-bailable warrant under BNS Section 318(4) and freezing of all family bank accounts.`,
    language: 'English',
  }
];

export const INITIAL_NETWORK_GRAPH: FraudNetworkGraph = {
  nodes: [
    {
      id: 'PHONE_01',
      label: '+91 98231 04921',
      type: 'PHONE',
      riskScore: 98,
      details: 'Spoofed VoIP line used in 14 Digital Arrest video call sessions impersonating CBI Officer Sharma.',
      location: 'Mewat/Nuh Cyber Hub',
      flaggedDate: '2026-07-18',
    },
    {
      id: 'PHONE_02',
      label: '+91 88720 11923',
      type: 'PHONE',
      riskScore: 92,
      details: 'WhatsApp handle broadcasting fake FedEx/Customs arrest notices.',
      location: 'Jamtara Cluster',
      flaggedDate: '2026-07-19',
    },
    {
      id: 'UPI_01',
      label: 'cbi.verification@sbi',
      type: 'UPI_ID',
      riskScore: 100,
      details: 'Fraudulent UPI handle created via compromised mule account.',
      location: 'Mumbai Suburbs',
      flaggedDate: '2026-07-15',
    },
    {
      id: 'BANK_01',
      label: 'A/C: 98102831201 (SBI)',
      type: 'BANK_ACCOUNT',
      riskScore: 96,
      details: 'Primary Money Mule account receiving funds from digital arrest victims across 4 states.',
      location: 'Kolkata Cyber Cell',
      flaggedDate: '2026-07-14',
    },
    {
      id: 'BANK_02',
      label: 'A/C: 50100239102 (HDFC)',
      type: 'BANK_ACCOUNT',
      riskScore: 89,
      details: 'Layering account used to split incoming fraud transfers into crypto peer-to-peer trades.',
      location: 'Bengaluru Urban',
      flaggedDate: '2026-07-16',
    },
    {
      id: 'TG_01',
      label: '@IndiaCyberPoliceNotice',
      type: 'TELEGRAM_HANDLE',
      riskScore: 95,
      details: 'Telegram channel distributing fake ED arrest summons & stamp papers.',
      location: 'Cross-border / SEA Hub',
      flaggedDate: '2026-07-10',
    },
    {
      id: 'IP_01',
      label: '103.212.48.112',
      type: 'IP_ADDRESS',
      riskScore: 85,
      details: 'VPN Gateway node hosting fake banking phishing portals & APK drops.',
      location: 'Routed via SE Asia',
      flaggedDate: '2026-07-12',
    },
    {
      id: 'CASE_01',
      label: 'NCRB-2026-DEL-8942',
      type: 'VICTIM_CASE',
      riskScore: 90,
      details: 'Retired Senior Citizen defrauded of ₹42 Lakhs via 3-day continuous digital arrest.',
      location: 'Dwarka, New Delhi',
      flaggedDate: '2026-07-20',
    },
    {
      id: 'CASE_02',
      label: 'NCRB-2026-MUM-4102',
      type: 'VICTIM_CASE',
      riskScore: 88,
      details: 'IT Professional trapped in fake customs drug package fraud.',
      location: 'Andheri West, Mumbai',
      flaggedDate: '2026-07-19',
    },
    {
      id: 'MULE_NET',
      label: 'Syndicate "Alpha-Mule-9"',
      type: 'MULE_NETWORK',
      riskScore: 99,
      details: 'Coordinated network of 28 mule accounts across 3 private sector banks used for rapid layering.',
      location: 'Inter-state Syndicate',
      flaggedDate: '2026-07-08',
    },
  ],
  edges: [
    { source: 'PHONE_01', target: 'CASE_01', relation: 'CALLED_VICTIM', amount: '₹4,200,000' },
    { source: 'PHONE_01', target: 'UPI_01', relation: 'PROVIDES_PAYMENT_LINK' },
    { source: 'UPI_01', target: 'BANK_01', relation: 'ROUTES_FUNDS_TO' },
    { source: 'PHONE_02', target: 'CASE_02', relation: 'SENT_FAKE_SUMMONS' },
    { source: 'CASE_02', target: 'BANK_01', relation: 'TRANSFERRED_TO', amount: '₹1,500,000' },
    { source: 'BANK_01', target: 'BANK_02', relation: 'LAYERING_TRANSFER', amount: '₹3,800,000' },
    { source: 'TG_01', target: 'PHONE_02', relation: 'COORDINATES_CALLS' },
    { source: 'IP_01', target: 'TG_01', relation: 'HOSTS_BOT_SERVER' },
    { source: 'BANK_02', target: 'MULE_NET', relation: 'MANAGED_BY' },
    { source: 'BANK_01', target: 'MULE_NET', relation: 'MEMBER_OF' },
  ]
};

export const MOCK_GEOSPATIAL_INCIDENTS: GeospatialIncident[] = [
  {
    id: 'INC-2026-001',
    city: 'New Delhi (Dwarka)',
    state: 'Delhi NCR',
    lat: 28.5921,
    lng: 77.0460,
    category: 'Digital Arrest Impersonation',
    riskLevel: 'CRITICAL_DIGITAL_ARREST',
    amountLoss: '₹4,200,000',
    status: 'ACTIVE_ARREST',
    timeReported: '12 mins ago',
    agenciesInvolved: ['Delhi Police Cyber Cell', 'CBI Anti-Corruption Unit', '1930 Helpline'],
    description: '82-year-old victim held on active WhatsApp video call by impersonator claiming to be Delhi Police ACP.',
  },
  {
    id: 'INC-2026-002',
    city: 'Mumbai (Andheri)',
    state: 'Maharashtra',
    lat: 19.1197,
    lng: 72.8464,
    category: 'FedEx Customs Scam',
    riskLevel: 'HIGH_DANGER',
    amountLoss: '₹1,800,000',
    status: 'MONEY_FROZEN',
    timeReported: '45 mins ago',
    agenciesInvolved: ['Maharashtra Cyber Crime', 'HDFC Fraud Control', 'I4C MHA'],
    description: '1930 Helpline triggered emergency lien on mule account A/C ****31201; ₹14.5 Lakhs secured.',
  },
  {
    id: 'INC-2026-003',
    city: 'Mewat / Nuh Cyber Hub',
    state: 'Haryana',
    lat: 28.1023,
    lng: 77.0028,
    category: 'Fraud Call Center Syndicate',
    riskLevel: 'CRITICAL_DIGITAL_ARREST',
    amountLoss: '₹12,500,000',
    status: 'UNDER_INVESTIGATION',
    timeReported: '2 hours ago',
    agenciesInvolved: ['Special Task Force (STF)', 'Haryana Police', 'Telecom Enforcement (DOT)'],
    description: 'Graph AI detected 14 spoofed SIMs operating out of single tower sector in Nuh district.',
  },
  {
    id: 'INC-2026-004',
    city: 'Bengaluru (Koramangala)',
    state: 'Karnataka',
    lat: 12.9352,
    lng: 77.6245,
    category: 'Part-Time Task Scam & Crypto Mule',
    riskLevel: 'HIGH_DANGER',
    amountLoss: '₹850,000',
    status: 'UNDER_INVESTIGATION',
    timeReported: '3 hours ago',
    agenciesInvolved: ['Bengaluru Cyber CID', 'RBI Payment System Oversight'],
    description: 'Mule account frozen following automated link detection with Telegram channel @IndiaJobsVIP.',
  },
  {
    id: 'INC-2026-005',
    city: 'Jamtara',
    state: 'Jharkhand',
    lat: 23.9625,
    lng: 86.8014,
    category: 'Phishing APK & Vishing Network',
    riskLevel: 'MODERATE_SUSPICION',
    amountLoss: '₹320,000',
    status: 'UNDER_INVESTIGATION',
    timeReported: '5 hours ago',
    agenciesInvolved: ['Jharkhand Police Cyber Cell', 'CERT-In'],
    description: 'Mass SMS broadcast of malicous SBI APK blocked at telecom gateway level.',
  },
  {
    id: 'INC-2026-006',
    city: 'Kolkata (Salt Lake)',
    state: 'West Bengal',
    lat: 22.5867,
    lng: 88.4171,
    category: 'FICN Counterfeit ₹500 Note Seizure',
    riskLevel: 'HIGH_DANGER',
    amountLoss: '₹2,400,000 (Face Value)',
    status: 'FICN_SEIZED',
    timeReported: '1 hour ago',
    agenciesInvolved: ['National Investigation Agency (NIA)', 'Kolkata Police', 'RBI Currency Chest'],
    description: 'High-grade FICN seized at bank currency chest. Serial numbers 9AB 482*** flagged by computer vision agent.',
  }
];

export const MOCK_FICN_BENCHMARKS = [
  {
    denomination: '₹500 (Mahatma Gandhi New Series)',
    serialSyntax: 'Letter + Number combination e.g., 9AB 482103 (Growing font size from left to right)',
    keyFeatures: [
      { featureName: 'Mahatma Gandhi Portrait Watermark', expectedStandard: '3D shadow effect with electrotype 500 watermark', observedStatus: 'PASS' as const, technicalDetails: 'Clear multi-tonal portrait with sharp contrast' },
      { featureName: 'Windowed Security Thread', expectedStandard: 'Colour shift from green to blue when tilted with "भारत" & "RBI"', observedStatus: 'PASS' as const, technicalDetails: 'Proper optical variable ink transition verified' },
      { featureName: 'Microlettering', expectedStandard: 'Micro letters "RBI" and "500" between Gandhi portrait & band', observedStatus: 'PASS' as const, technicalDetails: 'Sharp resolution, legible under 10x magnification' },
      { featureName: 'Angular Bleed Lines (Intaglio)', expectedStandard: '5 angular lines on right & left edge for visually impaired', observedStatus: 'PASS' as const, technicalDetails: 'Raised tactile print present' },
    ]
  }
];
