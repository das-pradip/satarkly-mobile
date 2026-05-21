import { Language } from '../../types/detection.types';

function containsBengaliScript(text: string): boolean {
  return /[\u0980-\u09FF]/.test(text);
}

function containsHindiScript(text: string): boolean {
  return /[\u0900-\u097F]/.test(text);
}

function containsEnglishLetters(text: string): boolean {
  return /[a-zA-Z]/.test(text);
}

function containsHinglishWords(text: string): boolean {
  const lowerText = text.toLowerCase();

  const hinglishWords = [
    'abhi',
    'turant',
    'aaj',
    'paisa',
    'bhejo',
    'mat',
    'batana',
    'khata',
    'naukri',
    'loan',
    'kyc',
    'otp',
    'pin',
  ];

  return hinglishWords.some((word) => lowerText.includes(word));
}

function containsBengaliEnglishMix(text: string): boolean {
  const lowerText = text.toLowerCase();

  const bengaliRomanWords = [
    'taka',
    'ekhoni',
    'aaj',
    'kharap',
    'bondho',
    'chakri',
    'verification',
    'kyc',
    'otp',
    'pin',
  ];

  return bengaliRomanWords.some((word) => lowerText.includes(word));
}

export function detectLanguage(message: string): Language {
  const hasBengali = containsBengaliScript(message);
  const hasHindi = containsHindiScript(message);
  const hasEnglish = containsEnglishLetters(message);

  if (hasBengali && hasEnglish) {
    return 'Bengali-English';
  }

  if (hasHindi && hasEnglish) {
    return 'Hindi-English';
  }

  if (hasBengali) {
    return 'Bengali';
  }

  if (hasHindi) {
    return 'Hindi';
  }

  if (hasEnglish && containsHinglishWords(message)) {
    return 'Hinglish';
  }

  if (hasEnglish && containsBengaliEnglishMix(message)) {
    return 'Bengali-English';
  }

  if (hasEnglish) {
    return 'English';
  }

  return 'Unknown';
}
