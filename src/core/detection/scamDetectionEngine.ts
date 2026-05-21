import {
  DetectionInput,
  DetectionLabel,
  DetectionResult,
} from '../../types/detection.types';
import { normalizeText, isMessageEmpty } from '../../utils/textUtils';
import { detectLanguage } from './languageDetector';
import { detectRedFlags } from './redFlagDetector';
import { calculateRiskScore, getRiskLevel } from './riskScorer';
import { detectScamCategory } from './categoryDetector';
import { applyFalsePositiveGuard } from './falsePositiveGuard';
import {
  generateExplanation,
  generateSafeAction,
} from './explanationGenerator';

function getLabelFromScore(score: number): DetectionLabel {
  if (score >= 60) return 'scam';
  if (score >= 30) return 'suspicious';
  return 'safe';
}

function getConfidence(score: number, flagCount: number): 'Low' | 'Medium' | 'High' {
  if (score >= 70 && flagCount >= 3) return 'High';
  if (score >= 40 || flagCount >= 2) return 'Medium';
  return 'Low';
}

export function analyzeMessage(input: DetectionInput): DetectionResult {
  const originalMessage = input.message;
  const cleanedMessage = normalizeText(originalMessage);

  if (isMessageEmpty(originalMessage)) {
    return {
      originalMessage,
      cleanedMessage,
      language: 'Unknown',
      label: 'safe',
      riskLevel: 'No Strong Scam Signal',
      riskScore: 0,
      category: 'Safe Message',
      redFlags: [],
      explanation: 'No message was provided. Paste a suspicious message to check scam risk.',
      safeAction: 'Paste a message before checking. Never share OTP, PIN, password, or banking details.',
      confidence: 'Low',
    };
  }

  const language = detectLanguage(originalMessage);
  const redFlags = detectRedFlags(originalMessage);

  const rawScore = calculateRiskScore(redFlags);
  const guardedScore = applyFalsePositiveGuard({
    message: originalMessage,
    flags: redFlags,
    score: rawScore,
  });

  const riskLevel = getRiskLevel(guardedScore);
  const label = getLabelFromScore(guardedScore);
  const category = detectScamCategory(originalMessage, redFlags);
  const explanation = generateExplanation(riskLevel, category, redFlags);
  const safeAction = generateSafeAction(riskLevel, category, redFlags);
  const confidence = getConfidence(guardedScore, redFlags.length);

  return {
    originalMessage,
    cleanedMessage,
    language,
    label,
    riskLevel,
    riskScore: guardedScore,
    category,
    redFlags,
    explanation,
    safeAction,
    confidence,
  };
}
