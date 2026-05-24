import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { HistoryCard } from './src/components/HistoryCard';
import { MessageInputCard } from './src/components/MessageInputCard';
import { ResultCard } from './src/components/ResultCard';
import { analyzeMessage } from './src/core/detection/scamDetectionEngine';
import { DetectionResult } from './src/types/detection.types';
import { FeedbackValue, ScanHistoryItem } from './src/types/history.types';
import {
  clearScanHistory,
  loadScanHistory,
  saveScanResult,
  updateScanFeedback,
} from './src/utils/historyStorage';

export default function App() {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [history, setHistory] = useState<ScanHistoryItem[]>([]);
  const [currentScanId, setCurrentScanId] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');

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

        <MessageInputCard
          message={message}
          onChangeMessage={setMessage}
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

        <HistoryCard history={history} onClearHistory={handleClearHistory} />
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
});