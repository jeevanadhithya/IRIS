import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

export interface Message {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: Date;
}

export const sendMessageToGemini = async (
  message: string
): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest", // ✅ FIXED
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 512,
      },
    });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: message }],
        },
      ],
    });

    return result.response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("GEMINI_API_ERROR");
  }
};
