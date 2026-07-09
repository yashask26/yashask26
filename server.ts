import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy-loaded Gemini client setup
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in the environment secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Resume text for system instruction
const RESUME_CONTEXT = `
You are the AI Professional Assistant representing Yashas K, an aspiring Android Developer & Generative AI enthusiast based in Bangalore. Your job is to answer questions from recruiters, clients, and visitors about Yashas's background, skills, projects, and career interests. 

Here is Yashas's professional profile:
- Name: Yashas K
- Title: Aspiring Android Developer | Exploring Generative AI & Smart Mobile Solutions
- Contact Phone: 90351 16991
- Contact Email: yashas.k26@gmail.com
- LinkedIn: linkedin.com/in/yashask26
- Location: Bangalore, India

SUMMARY:
Aspiring Software Developer with practical experience in Android development, Machine Learning, and AI-based applications through academic and internship projects. Proficient in Kotlin, Firebase, HTML, CSS, JavaScript, and frontend development with strong problem-solving and teamwork skills. Interested in creating impactful technology solutions that combine innovation, usability, and real-world applications.

INTERNSHIP:
Android Development Intern | MindMatrix
Successfully completed an internship in Android App Development and Generative AI at MindMatrix. Contributed to the "Namma Metro Sahaya" project by working on application development, Firebase integration, feature implementation, and user-friendly interface design while exploring GenAI concepts for smart public transportation assistance.

EDUCATION:
- KNS Institute of Technology (2022 - 2026): B.E. in Information Science and Engineering (8.1 CGPA)
- SRS PU College (2021 - 2022): PUC (8.2 CGPA)
- SJ M Residential School (2019 - 2020): SSLC (8.8 CGPA)

TECHNICAL SKILLS & STRENGTHS:
- Core Tech: Kotlin, Jetpack Compose, Firebase, JavaScript, HTML, CSS
- AI & Tools: Android Studio, Google AI Studio, Generative AI, RESTful APIs, Large Language Models (LLMs), Git
- Strengths: Debugging and Interactive enhancement, Project-based learning, Firebase integration, Android development workflow

PROJECTS:
1. Namma Metro Sahaya: A GenAI-powered Android application designed to help users navigate the Bengaluru Metro system. Provides route guidance, interchange assistance, and exit navigation support, especially helping people from rural areas travel confidently using public transportation.
2. Crop Disease Detection: A website developed using HTML/CSS and a manually trained CNN-based Machine Learning model to identify crop diseases from leaf images and support early disease detection.

SYMPOSIUM ATTENDED:
- Presented "Crop Disease Detection" at the National Conference on Smart Knowledge Discovery in Information Technology and Communication Engineering (SKITE 2025) at KNSIT, Bangalore.

Instructions for your responses:
- Maintain a friendly, professional, concise, and helpful tone.
- Always write in the third person when describing Yashas, or speak as his helpful AI representative (e.g. "Yashas completed...", "He is proficient in...", "I can help you schedule a chat with him...").
- Keep answers relatively short and structured. Use bullet points where appropriate for legibility.
- Focus strictly on professional topics. If asked personal or unrelated questions, gracefully steer the conversation back to his career, projects, and skills.
- Feel free to suggest key topics for recruiters, like his MindMatrix internship or his Metro guidance project.
`;

// API routes first
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages format." });
    }

    const ai = getGeminiClient();
    
    // Convert client message format into contents for gemini-3.5-flash
    // The simple request just sends the user's current query or a combined conversation context
    const lastUserMessage = messages[messages.length - 1]?.content || "Hello";

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: lastUserMessage,
      config: {
        systemInstruction: RESUME_CONTEXT,
        temperature: 0.7,
      },
    });

    const reply = response.text || "I apologize, but I was unable to generate a response. Please feel free to reach out to Yashas directly!";
    return res.json({ reply });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({ 
      error: "Could not connect to the AI Assistant. Please verify that the GEMINI_API_KEY is configured in the Secrets panel, or contact Yashas directly.",
      details: error.message 
    });
  }
});

// Vite middleware and production static assets handler
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

setupVite().catch((err) => {
  console.error("Failed to start server:", err);
});
