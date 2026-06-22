import React, { useState, useEffect } from 'react';
import { Search, Briefcase, MapPin, DollarSign, Sparkles } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  logoColor: string;
  logoLetter: string;
  location: string;
  type: 'Remote' | 'Full-time' | 'AI/ML' | 'Frontend' | 'Backend' | 'Design';
  salary: string;
  matchScore: number;
  skills: string[];
}

const JOBS_DATA: Job[] = [
  {
    id: "job-1",
    title: "Lead AI Research Architect",
    company: "Aetheris DeepMind Studio",
    logoColor: "#7B2FFF",
    logoLetter: "A",
    location: "San Francisco, CA (Hybrid)",
    type: "AI/ML",
    salary: "$230k - $310k",
    matchScore: 98,
    skills: ["Gemini-SDK", "PyTorch", "Rust", "Transformers", "CUDA"]
  },
  {
    id: "job-2",
    title: "Quantum Frontend Engineer",
    company: "Anthropic Labs",
    logoColor: "#00D4FF",
    logoLetter: "Φ",
    location: "Remote",
    type: "Remote",
    salary: "$190k - $240k",
    matchScore: 94,
    skills: ["React 19", "WebAssembly", "WebGL", "Three.js", "Tailwind"]
  },
  {
    id: "job-3",
    title: "Machine Learning Platform Architect",
    company: "Scale AI Networks",
    logoColor: "#00FFD1",
    logoLetter: "S",
    location: "New York, NY",
    type: "AI/ML",
    salary: "$210k - $275k",
    matchScore: 89,
    skills: ["Ray", "Kubernetes", "C++", "Python", "gRPC"]
  },
  {
    id: "job-4",
    title: "WebAssembly Compiler Specialist",
    company: "Vercel Core Team",
    logoColor: "#FF2A85",
    logoLetter: "▲",
    location: "Remote",
    type: "Frontend",
    salary: "$200k - $260k",
    matchScore: 92,
    skills: ["Rust", "Wasm", "TypeScript", "V8-Engine", "Node.js"]
  },
  {
    id: "job-5",
    title: "Bio-Logic Data Scientist",
    company: "Neuralink Genomics",
    logoColor: "#FFB800",
    logoLetter: "N",
    location: "Austin, TX",
    type: "Backend",
    salary: "$220k - $290k",
    matchScore: 86,
    skills: ["Python", "SciPy", "TensorFlow", "PostgreSQL", "Kafka"]
  },
  {
    id: "job-6",
    title: "Spatial UI Integration Architect",
    company: "Meta Reality Labs",
    logoColor: "#a855f7",
    logoLetter: "M",
    location: "Seattle, WA (Hybrid)",
    type: "Design",
    salary: "$180k - $235k",
    matchScore: 81,
    skills: ["WebGL", "Three.js", "Figma", "WebXR", "Motion Design"]
  }
];

interface ScoreRingProps {
  score: number;
}

function MatchScoreRing({ score }: ScoreRingProps) {
  // SVG circular properties
  const radius = 24;
  const strokeWidth = 3.5;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Decide colors based on score tiers
  const getGradientId = () => `score-grad-${score}`;
  const getGlowColor = () => {
    if (score >= 90) return '#00FFD1';
    if (score >= 80) return '#00D4FF';
    return '#7B2FFF';
  };

  return (
    <div className="relative flex items-center justify-center w-16 h-16 flex-shrink-0">
      <svg className="w-16 h-16 transform -rotate-90">
        <defs>
          <linearGradient id={getGradientId()} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7B2FFF" />
            <stop offset="50%" stopColor="#00D4FF" />
            <stop offset="100%" stopColor="#00FFD1" />
          </linearGradient>
        </defs>
        {/* Track circle */}
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="transparent"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth={strokeWidth}
        />
        {/* Animated Fill circle */}
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="transparent"
          stroke={`url(#${getGradientId()})`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 1.5s cubic-bezier(0.25, 0.8, 0.25, 1)',
            filter: `drop-shadow(0 0 3px ${getGlowColor()}44)`
          }}
        />
      </svg>
      {/* Absolute Percentage Text */}
      <div className="absolute flex flex-col items-center justify-center">
        <span className="font-display text-sm font-bold text-white leading-none">
          {score}%
        </span>
        <span className="font-mono text-[8px] text-[#00FFD1] tracking-widest leading-none mt-0.5">
          FIT
        </span>
      </div>
    </div>
  );
}

export function JobListings() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [appliedJobs, setAppliedJobs] = useState<Record<string, boolean>>({});

  const filterChips = ["All", "Remote", "Full-time", "AI/ML", "Frontend", "Backend", "Design"];

  const handleApply = (id: string) => {
    if (appliedJobs[id]) return;
    setAppliedJobs(prev => ({ ...prev, [id]: true }));
  };

  const filteredJobs = JOBS_DATA.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesFilter = 
      activeFilter === "All" || job.type === activeFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="w-full">
      {/* Searching & Filter Bar Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-8">
        <div className="lg:col-span-4 relative flex items-center">
          {/* Animated pulsing search input glow wrappers */}
          <div className="absolute inset-0 bg-[#00D4FF]/5 rounded-xl blur-md pointer-events-none" />
          <input
            type="text"
            placeholder="Query credentials, roles, or vectors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl focus:border-[#00D4FF] focus:outline-none focus:ring-1 focus:ring-[#00D4FF]/40 text-sm font-sans tracking-wide text-white transition-all relative z-1 placeholder-[#8892A4]/50"
          />
          <Search size={18} className="absolute left-4 text-[#8892A4] z-10" />
        </div>

        {/* Categories Chips */}
        <div className="lg:col-span-8 flex items-center gap-1.5 overflow-x-auto pb-1.5 lg:pb-0 scrollbar-none">
          {filterChips.map((filter, index) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={index}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 text-xs font-mono tracking-wider rounded-xl border transition-all pointer-events-auto whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-[#7B2FFF]/30 to-[#00D4FF]/30 border-[#00D4FF]/50 text-white shadow-[0_0_15px_rgba(0,212,255,0.15)] scale-[1.02]'
                    : 'bg-white/[0.02] border-white/5 text-[#8892A4] hover:border-white/20 hover:text-white'
                }`}
              >
                {filter === "All" ? "ALL NODES" : filter.toUpperCase()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid List Rows of Jobs */}
      <div className="space-y-5">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => {
            const isApplied = appliedJobs[job.id];
            return (
              <div
                key={job.id}
                className="glass-panel p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 transition-transform duration-300 hover:scale-[1.01]"
              >
                {/* Left Block Content */}
                <div className="flex items-start gap-4">
                  {/* Glowing logo avatar */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg text-white font-display border shadow-[0_0_12px_rgba(255,255,255,0.02)]"
                    style={{
                      background: `linear-gradient(135deg, ${job.logoColor}cc, ${job.logoColor}33)`,
                      borderColor: `${job.logoColor}40`,
                      boxShadow: `0 0 16px ${job.logoColor}22`
                    }}
                  >
                    {job.logoLetter}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h4 className="font-display font-medium text-lg leading-tight text-white hover:text-[#00D4FF] transition-colors">
                        {job.title}
                      </h4>
                      <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#7B2FFF]/10 border border-[#7B2FFF]/20 text-[#7B2FFF]">
                        {job.type}
                      </span>
                    </div>

                    <p className="text-sm font-medium text-[#8892A4] mb-3">
                      {job.company}
                    </p>

                    {/* Metadata indicators */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#8892A4]/80">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={13} className="text-[#00D4FF]" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <DollarSign size={13} className="text-[#00FFD1]" />
                        {job.salary}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Analytics and Apply Trigger */}
                <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-6 border-t border-white/5 md:border-0 pt-4 md:pt-0 leading-none">
                  {/* Circular progress matching scoring component */}
                  <MatchScoreRing score={job.matchScore} />

                  {/* Skills tags and apply actions inline wrapper */}
                  <div className="flex flex-col items-end gap-3.5">
                    {/* Monaco Skills Inline */}
                    <div className="hidden lg:flex items-center gap-1.5">
                      {job.skills.slice(0, 3).map((skill, si) => (
                        <span key={si} className="font-mono text-[10px] text-[#8892A4] bg-white/[0.02] border border-white/5 px-2 py-0.5 rounded">
                          {skill}
                        </span>
                      ))}
                      {job.skills.length > 3 && (
                        <span className="font-mono text-[10px] text-[#00FFD1] bg-[#00FFD1]/5 border border-[#00FFD1]/10 px-1.5 py-0.5 rounded">
                          +{job.skills.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Button trigger with customized shimmers */}
                    <button
                      onClick={() => handleApply(job.id)}
                      disabled={isApplied}
                      className={`px-5 py-2.5 rounded-xl font-mono text-xs tracking-wider font-semibold transition-all duration-300 w-full md:w-40 border ${
                        isApplied
                          ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400 cursor-default'
                          : 'border-[#00D4FF] bg-[#00D4FF]/10 text-[#00D4FF] hover:bg-[#00D4FF] hover:text-[#050A14] hover:shadow-[0_0_15px_rgba(0,212,255,0.3)] shimmer-btn cursor-pointer scale-100 hover:scale-[1.03] active:scale-[0.98]'
                      }`}
                    >
                      {isApplied ? (
                        <span className="flex items-center justify-center gap-1.5">
                          ✓ APPLIED v2
                        </span>
                      ) : (
                        "SYNC INTERVECT"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="glass-panel p-12 text-center text-[#8892A4]">
            <Sparkles size={36} className="mx-auto mb-3 text-[#7B2FFF] animate-bounce" />
            <h5 className="font-display font-semibold text-white text-lg mb-1">Vector Index Depleted</h5>
            <p className="text-sm">No synchronized openings found mapping to your requested keywords.</p>
          </div>
        )}
      </div>
    </div>
  );
}
