import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { HistoryCard } from '../components/HistoryCard';
import { ScanHistoryItem } from '../types/history.types';

interface HistoryScreenProps {
  history: ScanHistoryItem[];
  onClearHistory: () => void;
  onBackToCheck: () => void;
}

export function HistoryScreen({
  history,
  onClearHistory,
  onBackToCheck,
}: HistoryScreenProps) {
  return (
    <View>
      <View style={styles.headerRow}>
        <View style={styles.headerTextBox}>
          <Text style={styles.title}>Scan History</Text>
          <Text style={styles.subtitle}>
            Review your recent scam checks saved on this device.
          </Text>
        </View>

        <TouchableOpacity style={styles.backButton} onPress={onBackToCheck}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>

      <HistoryCard history={history} onClearHistory={onClearHistory} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  headerTextBox: {
    flex: 1,
  },
  title: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '900',
  },
  subtitle: {
    color: '#cbd5e1',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 6,
    fontWeight: '600',
  },
  backButton: {
    backgroundColor: '#e2e8f0',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  backButtonText: {
    color: '#0f172a',
    fontSize: 13,
    fontWeight: '900',
  },
});
