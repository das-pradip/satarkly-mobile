import { StyleSheet, Text, View } from 'react-native';

import { AboutInfoCard } from '../components/AboutInfoCard';
import { ScreenHeader } from '../components/ScreenHeader';
import { ABOUT_SATARKLY_ITEMS } from '../data/aboutSatarkly';

interface AboutScreenProps {
  onBackToCheck: () => void;
}

export function AboutScreen({ onBackToCheck }: AboutScreenProps) {
  return (
    <View>
      <ScreenHeader
        title="About Satarkly"
        subtitle="A trust-first scam safety app built to help people pause, verify, and avoid harmful actions."
        onBack={onBackToCheck}
      />

      <View style={styles.heroCard}>
        <Text style={styles.heroTitle}>Check before you click</Text>
        <Text style={styles.heroText}>
          Satarkly is not a replacement for official verification. It is a
          simple safety layer that helps you notice scam warning signs before
          clicking links, sharing private details, installing apps, or sending
          money.
        </Text>
      </View>

      {ABOUT_SATARKLY_ITEMS.map((item) => (
        <AboutInfoCard key={item.id} item={item} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    backgroundColor: '#dbeafe',
    borderColor: '#93c5fd',
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
    marginBottom: 14,
  },
  heroTitle: {
    color: '#1e3a8a',
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 6,
  },
  heroText: {
    color: '#1e40af',
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '700',
  },
});
