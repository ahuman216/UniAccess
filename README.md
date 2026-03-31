# UniAccess — Accessibility Web Application

**Removing Communication & Perception Barriers for Individuals with Hearing and Vision Disabilities**

---

## Quick Start

```bash
# 1. Clone / unzip the project
cd uniacccess

# 2. Create and activate a virtual environment
python3 -m venv venv
source venv/bin/activate        # macOS/Linux
venv\Scripts\activate           # Windows

# 3. Install dependencies
pip install -r requirements.txt

# 4. Run the development server
python app.py
# → Open http://127.0.0.1:5000 in your browser
```

### Production (Gunicorn)
```bash
gunicorn -w 4 -b 0.0.0.0:8000 app:app
```

---

## Project Structure

```
uniacccess/
├── app.py                      # Flask routes
├── requirements.txt
├── README.md
├── static/
│   ├── css/
│   │   └── main.css            # All styles — WCAG 2.1 AA
│   └── js/
│       └── settings.js         # Global settings manager (localStorage)
└── templates/
    ├── base.html               # Base layout: skip link, ARIA landmarks, nav
    ├── index.html              # Home page
    ├── caption.html            # LiveSpeak — Speech-to-Text
    ├── read.html               # ReadAssist — Text Transformation + TTS
    ├── vision.html             # VisionSense — Camera Detection
    ├── alerts.html             # SafeAlert — Multimodal Notifications
    ├── settings.html           # Accessibility Control Panel
    └── about.html              # Impact, ethics, WCAG compliance
```

---

## Features

### 1. LiveSpeak — Real-Time Speech-to-Text Captioning
**Route:** `/caption`  
**Audience:** Deaf and hard-of-hearing users  
**Technology:** Web Speech API (`SpeechRecognition`)

- Converts live speech to on-screen captions in real time
- Adjustable font size (1–3rem slider)
- Colour modes: Default / High Contrast / Dark
- Optional speaker labeling
- Language selection (7 languages)
- Vibration alert when speech detected
- Copy captions to clipboard

**Accessibility Benefit:** Allows students and professionals with hearing impairments to follow conversations and lectures without relying on an interpreter.

---

### 2. ReadAssist — Accessible Text Transformation
**Route:** `/read`  
**Audience:** Low vision, dyslexia, reading difficulties  
**Technology:** CSS transforms + Web Speech API (`SpeechSynthesis`)

- Paste or type any text
- Display modes: Default / Large Print / High Contrast / Dyslexia Friendly
- Adjustable font size and line spacing
- Read aloud with selectable voice, speed (0.5–2×), and pitch
- Pause / Resume / Stop controls

**Accessibility Benefit:** Removes barriers created by small fonts, poor contrast, and reading fatigue. TTS allows eyes-free access to written content.

---

### 3. VisionSense — Camera-Based Object & Text Recognition
**Route:** `/vision`  
**Audience:** Blind and low-vision users  
**Technology:** Camera API + simulated Vision AI (Tesseract.js-ready)

- Live camera feed with start/stop controls
- Manual and auto-detect (every 3 seconds)
- Simulated object and printed-text detection
- Spoken audio feedback with directional guidance (left / centre / right)
- All results announced via `aria-live` for screen readers

> **TODO:** Replace `simulateDetection()` with a real `Tesseract.js` OCR call or a server-side Vision API endpoint for production use.

**Accessibility Benefit:** Increases independence for vision-impaired users navigating unfamiliar environments.

---

### 4. SafeAlert — Multimodal Notifications & Emergency Alerts
**Route:** `/alerts`  
**Audience:** Deaf, blind, and all users  
**Technology:** Vibration API + SpeechSynthesis + CSS animation

- Emergency alert: screen flash + vibration pattern + audio + text banner
- General notification: gentle text + single vibration + audio
- Custom message sender
- Each channel individually togglable
- Flash limited to ≤ 3 per second (WCAG 2.3.1 compliant)
- `prefers-reduced-motion` supported

**Accessibility Benefit:** Traditional alarms rely on sound alone. SafeAlert reaches every user through multiple simultaneous channels.

---

### 5. Accessibility Control Panel
**Route:** `/settings`  
**Audience:** All users

- Base font size (12–36px)
- Font style: Default (Atkinson Hyperlegible) / Dyslexia Friendly
- Colour theme: Light / Dark / High Contrast
- TTS speed and pitch defaults
- Output channel toggles (audio, vibration, screen flash)
- Feature enable/disable switches
- Saved to `localStorage` — no server round-trip, no personal data

---

## Accessibility Compliance

| Criterion | Implementation |
|-----------|---------------|
| WCAG 2.1 AA | All pages designed to meet Level AA |
| Keyboard navigation | All interactive elements focusable via Tab; custom focus rings |
| Screen reader | ARIA landmarks, labels, `aria-live`, `aria-pressed`, `role` attributes |
| Colour contrast | ≥ 4.5:1 for all text/background pairs (verified) |
| Focus indicators | 3px solid, high-contrast, never hidden for keyboard users |
| Seizure safety | Flash animations ≤ 3/sec; `prefers-reduced-motion` respected |
| Heading structure | Proper h1 → h4 hierarchy on every page |
| Touch targets | Minimum 48px height on all buttons |
| Skip link | First focusable element on every page targets `#main-content` |
| Alt text | All icons are `aria-hidden`; meaningful content has accessible labels |

---

## Privacy & Ethics

- ✅ Zero personal data collected or stored
- ✅ Zero advertisements
- ✅ Zero analytics or tracking
- ✅ All preferences stored in browser `localStorage` only
- ✅ No login or account required
- ✅ School-appropriate content throughout

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Python 3.11+ / Flask 3.x |
| Frontend | HTML5 / CSS3 (custom) / Bootstrap 5.3 |
| Icons | Bootstrap Icons 1.11 |
| Fonts | Atkinson Hyperlegible + Space Grotesk (Google Fonts) |
| Speech | Web Speech API (SpeechRecognition + SpeechSynthesis) |
| Camera | MediaDevices API |
| Haptics | Vibration API |
| Preferences | localStorage |
| Deployment | Gunicorn-compatible |

---

## Browser Support

| Browser | LiveSpeak | ReadAssist TTS | VisionSense | SafeAlert |
|---------|-----------|---------------|-------------|-----------|
| Chrome 90+ | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| Edge 90+ | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| Firefox | ⚠️ No SpeechRecognition | ✅ Full | ✅ Full | ✅ Full |
| Safari 15+ | ⚠️ Limited | ✅ Full | ✅ Full | ✅ Full |

---

## Future Enhancements (TODOs)

- Integrate `Tesseract.js` for real client-side OCR in VisionSense
- Add Whisper API server-side transcription fallback for browsers without SpeechRecognition
- Sign language recognition via MediaPipe Hands
- Braille output support (WebUSB API for connected Braille displays)
- Multi-user session for classroom captioning with speaker labeling
- Offline PWA mode (Service Worker)

---

*Built with empathy. Designed for everyone.*
