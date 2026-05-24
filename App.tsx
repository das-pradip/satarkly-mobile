import { useEffect, useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { analyzeMessage } from './src/core/detection/scamDetectionEngine';
import { DetectionResult, RedFlag, RiskLevel } from './src/types/detection.types';
import { FeedbackValue, ScanHistoryItem } from './src/types/history.types';
import {
  clearScanHistory,
  loadScanHistory,
  saveScanResult,
  updateScanFeedback,
} from './src/utils/historyStorage';

const redFlagUserText: Record<RedFlag, string> = {
  urgency: 'Creates pressure to act quickly',
  account_blocked_threat: 'Threatens account blocking',
  otp_request: 'Asks for OTP or verification code',
  pin_request: 'Asks for PIN, password, or CVV',
  suspicious_link: 'Contains a risky link',
  fake_authority: 'Pretends to be an authority',
  payment_request: 'Asks for money or payment',
  money_request_caution: 'Asks for money — verify before sending',
  refund_trap: 'Uses refund or cashback trap',
  job_registration_fee: 'Asks fee for job opportunity',
  fake_verification: 'Asks for unsafe verification',
  apk_download: 'Asks to install unknown app/APK',
  too_good_to_be_true: 'Promises unrealistic reward',
  fear_pressure: 'Uses fear or legal threat',
  secrecy_instruction: 'Tells you to keep it secret',
  fake_customer_support: 'Pretends to be customer support',
  identity_threat: 'Claims identity/legal trouble',
  loan_processing_fee: 'Asks fee before loan release',
  investment_guarantee: 'Promises guaranteed profit',
  electricity_disconnection_threat: 'Threatens electricity disconnection',
  courier_seizure_threat: 'Claims parcel/courier is seized',
};

function getTheme(riskLevel: RiskLevel) {
  if (riskLevel === 'High Scam Risk') {
    return {
      emoji: '🔴',
      title: 'High Scam Risk',
      subtitle: 'Stop. This message looks dangerous.',
      banner: '#dc2626',
      lightBg: '#fef2f2',
      border: '#fecaca',
      text: '#7f1d1d',
    };
  }

  if (riskLevel === 'Suspicious') {
    return {
      emoji: '🟠',
      title: 'Suspicious',
      subtitle: 'Verify carefully before doing anything.',
      banner: '#f97316',
      lightBg: '#fff7ed',
      border: '#fed7aa',
      text: '#7c2d12',
    };
  }

  return {
    emoji: '🟢',
    title: 'No Strong Scam Signal',
    subtitle: 'No major scam pattern found, but stay careful.',
    banner: '#16a34a',
    lightBg: '#f0fdf4',
    border: '#bbf7d0',
    text: '#14532d',
  };
}

function getSimpleSummary(result: DetectionResult): string {
  if (result.riskLevel === 'High Scam Risk') {
    return 'This message may be trying to make you click, share private details, install an unsafe app, or send money.';
  }

  if (result.riskLevel === 'Suspicious') {
    if (result.redFlags.includes('money_request_caution')) {
      return 'This message asks for money. It may be genuine, but confirm with the person using a trusted call before sending.';
    }

    return 'This message has some warning signs. Verify it from official sources before taking action.';
  }

  return 'Satarkly did not find strong scam signs in this message. Still, never share OTP, PIN, password, or banking details.';
}

function getFeedbackText(feedback: FeedbackValue | null): string {
  if (feedback === 'correct') return 'Marked correct';
  if (feedback === 'wrong') return 'Marked wrong';
  if (feedback === 'not_sure') return 'Marked not sure';
  return 'No feedback yet';
}

function formatDateTime(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 'Unknown time';
  }

  return date.toLocaleString();
}

export default function App() {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [history, setHistory] = useState<ScanHistoryItem[]>([]);
  const [currentScanId, setCurrentScanId] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const theme = useMemo(
    () => (result ? getTheme(result.riskLevel) : null),
    [result]
  );

  useEffect(() => {
    async function loadHistoryOnStart() {
      const savedHistory = await loadScanHistory();
      setHistory(savedHistory);
    }

    loadHistoryOnStart();
  }, []);

  async function handleCheckMessage() {
    const analysis = analyzeMessage({ message });
    setResult(analysis);
    setFeedbackMessage('');

    const updatedHistory = await saveScanResult(analysis);
    setHistory(updatedHistory);
    setCurrentScanId(updatedHistory[0]?.id ?? null);
  }

  function handleClearInput() {
    setMessage('');
    setResult(null);
    setCurrentScanId(null);
    setFeedbackMessage('');
  }

  async function handleFeedback(feedback: FeedbackValue) {
    if (!currentScanId) {
      return;
    }

    const updatedHistory = await updateScanFeedback(currentScanId, feedback);
    setHistory(updatedHistory);
    setFeedbackMessage('Thanks. Your feedback is saved on this device.');
  }

  async function handleClearHistory() {
    await clearScanHistory();
    setHistory([]);
    setCurrentScanId(null);
    setFeedbackMessage('');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.appName}>Satarkly</Text>
          <Text style={styles.tagline}>Check before you click.</Text>
          <Text style={styles.description}>
            Paste a suspicious SMS, WhatsApp, or online message. Satarkly helps
            you decide whether to stop, verify, or stay careful.
          </Text>
        </View>

        <View style={styles.inputCard}>
          <Text style={styles.label}>Paste message here</Text>

          <TextInput
            style={styles.input}
            placeholder="Example: Your KYC will expire today. Click this link..."
            placeholderTextColor="#7b8794"
            multiline
            value={message}
            onChangeText={setMessage}
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.primaryButton} onPress={handleCheckMessage}>
              <Text style={styles.primaryButtonText}>Check Message</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryButton} onPress={handleClearInput}>
              <Text style={styles.secondaryButtonText}>Clear</Text>
            </TouchableOpacity>
          </View>
        </View>

        {result && theme && (
          <View style={styles.resultCard}>
            <View style={[styles.resultBanner, { backgroundColor: theme.banner }]}>
              <Text style={styles.resultEmoji}>{theme.emoji}</Text>

              <View style={styles.resultBannerTextBox}>
                <Text style={styles.resultTitle}>{theme.title}</Text>
                <Text style={styles.resultSubtitle}>{theme.subtitle}</Text>
              </View>

              <Text style={styles.score}>{result.riskScore}/100</Text>
            </View>

            <View
              style={[
                styles.summaryBox,
                { backgroundColor: theme.lightBg, borderColor: theme.border },
              ]}
            >
              <Text style={[styles.summaryText, { color: theme.text }]}>
                {getSimpleSummary(result)}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Why Satarkly says this</Text>

              {result.redFlags.length > 0 ? (
                result.redFlags.slice(0, 5).map((flag) => (
                  <View key={flag} style={styles.reasonItem}>
                    <Text style={styles.reasonIcon}>•</Text>
                    <Text style={styles.reasonText}>{redFlagUserText[flag]}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.normalText}>No major danger signs were detected.</Text>
              )}
            </View>

            <View
              style={[
                styles.actionBox,
                { backgroundColor: theme.lightBg, borderColor: theme.border },
              ]}
            >
              <Text style={[styles.actionTitle, { color: theme.text }]}>
                What you should do now
              </Text>
              <Text style={[styles.actionText, { color: theme.text }]}>
                {result.safeAction}
              </Text>
            </View>

            <View style={styles.feedbackBox}>
              <Text style={styles.feedbackTitle}>Was this result helpful?</Text>

              <View style={styles.feedbackRow}>
                <TouchableOpacity
                  style={styles.feedbackButton}
                  onPress={() => handleFeedback('correct')}
                >
                  <Text style={styles.feedbackButtonText}>✅ Correct</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.feedbackButton}
                  onPress={() => handleFeedback('wrong')}
                >
                  <Text style={styles.feedbackButtonText}>❌ Wrong</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.feedbackButton}
                  onPress={() => handleFeedback('not_sure')}
                >
                  <Text style={styles.feedbackButtonText}>🤔 Not sure</Text>
                </TouchableOpacity>
              </View>

              {feedbackMessage.length > 0 && (
                <Text style={styles.feedbackSavedText}>{feedbackMessage}</Text>
              )}
            </View>

            <View style={styles.detailsBox}>
              <Text style={styles.detailsTitle}>Extra details</Text>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Type</Text>
                <Text style={styles.detailValue}>{result.category}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Confidence</Text>
                <Text style={styles.detailValue}>{result.confidence}</Text>
              </View>
            </View>

            <Text style={styles.disclaimer}>
              Satarkly gives risk guidance, not a 100% guarantee. Never share OTP,
              PIN, password, card details, or banking information.
            </Text>
          </View>
        )}

        <View style={styles.historyCard}>
          <View style={styles.historyHeader}>
            <View>
              <Text style={styles.historyTitle}>Recent checks</Text>
              <Text style={styles.historySubtitle}>
                Saved only on this device for now.
              </Text>
            </View>

            {history.length > 0 && (
              <TouchableOpacity onPress={handleClearHistory}>
                <Text style={styles.clearHistoryText}>Clear</Text>
              </TouchableOpacity>
            )}
          </View>

          {history.length === 0 ? (
            <Text style={styles.emptyHistoryText}>
              No scan history yet. Check a message to see it here.
            </Text>
          ) : (
            history.slice(0, 5).map((item) => {
              const itemTheme = getTheme(item.result.riskLevel);

              return (
                <View key={item.id} style={styles.historyItem}>
                  <View style={styles.historyItemTop}>
                    <Text style={[styles.historyRisk, { color: itemTheme.banner }]}>
                      {itemTheme.emoji} {item.result.riskLevel}
                    </Text>
                    <Text style={styles.historyScore}>{item.result.riskScore}/100</Text>
                  </View>

                  <Text style={styles.historyPreview}>{item.messagePreview}</Text>

                  <View style={styles.historyMetaRow}>
                    <Text style={styles.historyMeta}>{formatDateTime(item.createdAt)}</Text>
                    <Text style={styles.historyMeta}>{getFeedbackText(item.feedback)}</Text>
                  </View>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  container: {
    padding: 18,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
  },
  appName: {
    color: '#ffffff',
    fontSize: 38,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  tagline: {
    color: '#38bdf8',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 6,
  },
  description: {
    color: '#cbd5e1',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 12,
    maxWidth: 760,
  },
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
  resultCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 18,
    marginTop: 18,
  },
  resultBanner: {
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  resultEmoji: {
    fontSize: 34,
  },
  resultBannerTextBox: {
    flex: 1,
  },
  resultTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '900',
  },
  resultSubtitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 4,
    opacity: 0.95,
  },
  score: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '900',
  },
  summaryBox: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
    marginTop: 14,
  },
  summaryText: {
    fontSize: 16,
    lineHeight: 23,
    fontWeight: '700',
  },
  section: {
    marginTop: 18,
  },
  sectionTitle: {
    color: '#0f172a',
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 10,
  },
  reasonItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  reasonIcon: {
    color: '#0f172a',
    fontSize: 18,
    marginRight: 8,
    lineHeight: 24,
  },
  reasonText: {
    color: '#334155',
    fontSize: 16,
    lineHeight: 24,
    flex: 1,
    fontWeight: '600',
  },
  normalText: {
    color: '#334155',
    fontSize: 15,
    lineHeight: 23,
  },
  actionBox: {
    borderRadius: 18,
    padding: 15,
    marginTop: 18,
    borderWidth: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 7,
  },
  actionText: {
    fontSize: 15,
    lineHeight: 23,
    fontWeight: '700',
  },
  feedbackBox: {
    backgroundColor: '#f8fafc',
    borderRadius: 18,
    padding: 14,
    marginTop: 16,
    borderColor: '#e2e8f0',
    borderWidth: 1,
  },
  feedbackTitle: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 10,
  },
  feedbackRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  feedbackButton: {
    backgroundColor: '#ffffff',
    borderColor: '#cbd5e1',
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  feedbackButtonText: {
    color: '#0f172a',
    fontSize: 14,
    fontWeight: '800',
  },
  feedbackSavedText: {
    color: '#16a34a',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 10,
  },
  detailsBox: {
    backgroundColor: '#f8fafc',
    borderRadius: 18,
    padding: 14,
    marginTop: 16,
    borderColor: '#e2e8f0',
    borderWidth: 1,
  },
  detailsTitle: {
    color: '#0f172a',
    fontSize: 15,
    fontWeight: '900',
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    paddingVertical: 6,
  },
  detailLabel: {
    color: '#64748b',
    fontSize: 14,
    fontWeight: '700',
  },
  detailValue: {
    color: '#0f172a',
    fontSize: 14,
    fontWeight: '800',
    flex: 1,
    textAlign: 'right',
  },
  disclaimer: {
    color: '#64748b',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 16,
  },
  historyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 18,
    marginTop: 18,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  historyTitle: {
    color: '#0f172a',
    fontSize: 20,
    fontWeight: '900',
  },
  historySubtitle: {
    color: '#64748b',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 3,
  },
  clearHistoryText: {
    color: '#dc2626',
    fontSize: 14,
    fontWeight: '900',
  },
  emptyHistoryText: {
    color: '#64748b',
    fontSize: 14,
    lineHeight: 21,
  },
  historyItem: {
    borderTopColor: '#e2e8f0',
    borderTopWidth: 1,
    paddingTop: 12,
    marginTop: 12,
  },
  historyItemTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 6,
  },
  historyRisk: {
    fontSize: 14,
    fontWeight: '900',
    flex: 1,
  },
  historyScore: {
    color: '#0f172a',
    fontSize: 14,
    fontWeight: '900',
  },
  historyPreview: {
    color: '#334155',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  historyMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 8,
  },
  historyMeta: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '700',
  },
});