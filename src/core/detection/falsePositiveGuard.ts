import { RedFlag } from '../../types/detection.types';
import { clampScore, hasAnyKeyword } from '../../utils/textUtils';

interface FalsePositiveGuardInput {
  message: string;
  flags: RedFlag[];
  score: number;
}

export function applyFalsePositiveGuard({
  message,
  flags,
  score,
}: FalsePositiveGuardInput): number {
  let adjustedScore = score;

  const hasHighRiskCredentialRequest =
    flags.includes('otp_request') || flags.includes('pin_request');

  const hasMoneyOrLinkRisk =
    flags.includes('payment_request') ||
    flags.includes('suspicious_link') ||
    flags.includes('refund_trap') ||
    flags.includes('apk_download');

  const looksLikeSafeCreditAlert =
    hasAnyKeyword(message, [
      'credited',
      'received',
      'upi received',
      'amount credited',
      'no action required',
      'credited to your account',
      'জমা হয়েছে',
      'টাকা পেয়েছেন',
      'प्राप्त',
      'जमा हुआ',
    ]) && !hasHighRiskCredentialRequest && !hasMoneyOrLinkRisk;

  if (looksLikeSafeCreditAlert) {
    adjustedScore -= 25;
  }

  const looksLikeSafeDebitAlert =
    hasAnyKeyword(message, [
      'debited',
      'spent',
      'transaction alert',
      'card ending',
      'available balance',
      'balance is',
      'ডেবিট',
      'লেনদেন',
      'डेबिट',
      'लेनदेन',
    ]) &&
    !hasHighRiskCredentialRequest &&
    !flags.includes('suspicious_link');

  if (looksLikeSafeDebitAlert) {
    adjustedScore -= 15;
  }

  const looksLikeDeliveryUpdate =
    hasAnyKeyword(message, [
      'out for delivery',
      'delivered',
      'delivery update',
      'order shipped',
      'arriving today',
      'tracking update',
      'ডেলিভারি',
      'অর্ডার',
      'डिलीवरी',
      'ऑर्डर',
    ]) &&
    !flags.includes('payment_request') &&
    !flags.includes('courier_seizure_threat') &&
    !flags.includes('fake_authority');

  if (looksLikeDeliveryUpdate) {
    adjustedScore -= 15;
  }

  const looksLikeAppointmentOrReminder =
    hasAnyKeyword(message, [
      'appointment',
      'reminder',
      'scheduled',
      'meeting',
      'class reminder',
      'doctor appointment',
      'অ্যাপয়েন্টমেন্ট',
      'রিমাইন্ডার',
      'अपॉइंटमेंट',
      'रिमाइंडर',
    ]) &&
    !hasHighRiskCredentialRequest &&
    !hasMoneyOrLinkRisk;

  if (looksLikeAppointmentOrReminder) {
    adjustedScore -= 20;
  }

  const looksLikeOfficialAppAdvice =
    hasAnyKeyword(message, [
      'open official app',
      'check official app',
      'visit official website',
      'verify in app',
      'official app',
      'official website',
      'অফিসিয়াল অ্যাপ',
      'आधिकारिक ऐप',
    ]) &&
    !hasHighRiskCredentialRequest &&
    !flags.includes('payment_request');

  if (looksLikeOfficialAppAdvice) {
    adjustedScore -= 10;
  }

  return clampScore(adjustedScore);
}
