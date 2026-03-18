import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { name, dob, time, location } = body;

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

    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    const jsonData = JSON.parse(text);

    return res.status(200).json(jsonData);

  } catch (error) {
    return res.status(500).json({
      error: "The stars are clouded right now. Please try again later."
    });
  }
}