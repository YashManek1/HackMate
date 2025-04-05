import { GoogleGenerativeAI } from "@google/generative-ai";
import { jsonrepair } from "jsonrepair";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function extractHackathonData(html: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // Use "gemini-pro" or "gemini-1.5-pro" (no "2.0" for now)

  const prompt = `
You are an AI that extracts structured data from hackathon HTML content.

From the following HTML content, extract a JSON object with this exact structure:

{
  "name": string,
  "description": string,
  "startDate": string (ISO format),
  "endDate": string (ISO format),
  "location": string,
  "rules": string,
  "prizeDetails": object,
  "domains": string[], // this field should represent the domain, tracks, or themes of the hackathon
  "timeline": [
    {
      "eventName": string,
      "eventTime": string (ISO format),
      "description": string
    }
  ]
}

Instructions:

- The "domains" field should contain an array of the **tracks, domains, themes, focus areas, or challenge categories** of the hackathon.
- These could be labeled in the HTML as:
  - "Tracks"
  - "Themes"
  - "Problem Statements"
  - "Domains"
  - "Focus Areas"
  - "Challenge Areas"
  - "What You Can Build"
  - "Categories"
  - or any heading or list that hints at areas of innovation or project directions.

- Examples of valid values include:
  "Web Development", "Artificial Intelligence", "Healthcare", "Sustainability", "Cybersecurity", "Blockchain", "Open Innovation", "Fintech", "IoT", "EdTech", etc.

- Even if there is no direct label like "Tracks" or "Themes", infer them intelligently from context — especially if multiple similar phrases are grouped or listed.
- If the page has sections that clearly list tech domains or innovation categories (such as bullet points or headings), extract those even if they’re not labeled under a common term.

Your goal is to intelligently find **any section that represents what participants are expected to build** and extract that into the "themes" array.

Only return pure JSON. No extra explanation, no markdown.
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
