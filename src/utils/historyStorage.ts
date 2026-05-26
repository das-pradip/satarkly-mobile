import AsyncStorage from '@react-native-async-storage/async-storage';

import { DetectionResult } from '../types/detection.types';
import { FeedbackValue, ScanHistoryItem } from '../types/history.types';

const HISTORY_STORAGE_KEY = 'satarkly_scan_history_v1';
const MAX_HISTORY_ITEMS = 25;

function createMessagePreview(message: string): string {
  const trimmedMessage = message.trim().replace(/\s+/g, ' ');

  if (trimmedMessage.length <= 90) {
    return trimmedMessage;
  }

  return `${trimmedMessage.slice(0, 90)}...`;
}

export async function loadScanHistory(): Promise<ScanHistoryItem[]> {
  try {
    const storedHistory = await AsyncStorage.getItem(HISTORY_STORAGE_KEY);

    if (!storedHistory) {
      return [];
    }

    const parsedHistory = JSON.parse(storedHistory) as ScanHistoryItem[];

    if (!Array.isArray(parsedHistory)) {
      return [];
    }

    return parsedHistory;
  } catch (error) {
    console.warn('Failed to load scan history:', error);
    return [];
  }
}

export async function saveScanResult(
  result: DetectionResult
): Promise<ScanHistoryItem[]> {
  const currentHistory = await loadScanHistory();

  const newHistoryItem: ScanHistoryItem = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    messagePreview: createMessagePreview(result.originalMessage),
    createdAt: new Date().toISOString(),
    result,
    feedback: null,
  };

  const updatedHistory = [newHistoryItem, ...currentHistory].slice(
    0,
    MAX_HISTORY_ITEMS
  );

  await AsyncStorage.setItem(
    HISTORY_STORAGE_KEY,
    JSON.stringify(updatedHistory)
  );

  return updatedHistory;
}

export async function updateScanFeedback(
  scanId: string,
  feedback: FeedbackValue
): Promise<ScanHistoryItem[]> {
  const currentHistory = await loadScanHistory();

  const updatedHistory = currentHistory.map((item) =>
    item.id === scanId ? { ...item, feedback } : item
  );

  await AsyncStorage.setItem(
    HISTORY_STORAGE_KEY,
    JSON.stringify(updatedHistory)
  );

  return updatedHistory;
}

export async function deleteScanHistoryItem(
  scanId: string
): Promise<ScanHistoryItem[]> {
  const currentHistory = await loadScanHistory();

  const updatedHistory = currentHistory.filter((item) => item.id !== scanId);

  await AsyncStorage.setItem(
    HISTORY_STORAGE_KEY,
    JSON.stringify(updatedHistory)
  );

  return updatedHistory;
}

export async function clearScanHistory(): Promise<void> {
  await AsyncStorage.removeItem(HISTORY_STORAGE_KEY);
}
