import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function PrivacyNoticeCard() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>🔒 Private by design</Text>

      <Text style={styles.text}>
        Your checks stay on this device. Satarkly never asks for OTP, PIN,
        password, CVV, or banking details.
      </Text>

      {isExpanded && (
        <View style={styles.expandedBox}>
          <View style={styles.point}>
            <Text style={styles.pointIcon}>✅</Text>
            <Text style={styles.pointText}>
              Satarkly gives risk guidance, not a 100% guarantee.
            </Text>
          </View>

          <View style={styles.point}>
            <Text style={styles.pointIcon}>✅</Text>
            <Text style={styles.pointText}>
              Always verify important messages through official apps or websites.
            </Text>
          </View>

          <View style={styles.point}>
            <Text style={styles.pointIcon}>✅</Text>
            <Text style={styles.pointText}>
              Do not share OTP, UPI PIN, ATM PIN, password, CVV, or card details with anyone.
            </Text>
          </View>

          <View style={styles.point}>
            <Text style={styles.pointIcon}>✅</Text>
            <Text style={styles.pointText}>
              If money is requested urgently, call the person using a trusted saved number before sending.
            </Text>
          </View>
        </View>
      )}

      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => setIsExpanded((currentValue) => !currentValue)}
      >
        <Text style={styles.toggleButtonText}>
          {isExpanded ? 'Hide safety details' : 'View safety promise'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#eff6ff',
    borderColor: '#93c5fd',
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
    marginBottom: 16,
  },
  title: {
    color: '#1e3a8a',
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 6,
  },
  text: {
    color: '#1e40af',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
  },
  expandedBox: {
    marginTop: 12,
    paddingTop: 10,
    borderTopColor: '#bfdbfe',
    borderTopWidth: 1,
  },
  point: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  pointIcon: {
    fontSize: 14,
    lineHeight: 20,
    marginRight: 8,
  },
  pointText: {
    color: '#334155',
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '600',
    flex: 1,
  },
  toggleButton: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  toggleButtonText: {
    color: '#2563eb',
    fontSize: 13,
    fontWeight: '900',
  },
});