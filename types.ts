
export interface AnalysisResult {
  text: string;
  // Potentially add structured data if the model can provide it and it's parsed
}

export interface DentalCondition {
  id: string;
  name: string;
  description: string;
  imageUrl?: string; // Placeholder for potential condition images
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatarUrl?: string;
}

export interface DetectedConditionReport {
  conditionName: string;
  location?: string;
  severity?: string;
  description: string;
}

export interface ParsedAnalysisReport {
  imageQuality?: string;
  summary?: string;
  detectedConditions: DetectedConditionReport[];
  recommendations?: string;
}

export type UserRole = 'patient' | 'dentist';

export interface PatientProfile {
  id: string; // Unique ID for the patient
  name: string;
  age?: number;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  phone?: string; // Optional phone number
  email?: string; // Optional email address
  avatarSeed: string; // Used for generating a consistent placeholder avatar
  medicalNotes?: string; // For dentists to add notes about the patient
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole; 
  companyName?: string;
  companyLogoBase64?: string; 
  patients?: PatientProfile[]; 
}

export interface AnalysisHistoryItem {
  id: string; 
  date: string; 
  imageMimeType: string | null; 
  imageBase64: string | null; 
  report: ParsedAnalysisReport; 
  patientId?: string; 
}

export type AnalysisContextType = 'new' | 'existing_patient' | 'new_patient_for_analysis';