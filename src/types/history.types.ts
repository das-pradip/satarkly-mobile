import { DetectionResult } from './detection.types';

export type FeedbackValue = 'correct' | 'wrong' | 'not_sure';

export interface ScanHistoryItem {
  id: string;
  messagePreview: string;
  createdAt: string;
  result: DetectionResult;
  feedback: FeedbackValue | null;
}