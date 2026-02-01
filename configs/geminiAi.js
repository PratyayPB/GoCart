// configs/geminiAi.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize with just the API key string
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);

export const geminiAI = genAI.getGenerativeModel({
  model: process.env.GEMINI_MODEL,
});
