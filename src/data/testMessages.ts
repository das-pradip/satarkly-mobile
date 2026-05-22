import { DetectionLabel } from '../types/detection.types';

export interface TestMessage {
  id: string;
  message: string;
  expectedLabel: DetectionLabel;
  note: string;
}

export const TEST_MESSAGES: TestMessage[] = [
  {
    id: 'SCAM-001',
    message: 'Dear user, your KYC will expire today. Click https://fake-link.com and share OTP immediately.',
    expectedLabel: 'scam',
    note: 'KYC + urgency + link + OTP request',
  },
  {
    id: 'SCAM-002',
    message: 'Your UPI refund is pending. Accept collect request and enter UPI PIN to receive money.',
    expectedLabel: 'scam',
    note: 'UPI refund trap + PIN request',
  },
  {
    id: 'SCAM-003',
    message: 'Police cyber cell notice: your Aadhaar is linked with illegal parcel. Stay on video call and do not tell anyone.',
    expectedLabel: 'scam',
    note: 'Digital arrest pattern with fake authority and secrecy',
  },
  {
    id: 'SCAM-004',
    message: 'Congratulations! You are selected for work from home job. Pay registration fee today to activate joining.',
    expectedLabel: 'scam',
    note: 'Fake job + registration fee + urgency',
  },
  {
    id: 'SCAM-005',
    message: 'Your parcel is held by customs. Pay verification charge now or legal action will start.',
    expectedLabel: 'scam',
    note: 'Courier scam + payment request + fear pressure',
  },
  {
    id: 'SCAM-006',
    message: 'Install this APK for bank verification. Your account will be blocked within 24 hours.',
    expectedLabel: 'scam',
    note: 'APK download + account block threat',
  },
  {
    id: 'SCAM-007',
    message: 'Join our VIP trading group. Guaranteed return and double money in 7 days. Deposit now.',
    expectedLabel: 'scam',
    note: 'Investment guarantee + payment request',
  },
  {
    id: 'SCAM-008',
    message: 'Loan approved instantly. Pay processing fee first to release your loan amount.',
    expectedLabel: 'scam',
    note: 'Loan processing fee scam',
  },
  {
    id: 'SCAM-009',
    message: 'Electricity bill pending. Connection will be disconnected tonight. Call customer support and pay now.',
    expectedLabel: 'scam',
    note: 'Electricity disconnection threat + payment pressure',
  },
  {
    id: 'SCAM-010',
    message: 'Customer care refund desk here. Download remote support app and share screen to get cashback.',
    expectedLabel: 'scam',
    note: 'Fake customer support + remote app + refund trap',
  },

  {
    id: 'SUSP-001',
    message: 'Your account verfication is pending. Please verify today.',
    expectedLabel: 'suspicious',
    note: 'Typo verification + urgency but no link/OTP',
  },
  {
    id: 'SUSP-002',
    message: 'Profile update required for your service. Please complete verification soon.',
    expectedLabel: 'suspicious',
    note: 'Generic verification request',
  },
  {
    id: 'SUSP-003',
    message: 'Your document verification is pending. Visit the portal to update details.',
    expectedLabel: 'suspicious',
    note: 'Verification request without strong details',
  },
  {
    id: 'SUSP-004',
    message: 'Your payment could not be verified. Please check your account today.',
    expectedLabel: 'suspicious',
    note: 'Payment verification with urgency',
  },
  {
    id: 'SUSP-005',
    message: 'Security update required for your wallet account. Verify before continuing.',
    expectedLabel: 'suspicious',
    note: 'Wallet verification language',
  },
  {
    id: 'SUSP-006',
    message: 'We noticed unusual activity in your profile. Verification is required.',
    expectedLabel: 'suspicious',
    note: 'Unclear sender and unusual activity',
  },
  {
    id: 'SUSP-007',
    message: 'Your service will be reviewed today. Please keep documents ready.',
    expectedLabel: 'suspicious',
    note: 'Vague service review message',
  },
  {
    id: 'SUSP-008',
    message: 'A support agent will contact you for refund verification.',
    expectedLabel: 'suspicious',
    note: 'Support/refund verification but no payment yet',
  },
  {
    id: 'SUSP-009',
    message: 'Your delivery address needs confirmation. Please verify details soon.',
    expectedLabel: 'suspicious',
    note: 'Delivery verification, weak warning sign',
  },
  {
    id: 'SUSP-010',
    message: 'Account update pending. Complete verification to avoid service issues.',
    expectedLabel: 'suspicious',
    note: 'Generic account update warning',
  },

  {
    id: 'SAFE-001',
    message: 'Your order has been delivered. No action required.',
    expectedLabel: 'safe',
    note: 'Normal delivery confirmation',
  },
  {
    id: 'SAFE-002',
    message: 'UPI received Rs. 500 from a contact. No action required.',
    expectedLabel: 'safe',
    note: 'Normal UPI credit alert',
  },
  {
    id: 'SAFE-003',
    message: 'Your appointment is scheduled for tomorrow at 10 AM.',
    expectedLabel: 'safe',
    note: 'Normal appointment reminder',
  },
  {
    id: 'SAFE-004',
    message: 'Your electricity bill payment was successful.',
    expectedLabel: 'safe',
    note: 'Normal electricity payment confirmation',
  },
  {
    id: 'SAFE-005',
    message: 'Your package is out for delivery today.',
    expectedLabel: 'safe',
    note: 'Normal delivery update',
  },
  {
    id: 'SAFE-006',
    message: 'Your bank statement is ready. Open official app to view it.',
    expectedLabel: 'safe',
    note: 'Official app advice without link or OTP',
  },
  {
    id: 'SAFE-007',
    message: 'Class reminder: data analysis session starts at 7 PM.',
    expectedLabel: 'safe',
    note: 'Normal class reminder',
  },
  {
    id: 'SAFE-008',
    message: 'Your support ticket has been created. We will update you soon.',
    expectedLabel: 'safe',
    note: 'Normal support ticket update',
  },
  {
    id: 'SAFE-009',
    message: 'Payment of Rs. 250 was debited from your account. If this was not you, check official app.',
    expectedLabel: 'safe',
    note: 'Normal debit alert with official app instruction',
  },
  {
    id: 'SAFE-010',
    message: 'Family group reminder: bring documents for school admission tomorrow.',
    expectedLabel: 'safe',
    note: 'Normal family message',
  },
];
