import { RedFlag, RiskLevel } from '../../types/detection.types';
import {
  RISK_COMBINATION_RULES,
  RISK_THRESHOLDS,
  RISK_WEIGHTS,
} from '../rules/riskWeights';
import { clampScore } from '../../utils/textUtils';

export function calculateRiskScore(flags: RedFlag[]): number {
  const baseScore = flags.reduce((total, flag) => {
    return total + RISK_WEIGHTS[flag];
  }, 0);

  const combinationBonus = RISK_COMBINATION_RULES.reduce((total, rule) => {
    const hasAllRequiredFlags = rule.requiredFlags.every((flag) =>
      flags.includes(flag)
    );

    return hasAllRequiredFlags ? total + rule.bonus : total;
  }, 0);

  const weakVerificationBonus =
    flags.includes('fake_verification') &&
      !flags.includes('urgency') &&
      !flags.includes('payment_request') &&
      !flags.includes('otp_request') &&
      !flags.includes('pin_request') &&
      !flags.includes('suspicious_link') &&
      !flags.includes('apk_download')
      ? 10
      : 0;

  return clampScore(baseScore + combinationBonus + weakVerificationBonus);
}

export function getRiskLevel(score: number): RiskLevel {
  if (score >= RISK_THRESHOLDS.highRiskMin) {
    return 'High Scam Risk';
  }

  if (score <= RISK_THRESHOLDS.safeMax) {
    return 'No Strong Scam Signal';
  }

  return 'Suspicious';
}
