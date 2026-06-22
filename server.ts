import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini AI client helper to avoid crashes on launch
let aiClient: any = null;

function getAiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    // Graceful indicator that we'll use local mock intelligence mode instead
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Check AI status
app.get("/api/health", (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  const isConfigured = !!apiKey && apiKey !== "MY_GEMINI_API_KEY";
  res.json({
    status: "ok",
    aiEnabled: isConfigured,
    message: isConfigured ? "Registered under active Gemini client context." : "AI Key is missing or default. Simulated expert matching model activated."
  });
});

// API endpoint 1: Enhance Candidate Bio
app.post("/api/gemini/enhance-bio", async (req, res) => {
  const { fullName, coreRole, skills, bio } = req.body;
  const ai = getAiClient();

  if (!ai) {
    // Premium Simulated local enhancement logic for instant feedback in sandboxed dev
    const skillList = skills ? skills.split(",").map((s: string) => s.trim()) : ["AI Engineering", "Neural Networks"];
    const fallbackBio = `As a meticulous ${coreRole || "AI Enthusiast"} fueled by cutting-edge neural innovations, I thrive on engineering high-efficiency intelligence paradigms. With specialized competence across ${skillList.slice(0, 3).join(", ")}, my focus lies on designing scalable architectures that bridge raw research with production outcomes. Ready to drive transformative solutions inside global development cohorts.`;
    const fallbackBullets = [
      `Architected adaptive ML workflows optimizing inference latency across distributed nodes.`,
      `Synthesized bespoke functional implementations leveraging state-of-the-art pipelines like ${skillList[0] || "Generative AI"}.`,
      `Integrated user-first solutions centered on high-fidelity performance metrics.`
    ];

    // Artificial tiny lag for professional feel
    await new Promise(resolve => setTimeout(resolve, 800));
    return res.json({
      success: true,
      enhancedBio: fallbackBio,
      suggestedBulletPoints: fallbackBullets
    });
  }

  try {
    const prompt = `
      Enhance this registration profile bio for an AI Job Portal.
      Name: ${fullName || "Candidate"}
      Sub-specialization: ${coreRole}
      Keywords/Skills entered: ${skills || "None specified"}
      Original Bio/Introduction: ${bio || "Looking to transition and excel in AI pipelines."}

      Write a highly polished, professional, compelling 2-3 sentence introduction in the first person narrative. 
      Also provide exactly 3 impactful, quantified resume-style executive bullet points related to this role and skills.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are a senior technical tech recruiter at a top-tier AI lab (like Google DeepMind or OpenAI). You customize and polish candidate bios to maximize hireability, density of technical keywords, and executive impact, keeping the tone clean, premium, and professional. Return your response in JSON matching the specified schema.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            enhancedBio: {
              type: Type.STRING,
              description: "The 2-3 sentence polished professional summary of the candidate in first-person (e.g., 'I am an ML engineer...')."
            },
            suggestedBulletPoints: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Three tailored, high-impact bullet points for their resume/profile."
            }
          },
          required: ["enhancedBio", "suggestedBulletPoints"]
        }
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    return res.json({
      success: true,
      enhancedBio: parsedData.enhancedBio,
      suggestedBulletPoints: parsedData.suggestedBulletPoints
    });
  } catch (error: any) {
    console.error("Gemini bio enhancement failed:", error);
    res.status(500).json({
      success: false,
      error: error.message || "An error occurred while communicating with Gemini."
    });
  }
});

// API endpoint 2: Parse/Analyze Resume or skills for Portal Matching Score
app.post("/api/gemini/analyze-resume", async (req, res) => {
  const { resumeText, coreRole, skills } = req.body;
  const ai = getAiClient();

  if (!ai) {
    // Premium simulated resume analytics
    const mockScore = resumeText && resumeText.length > 100 ? 88 : 55;
    const mockSuggested = [
      coreRole || "Generative AI Developer",
      "Retrieval Augmented Generation (RAG) Architect",
      "System Optimization Engineer"
    ];
    const mockGaps = [
      "Distributed Training scaling (Megatron-LM, FSDP)", 
      "Vector database caching optimization",
      "API payload guardrails"
    ];
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    return res.json({
      success: true,
      score: mockScore,
      suggestedRoles: mockSuggested,
      identifiedSkills: skills ? skills.split(",").map((s: string) => s.trim()) : ["Python", "PyTorch", "Model Evaluation"],
      skillsGap: mockGaps,
      personalizedAdvice: "Your baseline highlights standard neural fluency. Elevate your portal visibility by publishing fine-tuned Hugging Face models or demonstrating practical latency optimization metrics under high concurrent payloads."
    });
  }

  try {
    const prompt = `
      Perform a deep-dive evaluation of this candidate's fit for AI jobs.
      Nominated Specialization: ${coreRole}
      Key Skills Spoken: ${skills || "None"}
      Pasted Resume / History:
      ${resumeText || "No text uploaded yet."}

      Evaluate and return a score from 0-100 indicating readiness for top AI workloads. Keep strict focus on the actual text. If the resume is blank or extremely sparse, the score should reflect that (under 40). 
      Identify top roles, core skills noticed, key skills gaps relative to top-tier requirements, and highly professional advice.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are a professional AI talent analyst. Review the provided resume data and specialization to generate detailed matching insights. Ensure the score is realistic and the feedback is highly tactical. Return the feedback in JSON according to the specified schema.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: {
              type: Type.INTEGER,
              description: "Fit score between 0 and 100."
            },
            suggestedRoles: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Three specific high-value AI job titles fitted to this background."
            },
            identifiedSkills: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Skills extracted directly from the CV text."
            },
            skillsGap: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Crucial stack/tools/skills missing to land elite roles in their target spec."
            },
            personalizedAdvice: {
              type: Type.STRING,
              description: "Brief, high-impact tactical advice to double their response rates."
            }
          },
          required: ["score", "suggestedRoles", "identifiedSkills", "skillsGap", "personalizedAdvice"]
        }
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    return res.json({
      success: true,
      ...parsedData
    });
  } catch (error: any) {
    console.error("Gemini resume analysis failed:", error);
    res.status(500).json({
      success: false,
      error: error.message || "An error occurred while evaluating the resume."
    });
  }
});

// Vite middleware flow for full SPA integration
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: express.Request, res: express.Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Vite Server] Running live at http://localhost:${PORT}`);
  });
}

setupServer();
