import { GoogleGenerativeAI } from "@google/generative-ai";
import { jsonrepair } from "jsonrepair";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function extractHackathonData(html: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // Use "gemini-pro" or "gemini-1.5-pro" (no "2.0" for now)

  const prompt = `
You are an AI that extracts structured data from hackathon HTML content.

From the following HTML content, extract a JSON object with this strict format:

{
  "name": string,
  "description": string,
  "startDate": string (ISO format),
  "endDate": string (ISO format),
  "location": string,
  "rules": string,
  "prizeDetails": object,
  "themes": string[],
  "timeline": [
    {
      "eventName": string,
      "eventTime": string (ISO format),
      "description": string
    }
  ]
}

ONLY return JSON. No explanations or extra text.
`;

  try {
    const result = await model.generateContent([prompt + "\n\n" + html]);

    const text = result.response.text();
    console.log("📦 Gemini Raw Response:", text);

    try {
      return JSON.parse(text);
    } catch (error) {
      console.warn("⚠️ Raw JSON parsing failed. Trying to repair...");
      const fixed = jsonrepair(text);
      console.log("🛠️ Repaired JSON:", fixed);
      return JSON.parse(fixed);
    }
  } catch (err) {
    console.error("🚨 Gemini API failed:", err);
    throw new Error("Gemini output parsing failed.");
  }
}
