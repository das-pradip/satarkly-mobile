# Satarkly Mobile

Satarkly is an India-first scam detection mobile app that helps users check suspicious SMS, WhatsApp, Telegram, email, and online messages before clicking links, sharing OTP/PIN, installing unknown apps, or sending money.

The goal of Satarkly is simple:

> Help people pause, verify, and avoid harmful scam actions.

Satarkly is currently an Expo + React Native MVP with a rule-based scam detection engine, mobile-friendly UI, local scan history, feedback buttons, separate History/Safety/About screens, and privacy-first design.

---

## Why Satarkly?

Online scams are increasing through:

- Fake KYC messages
- OTP/PIN theft
- UPI refund traps
- Fake job offers
- Courier/parcel scams
- Digital arrest threats
- Fake investment promises
- Loan processing fee scams
- Electricity bill threats
- Fake customer support messages
- Urgent money request scams

Many users, especially non-technical users, need a simple tool that tells them:

1. Is this message risky?
2. Why should I be careful?
3. What should I do next?

Satarkly focuses on clear guidance instead of confusing technical reports.

---

## Why Not Just Use ChatGPT or Claude?

Users can paste a suspicious message into ChatGPT or Claude and ask whether it is a scam. But Satarkly is designed for a different purpose.

ChatGPT and Claude are general AI assistants. Satarkly is a focused scam-safety product.

Satarkly reduces friction for normal users by giving:

- One-tap scam risk guidance
- Simple red/orange/green result
- Clear safe action
- India-specific scam patterns
- Local device-based checking
- Privacy-first user experience
- Scan history and feedback
- Future share-to-check and screenshot-check workflows

ChatGPT/Claude flow:

User opens chat -> writes prompt -> pastes message -> reads explanation -> decides what to do.

Satarkly flow:

Paste or share message -> tap Check -> get Stop / Verify / Safe guidance.

Satarkly’s long-term direction is to become a scam-prevention workflow, not only a text analyzer.

Future advantages can include:

- WhatsApp share-to-Satarkly flow
- Screenshot/OCR scam check
- Regional scam alerts
- Family safety mode
- Link/domain risk checking
- Sender reputation hints
- Anonymized scam intelligence dashboard
- B2B fraud-detection API for banks, fintechs, and telecoms

---

## Current Features

### Scam Risk Detection

Satarkly classifies messages into three user-friendly risk levels:

| Result | Meaning | UI Color |
|---|---|---|
| High Scam Risk | Strong scam signals detected | Red |
| Suspicious | Warning signs detected; verify first | Orange |
| No Strong Scam Signal | No major scam pattern found | Green |

---

## Detection Categories

Current rule-based detection supports:

1. KYC Scam
2. OTP/PIN Scam
3. UPI Scam
4. Fake Job Scam
5. Courier/Parcel Scam
6. Digital Arrest Scam
7. Investment Scam
8. Loan App Scam
9. Electricity Bill Scam
10. Fake Customer Support Scam
11. General Suspicious Message
12. Safe Message

---

## Red Flag Detection

Satarkly checks for warning signals like:

- Urgency pressure
- OTP request
- UPI PIN / password / CVV request
- Suspicious links
- Fake authority claims
- Fake customer support
- Payment/fee requests
- Refund/cashback traps
- APK/app install requests
- Secrecy instructions
- Fake job fees
- Investment guarantee promises
- Loan processing fees
- Electricity disconnection threats
- Courier seizure threats
- Money request caution

---

## Money Request Caution

Satarkly handles money requests carefully.

Example:

Message: please send the money now

Result: Suspicious / Verify before sending

Reason:

A simple money request may be genuine, especially from family or friends. But scammers also use urgent money requests through hacked accounts or impersonation.

Dangerous money request combinations become high risk:

Money request + OTP/PIN/link/fake authority/APK/refund/secrecy -> High Scam Risk

Normal bank or UPI alerts remain safe:

UPI received Rs. 500. No action required. -> No Strong Scam Signal

---

## Privacy-First Design

Satarkly currently stores scan history only on the user’s device.

The app clearly tells users:

- Your checks stay private on this device.
- Satarkly never asks for OTP, PIN, password, CVV, or banking details.
- Satarkly gives risk guidance, not a 100% guarantee.
- Users should verify important messages through official apps or websites.

---

## Local Scan History

Satarkly saves recent checks locally using AsyncStorage.

Current behavior:

- Saves recent scan results on the device
- Stores risk result, score, message preview, time, and feedback
- Allows users to delete one history item
- Asks confirmation before deleting a single item
- Asks confirmation before clearing all history
- Allows clearing all history safely

---

## Feedback Buttons

After a result, users can mark:

- Correct
- Wrong
- Not sure

Current feedback is saved locally on the device. In future versions, anonymized feedback can help improve the detection engine after proper privacy and consent design.

---

## Share Result Feature

Satarkly allows users to share a scam-check result with family, friends, or groups.

Current share behavior:

- Shares risk level
- Shares scam category
- Shares score and confidence
- Shares top warning reasons
- Shares safe action
- Adds Satarkly safety disclaimer
- Excludes the original message by default for privacy
- Allows user to choose: Include original message Yes/No

This helps users warn others without exposing private message content by default.

---

## Copy What To Do Feature

Satarkly allows users to copy only the recommended safe action from a scan result.

This is useful when a user wants to quickly send simple advice to a family member, friend, or group without sharing the full scan report.

Current copy behavior:

- Copies only the “What you should do now” advice
- Does not copy the original suspicious message
- Does not copy score, category, or private message content
- Shows a confirmation after copying
- Helps users paste the advice into WhatsApp, SMS, notes, or any other app

Example:

If Satarkly says:

Do not share OTP, UPI PIN, ATM PIN, password, CVV, or verification code.

The user can tap:

Copy what to do

Then paste the advice wherever needed.

## Empty Input Validation

If the user clicks Check Message without pasting any message, Satarkly shows:

Please paste a message before checking.

It does not show a false green “safe” result and does not save empty checks to history.

---

## Mobile-Responsive UI

The UI is designed to work across:

- Mobile screens
- Tablet screens
- Desktop web preview

Current responsive improvements include:

- Centered max-width layout
- Compact privacy card
- Readable mobile history section
- Mobile-friendly input and buttons
- Clean result cards
- Scalable menu navigation

---

## App Screens

| Screen | Purpose |
|---|---|
| Check screen | Paste a message and scan scam risk |
| History screen | Review and delete saved scan history |
| Safety Tips screen | Learn simple scam safety rules |
| About screen | Understand what Satarkly does and does not do |

---

## Tech Stack

| Area | Technology |
|---|---|
| Mobile Framework | React Native |
| Development Platform | Expo |
| Language | TypeScript |
| Storage | AsyncStorage |
| UI | React Native StyleSheet |
| Testing Utility | tsx |
| Version Control | Git + GitHub |

---

## Project Structure

satarkly-mobile/
- App.tsx
- app.json
- package.json
- README.md
- src/
  - components/
    - AboutInfoCard.tsx
    - HistoryCard.tsx
    - MessageInputCard.tsx
    - PrivacyNoticeCard.tsx
    - ResultCard.tsx
    - SafetyHeroCard.tsx
    - SafetyTipCard.tsx
  - core/
    - detection/
    - rules/
  - data/
    - aboutSatarkly.ts
    - runDetectionTests.ts
    - safetyTips.ts
    - testMessages.ts
  - screens/
    - AboutScreen.tsx
    - HistoryScreen.tsx
    - SafetyTipsScreen.tsx
  - types/
  - utils/
- docs/
  - DETECTION_ENGINE.md
- assets/

---

## How Detection Works

Main detection flow:

User message  
-> Text normalization  
-> Language detection  
-> Red flag detection  
-> Risk scoring  
-> False-positive guard  
-> Category detection  
-> Explanation generation  
-> Safe action generation  
-> Final user result

Main engine file:

src/core/detection/scamDetectionEngine.ts

Detailed documentation:

docs/DETECTION_ENGINE.md

---

## Internal Test Dataset

Satarkly includes a small internal test dataset:

src/data/testMessages.ts

Current dataset:

- 30 total examples
- 10 scam
- 10 suspicious
- 10 safe

The goal is to prevent rule changes from breaking previous expected behavior.

---

## Run Detection Tests

Command:

npx tsx src/data/runDetectionTests.ts

Current internal result:

Passed: 30/30  
Accuracy: 100%

Important:

This means 100% accuracy only on the current internal 30-message test set. It does not mean real-world 100% scam detection accuracy.

---

## Run TypeScript Check

Command:

npx tsc --noEmit

---

## Run App on Web

Command:

npx expo start --web --clear

Then open the local web URL shown in the terminal.

Usually:

http://localhost:8081

---

## Run App with Expo Tunnel

Command:

npx expo start --tunnel --clear

Note:

If Expo Go on the phone does not support the same Expo SDK version as this project, mobile preview may show an incompatibility error. In that case, continue development on web preview and later create a proper Android build.

---

## Current Known Limitations

Satarkly is currently a rule-based MVP.

Known limitations:

- It depends on keywords and rules.
- It may miss new scam wording.
- It may struggle with unknown spelling variations.
- It does not yet analyze screenshots.
- It does not yet analyze full WhatsApp conversations.
- It does not yet verify sender identity.
- It does not yet check live URLs/domains.
- It does not yet use backend fraud intelligence.
- It does not yet use AI/ML models.
- It does not yet have Play Store production build setup.

---

## Roadmap

### Phase 1: MVP Foundation

- [x] Expo TypeScript app setup
- [x] GitHub repository setup
- [x] Rule-based scam detection engine
- [x] Red/orange/green result UI
- [x] False-positive guard
- [x] Money request caution logic
- [x] Local scan history
- [x] Feedback buttons
- [x] Privacy notice
- [x] Empty input validation
- [x] Mobile-responsive UI polish
- [x] Safe history deletion controls
- [x] Scalable menu navigation
- [x] Internal test runner

### Phase 2: Better Product Experience

- [x] Add separate History screen
- [x] Add Safety Tips screen
- [x] Add About Satarkly screen
- [x] Add dark/light mode support
- [x] Improve small-screen polish
- [x] Add share result feature
- [x] Add include-original-message privacy option for sharing
- [x] Add copy safe action feature
- [x] Add copy what to do button

### Phase 3: Data & Accuracy

- [ ] Expand internal test dataset to 100+ examples
- [ ] Add more Hindi, Bengali, Hinglish, and Bengali-English examples
- [ ] Add more safe genuine message examples
- [ ] Add false-positive-focused tests
- [ ] Add scam pattern versioning
- [ ] Add anonymized user feedback pipeline with consent

### Phase 4: Advanced Protection

- [ ] Screenshot OCR scam check
- [ ] Full chat analysis mode
- [ ] Link/domain risk checking
- [ ] Sender reputation hints
- [ ] Backend fraud intelligence
- [ ] AI-assisted explanation layer

### Phase 5: Release

- [ ] App icon and splash polish
- [ ] Privacy policy
- [ ] Terms and safety disclaimer
- [ ] Android development build
- [ ] Play Store internal testing
- [ ] Closed testing
- [ ] Production release

---

## Safety Disclaimer

Satarkly is a risk-guidance tool. It does not guarantee that every scam will be detected or that every safe message will be classified correctly.

Users should always:

- Avoid sharing OTP, PIN, password, CVV, or banking details
- Avoid clicking unknown links
- Avoid installing unknown APKs/apps
- Verify money requests by calling trusted saved numbers
- Verify important messages through official apps or websites

---

## Founder Vision

Satarkly is not only a scam checker.

It is being built as a trust-first scam prevention system for Indian users.

The mission is to reduce scam harm by helping people pause, verify, and avoid harmful scam actions.