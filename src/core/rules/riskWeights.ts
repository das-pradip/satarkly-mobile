import { RedFlag } from '../../types/detection.types';

export const RISK_WEIGHTS: Record<RedFlag, number> = {
  urgency: 10,
  account_blocked_threat: 16,
  otp_request: 25,
  pin_request: 30,
  suspicious_link: 18,
  fake_authority: 20,
  payment_request: 20,
  money_request_caution: 30,
  refund_trap: 18,
  job_registration_fee: 18,
  fake_verification: 20,
  apk_download: 28,
  too_good_to_be_true: 12,
  fear_pressure: 15,
  secrecy_instruction: 12,
  fake_customer_support: 16,
  identity_threat: 18,
  loan_processing_fee: 18,
  investment_guarantee: 20,
  electricity_disconnection_threat: 18,
  courier_seizure_threat: 18,
};

export interface RiskCombinationRule {
  requiredFlags: RedFlag[];
  bonus: number;
  reason: string;
}

export const RISK_COMBINATION_RULES: RiskCombinationRule[] = [
  {
    requiredFlags: ['otp_request', 'urgency'],
    bonus: 8,
    reason: 'OTP request combined with urgency is a strong scam signal.',
  },
  {
    requiredFlags: ['fake_verification', 'urgency'],
    bonus: 20,
    reason: 'Verification request combined with urgency should be treated as suspicious.',
  },
  {
    requiredFlags: ['fake_authority', 'courier_seizure_threat', 'secrecy_instruction'],
    bonus: 15,
    reason: 'Authority threat plus parcel/courier story and secrecy is a strong digital arrest pattern.',
  },
  {
    requiredFlags: ['pin_request', 'refund_trap'],
    bonus: 15,
    reason: 'UPI PIN request to receive refund/money is highly risky.',
  },
  {
    requiredFlags: ['fake_authority', 'identity_threat', 'secrecy_instruction'],
    bonus: 15,
    reason: 'Authority threat plus identity issue and secrecy is a strong digital arrest pattern.',
  },
  {
    requiredFlags: ['payment_request', 'fake_authority'],
    bonus: 10,
    reason: 'Payment request from fake authority is a strong coercion pattern.',
  },
  {
    requiredFlags: ['apk_download', 'suspicious_link'],
    bonus: 10,
    reason: 'App/APK install from suspicious link can be used for device compromise.',
  },
  {
    requiredFlags: ['fake_authority', 'secrecy_instruction', 'fear_pressure'],
    bonus: 15,
    reason: 'Authority threat plus secrecy is common in digital arrest scams.',
  },
  {
    requiredFlags: ['job_registration_fee', 'too_good_to_be_true'],
    bonus: 8,
    reason: 'Unrealistic job promise plus fee is a common fake job scam pattern.',
  },
  {
    requiredFlags: ['investment_guarantee', 'payment_request'],
    bonus: 10,
    reason: 'Guaranteed profit plus payment demand is a strong investment scam pattern.',
  },
  {
    requiredFlags: ['electricity_disconnection_threat', 'fake_customer_support'],
    bonus: 8,
    reason: 'Electricity disconnection pressure plus support contact is risky.',
  },
  {
    requiredFlags: ['courier_seizure_threat', 'payment_request'],
    bonus: 8,
    reason: 'Courier seizure story plus payment demand is a common parcel scam pattern.',
  },
  {
    requiredFlags: ['money_request_caution', 'otp_request'],
    bonus: 30,
    reason: 'Money request combined with OTP request is highly risky.',
  },
  {
    requiredFlags: ['money_request_caution', 'pin_request'],
    bonus: 30,
    reason: 'Money request combined with PIN request is highly risky.',
  },
  {
    requiredFlags: ['money_request_caution', 'suspicious_link'],
    bonus: 25,
    reason: 'Money request combined with a link is a strong scam signal.',
  },
  {
    requiredFlags: ['money_request_caution', 'fake_authority'],
    bonus: 25,
    reason: 'Money request combined with fake authority is highly risky.',
  },
  {
    requiredFlags: ['money_request_caution', 'apk_download'],
    bonus: 25,
    reason: 'Money request combined with app/APK download is highly risky.',
  },
  {
    requiredFlags: ['money_request_caution', 'refund_trap'],
    bonus: 25,
    reason: 'Money request combined with refund/cashback trap is highly risky.',
  },
  {
    requiredFlags: ['money_request_caution', 'secrecy_instruction'],
    bonus: 20,
    reason: 'Money request combined with secrecy instruction is risky.',
  },
];

export const RISK_THRESHOLDS = {
  safeMax: 29,
  suspiciousMax: 59,
  highRiskMin: 60,
} as const;
