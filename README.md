# 🌌 AstroLogic AI

AstroLogic AI is a full-stack astrology prediction platform that blends **Vedic Astrology + Numerology (Moolank & Bhagyank)** with modern AI to deliver personalized insights on personality, career, love, and growth.

## 🚀 Features

### 1. ⚡ Real-time AI Predictions

Get instant, human-friendly insights powered by Google Gemini. Every prediction is tailored to your birth details.

### 2. 🔢 Vedic & Numerology Engine

Automatically calculates **Moolank** and **Bhagyank** to provide deeper personality and life-path insights.

### 3. 📜 Session History

Revisit past readings anytime using the History Sidebar and reload them instantly.

### 4. 📥 Downloadable Reports

Export predictions as high-quality PNG images using html2canvas for easy sharing.

### 5. 🎨 Cosmic UI/UX

* 🌗 Light & Dark mode support
* ✨ Interactive starfield background
* 📱 Fully responsive (Tailwind CSS)

## 🤖 AI Integration

Uses **Google Gemini 2.5 Pro API** as a digital astrologer.

* ✍️ Structured prompts for consistent, JSON-based output
* 🔐 API key secured using `.env`

## 🔢 Calculation Logic

* **Moolank:** Core personality (from birth date)
* **Bhagyank:** Life path (from full DOB)
* **Rashi Insights:** Sun & Moon positions for emotional and career traits

## 📸 How It Works

1. 🌠 Enter details (zodiac updates in real-time)
2. ⚙️ AI processes astrology + numerology
3. 🔮 View results in 4 sections: Personality, Career, Love, Improvement
4. 💾 Save via history or download as image

## 🛠️ Tech Stack

* 💻 Frontend: HTML5, Tailwind CSS, JavaScript (ES6+), Flatpickr, html2canvas.
* ⚙️ Backend: Node.js, Express.js
* 🤖 AI: Google Generative AI (Gemini API).
* 🚀 Deployment: Netlify (using Serverless Functions).

## 🛠️ Setup Instructions

1. Clone the repo
2. Open .env.example, paste your Gemini API key, rename it to .env and save it!
3. Run `npm install`
4. Start with `npm start` or deploy to Netlify
