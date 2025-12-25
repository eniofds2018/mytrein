
import { GoogleGenAI, Type } from "@google/genai";
import { AIWorkoutSuggestion, Language } from "../types";

export const generateWorkoutRoutine = async (goal: string, experienceLevel: string, language: Language): Promise<AIWorkoutSuggestion> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const langPrompt = language === 'pt' ? 'Respond in Portuguese (Brazil).' : 'Respond in English.';
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate a gym workout routine for someone who is ${experienceLevel} and wants to ${goal}. ${langPrompt}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          routineName: { type: Type.STRING },
          exercises: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                sets: { type: Type.NUMBER },
                reps: { type: Type.STRING },
                focus: { type: Type.STRING }
              },
              required: ["name", "sets", "reps", "focus"]
            }
          },
          advice: { type: Type.STRING }
        },
        required: ["routineName", "exercises", "advice"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const analyzeProgress = async (sessionHistory: any[], language: Language): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  const langPrompt = language === 'pt' ? 'Respond in Portuguese (Brazil).' : 'Respond in English.';

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze this gym session history and provide professional feedback on strength gains and areas for improvement: ${JSON.stringify(sessionHistory)}. ${langPrompt}`,
    config: {
      systemInstruction: "You are a world-class certified personal trainer and kinesiologist."
    }
  });
  return response.text;
};
