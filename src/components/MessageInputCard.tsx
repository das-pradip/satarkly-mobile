import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface MessageInputCardProps {
  message: string;
  onChangeMessage: (value: string) => void;
  onCheckMessage: () => void;
  onClearInput: () => void;
}

export function MessageInputCard({
  message,
  onChangeMessage,
  onCheckMessage,
  onClearInput,
}: MessageInputCardProps) {
  return (
    <View style={styles.inputCard}>
      <Text style={styles.label}>Paste message here</Text>

      <TextInput
        style={styles.input}
        placeholder="Example: Your KYC will expire today. Click this link..."
        placeholderTextColor="#7b8794"
        multiline
        value={message}
        onChangeText={onChangeMessage}
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.primaryButton} onPress={onCheckMessage}>
          <Text style={styles.primaryButtonText}>Check Message</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={onClearInput}>
          <Text style={styles.secondaryButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  label: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 10,
  },
  input: {
    minHeight: 150,
    borderColor: '#dbe3ef',
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
    textAlignVertical: 'top',
    fontSize: 15,
    color: '#0f172a',
    backgroundColor: '#f8fafc',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 14,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#2563eb',
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '900',
  },
  secondaryButton: {
    backgroundColor: '#e2e8f0',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#0f172a',
    fontSize: 15,
    fontWeight: '900',
  },
});
