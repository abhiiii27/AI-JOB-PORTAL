import React, { useState } from 'react';
import { Mail, Github, Twitter, Linkedin, Send } from 'lucide-react';

export function FuturisticFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="relative w-full overflow-hidden mt-16 md:mt-24 pointer-events-auto">
      {/* Animated Gradient Wave Divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0">
        <svg 
          className="relative block w-full h-[60px]" 
          data-name="Layer 1" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V113c47-24,103.11-38.31,162.39-44.6C218,63,266.39,63.11,321.39,56.44Z" 
            fill="url(#wave-grad)"
            opacity="0.08"
          />
          <defs>
            <linearGradient id="wave-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7B2FFF" />
              <stop offset="100%" stopColor="#00D4FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-10 relative z-1">
        {/* Upper Newsletter Panel */}
        <div className="glass-panel p-8 md:p-12 mb-16 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="absolute top-1/2 -right-10 -translate-y-1/2 w-80 h-80 bg-[#00FFD1]/5 rounded-full filter blur-[100px] pointer-events-none" />
          
          <div className="space-y-2 text-center lg:text-left">
            <h4 className="font-display font-bold text-xl md:text-2xl text-white tracking-tight">
              Synchronize Career Intelligence
            </h4>
            <p className="text-sm text-[#8892A4] max-w-md">
              Receive alert signals immediately as soon as top-tier labs matching your telemetry score vectors launch.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="relative flex items-center w-full lg:max-w-md">
            {subscribed ? (
              <div className="w-full text-center py-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl font-mono text-xs tracking-wider">
                ✓ EMAIL INGESTED TO SYSTEM NODE
              </div>
            ) : (
              <>
                <div className="absolute inset-0 bg-[#00D4FF]/5 rounded-xl blur-md pointer-events-none" />
                <input
                  type="email"
                  placeholder="Insert coordinates (email)..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-4 pr-14 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl focus:border-[#00FFD1] focus:outline-none focus:ring-1 focus:ring-[#00FFD1]/40 text-sm font-sans text-white transition-all placeholder-[#8892A4]/50"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-2 px-3 py-2 rounded-lg bg-gradient-to-r from-[#00D4FF] to-[#7B2FFF] text-[#050A14] hover:shadow-[0_0_12px_rgba(0,212,255,0.4)] transition-all cursor-pointer flex items-center justify-center hover:scale-105 active:scale-95"
                >
                  <Send size={14} />
                </button>
              </>
            )}
          </form>
        </div>

        {/* Middle Footer Columns */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-10 md:gap-14 border-b border-white/5 pb-16 mb-10">
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-tr from-[#7B2FFF] to-[#00D4FF] rounded-lg flex items-center justify-center shadow-md">
                <span className="font-bold text-md text-white">Σ</span>
              </div>
              <span className="font-display font-semibold tracking-wider text-white text-lg">
                SYNAPSE<span className="text-[#00FFD1] text-xs">.ai</span>
              </span>
            </div>
            <p className="text-sm text-[#8892A4] leading-relaxed">
              Durable neural pathways connecting engineering vectors to top-tier enterprise labs and high-scale protocols globally.
            </p>
          </div>

          <div>
            <h5 className="font-display font-bold text-xs uppercase tracking-wider text-[#8892A4] mb-4">
              Consoles
            </h5>
            <ul className="space-y-2.5 text-xs text-[#8892A4]/80">
              <li><a href="#" className="hover:text-white transition-colors">Find Opportunities</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ingest Talents</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Vector Scoring</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sandbox.v8</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-display font-bold text-xs uppercase tracking-wider text-[#8892A4] mb-4">
              Resources
            </h5>
            <ul className="space-y-2.5 text-xs text-[#8892A4]/80">
              <li><a href="#" className="hover:text-white transition-colors">Research Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Channels</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Telemetry Matrix</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Node Registry</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-display font-bold text-xs uppercase tracking-wider text-[#8892A4] mb-4">
              Company
            </h5>
            <ul className="space-y-2.5 text-xs text-[#8892A4]/80">
              <li><a href="#" className="hover:text-white transition-colors">About Protocol</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Core Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Media Kit</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security Node</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-display font-bold text-xs uppercase tracking-wider text-[#8892A4] mb-4">
              Legal
            </h5>
            <ul className="space-y-2.5 text-xs text-[#8892A4]/80">
              <li><a href="#" className="hover:text-white transition-colors">Service Terms</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Access Controls</a></li>
              <li><a href="#" className="hover:text-white transition-colors font-mono text-[9px] text-[#00FFD1] bg-[#00FFD1]/5 border border-[#00FFD1]/10 px-1 py-0.5 rounded">GDPR ACTIVE</a></li>
            </ul>
          </div>
        </div>

        {/* Lower Banner Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 text-center">
          <p className="font-mono text-[10px] text-[#8892A4]">
            © 2026 SYNAPSE PROTOCOLS. OPERATIONAL PORTAL INDEX: #BD-39X92. ALL SYSTEM RIGHTS PRESERVED.
          </p>

          {/* Glowing social links */}
          <div className="flex items-center gap-4">
            <a href="#" className="p-2 rounded-lg bg-white/5 border border-white/5 text-[#8892A4] hover:text-[#00D4FF] hover:border-[#00D4FF]/35 hover:scale-105 transition-all">
              <Github size={15} />
            </a>
            <a href="#" className="p-2 rounded-lg bg-white/5 border border-white/5 text-[#8892A4] hover:text-[#7B2FFF] hover:border-[#7B2FFF]/35 hover:scale-105 transition-all">
              <Twitter size={15} />
            </a>
            <a href="#" className="p-2 rounded-lg bg-white/5 border border-white/5 text-[#8892A4] hover:text-[#00FFD1] hover:border-[#00FFD1]/35 hover:scale-105 transition-all">
              <Linkedin size={15} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
