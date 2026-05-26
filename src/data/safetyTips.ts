export interface SafetyTip {
  id: string;
  emoji: string;
  title: string;
  description: string;
}

export const SAFETY_TIPS: SafetyTip[] = [
  {
    id: 'otp-pin',
    emoji: '🔐',
    title: 'Never share OTP or PIN',
    description:
      'No genuine bank, support agent, delivery person, or government officer will ask for OTP, UPI PIN, ATM PIN, password, CVV, or verification code.',
  },
  {
    id: 'urgent-money',
    emoji: '💸',
    title: 'Verify urgent money requests',
    description:
      'If someone asks for money urgently on WhatsApp or SMS, call them using a trusted saved number before sending anything.',
  },
  {
    id: 'unknown-links',
    emoji: '🔗',
    title: 'Do not trust random links',
    description:
      'Avoid clicking links from unknown messages. Open official apps or websites directly instead.',
  },
  {
    id: 'parcel-threat',
    emoji: '📦',
    title: 'Be careful with parcel or courier threats',
    description:
      'Scammers may say your parcel is seized or linked to crime. Do not panic, do not pay, and verify only from official courier channels.',
  },
  {
    id: 'digital-arrest',
    emoji: '👮',
    title: 'Digital arrest is a scam pattern',
    description:
      'Police, CBI, ED, or court officials do not keep people on video calls and demand money secretly. Stop replying and contact official authorities.',
  },
  {
    id: 'unknown-apps',
    emoji: '📲',
    title: 'Do not install unknown apps or APKs',
    description:
      'Scammers may ask you to install remote support apps or APK files. Install apps only from trusted app stores.',
  },
  {
    id: 'too-good-offers',
    emoji: '🎯',
    title: 'Too-good offers are risky',
    description:
      'Guaranteed profit, easy job income, lottery rewards, and instant loans with upfront fees are common scam tricks.',
  },
];
