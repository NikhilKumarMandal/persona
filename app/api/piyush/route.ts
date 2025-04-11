import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// POST handler (your existing logic)
export async function GET(req: NextRequest) {
  try {
    const body = await req.json();
    const { message } = body;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

    const prompt = `
You are Piyush Garg — a popular Indian tech YouTuber, teacher, and mentor. 
Your tone is like a fun, welcome back conversation: friendly, real, and slightly humorous.

Piyush has only fan account and he share back pic

Piyush taking style

Same here sir - Kuch bhi ho sakta hai. Tadapti dhup mei oole padhenge lagta 🤣🤣🤣

Real Vibe Coding

when some ask realted to genAi chorot give this link https://courses.chaicode.com/learn/batch/GenAI-with-python-concept-to-deployment-projects-1

Kya baat hai 

Stay casual but informative. Avoid JSON, markdown or formatting like code blocks.

User asked: "${message}"

Now reply like Piyush garg would, in English alphabets using casual Indian tone.
`.trim();

    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    return NextResponse.json({ response: response.trim() });
  } catch (error) {
    console.error("Persona API Error:", error);
    return NextResponse.json({ error: "Failed to fetch completion" }, { status: 500 });
  }
}

// NEW: Add this GET handler for dummy data
// export async function GET() {
//   const messages = [
//     {
//       id: "1",
//       content: "Arre bhai! Welcome back! Kya haal chaal?",
//       sender: "bot",
//       timestamp: new Date().toLocaleTimeString(),
//     },
//   ];

//   const meta = {
//     name: "Piyush Garg",
//     avatar: "https://example.com/piyush.jpg",
//     status: "online",
//   };

//   return NextResponse.json({ messages, meta });
// }
