export interface VisaRequirement {
  type: string;
  description: string;
  validity: string;
  entries: string;
  processingTime: string;
  estimatedFee: string;
  requirements: string[];
  eligibilityScore: number; // 0-100
}

export interface SearchParams {
  citizenship: string;
  residence: string;
  destination: string;
}

export interface VisaSearchResponse {
  summary: string;
  visas: VisaRequirement[];
  embassyInfo?: string;
}

export enum AppState {
  HOME = 'HOME',
  LOADING = 'LOADING',
  RESULTS = 'RESULTS',
  APPLICATION = 'APPLICATION',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
