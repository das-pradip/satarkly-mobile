# Satarkly Mobile

Satarkly is an India-first scam detection mobile app that helps users check suspicious SMS, WhatsApp, Telegram, email, and online messages before clicking links, sharing OTP/PIN, installing unknown apps, or sending money.

The goal of Satarkly is simple:

> Help people pause, verify, and avoid harmful scam actions.

Satarkly is currently an Expo + React Native MVP with a rule-based scam detection engine, mobile-friendly UI, local scan history, feedback buttons, and privacy-first design.

---

## Why Satarkly?

Online scams are increasing through:

- fake KYC messages
- OTP/PIN theft
- UPI refund traps
- fake job offers
- courier/parcel scams
- digital arrest threats
- fake investment promises
- loan processing fee scams
- electricity bill threats
- fake customer support messages
- urgent money request scams

Many users, especially non-technical users, need a simple tool that tells them:

1. Is this message risky?
2. Why should I be careful?
3. What should I do next?

Satarkly focuses on clear guidance instead of confusing technical reports.

---

---

## Why Not Just Use ChatGPT or Claude?

Users can paste a suspicious message into ChatGPT or Claude and ask whether it is a scam. But Satarkly is designed for a different purpose.

ChatGPT and Claude are general AI assistants. Satarkly is a focused scam-safety product.

Satarkly aims to reduce friction for normal users by giving:

- one-tap scam risk guidance
- simple red/orange/green result
- clear safe action
- India-specific scam patterns
- local device-based checking
- privacy-first user experience
- scan history and feedback
- future share-to-check and screenshot-check workflows

The goal is not to replace general AI tools. The goal is to give users a fast, simple, and trusted scam-checking experience when they are under pressure.

Example:

```txt
ChatGPT/Claude:
User must open chat → write prompt → paste message → read explanation → decide what to do.

Satarkly:
Paste or share message → tap Check → get Stop / Verify / Safe guidance.

## Current Features

### Scam Risk Detection

Satarkly classifies messages into three user-friendly risk levels:

| Result | Meaning | UI Color |
|---|---|---|
| High Scam Risk | Strong scam signals detected | Red |
| Suspicious | Warning signs detected; verify first | Orange |
| No Strong Scam Signal | No major scam pattern found | Green |

---

### Detection Categories

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

### Red Flag Detection

Satarkly checks for warning signals like:

- urgency pressure
- OTP request
- UPI PIN / password / CVV request
- suspicious links
- fake authority claims
- fake customer support
- payment/fee requests
- refund/cashback traps
- APK/app install requests
- secrecy instructions
- fake job fees
- investment guarantee promises
- loan processing fees
- electricity disconnection threats
- courier seizure threats
- money request caution

---

### Money Request Caution

Satarkly handles money requests carefully.

Simple money request:

```txt
please send the money now
→ Suspicious / Verify before sending
Money request + OTP/PIN/link/fake authority/APK/refund/secrecy
→ High Scam Risk
UPI received Rs. 500. No action required.
→ No Strong Scam Signal