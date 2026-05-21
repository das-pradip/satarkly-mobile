import { RedFlag } from '../../types/detection.types';
import { RED_FLAG_RULES } from '../rules/redFlags';
import { hasAnyKeyword } from '../../utils/textUtils';

export function detectRedFlags(message: string): RedFlag[] {
  const detectedFlags = RED_FLAG_RULES.filter((rule) =>
    hasAnyKeyword(message, rule.keywords)
  ).map((rule) => rule.flag);

  return Array.from(new Set(detectedFlags));
}

export function getRedFlagTitles(flags: RedFlag[]): string[] {
  return flags.map((flag) => {
    const rule = RED_FLAG_RULES.find((item) => item.flag === flag);
    return rule?.title ?? flag;
  });
}
