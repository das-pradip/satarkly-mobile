import { RedFlag } from '../../types/detection.types';

export interface RedFlagRule {
  flag: RedFlag;
  title: string;
  description: string;
  keywords: string[];
}

export const RED_FLAG_RULES: RedFlagRule[] = [
  {
    flag: 'urgency',
    title: 'Urgency pressure',
    description: 'The message pressures the user to act immediately.',
    keywords: ['urgent', 'immediately', 'today', 'last warning', 'final warning', 'within 24 hours', 'now', 'abhi', 'turant', 'aaj', 'अभी', 'तुरंत', 'आज', 'এখনই', 'আজই'],
  },
  {
    flag: 'account_blocked_threat',
    title: 'Account blocked threat',
    description: 'The message threatens account blocking, suspension, or service restriction.',
    keywords: ['account blocked', 'account will be blocked', 'account suspended', 'service blocked', 'transaction blocked', 'kyc blocked', 'खाता बंद', 'অ্যাকাউন্ট বন্ধ', 'লেনদেন বন্ধ'],
  },
  {
    flag: 'otp_request',
    title: 'OTP request',
    description: 'The message asks the user to share or enter an OTP.',
    keywords: ['otp', 'one time password', 'verification code', 'share otp', 'enter otp', 'ओटीपी', 'OTP बताएं', 'OTP শেয়ার', 'OTP দিন'],
  },
  {
    flag: 'pin_request',
    title: 'PIN request',
    description: 'The message asks for UPI PIN, ATM PIN, MPIN, password, or CVV.',
    keywords: ['upi pin', 'pin', 'mpin', 'atm pin', 'password', 'cvv', 'enter pin', 'share pin', 'পিন', 'পাসওয়ার্ড', 'पासवर्ड', 'पिन'],
  },
  {
    flag: 'suspicious_link',
    title: 'Suspicious link',
    description: 'The message contains a link or asks the user to open an external page.',
    keywords: ['http://', 'https://', 'www.', '[suspicious_link]', 'click link', 'open link', 'visit link', 'লিংক', 'लिंक'],
  },
  {
    flag: 'fake_authority',
    title: 'Fake authority',
    description: 'The message claims to be from police, court, RBI, customs, CBI, or another authority.',
    keywords: ['police', 'cyber crime', 'rbi', 'cbi', 'ed', 'court', 'customs', 'legal notice', 'warrant', 'arrest', 'পুলিশ', 'কোর্ট', 'কাস্টমস', 'गिरफ्तार', 'पुलिस', 'कोर्ट'],
  },
  {
    flag: 'payment_request',
    title: 'Payment request',
    description: 'The message asks the user to pay, transfer, deposit, or approve money.',
    keywords: ['pay', 'payment', 'transfer', 'deposit', 'processing fee', 'registration fee', 'security fee', 'send money', '₹', 'rs.', ' টাকা', 'পেমেন্ট', 'भुगतान', 'पैसे भेजें'],
  },
  {
    flag: 'refund_trap',
    title: 'Refund trap',
    description: 'The message claims a refund or cashback but asks for unsafe action.',
    keywords: ['refund', 'cashback', 'money back', 'claim reward', 'collect request', 'receive money', 'রিফান্ড', 'ক্যাশব্যাক', 'रिफंड', 'कैशबैक'],
  },
  {
    flag: 'job_registration_fee',
    title: 'Job registration fee',
    description: 'The message asks for money to apply, join, train, or secure a job.',
    keywords: ['job registration fee', 'joining fee', 'training fee', 'security deposit', 'work from home earning', 'task job', 'daily earning', 'চাকরির ফি', 'রেজিস্ট্রেশন ফি', 'नौकरी शुल्क'],
  },
  {
     flag: 'fake_verification',
  title: 'Fake verification',
  description: 'The message asks for verification outside trusted official channels.',
  keywords: [
    'verify now',
    'verify today',
    'please verify',
    'verification pending',
    'verification is pending',
    'account verification',
    'profile verification',
    'document verification',
    'verfication',
    'verfication pending',
    'account verfication',
    'please verfy',
    'kyc update',
    're-kyc',
    'केवाईसी',
    'KYC अपडेट',
    'KYC আপডেট',
    'ভেরিফিকেশন',],
  },
  {
    flag: 'apk_download',
    title: 'APK download',
    description: 'The message asks the user to install an app or APK from a link.',
    keywords: ['download apk', 'install apk', 'install app', 'download app', 'screen sharing app', 'remote app', 'অ্যাপ ডাউনলোড', 'apk', 'ऐप डाउनलोड'],
  },
  {
    flag: 'too_good_to_be_true',
    title: 'Too good to be true',
    description: 'The message promises unrealistic rewards, earnings, or benefits.',
    keywords: ['guaranteed income', 'earn daily', 'double money', 'free reward', 'lottery', 'selected winner', 'sure profit', '১০০% লাভ', 'ডাবল টাকা', 'गारंटीड कमाई', 'डबल पैसा'],
  },
  {
    flag: 'fear_pressure',
    title: 'Fear pressure',
    description: 'The message uses fear, threat, legal pressure, or punishment.',
    keywords: ['legal action', 'case filed', 'arrest', 'penalty', 'fine', 'blocked permanently', 'blacklist', 'fraud case', 'জরিমানা', 'গ্রেফতার', 'कानूनी कार्रवाई', 'जुर्माना'],
  },
  {
    flag: 'secrecy_instruction',
    title: 'Secrecy instruction',
    description: 'The message tells the user not to tell anyone or stay isolated.',
    keywords: ['do not tell anyone', 'keep this confidential', 'secret verification', 'stay on call', 'video call until verification', 'किसी को मत बताना', 'গোপন রাখুন', 'কাউকে বলবেন না'],
  },
  {
    flag: 'fake_customer_support',
    title: 'Fake customer support',
    description: 'The message claims to be support and asks for unsafe action.',
    keywords: ['customer support', 'customer care', 'refund desk', 'support agent', 'screen share', 'remote support', 'helpdesk', 'কাস্টমার কেয়ার', 'সাপোর্ট', 'कस्टमर केयर', 'सपोर्ट'],
  },
  {
    flag: 'identity_threat',
    title: 'Identity threat',
    description: 'The message claims identity documents are linked to fraud or legal trouble.',
    keywords: ['aadhaar linked', 'pan linked', 'identity verification', 'id blocked', 'money laundering', 'bank account under investigation', 'আধার লিঙ্ক', 'PAN লিঙ্ক', 'आधार लिंक', 'पैन लिंक'],
  },
  {
    flag: 'loan_processing_fee',
    title: 'Loan processing fee',
    description: 'The message asks for a fee before releasing a loan.',
    keywords: ['loan approved', 'processing fee', 'loan release', 'file charge', 'instant loan', 'pay fee to get loan', 'লোন অনুমোদিত', 'প্রসেসিং ফি', 'लोन स्वीकृत', 'प्रोसेसिंग फीस'],
  },
  {
    flag: 'investment_guarantee',
    title: 'Investment guarantee',
    description: 'The message promises guaranteed investment returns or sure-shot profit.',
    keywords: ['guaranteed return', 'sure shot profit', 'vip trading group', 'stock tips', 'crypto profit', 'double investment', 'withdrawal fee', 'investment group', 'নিশ্চিত লাভ', 'गारंटीड रिटर्न'],
  },
  {
    flag: 'electricity_disconnection_threat',
    title: 'Electricity disconnection threat',
    description: 'The message threatens immediate electricity disconnection.',
    keywords: ['electricity disconnected', 'power cut', 'bill pending', 'connection will be disconnected', 'meter blocked', 'বিদ্যুৎ সংযোগ বিচ্ছিন্ন', 'বিল বাকি', 'बिजली कट', 'बिल बकाया'],
  },
  {
    flag: 'courier_seizure_threat',
    title: 'Courier seizure threat',
    description: 'The message claims a parcel is held, seized, or linked to illegal activity.',
    keywords: ['parcel held', 'courier blocked', 'customs held', 'package seized', 'illegal parcel', 'delivery failed', 'পার্সেল আটকে', 'কুরিয়ার', 'पार्सल रोका गया', 'कूरियर'],
  },
];
