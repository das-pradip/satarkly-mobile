import { useState } from 'react';
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
  onDeleteHistoryItem: (scanId: string) => void;
}

export function HistoryCard({
  history,
  onClearHistory,
  onDeleteHistoryItem,
}: HistoryCardProps) {
  const { width } = useWindowDimensions();
  const isMobile = isSmallScreen(width);

  const [isClearConfirmVisible, setIsClearConfirmVisible] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  function handleClearPress() {
    setIsClearConfirmVisible(true);
    setDeleteConfirmId(null);
  }

  function handleCancelClear() {
    setIsClearConfirmVisible(false);
  }

  function handleConfirmClear() {
    onClearHistory();
    setIsClearConfirmVisible(false);
    setDeleteConfirmId(null);
  }

  function handleDeletePress(scanId: string) {
    setDeleteConfirmId(scanId);
    setIsClearConfirmVisible(false);
  }

  function handleCancelDelete() {
    setDeleteConfirmId(null);
  }

  function handleConfirmDelete(scanId: string) {
    onDeleteHistoryItem(scanId);
    setDeleteConfirmId(null);
  }

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
          <TouchableOpacity onPress={handleClearPress}>
            <Text style={styles.clearHistoryText}>Clear all</Text>
          </TouchableOpacity>
        )}
      </View>

      {isClearConfirmVisible && (
        <View style={styles.confirmBox}>
          <Text style={styles.confirmTitle}>Clear all scan history?</Text>
          <Text style={styles.confirmText}>
            This will remove all saved checks from this device.
          </Text>

          <View style={styles.confirmActions}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancelClear}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.dangerButton} onPress={handleConfirmClear}>
              <Text style={styles.dangerButtonText}>Clear all</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {history.length === 0 ? (
        <Text style={styles.emptyHistoryText}>
          No scan history yet. Check a message to see it here.
        </Text>
      ) : (
        history.slice(0, 20).map((item) => {
          const itemTheme = getTheme(item.result.riskLevel);
          const isDeleteConfirmVisible = deleteConfirmId === item.id;

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

              {!isClearConfirmVisible && !isDeleteConfirmVisible && (
                <TouchableOpacity
                  style={styles.deleteSingleButton}
                  onPress={() => handleDeletePress(item.id)}
                >
                  <Text style={styles.deleteSingleButtonText}>Delete this check</Text>
                </TouchableOpacity>
              )}

              {isDeleteConfirmVisible && (
                <View style={styles.deleteConfirmBox}>
                  <Text style={styles.deleteConfirmText}>
                    Delete this scan from history?
                  </Text>

                  <View style={styles.confirmActions}>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={handleCancelDelete}
                    >
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.dangerButton}
                      onPress={() => handleConfirmDelete(item.id)}
                    >
                      <Text style={styles.dangerButtonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
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
  confirmBox: {
    backgroundColor: '#fef2f2',
    borderColor: '#fecaca',
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
  },
  confirmTitle: {
    color: '#7f1d1d',
    fontSize: 14,
    fontWeight: '900',
    marginBottom: 4,
  },
  confirmText: {
    color: '#991b1b',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '600',
  },
  confirmActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
    flexWrap: 'wrap',
  },
  cancelButton: {
    backgroundColor: '#ffffff',
    borderColor: '#cbd5e1',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  cancelButtonText: {
    color: '#0f172a',
    fontSize: 12,
    fontWeight: '900',
  },
  dangerButton: {
    backgroundColor: '#dc2626',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  dangerButtonText: {
    color: '#ffffff',
    fontSize: 12,
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
  deleteSingleButton: {
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  deleteSingleButtonText: {
    color: '#dc2626',
    fontSize: 12,
    fontWeight: '900',
  },
  deleteConfirmBox: {
    backgroundColor: '#fff7ed',
    borderColor: '#fed7aa',
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    marginTop: 9,
  },
  deleteConfirmText: {
    color: '#7c2d12',
    fontSize: 12,
    fontWeight: '800',
  },
});