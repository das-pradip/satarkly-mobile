import { useState } from 'react';
import { Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { DetectionResult } from '../types/detection.types';
import { buildShareResultText } from '../utils/shareResult';

interface ShareResultBoxProps {
  result: DetectionResult;
}

export function ShareResultBox({ result }: ShareResultBoxProps) {
  const [includeOriginalMessage, setIncludeOriginalMessage] = useState(false);
  const [shareStatus, setShareStatus] = useState('');

  async function handleShareResult() {
    try {
      const message = buildShareResultText({
        result,
        includeOriginalMessage,
      });

      await Share.share({ message });
      setShareStatus('Share sheet opened.');
    } catch (error) {
      console.warn('Failed to share result:', error);
      setShareStatus('Unable to share right now. Please try again.');
    }
  }

  return (
    <View style={styles.shareBox}>
      <Text style={styles.title}>Share this result</Text>

      <Text style={styles.description}>
        Share a safe summary with family or friends. Original message is not
        included unless you choose it.
      </Text>

      <View style={styles.optionRow}>
        <View style={styles.optionTextBox}>
          <Text style={styles.optionTitle}>Include original message?</Text>
          <Text style={styles.optionHint}>
            Turn this on only if the message has no private details.
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.toggleButton,
            includeOriginalMessage && styles.toggleButtonActive,
          ]}
          onPress={() =>
            setIncludeOriginalMessage((currentValue) => !currentValue)
          }
        >
          <Text
            style={[
              styles.toggleButtonText,
              includeOriginalMessage && styles.toggleButtonTextActive,
            ]}
          >
            {includeOriginalMessage ? 'Yes' : 'No'}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.shareButton} onPress={handleShareResult}>
        <Text style={styles.shareButtonText}>Share Result</Text>
      </TouchableOpacity>

      {shareStatus.length > 0 && (
        <Text style={styles.shareStatus}>{shareStatus}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  shareBox: {
    backgroundColor: '#f8fafc',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
    marginTop: 16,
  },
  title: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 6,
  },
  description: {
    color: '#475569',
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '600',
    marginBottom: 12,
  },
  optionRow: {
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionTextBox: {
    flex: 1,
  },
  optionTitle: {
    color: '#0f172a',
    fontSize: 14,
    fontWeight: '900',
  },
  optionHint: {
    color: '#64748b',
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '600',
    marginTop: 3,
  },
  toggleButton: {
    backgroundColor: '#e2e8f0',
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 14,
    minWidth: 52,
    alignItems: 'center',
  },
  toggleButtonActive: {
    backgroundColor: '#2563eb',
  },
  toggleButtonText: {
    color: '#0f172a',
    fontSize: 13,
    fontWeight: '900',
  },
  toggleButtonTextActive: {
    color: '#ffffff',
  },
  shareButton: {
    backgroundColor: '#2563eb',
    borderRadius: 15,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 12,
  },
  shareButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '900',
  },
  shareStatus: {
    color: '#16a34a',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 9,
  },
});
