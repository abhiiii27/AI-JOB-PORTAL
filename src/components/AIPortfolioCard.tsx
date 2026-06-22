import { AISpecialization } from "../types";
import { Sparkles, Brain, Cpu, MapPin, DollarSign, Calendar, Flame, Briefcase } from "lucide-react";

interface AIPortfolioCardProps {
  fullName: string;
  coreRole: AISpecialization;
  skills: string;
  bio: string;
  expectedSalary: number;
  preferredWorkType: string;
  resumeFileName?: string;
  aiScore?: number;
}

export default function AIPortfolioCard({
  fullName,
  coreRole,
  skills,
  bio,
  expectedSalary,
  preferredWorkType,
  resumeFileName,
  aiScore
}: AIPortfolioCardProps) {
  
  // Format the skills input into nice technical badges
  const skillsArray = skills
    ? skills.split(",").map(s => s.trim()).filter(s => s.length > 0)
    : ["Python", "PyTorch", "Model Fine-Tuning"];

  // Select matching mock jobs to showcase live response
  const getSimulatedJobsOnSelection = (role: AISpecialization) => {
    switch (role) {
      case AISpecialization.GENERATIVE_AI:
        return [
          { title: "Senior LLM Architect", company: "Aura Networks", salary: "$180K - $220K", type: "Remote", match: 98 },
          { title: "RAG Pipeline Engineer", company: "DeepSearch", salary: "$155K - $175K", type: "Hybrid", match: 91 }
        ];
      case AISpecialization.ML_ENGINEER:
        return [
          { title: "Distributed Training Lead", company: "TensorCompute", salary: "$195K - $230K", type: "Remote", match: 96 },
          { title: "Edge ML Inference Developer", company: "RoboSystems", salary: "$160K - $190K", type: "Onsite", match: 89 }
        ];
      case AISpecialization.DATA_SCIENTIST:
        return [
          { title: "AI Prompt Optimization Engineer", company: "AlignLabs", salary: "$140K - $165K", type: "Remote", match: 94 },
          { title: "Generative Semantic Researcher", company: "Synthetix Inc", salary: "$150K - $180K", type: "Hybrid", match: 88 }
        ];
      case AISpecialization.RESEARCH_SCIENTIST:
        return [
          { title: "Multimodal Vision Expert", company: "VisionForge", salary: "$210K - $245K", type: "Onsite", match: 97 },
          { title: "NLP Transformer Scientist", company: "LexiconAI", salary: "$190K - $220K", type: "Remote", match: 92 }
        ];
      case AISpecialization.AI_PRODUCT_MANAGER:
        return [
          { title: "Lead AI Agents Product Director", company: "AgenticFlow", salary: "$175K - $210K", type: "Remote", match: 95 },
          { title: "PM - LLM Safety Foundation", company: "OmniModel Lab", salary: "$165K - $195K", type: "Hybrid", match: 90 }
        ];
      case AISpecialization.AI_ETHICIST:
        return [
          { title: "AI Alignment Auditor", company: "Guardrails.ai", salary: "$150K - $185K", type: "Remote", match: 99 },
          { title: "Policy & Fairness Ethicist", company: "Humanity Labs", salary: "$140K - $170K", type: "Hybrid", match: 93 }
        ];
      default:
        return [
          { title: "Senior AI Engineer", company: "GeneralCognition", salary: "$170K - $205K", type: "Remote", match: 95 }
        ];
    }
  };

  const simulationJobs = getSimulatedJobsOnSelection(coreRole);

  return (
    <div id="portfolio-card-root" className="card border-0 rounded-4 text-neutral-800 position-relative overflow-hidden shadow-md h-100"
         style={{
           background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 100%)",
           backdropFilter: "blur(24px) saturate(180%)",
           WebkitBackdropFilter: "blur(24px) saturate(180%)",
           border: "1px solid rgba(0, 0, 0, 0.08)",
         }}>
      
      {/* Absolute floating gradient orbs for high visual fidelity */}
      <div className="position-absolute bg-violet-400 rounded-circle filter blur-3xl opacity-10"
           style={{ top: "-10%", right: "-10%", width: "160px", height: "160px", filter: "blur(90px)" }}></div>
      <div className="position-absolute bg-blue-300 rounded-circle filter blur-3xl opacity-10"
           style={{ bottom: "20%", left: "-15%", width: "200px", height: "200px", filter: "blur(110px)" }}></div>

      <div className="card-body p-4 d-flex flex-column justify-content-between h-100 z-1 position-relative">
        <div>
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <span className="bg-neutral-50 border border-neutral-200/80 d-inline-flex align-items-center gap-1 py-1.5 px-3 rounded-pill text-violet-600 font-monospace small">
              <Sparkles size={14} className="text-violet-600 animate-pulse" />
              INTELLIGENT MATCH PASSPORT
            </span>
            <div className="d-flex align-items-center gap-2">
              <span className="w-2 h-2 rounded-circle bg-violet-600 shadow-violet-500/50 d-inline-block"></span>
              <span className="font-monospace small opacity-50 text-neutral-500" style={{ fontSize: "11px" }}>LIVE PORTAL RECEPTOR</span>
            </div>
          </div>

          {/* Badge Layout */}
          <div className="d-flex align-items-center gap-3 mb-4">
            <div className="rounded-circle p-0.5 bg-gradient-to-tr from-violet-600 to-blue-500 shadow" style={{ width: "64px", height: "64px" }}>
              <div className="bg-white rounded-circle w-100 h-100 d-flex align-items-center justify-content-center text-violet-600" style={{ border: "1px solid rgba(0, 0, 0, 0.04)" }}>
                <Brain size={32} className="opacity-90" />
              </div>
            </div>
            <div>
              <h4 className="fw-bold fs-5 mb-0 text-truncate text-capitalize font-heading text-neutral-905" style={{ letterSpacing: "-0.5px" }}>
                {fullName ? fullName : "Julian Thorne"}
              </h4>
              <p className="text-violet-650 font-monospace fw-semibold small mb-0">{coreRole}</p>
            </div>
          </div>

          {/* AI Score (if evaluated) */}
          {aiScore !== undefined && (
            <div className="bg-neutral-50/50 border border-neutral-100 rounded-3 p-3 mb-4 d-flex justify-content-between align-items-center">
              <div>
                <p className="text-neutral-500 font-monospace small mb-1">CANDIDATE STRENGTH INDEX</p>
                <p className="small mb-0 text-neutral-600/90">Gemini Resume Optimization Grade</p>
              </div>
              <div className="text-end">
                <span className="fs-3 fw-bold text-violet-600 font-monospace">{aiScore}%</span>
                <span className="d-block small text-success fw-medium">Optimized</span>
              </div>
            </div>
          )}

          {/* Bio / Motivation */}
          <div className="mb-4">
            <p className="text-neutral-500 font-monospace small mb-2 uppercase tracking-wide" style={{ fontSize: "11px" }}>PROFESSIONAL FOCUS</p>
            <p className="text-neutral-600 fs-7 mb-0 italic" style={{ lineHeight: "1.5" }}>
              "{bio ? bio : "Start writing your profile bio or tap 'AI Enhance Bio' to use Gemini client parsing to build a high-conversion professional overview right here..."}"
            </p>
          </div>

          {/* Skills Grid */}
          <div className="mb-4">
            <p className="text-neutral-500 font-monospace small mb-2 uppercase" style={{ fontSize: "11px" }}>CORE INDEX SKILLS</p>
            <div className="d-flex flex-wrap gap-2">
              {skillsArray.map((skill, index) => (
                <span key={index} className="bg-neutral-50 border border-neutral-200/80 text-neutral-700 fw-normal py-1.5 px-2.5 rounded d-inline-block">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section: Preferences & Matching Jobs */}
        <div className="mt-auto border-top border-neutral-200 pt-4">
          <div className="row g-2 mb-4">
            <div className="col-6">
              <span className="text-neutral-500 font-monospace small d-block" style={{ fontSize: "11px" }}>EXPECTED ANNUITY</span>
              <span className="fw-semibold text-neutral-800 font-monospace small">
                <DollarSign size={14} className="d-inline text-violet-600 align-text-bottom" />
                {expectedSalary ? `${expectedSalary}k / year` : "$120k+ / year"}
              </span>
            </div>
            <div className="col-6">
              <span className="text-neutral-500 font-monospace small d-block" style={{ fontSize: "11px" }}>OPERATIONAL TYPE</span>
              <span className="fw-semibold text-neutral-800 font-monospace small">
                <Cpu size={14} className="d-inline text-violet-600 align-text-bottom me-1" />
                {preferredWorkType}
              </span>
            </div>
          </div>

          {/* Match Indicators */}
          <div>
            <div className="d-flex align-items-center gap-1.5 mb-2">
              <Briefcase size={14} className="text-violet-600" />
              <span className="text-neutral-800 font-monospace small fw-semibold">REAL-TIME PORTAL MATCHINGS</span>
            </div>
            <div className="d-flex flex-column gap-2">
              {simulationJobs.map((job, idx) => (
                <div key={idx} className="bg-white hover:bg-neutral-50 transition-all p-2.5 rounded-3 border border-neutral-200/60 d-flex justify-content-between align-items-center" style={{ transition: "all 0.25s ease" }}>
                  <div>
                    <h6 className="mb-0 text-neutral-800 small fw-semibold text-truncate" style={{ maxWidth: "160px" }}>{job.title}</h6>
                    <span className="text-neutral-500 small font-monospace" style={{ fontSize: "10px" }}>{job.company} • {job.salary}</span>
                  </div>
                  <span className="bg-violet-50 text-violet-700 font-monospace small d-flex align-items-center gap-1 border border-violet-100 py-1 px-2.5 rounded-pill">
                    <Flame size={12} className="text-violet-600 animate-pulse" />
                    {job.match}% match
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
