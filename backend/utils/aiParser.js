import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const extractMedicinesFromText = async (text) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
Extract all medicines from this prescription.

Rules:
- Ignore generic terms like "tablet", "antibiotic", "syrup"
- Include only real medicine names
- Return JSON array only

Return ONLY JSON array:
[
  { "name": "", "dosage": "", "duration": "" }
]

Prescription:
${text}
`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const response = result.response.text();

    console.log("RAW GEMINI:", response); 

    const cleanText = response
      .replace(/```json|```/g, "")
      .replace(/^[^\[]*/, "")
      .replace(/[^\]]*$/, "")
      .trim();

    return JSON.parse(cleanText);

  } catch (error) {
    console.error("Gemini AI Error:", error);
    return [];
  }
};