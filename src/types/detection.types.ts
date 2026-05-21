export type RiskLevel =
  | 'High Scam Risk'
  | 'Suspicious'
  | 'No Strong Scam Signal';

export type DetectionLabel = 'scam' | 'suspicious' | 'safe';

export type Language =
  | 'English'
  | 'Hinglish'
  | 'Hindi'
  | 'Bengali'
  | 'Bengali-English'
  | 'Hindi-English'
  | 'Unknown';

export type ScamCategory =
  | 'KYC Scam'
  | 'OTP/PIN Scam'
  | 'UPI Scam'
  | 'Fake Job Scam'
  | 'Courier/Parcel Scam'
  | 'Digital Arrest Scam'
  | 'Investment Scam'
  | 'Loan App Scam'
  | 'Electricity Bill Scam'
  | 'Fake Customer Support Scam'
  | 'General Suspicious Message'
  | 'Safe Message';

export type RedFlag =
  | 'urgency'
  | 'account_blocked_threat'
  | 'otp_request'
  | 'pin_request'
  | 'suspicious_link'
  | 'fake_authority'
  | 'payment_request'
  | 'refund_trap'
  | 'job_registration_fee'
  | 'fake_verification'
  | 'apk_download'
  | 'too_good_to_be_true'
  | 'fear_pressure'
  | 'secrecy_instruction'
  | 'fake_customer_support'
  | 'identity_threat'
  | 'loan_processing_fee'
  | 'investment_guarantee'
  | 'electricity_disconnection_threat'
  | 'courier_seizure_threat';

export interface DetectionInput {
  message: string;
}

export interface DetectionResult {
  originalMessage: string;
  cleanedMessage: string;
  language: Language;
  label: DetectionLabel;
  riskLevel: RiskLevel;
  riskScore: number;
  category: ScamCategory;
  redFlags: RedFlag[];
  explanation: string;
  safeAction: string;
  confidence: 'Low' | 'Medium' | 'High';
}
