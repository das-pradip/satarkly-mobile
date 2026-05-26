import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useAppTheme } from '../theme/ThemeContext';

interface ScreenHeaderProps {
  title: string;
  subtitle: string;
  onBack: () => void;
}

export function ScreenHeader({ title, subtitle, onBack }: ScreenHeaderProps) {
  const { colors, mode } = useAppTheme();

  const titleColor = mode === 'dark' ? '#ffffff' : '#0f172a';
  const subtitleColor = mode === 'dark' ? '#cbd5e1' : '#334155';

  return (
    <View style={styles.headerRow}>
      <View style={styles.headerTextBox}>
        <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: subtitleColor }]}>
          {subtitle}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.backButton, { backgroundColor: colors.buttonBackground }]}
        onPress={onBack}
      >
        <Text style={[styles.backButtonText, { color: colors.buttonText }]}>
          Back
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  headerTextBox: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 21,
    marginTop: 6,
    fontWeight: '600',
  },
  backButton: {
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  backButtonText: {
    fontSize: 13,
    fontWeight: '900',
  },
});
