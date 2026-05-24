import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { getTheme } from './ResultCard';
import { FeedbackValue, ScanHistoryItem } from '../types/history.types';

function getFeedbackText(feedback: FeedbackValue | null): string {
  if (feedback === 'correct') return 'Marked correct';
  if (feedback === 'wrong') return 'Marked wrong';
  if (feedback === 'not_sure') return 'Marked not sure';
  return 'No feedback yet';
}

function formatDateTime(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 'Unknown time';
  }

  return date.toLocaleString();
}

interface HistoryCardProps {
  history: ScanHistoryItem[];
  onClearHistory: () => void;
}

export function HistoryCard({
  history,
  onClearHistory,
}: HistoryCardProps) {
  return (
    <View style={styles.historyCard}>
      <View style={styles.historyHeader}>
        <View>
          <Text style={styles.historyTitle}>Recent checks</Text>
          <Text style={styles.historySubtitle}>
            Your checks stay private on this device.
          </Text>
        </View>

        {history.length > 0 && (
          <TouchableOpacity onPress={onClearHistory}>
            <Text style={styles.clearHistoryText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      {history.length === 0 ? (
        <Text style={styles.emptyHistoryText}>
          No scan history yet. Check a message to see it here.
        </Text>
      ) : (
        history.slice(0, 5).map((item) => {
          const itemTheme = getTheme(item.result.riskLevel);

          return (
            <View key={item.id} style={styles.historyItem}>
              <View style={styles.historyItemTop}>
                <Text style={[styles.historyRisk, { color: itemTheme.banner }]}>
                  {itemTheme.emoji} {item.result.riskLevel}
                </Text>
                <Text style={styles.historyScore}>{item.result.riskScore}/100</Text>
              </View>

              <Text style={styles.historyPreview}>{item.messagePreview}</Text>

              <View style={styles.historyMetaRow}>
                <Text style={styles.historyMeta}>{formatDateTime(item.createdAt)}</Text>
                <Text style={styles.historyMeta}>{getFeedbackText(item.feedback)}</Text>
              </View>
            </View>
          );
        })
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  historyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 18,
    marginTop: 18,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  historyTitle: {
    color: '#0f172a',
    fontSize: 20,
    fontWeight: '900',
  },
  historySubtitle: {
    color: '#64748b',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 3,
  },
  clearHistoryText: {
    color: '#dc2626',
    fontSize: 14,
    fontWeight: '900',
  },
  emptyHistoryText: {
    color: '#64748b',
    fontSize: 14,
    lineHeight: 21,
  },
  historyItem: {
    borderTopColor: '#e2e8f0',
    borderTopWidth: 1,
    paddingTop: 12,
    marginTop: 12,
  },
  historyItemTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 6,
  },
  historyRisk: {
    fontSize: 14,
    fontWeight: '900',
    flex: 1,
  },
  historyScore: {
    color: '#0f172a',
    fontSize: 14,
    fontWeight: '900',
  },
  historyPreview: {
    color: '#334155',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  historyMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 8,
  },
  historyMeta: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '700',
  },
});
