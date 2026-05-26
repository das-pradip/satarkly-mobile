import { View } from 'react-native';

import { SafetyHeroCard } from '../components/SafetyHeroCard';
import { SafetyTipCard } from '../components/SafetyTipCard';
import { ScreenHeader } from '../components/ScreenHeader';
import { SAFETY_TIPS } from '../data/safetyTips';

interface SafetyTipsScreenProps {
  onBackToCheck: () => void;
}

export function SafetyTipsScreen({ onBackToCheck }: SafetyTipsScreenProps) {
  return (
    <View>
      <ScreenHeader
        title="Safety Tips"
        subtitle="Simple rules to protect yourself and your family from common scams."
        onBack={onBackToCheck}
      />

      <SafetyHeroCard />

      {SAFETY_TIPS.map((tip) => (
        <SafetyTipCard key={tip.id} tip={tip} />
      ))}
    </View>
  );
}
