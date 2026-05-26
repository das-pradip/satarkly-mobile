import { StyleSheet, Text, View } from 'react-native';

export function SafetyHeroCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Pause before you act</Text>
      <Text style={styles.text}>
        If a message creates fear, urgency, secrecy, or asks for money/private
        details — stop and verify before clicking, sharing, installing, or paying.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fef3c7',
    borderColor: '#fcd34d',
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
    marginBottom: 14,
  },
  title: {
    color: '#78350f',
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 6,
  },
  text: {
    color: '#92400e',
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '700',
  },
});
