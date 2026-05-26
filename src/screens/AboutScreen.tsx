import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { AboutInfoCard } from '../components/AboutInfoCard';
import { ABOUT_SATARKLY_ITEMS } from '../data/aboutSatarkly';

interface AboutScreenProps {
  onBackToCheck: () => void;
}

export function AboutScreen({ onBackToCheck }: AboutScreenProps) {
  return (
    <View>
      <View style={styles.headerRow}>
        <View style={styles.headerTextBox}>
          <Text style={styles.title}>About Satarkly</Text>
          <Text style={styles.subtitle}>
            A trust-first scam safety app built to help people pause, verify,
            and avoid harmful actions.
          </Text>
        </View>

        <TouchableOpacity style={styles.backButton} onPress={onBackToCheck}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>

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
