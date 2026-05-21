import { RedFlag, ScamCategory } from '../../types/detection.types';
import { hasAnyKeyword } from '../../utils/textUtils';

export function detectScamCategory(
  message: string,
  flags: RedFlag[]
): ScamCategory {
  if (
    hasAnyKeyword(message, ['kyc', 're-kyc', 'e-kyc', 'video kyc', 'केवाईसी', 'KYC আপডেট']) ||
    flags.includes('fake_verification') ||
    flags.includes('account_blocked_threat')
  ) {
    return 'KYC Scam';
  }

  if (flags.includes('otp_request') || flags.includes('pin_request')) {
    return 'OTP/PIN Scam';
  }

  if (
    hasAnyKeyword(message, ['upi', 'collect request', 'cashback', 'refund', '[fake_upi_id]']) ||
    flags.includes('refund_trap')
  ) {
    return 'UPI Scam';
  }

  if (
    hasAnyKeyword(message, [
      'job',
      'work from home',
      'part time',
      'task',
      'joining fee',
      'registration fee',
      'চাকরি',
      'नौकरी',
    ]) ||
    flags.includes('job_registration_fee')
  ) {
    return 'Fake Job Scam';
  }

  if (
    hasAnyKeyword(message, [
      'parcel',
      'courier',
      'customs',
      'delivery failed',
      'package seized',
      'পার্সেল',
      'কুরিয়ার',
      'पार्सल',
      'कूरियर',
    ]) ||
    flags.includes('courier_seizure_threat')
  ) {
    return 'Courier/Parcel Scam';
  }

  if (
    hasAnyKeyword(message, [
      'digital arrest',
      'cyber crime',
      'police',
      'cbi',
      'ed',
      'court',
      'warrant',
      'video call',
      'arrest',
      'পুলিশ',
      'গ্রেফতার',
      'गिरफ्तार',
    ]) ||
    (flags.includes('fake_authority') &&
      flags.includes('fear_pressure') &&
      flags.includes('secrecy_instruction'))
  ) {
    return 'Digital Arrest Scam';
  }

  if (
    hasAnyKeyword(message, [
      'investment',
      'trading',
      'stock',
      'crypto',
      'guaranteed return',
      'sure profit',
      'vip group',
      'নিশ্চিত লাভ',
      'गारंटीड रिटर्न',
    ]) ||
    flags.includes('investment_guarantee')
  ) {
    return 'Investment Scam';
  }

  if (
    hasAnyKeyword(message, [
      'loan',
      'instant loan',
      'loan approved',
      'processing fee',
      'লোন',
      'लोन',
    ]) ||
    flags.includes('loan_processing_fee')
  ) {
    return 'Loan App Scam';
  }

  if (
    hasAnyKeyword(message, [
      'electricity',
      'power cut',
      'bill pending',
      'meter',
      'বিদ্যুৎ',
      'বিল বাকি',
      'बिजली',
      'बिल बकाया',
    ]) ||
    flags.includes('electricity_disconnection_threat')
  ) {
    return 'Electricity Bill Scam';
  }

  if (
    hasAnyKeyword(message, [
      'customer care',
      'customer support',
      'support agent',
      'refund desk',
      'helpdesk',
      'screen share',
      'কাস্টমার কেয়ার',
      'सपोर्ट',
    ]) ||
    flags.includes('fake_customer_support')
  ) {
    return 'Fake Customer Support Scam';
  }

  if (flags.length > 0) {
    return 'General Suspicious Message';
  }

  return 'Safe Message';
}
