import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Clipboard from 'expo-clipboard';

interface CopySafeActionButtonProps {
  safeAction: string;
}

export function CopySafeActionButton({
  safeAction,
}: CopySafeActionButtonProps) {
  const [copyStatus, setCopyStatus] = useState('');

  async function handleCopySafeAction() {
    try {
      await Clipboard.setStringAsync(safeAction);
      setCopyStatus('Advice copied. You can paste it anywhere.');
    } catch (error) {
      console.warn('Failed to copy advice:', error);
      setCopyStatus('Unable to copy right now.');
    }
  }

  return (
    <View style={styles.copyBox}>
      <Text style={styles.helperText}>
        Copy this advice to send it on WhatsApp, SMS, or save it in notes.
      </Text>

      <TouchableOpacity style={styles.copyButton} onPress={handleCopySafeAction}>
        <Text style={styles.copyButtonText}>Copy what to do</Text>
      </TouchableOpacity>

      {copyStatus.length > 0 && (
        <Text style={styles.copyStatus}>{copyStatus}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  copyBox: {
    marginTop: 12,
  },
  helperText: {
    color: '#475569',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  copyButton: {
    backgroundColor: '#0f172a',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  copyButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '900',
  },
  copyStatus: {
    color: '#16a34a',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 8,
  },
});