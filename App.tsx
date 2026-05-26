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
import { AboutScreen } from './src/screens/AboutScreen';
import { HistoryScreen } from './src/screens/HistoryScreen';
import { SafetyTipsScreen } from './src/screens/SafetyTipsScreen';
import { DetectionResult } from './src/types/detection.types';
import { FeedbackValue, ScanHistoryItem } from './src/types/history.types';
import {
  clearScanHistory,
  deleteScanHistoryItem,
  loadScanHistory,
  saveScanResult,
  updateScanFeedback,
} from './src/utils/historyStorage';
import { CONTENT_MAX_WIDTH, getScreenPadding } from './src/utils/responsive';

type AppScreen = 'check' | 'history' | 'safety' | 'about';

export default function App() {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [history, setHistory] = useState<ScanHistoryItem[]>([]);
  const [currentScanId, setCurrentScanId] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [inputError, setInputError] = useState('');
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('check');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  async function handleDeleteHistoryItem(scanId: string) {
    const updatedHistory = await deleteScanHistoryItem(scanId);
    setHistory(updatedHistory);

    if (currentScanId === scanId) {
      setCurrentScanId(null);
      setFeedbackMessage('');
    }
  }

  function openScreen(screen: AppScreen) {
    setCurrentScreen(screen);
    setIsMenuOpen(false);
  }

  function renderMenu() {
    if (!isMenuOpen) {
      return null;
    }

    return (
      <View style={styles.menuCard}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => openScreen('safety')}
        >
          <Text style={styles.menuIcon}>🛡️</Text>
          <View style={styles.menuTextBox}>
            <Text style={styles.menuTitle}>Safety Tips</Text>
            <Text style={styles.menuSubtitle}>Learn common scam safety rules</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => openScreen('history')}
        >
          <Text style={styles.menuIcon}>🕘</Text>
          <View style={styles.menuTextBox}>
            <Text style={styles.menuTitle}>Scan History</Text>
            <Text style={styles.menuSubtitle}>Review checks saved on this device</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => openScreen('about')}
        >
          <Text style={styles.menuIcon}>ℹ️</Text>
          <View style={styles.menuTextBox}>
            <Text style={styles.menuTitle}>About Satarkly</Text>
            <Text style={styles.menuSubtitle}>Understand what Satarkly does</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
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
              style={styles.menuButton}
              onPress={() => setIsMenuOpen((currentValue) => !currentValue)}
            >
              <Text style={styles.menuButtonText}>
                {isMenuOpen ? 'Close' : '☰ Menu'}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.description}>
            Paste a suspicious SMS, WhatsApp, or online message. Satarkly helps
            you decide whether to stop, verify, or stay careful.
          </Text>

          {renderMenu()}
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
          {currentScreen === 'history' && (
            <HistoryScreen
              history={history}
              onClearHistory={handleClearHistory}
              onDeleteHistoryItem={handleDeleteHistoryItem}
              onBackToCheck={() => openScreen('check')}
            />
          )}

          {currentScreen === 'safety' && (
            <SafetyTipsScreen onBackToCheck={() => openScreen('check')} />
          )}

          {currentScreen === 'about' && (
            <AboutScreen onBackToCheck={() => openScreen('check')} />
          )}

          {currentScreen === 'check' && renderCheckScreen()}
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
    marginBottom: 18,
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
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  tagline: {
    color: '#38bdf8',
    fontSize: 16,
    fontWeight: '800',
    marginTop: 5,
  },
  description: {
    color: '#cbd5e1',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 12,
  },
  menuButton: {
    backgroundColor: '#e2e8f0',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 13,
    marginTop: 3,
  },
  menuButtonText: {
    color: '#0f172a',
    fontSize: 13,
    fontWeight: '900',
  },
  menuCard: {
    backgroundColor: '#172033',
    borderColor: '#263449',
    borderWidth: 1,
    borderRadius: 18,
    padding: 8,
    marginTop: 14,
    gap: 8,
  },
  menuItem: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  menuIcon: {
    fontSize: 20,
    width: 28,
    textAlign: 'center',
  },
  menuTextBox: {
    flex: 1,
  },
  menuTitle: {
    color: '#0f172a',
    fontSize: 14,
    fontWeight: '900',
  },
  menuSubtitle: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
});