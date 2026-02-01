import { getAuth } from "@clerk/nextjs/server";
import authSeller from "@/middlewares/authSeller";
import { NextResponse } from "next/server";
// import openai from "@/configs/openAI";
import { geminiAI } from "@/configs/geminiAi";

async function main(base64Image, mimeType) {
  const messages = [
    {
      role: "user",
      parts: [
        {
          text: `You are a product listing assistant for an e-commerce store.
Your job is to analyze an image of a product and generate structured data.

Respond ONLY with raw JSON (no markdown, no explanation).
The JSON must strictly follow this schema:
{
  "name": "String",
  "description": "String"
}`,
        },
        {
          inlineData: {
            mimeType: mimeType,
            data: base64Image,
          },
        },
      ],
    },
  ];

  const result = await geminiAI.generateContent({
    contents: messages,
  });

  const raw = result.response.text();

  const cleaned = raw.replace(/```json|```/g, "").trim();

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (error) {
    throw new Error("Invalid JSON");
  }

  return parsed;
}

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const isSeller = await authSeller(userId);
    if (!isSeller) {
      return NextResponse.json({ message: "Not Authorized" }, { status: 400 });
    }

    const { base64Image, mimeType } = await request.json();
    const result = await main(base64Image, mimeType);

    return NextResponse.json({ ...result });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error.code || error.message },
      { status: 400 },
    );
  }
}
