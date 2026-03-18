# 🌌 AstroLogic AI

<p>
  <img src="https://img.shields.io/badge/HTML-5-22c55e?style=flat-square&logo=html5&logoColor=white"/>
  <img src="https://img.shields.io/badge/TailwindCSS-4ade80?style=flat-square&logo=tailwindcss&logoColor=white"/>
  <img src="https://img.shields.io/badge/JavaScript-86efac?style=flat-square&logo=javascript&logoColor=black"/>
  <img src="https://img.shields.io/badge/Node.js-16a34a?style=flat-square&logo=node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express-65a30d?style=flat-square"/>
  <img src="https://img.shields.io/badge/Gemini-AI-22c55e?style=flat-square"/>
  <img src="https://img.shields.io/badge/Netlify-10b981?style=flat-square&logo=netlify&logoColor=white"/>
</p>

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
2. Open `.env.example`, paste your Gemini API key, rename it to `.env` and save it!
3. Run `npm install`
4. Start with `npm start` or deploy to Netlify

## 📸 Screenshots

### 🌠 Landing Page

![Landing](/screenshots/screenshot-1.png)
*Clean, cosmic-themed entry screen where users input their birth details and see real-time zodiac updates.*

### ⚙️ AI Processing

![Processing](/screenshots/screenshot-2.png)
*A smooth loading state where the system processes Vedic astrology and numerology using Gemini AI.*

### 🔮 Predictions Output + Download Results

![Results](/screenshots/screenshot-3.png)
*Displays personalized insights (Personality, Career, Love, Improvement) with an option to download results as a high-quality PNG.*

### 📜 Session History

![History](/screenshots/screenshot-4.png)
*Sidebar feature that stores and reloads previous predictions within the session.*

### 📱 Mobile View

![Mobile](/screenshots/screenshot-5.png)
*Fully responsive design optimized for mobile devices with a seamless user experience.*

### 🌗 Light Mode

![Light Mode](/screenshots/screenshot-6.png)
*Clean and minimal light theme for better readability and user preference.*

