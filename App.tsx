import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import { MessageInputCard } from './src/components/MessageInputCard';
import { PrivacyNoticeCard } from './src/components/PrivacyNoticeCard';
import { ResultCard } from './src/components/ResultCard';
import { analyzeMessage } from './src/core/detection/scamDetectionEngine';
import { HistoryScreen } from './src/screens/HistoryScreen';
import { DetectionResult } from './src/types/detection.types';
import { FeedbackValue, ScanHistoryItem } from './src/types/history.types';
import {
  clearScanHistory,
  loadScanHistory,
  saveScanResult,
  updateScanFeedback,
} from './src/utils/historyStorage';
import { CONTENT_MAX_WIDTH, getScreenPadding } from './src/utils/responsive';

type AppScreen = 'check' | 'history';

export default function App() {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [history, setHistory] = useState<ScanHistoryItem[]>([]);
  const [currentScanId, setCurrentScanId] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [inputError, setInputError] = useState('');
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('check');

  const { width } = useWindowDimensions();
  const screenPadding = getScreenPadding(width);

  useEffect(() => {
    async function loadHistoryOnStart() {
      const savedHistory = await loadScanHistory();
      setHistory(savedHistory);
    }

    loadHistoryOnStart();
  }, []);

  async function handleCheckMessage() {
    const trimmedMessage = message.trim();

    if (trimmedMessage.length === 0) {
      setInputError('Please paste a message before checking.');
      setResult(null);
      setCurrentScanId(null);
      setFeedbackMessage('');
      return;
    }

    setInputError('');

    const analysis = analyzeMessage({ message: trimmedMessage });
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
    setInputError('');
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

  function renderCheckScreen() {
    return (
      <>
        <View style={styles.header}>
          <View style={styles.headerTopRow}>
            <View style={styles.headerTextBox}>
              <Text style={styles.appName}>Satarkly</Text>
              <Text style={styles.tagline}>Check before you click.</Text>
            </View>

            <TouchableOpacity
              style={styles.historyButton}
              onPress={() => setCurrentScreen('history')}
            >
              <Text style={styles.historyButtonText}>History</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.description}>
            Paste a suspicious SMS, WhatsApp, or online message. Satarkly helps
            you decide whether to stop, verify, or stay careful.
          </Text>
        </View>

        <PrivacyNoticeCard />

        <MessageInputCard
          message={message}
          inputError={inputError}
          onChangeMessage={(value) => {
            setMessage(value);

            if (inputError.length > 0) {
              setInputError('');
            }
          }}
          onCheckMessage={handleCheckMessage}
          onClearInput={handleClearInput}
        />

        {result && (
          <ResultCard
            result={result}
            feedbackMessage={feedbackMessage}
            onFeedback={handleFeedback}
          />
        )}

        
      </>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        contentContainerStyle={[
          styles.container,
          { padding: screenPadding },
        ]}
      >
        <View style={styles.content}>
          {currentScreen === 'history' ? (
            <HistoryScreen
              history={history}
              onClearHistory={handleClearHistory}
              onBackToCheck={() => setCurrentScreen('check')}
            />
          ) : (
            renderCheckScreen()
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
    paddingBottom: 40,
  },
  content: {
    width: '100%',
    maxWidth: CONTENT_MAX_WIDTH,
    alignSelf: 'center',
  },
  header: {
    marginBottom: 20,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    alignItems: 'flex-start',
  },
  headerTextBox: {
    flex: 1,
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
  },
  historyButton: {
    backgroundColor: '#e2e8f0',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginTop: 4,
  },
  historyButtonText: {
    color: '#0f172a',
    fontSize: 13,
    fontWeight: '900',
  },
});