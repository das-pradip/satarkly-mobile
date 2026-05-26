export interface AboutInfoItem {
  id: string;
  emoji: string;
  title: string;
  description: string;
}

export const ABOUT_SATARKLY_ITEMS: AboutInfoItem[] = [
  {
    id: 'what-it-does',
    emoji: '🛡️',
    title: 'What Satarkly does',
    description:
      'Satarkly helps you check suspicious messages and gives scam-risk guidance using simple results like High Scam Risk, Suspicious, or No Strong Scam Signal.',
  },
  {
    id: 'what-it-does-not-do',
    emoji: '⚠️',
    title: 'What Satarkly does not do',
    description:
      'Satarkly does not guarantee 100% scam detection. It is a guidance tool that helps you pause and verify before taking action.',
  },
  {
    id: 'privacy',
    emoji: '🔒',
    title: 'Privacy-first approach',
    description:
      'Your scan history currently stays on this device. Satarkly never asks for OTP, PIN, password, CVV, or banking details.',
  },
  {
    id: 'india-first',
    emoji: '🇮🇳',
    title: 'India-first scam patterns',
    description:
      'Satarkly focuses on common Indian scam patterns like KYC fraud, UPI traps, digital arrest threats, fake jobs, courier scams, and fake customer support.',
  },
  {
    id: 'safe-action',
    emoji: '✅',
    title: 'Action-focused guidance',
    description:
      'Satarkly does not only show a score. It also explains why a message may be risky and suggests what you should do next.',
  },
  {
    id: 'mvp-status',
    emoji: '🚧',
    title: 'Current MVP status',
    description:
      'This is an early MVP with a rule-based detection engine. Future versions may add screenshot checking, link risk checks, full chat analysis, and better scam intelligence.',
  },
];
