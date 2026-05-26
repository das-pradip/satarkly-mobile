import { DetectionResult } from '../types/detection.types';
import { getRedFlagTitles } from '../core/detection/redFlagDetector';

interface BuildShareResultTextInput {
  result: DetectionResult;
  includeOriginalMessage: boolean;
}

export function buildShareResultText({
  result,
  includeOriginalMessage,
}: BuildShareResultTextInput): string {
  const topReasons = getRedFlagTitles(result.redFlags).slice(0, 4);

  const lines = [
    'Satarkly Scam Check Result',
    '',
    `Risk: ${result.riskLevel}`,
    `Category: ${result.category}`,
    `Score: ${result.riskScore}/100`,
    `Confidence: ${result.confidence}`,
    '',
    'Why Satarkly says this:',
  ];

  if (topReasons.length > 0) {
    topReasons.forEach((reason) => {
      lines.push(`- ${reason}`);
    });
  } else {
    lines.push('- No major scam red flags were detected.');
  }

  lines.push('', 'Safe action:', result.safeAction);

  if (includeOriginalMessage) {
    lines.push(
      '',
      'Original message checked:',
      result.originalMessage
    );
  }

  lines.push(
    '',
    'Note: Satarkly gives risk guidance, not a 100% guarantee. Always verify important messages through official apps/websites.',
    '',
    'Checked using Satarkly.'
  );

  return lines.join('\n');
}
