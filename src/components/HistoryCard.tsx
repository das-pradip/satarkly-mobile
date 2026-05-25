import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import { getTheme } from './ResultCard';
import { FeedbackValue, ScanHistoryItem } from '../types/history.types';
import { isSmallScreen } from '../utils/responsive';

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
  const { width } = useWindowDimensions();
  const isMobile = isSmallScreen(width);

  return (
    <View style={styles.historyCard}>
      <View style={styles.historyHeader}>
        <View style={styles.historyHeaderText}>
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
              <View
                style={[
                  styles.historyItemTop,
                  isMobile && styles.historyItemTopMobile,
                ]}
              >
                <Text style={[styles.historyRisk, { color: itemTheme.banner }]}>
                  {itemTheme.emoji} {item.result.riskLevel}
                </Text>

                <Text style={styles.historyScore}>{item.result.riskScore}/100</Text>
              </View>

              <Text style={styles.historyPreview}>{item.messagePreview}</Text>

              <View
                style={[
                  styles.historyMetaRow,
                  isMobile && styles.historyMetaRowMobile,
                ]}
              >
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
    borderRadius: 20,
    padding: 14,
    marginTop: 16,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  historyHeaderText: {
    flex: 1,
  },
  historyTitle: {
    color: '#0f172a',
    fontSize: 18,
    fontWeight: '900',
  },
  historySubtitle: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 3,
  },
  clearHistoryText: {
    color: '#dc2626',
    fontSize: 12,
    fontWeight: '900',
    paddingTop: 3,
  },
  emptyHistoryText: {
    color: '#64748b',
    fontSize: 14,
    lineHeight: 21,
  },
  historyItem: {
    borderTopColor: '#e2e8f0',
    borderTopWidth: 1,
    paddingTop: 11,
    marginTop: 11,
  },
  historyItemTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 6,
  },
  historyItemTopMobile: {
    alignItems: 'flex-start',
  },
  historyRisk: {
    fontSize: 13,
    fontWeight: '900',
    flex: 1,
  },
  historyScore: {
    color: '#0f172a',
    fontSize: 13,
    fontWeight: '900',
  },
  historyPreview: {
    color: '#334155',
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '600',
  },
  historyMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 7,
  },
  historyMetaRowMobile: {
    flexDirection: 'column',
    gap: 2,
  },
  historyMeta: {
    color: '#64748b',
    fontSize: 11,
    fontWeight: '700',
  },
});