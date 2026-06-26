<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Three.js-0.184-000000?style=for-the-badge&logo=threedotjs&logoColor=white" alt="Three.js" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Gemini_AI-API-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini AI" />
</p>

<h1 align="center">🌌 AI Job Portal</h1>

<p align="center">
  <strong>An immersive, AI-powered career platform built with cutting-edge web technologies.</strong><br/>
  Glassmorphic UI • 3D Neural Network Backgrounds • Gemini-Powered Resume Intelligence
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-api-reference">API Reference</a> •
  <a href="#-project-structure">Project Structure</a> •
  <a href="#-contributing">Contributing</a> •
  <a href="#-license">License</a>
</p>

---

## ✨ Features

### 🎨 Immersive 3D Experience
- **Interactive Neural Network Background** — A WebGL/Three.js powered globe of animated, neon-lit nodes that dynamically respond to viewport dimensions, creating a living, breathing interface.
- **Glassmorphic Design System** — Frosted-glass cards, deep slate-black tones (`#050A14`), cyber-cyan accents (`#00FFD1`), and electric blue highlights (`#00D4FF`) deliver a premium futuristic aesthetic.
- **Refined Micro-Interactions** — Hover effects, tactile button feedback, progress trackers, and fluid GSAP/Motion animations throughout.

### 🤖 AI-Powered Intelligence (Google Gemini)
- **AI Resume Scanner** — Upload and parse resumes for instant skill extraction, gap analysis, and a 0–100 AI-readiness score.
- **Smart Job Matching** — Score evaluation panel comparing skill vectors, seniority, tech stack compatibility, and salary expectations against live job listings.
- **Bio Enhancement Engine** — Transform a basic profile bio into a polished, recruiter-optimized professional summary with tailored bullet points.
- **Graceful Fallback** — Runs in simulated intelligence mode when no API key is configured, providing instant mock responses for development and demos.

### 🧭 Complete Job Portal Workflow
- **Multi-Step Registration** — Guided candidate onboarding covering account setup, AI profile building, and work preference configuration.
- **Dynamic Job Listings** — Searchable, filterable console with high-contrast card layouts and real-time match scoring.
- **Testimonial Carousel** — Social proof section with rotating candidate success stories.
- **Live Stats Counter** — Animated counters showcasing platform metrics.

---

## 🛠 Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | [React 19](https://react.dev/) + [TypeScript 5.8](https://www.typescriptlang.org/) | Type-safe component architecture |
| **Build** | [Vite 6](https://vite.dev/) | Lightning-fast HMR & optimized bundling |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first responsive design |
| **3D Graphics** | [Three.js 0.184](https://threejs.org/) | WebGL neural network visualization |
| **Animation** | [GSAP 3.15](https://gsap.com/) + [Motion 12](https://motion.dev/) | Smooth transitions & scroll effects |
| **Icons** | [Lucide React](https://lucide.dev/) | Consistent, crisp icon library |
| **Backend** | [Express 4](https://expressjs.com/) + [tsx](https://tsx.is/) | API server with TypeScript runtime |
| **AI Engine** | [Google Gemini 3.5 Flash](https://ai.google.dev/) | Resume analysis & bio enhancement |
| **Typography** | *Space Grotesk* (headings) + *Inter* (body) | Premium paired font system |

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version |
|---|---|
| [Node.js](https://nodejs.org/) | `v18.0+` |
| [npm](https://www.npmjs.com/) | `v9.0+` |
| [Gemini API Key](https://aistudio.google.com/apikey) | Optional (falls back to mock mode) |

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/abhiiii27/AI-JOB-PORTAL.git
cd AI-JOB-PORTAL

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Edit .env and add your Gemini API key (optional)
```

### Development

```bash
# Start the development server (Express + Vite HMR on port 3000)
npm run dev
```

The app will be available at **[http://localhost:3000](http://localhost:3000)**

### Production Build

```bash
# Build optimized frontend + bundled server
npm run build

# Start the production server
npm start
```

### Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start dev server with HMR (port 3000) |
| `npm run build` | Build frontend (Vite) + backend (esbuild) |
| `npm start` | Run production server from `dist/` |
| `npm run lint` | Type-check with TypeScript (`tsc --noEmit`) |
| `npm run clean` | Remove build artifacts |

---

## 📡 API Reference

The Express server exposes the following RESTful endpoints:

### `GET /api/health`

Health check endpoint. Returns AI configuration status.

**Response:**
```json
{
  "status": "ok",
  "aiEnabled": true,
  "message": "Registered under active Gemini client context."
}
```

---

### `POST /api/gemini/enhance-bio`

Enhances a candidate's profile bio using Gemini AI.

**Request Body:**
```json
{
  "fullName": "Jane Doe",
  "coreRole": "Machine Learning Engineer",
  "skills": "PyTorch, Transformers, MLOps",
  "bio": "I build ML models."
}
```

**Response:**
```json
{
  "success": true,
  "enhancedBio": "As a seasoned Machine Learning Engineer with deep expertise in...",
  "suggestedBulletPoints": [
    "Architected scalable ML pipelines...",
    "Reduced inference latency by 40%...",
    "Published 3 research papers on..."
  ]
}
```

---

### `POST /api/gemini/analyze-resume`

Performs deep-dive resume analysis and AI job-readiness scoring.

**Request Body:**
```json
{
  "resumeText": "Full resume text content...",
  "coreRole": "Generative AI Developer",
  "skills": "Python, LangChain, RAG"
}
```

**Response:**
```json
{
  "success": true,
  "score": 88,
  "suggestedRoles": ["Generative AI Developer", "RAG Architect", "..."],
  "identifiedSkills": ["Python", "LangChain", "RAG"],
  "skillsGap": ["Distributed Training", "Vector DB Optimization"],
  "personalizedAdvice": "Focus on publishing fine-tuned models..."
}
```

---

## 📁 Project Structure

```
AI-JOB-PORTAL/
├── index.html                          # App entry point (SPA shell)
├── server.ts                           # Express + Vite + Gemini API server
├── vite.config.ts                      # Vite build configuration
├── tsconfig.json                       # TypeScript compiler options
├── package.json                        # Dependencies & scripts
├── metadata.json                       # Platform capability declarations
├── .env.example                        # Environment variable template
│
└── src/
    ├── main.tsx                        # React DOM entry point
    ├── App.tsx                         # Root component — layout, routing, state
    ├── index.css                       # Global styles, Tailwind imports, fonts
    ├── types.ts                        # Shared TypeScript interfaces & enums
    │
    └── components/
        ├── ThreeGlobeNetwork.tsx        # 🌐 3D WebGL neural network background
        ├── FeatureCardGrid.tsx          # 🃏 Interactive feature bento grid
        ├── HowItWorks.tsx              # 📋 Horizontal step timeline pipeline
        ├── JobListings.tsx             # 💼 Searchable job cards with filters
        ├── ResumeDropzone.tsx          # 📄 Drag-and-drop resume upload zone
        ├── RegistrationSummary.tsx     # 📊 Multi-step registration wizard
        ├── AIPortfolioCard.tsx         # 🤖 AI-enhanced candidate profile card
        ├── StatsCounter.tsx            # 📈 Animated platform statistics
        ├── TestimonialCarousel.tsx     # 💬 Rotating testimonial slider
        └── FuturisticFooter.tsx        # 🔻 Styled footer with links & branding
```

---

## 🔧 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | No | Google Gemini API key. Without it, the app runs in mock mode with simulated AI responses. Get yours at [AI Studio](https://aistudio.google.com/apikey). |
| `APP_URL` | No | Deployment URL for self-referential links and callbacks. |

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Guidelines

- Follow the existing TypeScript + React patterns
- Ensure `npm run lint` passes with no errors
- Keep components focused and reusable
- Write descriptive commit messages

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/abhiiii27">abhiiii27</a>
</p>
