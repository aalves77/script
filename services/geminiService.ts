
import { GoogleGenAI, Type } from "@google/genai";

// Use process.env.API_KEY directly for initialization as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIOptimization = async (deviceInfo: string, playstyle: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `User Playstyle: ${playstyle}. Device Info: ${deviceInfo}. Suggest an ultimate gaming optimization strategy for Free Fire. Focus on FPS, Sensitivity adjustments (General, Red Dot), and movement tactics. Format your response in JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            advice: { type: Type.STRING, description: "Detailed strategy and optimization advice." },
            recommendedConfig: { type: Type.STRING, description: "Specific numbers or settings values." },
            dangerLevel: { type: Type.STRING, enum: ["Low", "Medium", "High"], description: "Risk level of performance impact." }
          },
          required: ["advice", "recommendedConfig", "dangerLevel"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      advice: "Failed to fetch AI strategies. Ensure you have a stable connection.",
      recommendedConfig: "N/A",
      dangerLevel: "Medium"
    };
  }
};
