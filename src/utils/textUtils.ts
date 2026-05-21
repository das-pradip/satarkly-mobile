export function normalizeText(input: string): string {
  return input
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .trim();
}

export function hasAnyKeyword(text: string, keywords: string[]): boolean {
  const normalizedText = normalizeText(text);

  return keywords.some((keyword) =>
    normalizedText.includes(normalizeText(keyword))
  );
}

export function clampScore(score: number): number {
  if (score < 0) return 0;
  if (score > 100) return 100;
  return Math.round(score);
}

export function isMessageEmpty(message: string): boolean {
  return normalizeText(message).length === 0;
}
