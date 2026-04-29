const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.handler = async (event) => {
    try {
        const { name, dob, time, location } = JSON.parse(event.body);

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

        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        const jsonMatch = text.match(/\{[\s\S]*\}/);

        if (!jsonMatch) {
          throw new Error("Invalid JSON response from AI");
        }

        const jsonData = JSON.parse(jsonMatch[0]);

        return {
            statusCode: 200,
            body: JSON.stringify(jsonData)
        };

    } catch (error) {
      console.error("REAL ERROR:", error);
      
      const isQuotaError =
      error?.status === 429 ||
      error?.code === 429 ||
      error?.message?.includes("Too Many Requests") ||
      error?.message?.includes("quota");
      
      if (isQuotaError) {
        return {
          statusCode: 200,
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            error: "Too many requests. Please try again after some time or tomorrow."
          })
        };
      }
      
      return {
        statusCode: 500,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          error: "The stars are clouded right now. Please try again later."
        })
      };
    }
};