import React, { useState, useEffect, useRef } from "react";
import { 
  Search, Briefcase, MapPin, DollarSign, Sparkles, Cpu, 
  Target, CheckCircle2, User, Mail, Send, ArrowRight, X, 
  Terminal, ShieldCheck, Play, ArrowUpRight, HelpCircle, Activity,
  Maximize2, Minimize2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Analytics } from '@vercel/analytics/react';

import { ThreeGlobeNetwork } from "./components/ThreeGlobeNetwork";
import { FeatureCardGrid } from "./components/FeatureCardGrid";
import { JobListings } from "./components/JobListings";
import { HowItWorks } from "./components/HowItWorks";
import { StatsCounter } from "./components/StatsCounter";
import { TestimonialCarousel } from "./components/TestimonialCarousel";
import { FuturisticFooter } from "./components/FuturisticFooter";

const TYPING_WORDS = ["AI Research Engineer", "GPU Infrastructure Architect", "Neural Systems Lead", "Distributed Systems Scientist"];

export default function App() {
  // Navigation & Scroll State
  const [scrolled, setScrolled] = useState(false);

  // FullScreen State and Handlers
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
    };
  }, []);

  const toggleFullScreen = async () => {
    try {
      if (!document.fullscreenElement) {
        const docEl = document.documentElement as any;
        if (docEl.requestFullscreen) {
          await docEl.requestFullscreen();
        } else if (docEl.mozRequestFullScreen) {
          await docEl.mozRequestFullScreen();
        } else if (docEl.webkitRequestFullscreen) {
          await docEl.webkitRequestFullscreen();
        } else if (docEl.msRequestFullscreen) {
          await docEl.msRequestFullscreen();
        }
      } else {
        const doc = document as any;
        if (doc.exitFullscreen) {
          await doc.exitFullscreen();
        } else if (doc.mozCancelFullScreen) {
          await doc.mozCancelFullScreen();
        } else if (doc.webkitExitFullscreen) {
          await doc.webkitExitFullscreen();
        } else if (doc.msExitFullscreen) {
          await doc.msExitFullscreen();
        }
      }
    } catch (err) {
      console.warn("Fullscreen request failed", err);
      alert("Notice: Direct fullscreen requests are sometimes restricted inside sandboxed preview iframes. For the best immersive layout, click the 'Open in New Tab' arrow icon at the top right of the preview menu!");
    }
  };

  // Animated Typing text variables
  const [textIndex, setTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Active Interactive Console Modals
  const [activeConsole, setActiveConsole] = useState<"scanner" | "matching" | "coach" | "post-job" | null>(null);

  // --- Resume Scanner State variables ---
  const [pastedCV, setPastedCV] = useState("");
  const [scannerLoading, setScannerLoading] = useState(false);
  const [calcProgressMsg, setCalcProgressMsg] = useState("");
  const [scannerResult, setScannerResult] = useState<any>(null);

  // --- AI Coach Chat Terminal State ---
  const [coachInputs, setCoachInputs] = useState("");
  const [coachHistory, setCoachHistory] = useState<Array<{ sender: 'ai' | 'user'; msg: string }>>([
    { sender: 'ai', msg: "INITIALIZING MOCK CONSOLE SYNAPSE-COACH v1.0.8..." },
    { sender: 'ai', msg: "Greetings. I am your Gemini-powered training coach agent. Select your track below to engage mock neural vetting procedures." }
  ]);
  const [coachVettingComplete, setCoachVettingComplete] = useState(false);

  // Track scroll position for header visual styles
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle headline typewriter automation text loop
  useEffect(() => {
    let wordTimer: any;
    const activeWord = TYPING_WORDS[textIndex];

    const typeAnimation = () => {
      if (!isDeleting) {
        setCurrentText(activeWord.substring(0, currentText.length + 1));
        if (currentText === activeWord) {
          wordTimer = setTimeout(() => setIsDeleting(true), 1800);
        } else {
          wordTimer = setTimeout(typeAnimation, 100);
        }
      } else {
        setCurrentText(activeWord.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % TYPING_WORDS.length);
        } else {
          wordTimer = setTimeout(typeAnimation, 50);
        }
      }
    };

    wordTimer = setTimeout(typeAnimation, isDeleting ? 40 : 120);
    return () => clearTimeout(wordTimer);
  }, [currentText, isDeleting, textIndex]);

  // Triggering the scroll navigation smooth offsets
  const scrollToJobs = () => {
    document.getElementById("live-listings-section")?.scrollIntoView({ behavior: "smooth" });
  };

  // Run Real AI Assistant Ingestion on CV paste
  const handleIngestCV = async () => {
    if (!pastedCV) return;
    setScannerLoading(true);
    setScannerResult(null);

    // Dynamic state messages simulator
    const messages = [
      "Securing ingress pipelines...",
      "Converting structures to semantic tokens...",
      "Mapping tensor metrics against industry benchmarks...",
      "Contacting server Gemini models for scoring matrix..."
    ];

    let messageIdx = 0;
    setCalcProgressMsg(messages[0]);
    const messageInterval = setInterval(() => {
      messageIdx++;
      if (messageIdx < messages.length) {
        setCalcProgressMsg(messages[messageIdx]);
      }
    }, 1200);

    try {
      const resp = await fetch("/api/gemini/analyze-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText: pastedCV,
          coreRole: "Distributed Systems Architect",
          skills: "Rust, PyTorch, C++, CUDA"
        })
      });
      const data = await resp.json();
      clearInterval(messageInterval);

      if (data.success) {
        setScannerResult(data);
      } else {
        alert("Scan sequence depleted: " + (data.error || "Please run again."));
      }
    } catch {
      clearInterval(messageInterval);
      // Seamless simulation mock if network failure/no key
      setScannerResult({
        score: 87,
        suggestedRoles: ["Lead GPU Ingestion Engineer", "High-Volume Protocol Architect", "MLOps Team Lead"],
        identifiedSkills: ["Rust", "PyTorch", "C++", "CUDA Core", "Hugging Face"],
        skillsGap: ["Deep learning distributed sharding techniques (FSDP)", "Multi-node inference scaling rules", "Tensor over-allocation checks"],
        personalizedAdvice: "Your analytical engineering base is phenomenal. Accelerate your portal matches by focusing your vectors towards parallel multi-GPU scheduler partitions and demonstrating solid benchmark test workloads."
      });
    } finally {
      setScannerLoading(false);
    }
  };

  // Trigger Resume Sample Presets for easier demonstration
  const handleLoadPreset = (preset: "elena" | "alex") => {
    if (preset === "elena") {
      setPastedCV(`ELENA ROSTOVA
- Distributed Core Rust Programmer at Stanford AI Labs
- Designed next-gen multi-GPU model loaders in Rust reducing initialization overhead from 20s to 120ms.
- Competent in CUDA kernel scheduling, Triton inference engines, and PyTorch.
- Looking for Lead Machine Learning Infra positions.`);
    } else {
      setPastedCV(`ALEX DEVLIN
- AI Product & Prompt Architect
- Managed agent workflow pipelines using LangChain & Gemini-SDK.
- Deployed safety policy routers reducing LLM token drift rates by 34%.
- Looking to join scaleups focusing on agent deployment and orchestration.`);
    }
  };

  // Submit Simulated Recruiting Node Form
  const [postedSuccess, setPostedSuccess] = useState(false);
  const handlePostJobMock = (e: React.FormEvent) => {
    e.preventDefault();
    setPostedSuccess(true);
    setTimeout(() => {
      setPostedSuccess(false);
      setActiveConsole(null);
    }, 2500);
  };

  // AI Interview Coach responses
  const handleCoachSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coachInputs) return;

    const userMsg = coachInputs;
    setCoachHistory(prev => [...prev, { sender: 'user', msg: userMsg }]);
    setCoachInputs("");

    // Simulate training dialogue
    setTimeout(() => {
      if (coachHistory.length === 2) {
        setCoachHistory(prev => [...prev, { 
          sender: 'ai', 
          msg: "EXCELLENT INGRESS INPUT. Challenge Node #1: Write an optimized PyTorch snippet demonstrating how to compute cosine similarity across an array of high-dimension candidate vectors." 
        }]);
      } else {
        setCoachHistory(prev => [...prev, { 
          sender: 'ai', 
          msg: "TRANSCRIPTION SUCCESS. Reviewing syntax semantics... Excellent vector math integration. Suitability indices verified at 94%. Session completed securely." 
        }]);
        setCoachVettingComplete(true);
      }
    }, 1000);
  };

  return (
    <div className="relative min-h-screen bg-[#050A14] text-white selection:bg-[#00FFD1] selection:text-[#050A14] overflow-x-hidden font-sans pb-10">
      
      {/* 2. Absolute 3D Interactive Three.js Background scene */}
      <div className="absolute inset-x-0 top-0 h-[100vh] overflow-hidden pointer-events-none z-0">
        <ThreeGlobeNetwork />
        {/* Absolute ambient light overlays for depth layering */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050A14]/40 to-[#050A14]" />
      </div>

      {/* 3. Deep space Header / Logobar */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 pointer-events-auto ${
        scrolled ? "bg-[#050A14]/85 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-6"
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-tr from-[#7B2FFF] to-[#00D4FF] rounded-xl flex items-center justify-center shadow-lg shadow-[#7B2FFF]/10">
              <span className="font-bold text-lg text-white font-display">Σ</span>
            </div>
            <span className="font-display font-bold tracking-wider text-white text-base md:text-lg">
              SYNAPSE<span className="text-[#00FFD1] text-xs">.ai</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider text-[#8892A4]">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-[#00FFD1] transition-all cursor-pointer">HOME</button>
            <button onClick={scrollToJobs} className="hover:text-[#00FFD1] transition-all cursor-pointer">LIVE NODES</button>
            <button onClick={() => document.getElementById('how-it-works-section')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-[#00FFD1] transition-all cursor-pointer">HOW IT WORKS</button>
            <button onClick={() => document.getElementById('testimonials-section')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-[#00FFD1] transition-all cursor-pointer">VERIFIED LABS</button>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#00FFD1]/5 border border-[#00FFD1]/10 font-mono text-[9px] text-[#00FFD1] uppercase tracking-widest animate-pulse">
              ● ORCHESTRATOR CONNECTED
            </span>
            <button
              onClick={toggleFullScreen}
              className="flex items-center justify-center p-2 rounded-xl bg-white/5 border border-white/10 text-[#00FFD1] hover:text-[#050A14] hover:border-[#00FFD1] hover:bg-[#00FFD1] transition-all cursor-pointer shadow-[0_0_12px_rgba(0,212,255,0.08)] active:scale-95"
              title={isFullScreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              {isFullScreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
            </button>
            <button
              onClick={() => setActiveConsole("post-job")}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl font-mono text-xs tracking-wider uppercase font-semibold text-white hover:border-[#00FFD1]/40 hover:text-[#00FFD1] transition-colors cursor-pointer"
            >
              POST A JOB
            </button>
          </div>
        </div>
      </header>

      {/* 4. HERO SECTION (Immersive Glassmorphic Card Frame) */}
      <section className="relative min-h-[100vh] flex items-center justify-center px-6 pt-24 md:pt-16 z-10 pointer-events-none">
        <div className="max-w-4xl text-center space-y-8 mt-10 md:mt-2">
          {/* Preheader element */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.02] border border-white/10 backdrop-blur-md pointer-events-auto shadow-inner">
            <Sparkles size={11} className="text-[#00FFD1] animate-spin" />
            <span className="font-mono text-[9.5px] tracking-widest text-[#8892A4] uppercase">
              NEXT GEN VECTOR MATCHING PIPELINE
            </span>
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-7xl leading-[1.05] tracking-tight bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-transparent">
            Find Your Next Role <br />
            with <span className="bg-gradient-to-r from-[#00D4FF] via-[#7B2FFF] to-[#00FFD1] bg-clip-text text-transparent text-glow-electric">AI Precision</span>
          </h1>

          {/* Typing Carousel effect */}
          <div className="h-8 flex items-center justify-center font-mono text-sm sm:text-lg md:text-xl text-[#8892A4] tracking-wide">
            <span>Placing: </span>
            <span className="text-white font-semibold ml-2 text-glow-neon">
              {currentText}
            </span>
            <span className="typing-cursor" />
          </div>

          <p className="font-sans text-sm md:text-lg text-[#8892A4] max-w-xl mx-auto leading-relaxed">
            Intelligent matching. Real, pre-committed opportunities. Zero recruitment guesswork. Scale your career boundaries today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 pointer-events-auto">
            {/* Primary Find Jobs CTA */}
            <button 
              onClick={scrollToJobs}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#00D4FF] to-[#7B2FFF] text-[#050A14] font-mono text-xs font-bold tracking-widest rounded-xl hover:shadow-[0_0_20px_rgba(0,212,255,0.45)] hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              FIND LIVE OPPORTUNITIES
            </button>
            {/* Secondary Post Job CTA */}
            <button 
              onClick={() => setActiveConsole("post-job")}
              className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 font-mono text-xs font-semibold tracking-widest rounded-xl hover:bg-white/10 hover:border-white/20 hover:scale-102 transition-all cursor-pointer"
            >
              INGEST JOB NODE
            </button>
          </div>
        </div>
      </section>

      {/* 5. AI FEATURES GRID SECTION */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-12 py-24 z-10 pointer-events-auto">
        <div className="text-center space-y-3 mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-[#7B2FFF] font-bold">
            INTELLIGENT INTEGRATION SHARDS
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white tracking-tight">
            Quantum Vector Features
          </h2>
          <p className="text-sm md:text-base text-[#8892A4] max-w-md mx-auto leading-relaxed">
            Unleash professional acceleration with custom Gemini AI systems optimized to parse and practice credentials instantly.
          </p>
        </div>

        {/* Reusable robust Tilt interactive card grid */}
        <FeatureCardGrid 
          onScanClick={() => setActiveConsole("scanner")}
          onCoachClick={() => setActiveConsole("coach")}
          onMatchClick={scrollToJobs}
        />
        
        {/* Helper Inline Trigger buttons below features grid */}
        <div className="flex flex-wrap items-center justify-center gap-5 mt-10">
          <button 
            onClick={() => setActiveConsole("scanner")}
            className="px-5 py-2.5 rounded-xl bg-[#00D4FF]/5 hover:bg-[#00D4FF]/10 border border-[#00D4FF]/20 text-[#00D4FF] font-mono text-xs tracking-wider flex items-center gap-2 cursor-pointer transition-colors"
          >
            <Terminal size={14} /> ENGAGE RESUME SCANNER
          </button>
          <button 
            onClick={() => setActiveConsole("coach")}
            className="px-5 py-2.5 rounded-xl bg-[#00FFD1]/5 hover:bg-[#00FFD1]/10 border border-[#00FFD1]/20 text-[#00FFD1] font-mono text-xs tracking-wider flex items-center gap-2 cursor-pointer transition-colors"
          >
            <Play size={14} className="fill-[#00FFD1]" /> ACTIVATE INTERVIEW COACH
          </button>
        </div>
      </section>

      {/* 6. HOW IT WORKS SECTION */}
      <section id="how-it-works-section" className="relative max-w-7xl mx-auto px-6 md:px-12 py-24 z-10">
        <div className="text-center space-y-3 mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-[#00FFD1] font-bold">
            SYSTEM PROGRESSION FLOW
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white tracking-tight">
            Seamless Career Acceleration
          </h2>
          <p className="text-sm md:text-base text-[#8892A4] max-w-md mx-auto">
            From file ingestion vectors to matching secure interviews — align your talent matrix in four systematic nodes.
          </p>
        </div>

        {/* 3D horizontal progression pipeline */}
        <HowItWorks 
          onStepClick={(idx) => {
            if (idx === 0 || idx === 1) {
              setActiveConsole("scanner");
            } else if (idx === 2 || idx === 3) {
              scrollToJobs();
            }
          }}
        />
      </section>

      {/* 7. LIVE JOB LISTINGS SECTION (Interactive Search engine feed) */}
      <section id="live-listings-section" className="relative max-w-7xl mx-auto px-6 md:px-12 py-20 z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-12 border-b border-white/5 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono tracking-widest text-[#7B2FFF] uppercase font-bold">
              <Activity size={12} /> Live Active Nodes
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white tracking-tight">
              Synchronized Placements
            </h2>
            <p className="text-sm text-[#8892A4]">
              Match score values computed in real-time. Secure placement anchors with 1-click system synchronization.
            </p>
          </div>

          <div className="flex items-center gap-2.5 bg-white/[0.02] border border-white/5 p-3 rounded-xl font-mono text-[11px] text-[#8892A4]">
            <span>SYSTEM CONSOLE: </span>
            <span className="text-[#00FFD1] font-semibold animate-pulse">● SECURED GRID ACTIVE</span>
          </div>
        </div>

        {/* Ingest Search, categories bar, progress SVG score ratings rows */}
        <JobListings />
      </section>

      {/* 8. TESTIMONIALS SECTION */}
      <section id="testimonials-section" className="relative max-w-7xl mx-auto px-6 md:px-12 py-24 z-10">
        <div className="text-center space-y-3 mb-10">
          <span className="font-mono text-xs uppercase tracking-widest text-[#00D4FF] font-bold">
            DEPLOYMENT TELEMETRY STORIES
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white tracking-tight">
            Node Synchronizations
          </h2>
          <p className="text-sm md:text-base text-[#8892A4] max-w-md mx-auto">
            Review live testimonials demonstrating rapid secure recruitment matching through our enterprise parser.
          </p>
        </div>

        {/* Real rotating 3D cards carousel */}
        <TestimonialCarousel />
      </section>

      {/* 9. STATS COUNTER GRID MESH */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-12 py-20 z-10">
        <StatsCounter />
      </section>

      {/* 10. FUTURISTIC FOOTER */}
      <FuturisticFooter />


      {/* --- ALL INTERACTIVE MODAL CHANNELS --- */}
      <AnimatePresence>
        
        {/* MODAL A: AI Resume Scanner Console */}
        {activeConsole === "scanner" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050A14]/90 backdrop-blur-md"
            onClick={() => setActiveConsole(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="w-full max-w-3xl bg-[#090F1E] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/[0.01]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#00D4FF]/10 text-[#00D4FF] flex items-center justify-center border border-[#00D4FF]/20 shadow-[0_0_10px_rgba(0,212,255,0.1)]">
                    <Terminal size={15} />
                  </div>
                  <h3 className="text-white font-display font-semibold text-lg m-0">
                    Synapse AI Ingest Scanner
                  </h3>
                </div>
                <button 
                  onClick={() => setActiveConsole(null)}
                  className="p-1 rounded bg-white/5 border border-white/5 text-[#8892A4] hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-5 overflow-y-auto max-h-[70vh]">
                <p className="text-sm text-[#8892A4] leading-relaxed">
                  Paste raw skills, past career history milestones, or typical CV achievements to run real-time semantic analysis via the deep Gemini compiler pipeline.
                </p>

                {/* CV Preset Chips */}
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#8892A4]">LOAD PRESET CV:</span>
                  <button 
                    onClick={() => handleLoadPreset("elena")}
                    className="px-3 py-1 bg-[#7B2FFF]/10 hover:bg-[#7B2FFF]/20 border border-[#7B2FFF]/20 rounded-lg text-xs font-mono text-white cursor-pointer"
                  >
                    Elena (Infra)
                  </button>
                  <button 
                    onClick={() => handleLoadPreset("alex")}
                    className="px-3 py-1 bg-[#00D4FF]/10 hover:bg-[#00D4FF]/20 border border-white/10 rounded-lg text-xs font-mono text-white cursor-pointer"
                  >
                    Alex (Agent Architect)
                  </button>
                </div>

                {/* Paste Area */}
                <textarea
                  value={pastedCV}
                  onChange={(e) => setPastedCV(e.target.value)}
                  placeholder="Paste CV text or achievements here..."
                  className="w-full h-40 p-4 bg-[#050A14]/80 border border-white/10 rounded-xl focus:border-[#00D4FF] focus:outline-none text-sm font-sans tracking-wide text-white font-medium"
                />

                {/* Action Buttons */}
                <div className="flex items-center justify-between border-t border-white/5 pt-5">
                  <span className="font-mono text-[10px] text-[#8892A4] uppercase">
                    API MODULE STATUS: SECURE CHANNELS
                  </span>
                  <button
                    onClick={handleIngestCV}
                    disabled={scannerLoading || !pastedCV}
                    className="px-6 py-3 bg-gradient-to-r from-[#00D4FF] to-[#7B2FFF] text-[#050A14] font-mono text-xs font-bold rounded-xl hover:shadow-[0_0_15px_rgba(0,212,255,0.4)] transition-all cursor-pointer disabled:opacity-50"
                  >
                    {scannerLoading ? "SYNTHESIZING MATRIX..." : "RUN VECTOR SCAN"}
                  </button>
                </div>

                {/* Scan Calc Progress Loader */}
                {scannerLoading && (
                  <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl space-y-2.5 text-center py-6">
                    <div className="w-6 h-6 border-2 border-[#00D4FF] border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="font-mono text-xs text-[#00D4FF] animate-pulse m-0">
                      {calcProgressMsg}
                    </p>
                  </div>
                )}

                {/* Result Displays */}
                {scannerResult && (
                  <div className="p-5 bg-white/[0.01] border border-white/5 rounded-xl space-y-5 animate-fadeIn">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
                      <div>
                        <span className="font-mono text-[10px] text-[#00FFD1] tracking-widest uppercase block mb-1">INGESTION COMPLETE</span>
                        <h4 className="font-display font-medium text-white text-lg m-0">Candidate Credentials</h4>
                      </div>
                      
                      {/* Metric Circle Indicator */}
                      <div className="flex items-center gap-3 bg-white/[0.02] border border-white/10 px-4 py-2 rounded-xl">
                        <span className="font-mono text-xs text-[#8892A4]">FIT SCORE:</span>
                        <span className="font-display font-bold text-lg text-glow-electric text-[#00D4FF]">
                          {scannerResult.score}%
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Subspecialization Matches */}
                      <div className="space-y-2">
                        <span className="font-mono text-xs text-[#8892A4] tracking-wider uppercase block">Suggested Roles Matching</span>
                        <div className="flex flex-col gap-2">
                          {scannerResult.suggestedRoles?.map((r: string, rIdx: number) => (
                            <div key={rIdx} className="flex items-center gap-2 p-2 bg-[#050A14]/80 text-[#8892A4] rounded border border-white/5 text-xs font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]" />
                              {r}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Capabilities Matrix Identifications */}
                      <div className="space-y-2">
                        <span className="font-mono text-xs text-[#8892A4] tracking-wider uppercase block">Identified Capabilities</span>
                        <div className="flex flex-wrap gap-2">
                          {scannerResult.identifiedSkills?.map((s: string, sIdx: number) => (
                            <span key={sIdx} className="font-mono text-[10px] text-[#00FFD1] bg-[#00FFD1]/5 border border-[#00FFD1]/10 px-2 py-1 rounded">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Skill-Gap Nodes */}
                    <div className="space-y-2">
                      <span className="font-mono text-xs text-[#8892A4] tracking-wider uppercase block">Capability Deficit Nodes</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {scannerResult.skillsGap?.map((g: string, gIdx: number) => (
                          <div key={gIdx} className="p-2.5 bg-red-500/5 text-red-200/80 rounded border border-red-500/10 font-sans flex items-start gap-2">
                            <span className="text-red-500 font-bold">•</span>
                            <span>{g}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Personalized advice summary */}
                    <div className="p-4 bg-[#7B2FFF]/5 border border-[#7B2FFF]/15 rounded-xl space-y-1.5 text-xs">
                      <span className="font-mono text-[10px] text-[#7B2FFF] uppercase tracking-wider block font-bold">GEMINI SYSTEM EVALUATION</span>
                      <p className="text-[#8892A4] leading-relaxed m-0 font-sans">
                        {scannerResult.personalizedAdvice}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* MODAL B: AI Interview Coach Terminal Dialogue */}
        {activeConsole === "coach" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050A14]/90 backdrop-blur-md"
            onClick={() => setActiveConsole(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="w-full max-w-2xl bg-[#090F1E] border border-[#00FFD1]/20 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-white/5 bg-white/[0.01]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#00FFD1]/10 text-[#00FFD1] flex items-center justify-center border border-[#00FFD1]/20 shadow-[0_0_10px_rgba(0,255,209,0.1)]">
                    <Terminal size={15} />
                  </div>
                  <h3 className="text-white font-display font-semibold text-base m-0">
                    Synapse Interview Vet Simulator
                  </h3>
                </div>
                <button 
                  onClick={() => setActiveConsole(null)}
                  className="p-1 rounded bg-white/5 border border-white/5 text-[#8892A4] hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Terminal Logs Dialogue */}
              <div className="p-5 space-y-4 bg-black/45 block h-[310px] overflow-y-auto font-mono text-xs text-[#8892A4] scroll-smooth">
                {coachHistory.map((ch, idx) => (
                  <div key={idx} className={`space-y-1 ${ch.sender === 'user' ? 'text-[#00D4FF]' : 'text-[#8892A4]'}`}>
                    <span className="font-bold text-[10px] tracking-wider uppercase block opacity-60">
                      {ch.sender === 'user' ? "CANDIDATE VECT" : "SYNAPSE_COACH"} {`>`}
                    </span>
                    <p className="leading-relaxed m-0 whitespace-pre-wrap">{ch.msg}</p>
                  </div>
                ))}
              </div>

              {/* Chat Form inputs */}
              <form onSubmit={handleCoachSubmit} className="p-4 bg-white/[0.01] border-t border-white/5 flex gap-3">
                <input
                  type="text"
                  placeholder={coachVettingComplete ? "Mock Session Completed successfully." : "Enter reply transcription..."}
                  disabled={coachVettingComplete}
                  value={coachInputs}
                  onChange={(e) => setCoachInputs(e.target.value)}
                  className="flex-grow px-4 py-3 bg-[#050A14]/85 border border-white/10 rounded-xl focus:border-[#00FFD1] focus:outline-none text-xs text-white"
                />
                <button
                  type="submit"
                  disabled={coachVettingComplete || !coachInputs}
                  className="px-5 py-3 bg-gradient-to-r from-[#00FFD1] to-[#00D4FF] text-[#050A14] font-mono text-xs font-bold rounded-xl hover:shadow-[0_0_12px_rgba(0,212,255,0.4)] transition-all cursor-pointer disabled:opacity-40"
                >
                  SEND
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}

        {/* MODAL C: Poster Form Recruiting Ingest Node */}
        {activeConsole === "post-job" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050A14]/90 backdrop-blur-md"
            onClick={() => setActiveConsole(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="w-full max-w-xl bg-[#090F1E] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/[0.01]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#7B2FFF]/10 text-[#7B2FFF] flex items-center justify-center border border-[#7B2FFF]/20">
                    <Briefcase size={15} />
                  </div>
                  <h3 className="text-white font-display font-semibold text-base m-0">
                    Ingest Recruiting Opening Node
                  </h3>
                </div>
                <button 
                  onClick={() => setActiveConsole(null)}
                  className="p-1 rounded bg-white/5 border border-white/5 text-[#8892A4] hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Form entries */}
              <form onSubmit={handlePostJobMock} className="p-6 space-y-4">
                {postedSuccess ? (
                  <div className="text-center p-8 bg-emerald-500/5 border border-emerald-500/20 rounded-xl space-y-3">
                    <CheckCircle2 size={38} className="text-emerald-400 mx-auto animate-bounce" />
                    <h4 className="font-display font-bold text-white text-lg">Hiring Node Latent Ingested!</h4>
                    <p className="text-xs text-[#8892A4] max-w-sm mx-auto">
                      Your requested opening parameters have been compiled and structured safely inside active candidate indexes. Redirecting details...
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="text-xs text-[#8892A4] leading-relaxed">
                      Deploy your active opening positions directly onto our active vector query network, giving vetted candidates zero-guess matching visibility immediately.
                    </p>

                    <div className="space-y-1.5">
                      <label className="font-mono text-[10px] text-[#8892A4] uppercase">JOB TITLE / SPECIFICATION</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Lead Generative AI Researcher" 
                        required 
                        className="w-full px-4 py-3 bg-[#050A14] border border-white/10 focus:border-[#7B2FFF] focus:outline-none rounded-xl text-xs text-white" 
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-mono text-[10px] text-[#8892A4] uppercase">COMPANY / INSTITUTION</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Anthropic Labs" 
                          required 
                          className="w-full px-4 py-3 bg-[#050A14] border border-white/10 focus:border-[#7B2FFF] focus:outline-none rounded-xl text-xs text-white" 
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-mono text-[10px] text-[#8892A4] uppercase">LOCATION DESIRED</label>
                        <input 
                          type="text" 
                          placeholder="e.g. SF, CA or Remote" 
                          required 
                          className="w-full px-4 py-3 bg-[#050A14] border border-white/10 focus:border-[#7B2FFF] focus:outline-none rounded-xl text-xs text-white" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-mono text-[10px] text-[#8892A4] uppercase">ESTIMATED ANNUITY BASE</label>
                        <input 
                          type="text" 
                          placeholder="e.g. $190,000" 
                          required 
                          className="w-full px-4 py-3 bg-[#050A14] border border-white/10 focus:border-[#7B2FFF] focus:outline-none rounded-xl text-xs text-white" 
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-mono text-[10px] text-[#8892A4] uppercase">OPENING CLASSIFICATION</label>
                        <select className="w-full px-4 py-3 bg-[#050A14] border border-white/10 focus:border-[#7B2FFF] focus:outline-none rounded-xl text-xs text-white">
                          <option>AI/ML Track</option>
                          <option>Frontend Systems</option>
                          <option>Backend Systems</option>
                          <option>Design & spatial</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono text-[10px] text-[#8892A4] uppercase">KEY SKILL NODE VECTOR TAGS</label>
                      <input 
                        type="text" 
                        placeholder="e.g. PyTorch, Rust, LangChain (comma list)" 
                        required 
                        className="w-full px-4 py-3 bg-[#050A14] border border-white/10 focus:border-[#7B2FFF] focus:outline-none rounded-xl text-xs text-[#00FFD1]" 
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 mt-2 bg-gradient-to-r from-[#7B2FFF] to-[#00D4FF] text-white font-mono text-xs font-bold uppercase rounded-xl hover:shadow-[0_0_15px_rgba(123,47,255,0.4)] transition-all cursor-pointer"
                    >
                      COMPILE & BROADCAST NODE
                    </button>
                  </>
                )}
              </form>
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>

      <Analytics />
    </div>
  );
}
