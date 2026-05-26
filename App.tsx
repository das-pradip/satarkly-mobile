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
import { ThemeProvider, useAppTheme } from './src/theme/ThemeContext';
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

function SatarklyApp() {
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
  const { colors, mode, toggleTheme } = useAppTheme();

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
      <View
        style={[
          styles.menuCard,
          {
            backgroundColor: colors.brandSoft,
            borderColor: colors.border,
          },
        ]}
      >
        <TouchableOpacity
          style={[styles.menuItem, { backgroundColor: colors.cardBackground }]}
          onPress={() => openScreen('safety')}
        >
          <Text style={styles.menuIcon}>🛡️</Text>
          <View style={styles.menuTextBox}>
            <Text style={[styles.menuTitle, { color: colors.primaryText }]}>
              Safety Tips
            </Text>
            <Text style={[styles.menuSubtitle, { color: colors.mutedText }]}>
              Learn common scam safety rules
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuItem, { backgroundColor: colors.cardBackground }]}
          onPress={() => openScreen('history')}
        >
          <Text style={styles.menuIcon}>🕘</Text>
          <View style={styles.menuTextBox}>
            <Text style={[styles.menuTitle, { color: colors.primaryText }]}>
              Scan History
            </Text>
            <Text style={[styles.menuSubtitle, { color: colors.mutedText }]}>
              Review checks saved on this device
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuItem, { backgroundColor: colors.cardBackground }]}
          onPress={() => openScreen('about')}
        >
          <Text style={styles.menuIcon}>ℹ️</Text>
          <View style={styles.menuTextBox}>
            <Text style={[styles.menuTitle, { color: colors.primaryText }]}>
              About Satarkly
            </Text>
            <Text style={[styles.menuSubtitle, { color: colors.mutedText }]}>
              Understand what Satarkly does
            </Text>
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
              <Text
                style={[
                  styles.appName,
                  { color: mode === 'dark' ? '#ffffff' : '#0f172a' },
                ]}
              >
                Satarkly
              </Text>
              <Text style={[styles.tagline, { color: colors.brand }]}>
                Check before you click.
              </Text>
            </View>

            <View style={styles.headerActionRow}>
              <TouchableOpacity
                style={[
                  styles.themeToggleButton,
                  {
                    backgroundColor: colors.buttonBackground,
                    borderColor: colors.border,
                  },
                ]}
                onPress={toggleTheme}
              >
                <Text style={styles.themeToggleIcon}>
                  {mode === 'dark' ? '☀️' : '🌙'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.menuButton,
                  { backgroundColor: colors.buttonBackground },
                ]}
                onPress={() => setIsMenuOpen((currentValue) => !currentValue)}
              >
                <Text style={[styles.menuButtonText, { color: colors.buttonText }]}>
                  {isMenuOpen ? 'Close' : '☰ Menu'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text
            style={[
              styles.description,
              { color: mode === 'dark' ? '#cbd5e1' : '#334155' },
            ]}
          >
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
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.appBackground }]}
    >
      <StatusBar barStyle={mode === 'dark' ? 'light-content' : 'dark-content'} />

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

export default function App() {
  return (
    <ThemeProvider>
      <SatarklyApp />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
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
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  tagline: {
    fontSize: 16,
    fontWeight: '800',
    marginTop: 5,
  },
  description: {
    fontSize: 14,
    lineHeight: 21,
    marginTop: 12,
  },
  headerActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 3,
  },
  themeToggleButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  themeToggleIcon: {
    fontSize: 18,
  },
  menuButton: {
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 13,
  },
  menuButtonText: {
    fontSize: 13,
    fontWeight: '900',
  },
  menuCard: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 8,
    marginTop: 14,
    gap: 8,
  },
  menuItem: {
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
    fontSize: 14,
    fontWeight: '900',
  },
  menuSubtitle: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
});