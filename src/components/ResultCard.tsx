import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { DetectionResult, RedFlag, RiskLevel } from '../types/detection.types';
import { FeedbackValue } from '../types/history.types';

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

export function getTheme(riskLevel: RiskLevel) {
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

interface ResultCardProps {
  result: DetectionResult;
  feedbackMessage: string;
  onFeedback: (feedback: FeedbackValue) => void;
}

export function ResultCard({
  result,
  feedbackMessage,
  onFeedback,
}: ResultCardProps) {
  const theme = getTheme(result.riskLevel);

  return (
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
            onPress={() => onFeedback('correct')}
          >
            <Text style={styles.feedbackButtonText}>✅ Correct</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.feedbackButton}
            onPress={() => onFeedback('wrong')}
          >
            <Text style={styles.feedbackButtonText}>❌ Wrong</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.feedbackButton}
            onPress={() => onFeedback('not_sure')}
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
  );
}

const styles = StyleSheet.create({
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
});
