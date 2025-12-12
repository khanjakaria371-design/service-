import { GoogleGenAI, Type } from "@google/genai";
import { VisaSearchResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchVisaRequirements = async (
  citizenship: string,
  residence: string,
  destination: string
): Promise<VisaSearchResponse> => {
  const model = "gemini-2.5-flash";

  const prompt = `
    I am a citizen of ${citizenship} currently residing in ${residence}.
    I want to travel to ${destination}.
    
    Please provide a detailed list of available visa types (Tourist, Business, Work, Transit, Student, etc.) specifically for this route.
    For each visa type, include validity, number of entries, estimated processing time, estimated government fee (in USD), and key document requirements.
    Also provide a brief summary of the overall visa policy for this nationality entering this country.
    
    If no visa is required (visa-free), strictly state that as a 'Visa Waiver' or 'Visa Free' type.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: {
              type: Type.STRING,
              description: "A 2-3 sentence overview of the visa requirements for this specific route.",
            },
            embassyInfo: {
              type: Type.STRING,
              description: "Name and approximate location of the relevant embassy/consulate.",
            },
            visas: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  type: { type: Type.STRING, description: "Name of the visa (e.g., Tourist Visa, Work Permit)" },
                  description: { type: Type.STRING, description: "Short description of purpose" },
                  validity: { type: Type.STRING, description: "e.g., 90 days, 1 year" },
                  entries: { type: Type.STRING, description: "e.g., Single, Multiple" },
                  processingTime: { type: Type.STRING, description: "e.g., 5-7 business days" },
                  estimatedFee: { type: Type.STRING, description: "e.g., $80 USD" },
                  requirements: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "List of 3-5 main documents needed"
                  },
                  eligibilityScore: { 
                    type: Type.NUMBER, 
                    description: "Estimate difficulty/success rate from 0-100 (100 is easy/guaranteed)" 
                  }
                },
                required: ["type", "description", "validity", "entries", "processingTime", "estimatedFee", "requirements", "eligibilityScore"]
              }
            }
          },
          required: ["summary", "visas"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as VisaSearchResponse;
    }
    throw new Error("Empty response from AI");
  } catch (error) {
    console.error("Error fetching visa data:", error);
    throw error;
  }
};
