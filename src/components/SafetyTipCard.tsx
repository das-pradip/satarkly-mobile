import { StyleSheet, Text, View } from 'react-native';

import { SafetyTip } from '../data/safetyTips';

interface SafetyTipCardProps {
  tip: SafetyTip;
}

export function SafetyTipCard({ tip }: SafetyTipCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.emoji}>{tip.emoji}</Text>

      <View style={styles.textBox}>
        <Text style={styles.title}>{tip.title}</Text>
        <Text style={styles.description}>{tip.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    gap: 12,
  },
  emoji: {
    fontSize: 24,
    lineHeight: 32,
  },
  textBox: {
    flex: 1,
  },
  title: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 5,
  },
  description: {
    color: '#334155',
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '600',
  },
});
