
import { GoogleGenAI, Type } from "@google/genai";
import { PRODUCTS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getCoffeeRecommendation = async (userPreference: string) => {
  if (!process.env.API_KEY) return "AI recommendations are currently unavailable. Please browse our collection!";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a professional barista at Gilka Coffee. Based on this user preference: "${userPreference}", recommend 1-2 coffees from our catalog. 
      Catalog: ${JSON.stringify(PRODUCTS.filter(p => p.category === 'Coffee'))}.
      Respond with a friendly tone, explaining why these choices fit their taste.`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 250,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having a little trouble thinking right now. Maybe try searching for 'fruity' or 'chocolatey' notes?";
  }
};
