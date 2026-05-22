import { analyzeMessage } from '../core/detection/scamDetectionEngine';
import { TEST_MESSAGES } from './testMessages';

const results = TEST_MESSAGES.map((test) => {
  const analysis = analyzeMessage({ message: test.message });
  const passed = analysis.label === test.expectedLabel;

  return {
    id: test.id,
    passed,
    expected: test.expectedLabel,
    actual: analysis.label,
    riskLevel: analysis.riskLevel,
    riskScore: analysis.riskScore,
    category: analysis.category,
    note: test.note,
  };
});

const passedCount = results.filter((result) => result.passed).length;
const totalCount = results.length;
const accuracy = Math.round((passedCount / totalCount) * 100);

console.log('Satarkly Detection Test Report');
console.log('================================');
console.log(`Passed: ${passedCount}/${totalCount}`);
console.log(`Accuracy: ${accuracy}%`);
console.log('');

results.forEach((result) => {
  const status = result.passed ? 'PASS' : 'FAIL';

  console.log(
    `${status} | ${result.id} | expected=${result.expected} | actual=${result.actual} | score=${result.riskScore} | ${result.riskLevel} | ${result.category}`
  );

  if (!result.passed) {
    console.log(`  Note: ${result.note}`);
  }
});
