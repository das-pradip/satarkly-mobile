# Satarkly Detection Engine

Satarkly is an India-first scam detection app that helps users check suspicious SMS, WhatsApp, and online messages before clicking links, sharing OTP/PIN, installing unknown apps, or sending money.

The current detection engine is a rule-based MVP designed to work offline and give fast risk guidance.

> Important: Satarkly gives scam-risk guidance, not a 100% real-world guarantee.

---

## 1. Purpose of the Detection Engine

The detection engine is the brain of Satarkly.

Its job is to answer three simple user questions:

1. Is this message dangerous?
2. Why should I be careful?
3. What should I do next?

The engine should not scare users unnecessarily. It should guide users clearly with three possible results:

| Result | Meaning |
|---|---|
| High Scam Risk | The message has strong scam signals. User should stop immediately. |
| Suspicious | The message has warning signs. User should verify carefully. |
| No Strong Scam Signal | No major scam pattern found, but user should still stay careful. |

---

## 2. Current Detection Flow

When a user pastes a message, Satarkly processes it step by step.

```txt
User message
↓
Text normalization
↓
Language detection
↓
Red flag detection
↓
Risk score calculation
↓
False-positive guard
↓
Scam category detection
↓
Explanation generation
↓
Safe action generation
↓
Final result shown to user

Main function:

analyzeMessage({ message })

File location:

src/core/detection/scamDetectionEngine.ts

3. Main Output Structure

Every scan returns one structured result.

This keeps the app scalable because UI, history, feedback, backend, and future AI features can all use the same structure.

{
  originalMessage: string;
  cleanedMessage: string;
  language: Language;
  label: 'scam' | 'suspicious' | 'safe';
  riskLevel: 'High Scam Risk' | 'Suspicious' | 'No Strong Scam Signal';
  riskScore: number;
  category: ScamCategory;
  redFlags: RedFlag[];
  explanation: string;
  safeAction: string;
  confidence: 'Low' | 'Medium' | 'High';
}

Defined in:

src/types/detection.types.ts
4. Risk Levels

Satarkly uses score-based risk levels.

Score Range	Label	User Result	UI Color
0–29	safe	No Strong Scam Signal	Green
30–59	suspicious	Suspicious	Orange
60–100	scam	High Scam Risk	Red

This design is user-friendly because non-technical users can understand colors quickly.

Red means stop.
Orange means verify.
Green means no strong scam sign found.

Defined in:

src/core/rules/riskWeights.ts
5. Red Flag Detection

Satarkly checks messages for scam warning signals.

Current red flags include:

Red Flag	Meaning
urgency	Message pressures user to act quickly
account_blocked_threat	Threatens account/service blocking
otp_request	Asks for OTP or verification code
pin_request	Asks for UPI PIN, ATM PIN, password, or CVV
suspicious_link	Contains or asks user to open a link
fake_authority	Pretends to be police, court, RBI, CBI, customs, etc.
payment_request	Asks user to pay, transfer, deposit, or approve money
refund_trap	Uses refund/cashback/collect request trap
job_registration_fee	Asks money for job registration/joining/training
fake_verification	Asks for unsafe or unclear verification
apk_download	Asks user to install unknown app/APK
too_good_to_be_true	Promises unrealistic reward/profit/job income
fear_pressure	Uses fear, legal threat, penalty, arrest, or blacklist
secrecy_instruction	Tells user not to tell anyone or stay on call
fake_customer_support	Pretends to be support/customer care
identity_threat	Claims Aadhaar/PAN/bank identity is linked to fraud
loan_processing_fee	Asks processing fee before loan release
investment_guarantee	Promises guaranteed investment return
electricity_disconnection_threat	Threatens electricity disconnection
courier_seizure_threat	Claims parcel/courier is seized or linked to crime

Rule file:

src/core/rules/redFlags.ts

Detector file:

src/core/detection/redFlagDetector.ts
6. Risk Scoring

Each red flag has a score weight.

Examples:

Signal	Why risky
OTP request	Genuine banks/support agents should not ask for OTP
PIN/password request	Very dangerous because it can lead to direct financial loss
Suspicious link	May lead to phishing or malware
APK download	May install harmful apps
Fake authority	Used in digital arrest and courier scam patterns
Payment request	Scam often ends in money transfer
Refund trap	Users are tricked into approving UPI collect requests

The engine adds:

base score from red flags
+
bonus score from dangerous combinations
+
small adjustment for weak suspicious cases
-
false-positive reduction for normal safe messages

Files:

src/core/rules/riskWeights.ts
src/core/detection/riskScorer.ts
7. Combination Rules

Some red flags become much more dangerous when they appear together.

Examples:

Combination	Meaning
OTP request + urgency	Strong scam pattern
PIN request + refund trap	UPI refund scam pattern
APK download + suspicious link	Malware/social-engineering risk
Fake authority + fear pressure + secrecy	Digital arrest pattern
Fake authority + courier story + secrecy	Courier/digital arrest hybrid pattern
Investment guarantee + payment request	Investment scam
Job fee + unrealistic earning promise	Fake job scam

Combination rules are defined in:

src/core/rules/riskWeights.ts
8. False-Positive Guard

False positives are dangerous because genuine messages are important.

If Satarkly wrongly marks genuine messages as scam, users may stop trusting the app.

The false-positive guard reduces risk score when a message looks like a normal safe notification.

Examples of safe message patterns:

Safe Pattern	Example
UPI received alert	UPI received Rs. 500. No action required.
Delivery confirmation	Your order has been delivered.
Appointment reminder	Your appointment is scheduled tomorrow.
Official app guidance	Open official app to view statement.
Support ticket update	Your support ticket has been created.
Electricity payment confirmation	Your electricity bill payment was successful.

Important idea:

UPI + money words alone should not always mean scam.
Bank/payment words alone should not always mean scam.
Delivery/courier words alone should not always mean scam.

False-positive file:

src/core/detection/falsePositiveGuard.ts
9. Scam Category Detection

Satarkly currently detects these categories:

KYC Scam
OTP/PIN Scam
UPI Scam
Fake Job Scam
Courier/Parcel Scam
Digital Arrest Scam
Investment Scam
Loan App Scam
Electricity Bill Scam
Fake Customer Support Scam
General Suspicious Message
Safe Message

Category detection file:

src/core/detection/categoryDetector.ts

Current note:

Some safe messages may still be categorized as a scam category internally because category detection is keyword-based. The user-facing risk level is more important than the internal category.

Future improvement:

Category detection should depend more strongly on final risk level and red flag combinations.
10. Language Detection

Satarkly currently uses simple script and keyword-based language detection.

Supported labels:

English
Hinglish
Hindi
Bengali
Bengali-English
Hindi-English
Unknown

Language detection file:

src/core/detection/languageDetector.ts

Current limitation:

This is a basic MVP detector. It can be improved later using better NLP, AI, or backend language detection.

11. Explanation Generation

Satarkly should not only show a score.

It should explain the result in simple words.

Example:

This message has high scam risk because it asks for OTP, creates urgency, and contains a suspicious link.

Why this matters:

Builds user trust
Helps users learn scam patterns
Makes the result understandable for parents, students, job seekers, and non-technical users
Reduces blind fear

Explanation file:

src/core/detection/explanationGenerator.ts
12. Safe Action Generation

Every result should tell the user what to do next.

Examples:

Category	Safe Action
KYC Scam	Open official bank/service app directly. Do not click message links.
OTP/PIN Scam	Never share OTP, PIN, password, CVV, or verification code.
UPI Scam	Do not approve collect requests to receive money.
Digital Arrest Scam	Stop replying, save screenshots, contact official authorities.
Fake Job Scam	Do not pay registration/training/joining fees.
Courier Scam	Check delivery only through official courier website/app.
Electricity Scam	Check bill only through official electricity board app/site.
Investment Scam	Avoid guaranteed-return promises.
Loan App Scam	Do not pay processing fee before verified loan disbursal.
Fake Support Scam	Use customer care only from official app/website.

Safe action generation is also handled in:

src/core/detection/explanationGenerator.ts
13. UI Design Logic

Current UI shows three visual states:

Risk Level	Color	User Meaning
High Scam Risk	Red	Stop immediately
Suspicious	Orange	Verify carefully
No Strong Scam Signal	Green	No major sign found

The user-facing screen should prioritize:

Result
Simple summary
Why Satarkly says this
What user should do now
Extra details only if needed

Developer-style information should be reduced for normal users.

Current app UI file:

App.tsx

Future improvement:

Move UI into reusable components:

src/components/
src/screens/
14. Internal Test Dataset

Satarkly includes an internal test dataset.

File:

src/data/testMessages.ts

Current dataset size:

30 total examples
10 scam examples
10 suspicious examples
10 safe examples

Purpose:

Check whether scam messages become red
Check whether suspicious messages become orange
Check whether safe messages stay green
Prevent future rule changes from breaking old behavior
15. Test Runner

The test runner compares expected labels with actual detection results.

File:

src/data/runDetectionTests.ts

Run command:

npx tsx src/data/runDetectionTests.ts

Current internal result:

Passed: 30/30
Accuracy: 100%

Important:

This means 100% accuracy only on the current small internal test set.
It does not mean real-world 100% accuracy.
16. Current Strengths

The current MVP detection engine handles:

KYC + OTP + urgency + link scams
UPI refund + PIN trap
fake job fee scam
courier/customs parcel scam
digital arrest-style fear and secrecy
investment guarantee scam
loan processing fee scam
electricity disconnection scam
fake customer support + remote app scam
weak suspicious verification/update messages
safe delivery messages
safe UPI received alerts
safe appointment reminders
safe bank statement messages
safe support ticket messages
17. Current Limitations

This is still an MVP.

Known limitations:

It depends on keyword and rule matching.
It may miss new scam wording.
It may struggle with spelling variations not included in rules.
It does not yet use real user feedback.
It does not yet use AI or ML models.
It does not yet analyze screenshots.
It does not yet analyze full WhatsApp conversations.
It does not yet connect to backend fraud intelligence.
It does not yet support all Indian languages.
It does not yet verify sender reputation, links, phone numbers, or domains.
It does not yet perform OCR.
It does not yet have Play Store-ready privacy flow.
18. Accuracy Principle

Satarkly should never claim:

This is 100% scam.

Satarkly should say:

High Scam Risk
Suspicious
No Strong Scam Signal

Why:

Scam detection can be wrong.
Genuine messages can look suspicious.
Scam patterns evolve.
Users should still verify from official sources.

Product goal:

Help users pause, verify, and avoid harmful actions.
19. Safety Principle

Satarkly must never ask users to submit or share:

OTP
UPI PIN
ATM PIN
Password
CVV
Full bank account number
Full card number
Aadhaar/PAN details
Net banking credentials
Private identity documents

If future versions collect user-submitted examples, the system should anonymize:

phone numbers
links
UPI IDs
account numbers
names
addresses
personal identifiers

User trust is the most important asset.

20. Data Strategy

The Excel dataset is not directly used inside the MVP app yet.

Current data flow:

Excel dataset
↓
Rule design and testing ideas
↓
TypeScript rules
↓
Internal test dataset
↓
Detection engine
↓
User result

Why the Excel file matters:

Helps identify scam categories
Helps define red flags
Helps create safe/suspicious/scam examples
Helps prevent false positives
Helps prepare future ML/backend work

Future data flow:

User-submitted examples with consent
↓
Anonymization
↓
Human review
↓
Labeled dataset
↓
Rule improvement / ML training
↓
Better detection
21. Future Improvements

Planned next improvements:

Expand internal test dataset from 30 to 100+ examples.
Add more Bengali, Hindi, Hinglish, and regional scam examples.
Add full-chat analysis mode.
Add screenshot OCR mode.
Add local scan history.
Add feedback buttons: Correct, Wrong, Not Sure.
Add privacy screen.
Add backend for anonymized user-submitted examples.
Add AI explanation layer.
Add admin dashboard for scam-pattern monitoring.
Add B2B fraud-detection API later.
Add Play Store privacy policy and production build process.
22. Developer Rules

When improving the detection engine:

Do not hardcode result directly in UI.
Keep rules inside src/core/rules.
Keep detection logic inside src/core/detection.
Keep reusable types inside src/types.
Add test messages before changing major logic.
Run TypeScript check before pushing.
Run detection tests before pushing.
Avoid making one keyword too broad.
Protect safe/genuine messages from false positives.
Never claim real-world 100% accuracy.

Required commands before commit:

npx tsc --noEmit
npx tsx src/data/runDetectionTests.ts
23. Current Commands

Run app in web:

npx expo start --web --clear

Run TypeScript check:

npx tsc --noEmit

Run detection tests:

npx tsx src/data/runDetectionTests.ts

Push changes:

git status
git add .
git commit -m "Meaningful commit message"
git push
24. Founder-Level Product Reminder

Satarkly is not only a scam checker UI.

It is becoming:

A trust-first scam prevention system for Indian users.

The app should help people before they:

click a suspicious link
share OTP/PIN
install a harmful app
approve UPI request
pay fake fees
panic because of fake authority threats

The first goal is trust and protection.

Profit, B2B API, fintech/bank/telco integrations, and investor pitching should come after real usage and user trust.