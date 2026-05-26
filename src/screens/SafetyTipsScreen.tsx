import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { SafetyHeroCard } from '../components/SafetyHeroCard';
import { SafetyTipCard } from '../components/SafetyTipCard';
import { SAFETY_TIPS } from '../data/safetyTips';

interface SafetyTipsScreenProps {
  onBackToCheck: () => void;
}

export function SafetyTipsScreen({ onBackToCheck }: SafetyTipsScreenProps) {
  return (
    <View>
      <View style={styles.headerRow}>
        <View style={styles.headerTextBox}>
          <Text style={styles.title}>Safety Tips</Text>
          <Text style={styles.subtitle}>
            Simple rules to protect yourself and your family from common scams.
          </Text>
        </View>

        <TouchableOpacity style={styles.backButton} onPress={onBackToCheck}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>

      <SafetyHeroCard />

      {SAFETY_TIPS.map((tip) => (
        <SafetyTipCard key={tip.id} tip={tip} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    alignItems: 'flex-start',
    marginBottom: 14,
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
