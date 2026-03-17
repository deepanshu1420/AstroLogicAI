const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/predict', async (req, res) => {
    try {
        const { name, dob, time, location } = req.body;

        // Simplified model initialization (removed the crashing config)
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
You are an experienced Indian astrologer (pandit style) who explains things in simple, clear, human-friendly English.

You combine:
- Vedic astrology (Rashi-based understanding, but explain in English)
- Indian numerology (Moolank and Bhagyank)

User Details:
- Name: ${name}
- Date of Birth: ${dob}
- Time of Birth: ${time}
- Place of Birth: ${location}

Instructions:
- Speak in very simple, natural English (no difficult or heavy words)
- Focus only on important insights (no extra explanation)
- Keep a warm, personal tone like a real astrologer giving advice
- You may lightly include Indian terms like "Moolank", "Bhagyank", "Rashi" where relevant
- Avoid pure Hindi sentences
- Avoid complex or formal English
- Keep sentences short and easy to understand
- Make it feel like you are talking directly to the person

Numerology:
- Calculate Moolank and Bhagyank internally
- Use them for insights but do NOT explain calculations

IMPORTANT:
- Return ONLY valid JSON (no extra text)
- No markdown
- Each section must have exactly 4 short bullet points
- Each point = 1 simple sentence
- Avoid generic lines

Output format:
{
  "personality": [
    "Simple human-friendly insight",
    "Behavior pattern",
    "Strength",
    "How others see them"
  ],
  "career": [
    "Career tendency",
    "Work style",
    "Challenge",
    "Advice"
  ],
  "love": [
    "Emotional nature",
    "Relationship strength",
    "Common issue",
    "Advice"
  ],
  "improvements": [
    "Habit to improve",
    "Wrong pattern",
    "Mindset shift",
    "Practical advice"
  ]
}
`;

        const result = await model.generateContent(prompt);
        let text = result.response.text();
        
        // This prints what Gemini says to your terminal so we can see it working
        console.log("Raw API Response:", text);

        // Our safety net cleans up any extra formatting Gemini might add
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        const jsonData = JSON.parse(text);
        res.json(jsonData);

    } catch (error) {
        console.error("CRITICAL ERROR:", error);
        res.status(500).json({ error: "The stars are clouded right now. Please try again later." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Astrology Server running on http://localhost:${PORT}`);
});