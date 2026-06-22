# AI Job Portal 🌌

An interactive, high-fidelity AI-powered job portal designed with an immersive 3D-network background, card-based micro-interactions, and real-time AI simulation capabilities. This application blends clean futuristic typography, sophisticated glassmorphic accents, and seamless interactive user flows.

---

## 🚀 Key Features

- **3D Interactive Background Scene**: Implements WebGL/Three.js custom neon-lit neural network grids that dynamically react and scale to user viewport dimensions.
- **AI Resume Scanner**: Neural ingestion workflow parser mockup UI that guides candidates through uploading and scanning engineering parameters.
- **Smart Job Matching**: Instant score evaluation panel comparing skill vectors, engineering seniority, tech stack compatibility, and expected annuities.
- **AI Interview Coach Simulator**: Interactive sandbox mock interviews utilizing Gemini model conversation paradigms to train technical communication and design patterns.
- **Dynamic Job Listings**: Interactive filtering and search console allowing engineers to query backend index nodes in live, high-contrast layouts.
- **Refined Micro-interactions**: Hover effects, tactile buttons, customized progress trackers, and fluid active console states.

---

## 🛠️ Technological Architecture

- **Frontend Core**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) (Type-safe vector structures)
- **Bundler & Build Pipeline**: [Vite](https://vite.dev/) (Optimized module loading)
- **Styling & Layout**: [Tailwind CSS](https://tailwindcss.com/) (Responsive fluid prefixes, container-bounds styling)
- **Animations**: Custom transitioning states (Fade transitions, active state scale translations)
- **Interactive Visualizers**: [Three.js](https://threejs.org/) / WebGL components (Custom mesh nodes)
- **Design Foundations**:
  - **Color Palette**: Sophisticated deep slate-blacks (`#050A14`), bright cyber-cyan accents (`#00FFD1`), and electric blues (`#00D4FF`).
  - **Typography**: Paired display configurations utilizing *Space Grotesk* for technical headings and *Inter* for general UI.

---

## 📦 Getting Started

### Prerequisites

Make sure you have Node.js (v18+) and npm installed on your workspace.

### Installation

1. Install project dependencies:
   ```bash
   npm install
   ```

2. Run the development server (runs on port `3000` default host `0.0.0.0`):
   ```bash
   npm run dev
   ```

3. Build the application for production compilation:
   ```bash
   npm run build
   ```

---

## 📁 Project Structure

```text
├── src/
│   ├── components/            # Extracted UI blocks and visualizers
│   │   ├── FeatureCardGrid.tsx  # Dynamic interactive bento grid
│   │   ├── HowItWorks.tsx       # Timeline 3D horizontal step pipelines
│   │   └── ...
│   ├── App.tsx                # Master Dashboard UI and responsive layout
│   ├── main.tsx               # Primary browser injection entrypoint
│   └── index.css              # Global Tailwind variables and imported Google Fonts
├── public/                    # Static graphics and launcher icons
├── index.html                 # App container frame
├── package.json               # System dependencies and scripts
└── metadata.json              # Platform-wide configuration permissions
```
