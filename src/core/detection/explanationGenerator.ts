import {
  RedFlag,
  RiskLevel,
  ScamCategory,
} from '../../types/detection.types';
import { getRedFlagTitles } from './redFlagDetector';

export function generateExplanation(
  riskLevel: RiskLevel,
  category: ScamCategory,
  flags: RedFlag[]
): string {
  const flagTitles = getRedFlagTitles(flags);

  if (riskLevel === 'No Strong Scam Signal') {
    return 'No strong scam pattern was detected in this message. Still, never share OTP, PIN, password, or banking details with anyone.';
  }

  if (flags.length === 0) {
    return 'This message looks unusual, but no clear scam red flags were detected. Verify from official sources before taking action.';
  }

  const topReasons = flagTitles.slice(0, 4).join(', ');

  if (riskLevel === 'High Scam Risk') {
    return `This message has high scam risk because it matches ${category} patterns and contains red flags like: ${topReasons}.`;
  }

  return `This message is suspicious because it contains warning signs like: ${topReasons}. Verify carefully before clicking links, sharing details, or sending money.`;
}

export function generateSafeAction(
  riskLevel: RiskLevel,
  category: ScamCategory,
  flags: RedFlag[]
): string {
  if (riskLevel === 'No Strong Scam Signal') {
    return 'No immediate scam signal found. Still use official apps/websites and never share OTP, PIN, password, or card details.';
  }

  if (flags.includes('otp_request') || flags.includes('pin_request')) {
    return 'Do not share OTP, UPI PIN, ATM PIN, password, CVV, or verification code. No genuine bank or support agent will ask for these.';
  }

  if (flags.includes('money_request_caution')) {
    return 'Before sending money, call the person using a trusted saved number. Do not rely only on chat messages, especially if the request is urgent.';
  }

  if (flags.includes('apk_download')) {
    return 'Do not install APK files or unknown apps from links. Install apps only from trusted app stores.';
  }

  if (category === 'Digital Arrest Scam') {
    return 'Stop replying, do not stay on video/call, do not send money, save screenshots, and contact local cybercrime help or official authorities.';
  }

  if (category === 'UPI Scam') {
    return 'Do not approve UPI collect requests to receive money. Open your official UPI app directly and verify transactions there.';
  }

  if (category === 'KYC Scam') {
    return 'Do not click the link. Open the official bank or service app directly to check KYC status.';
  }

  if (category === 'Fake Job Scam') {
    return 'Do not pay registration, training, security, or joining fees for a job. Verify the company from its official website.';
  }

  if (category === 'Courier/Parcel Scam') {
    return 'Do not pay or share identity details through chat/call. Check delivery status only on the official courier website or app.';
  }

  if (category === 'Electricity Bill Scam') {
    return 'Do not call unknown numbers or click payment links. Check your bill only through the official electricity board app or website.';
  }

  if (category === 'Investment Scam') {
    return 'Avoid guaranteed return promises. Do not send money to unknown trading groups or investment contacts.';
  }

  if (category === 'Loan App Scam') {
    return 'Do not pay processing fees before loan disbursal. Verify loan providers from official and trusted sources.';
  }

  if (category === 'Fake Customer Support Scam') {
    return 'Do not call random support numbers from messages or search results. Use customer care details only from the official app or website.';
  }

  return 'Do not click links, do not share sensitive details, and verify the message from official sources before taking action.';
}
