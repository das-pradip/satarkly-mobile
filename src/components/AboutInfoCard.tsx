import { StyleSheet, Text, View } from 'react-native';

import { AboutInfoItem } from '../data/aboutSatarkly';

interface AboutInfoCardProps {
  item: AboutInfoItem;
}

export function AboutInfoCard({ item }: AboutInfoCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.emoji}>{item.emoji}</Text>

      <View style={styles.textBox}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
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
