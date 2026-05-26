import { View } from 'react-native';

import { HistoryCard } from '../components/HistoryCard';
import { ScreenHeader } from '../components/ScreenHeader';
import { ScanHistoryItem } from '../types/history.types';

interface HistoryScreenProps {
  history: ScanHistoryItem[];
  onClearHistory: () => void;
  onDeleteHistoryItem: (scanId: string) => void;
  onBackToCheck: () => void;
}

export function HistoryScreen({
  history,
  onClearHistory,
  onDeleteHistoryItem,
  onBackToCheck,
}: HistoryScreenProps) {
  return (
    <View>
      <ScreenHeader
        title="Scan History"
        subtitle="Review your recent scam checks saved on this device."
        onBack={onBackToCheck}
      />

      <HistoryCard
        history={history}
        onClearHistory={onClearHistory}
        onDeleteHistoryItem={onDeleteHistoryItem}
      />
    </View>
  );
}
