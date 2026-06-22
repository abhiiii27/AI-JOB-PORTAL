import React, { useState } from 'react';
import { Upload, Cpu, Target, CheckCircle2 } from 'lucide-react';

interface Step {
  num: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

interface HowItWorksProps {
  onStepClick?: (idx: number) => void;
}

export function HowItWorks({ onStepClick }: HowItWorksProps) {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps: Step[] = [
    {
      num: "01",
      title: "Upload Resume",
      desc: "Drag-drop or connect your professional identity dossier. Our ingestion agents parse text variables securely.",
      icon: <Upload size={22} />
    },
    {
      num: "02",
      title: "AI Analysis",
      desc: "Our neural pipelines parse credentials against active system vectors, indexing hidden core abilities.",
      icon: <Cpu size={22} />
    },
    {
      num: "03",
      title: "Smart Matches",
      desc: "Instantly score match parameters against leading labs, showing precise project stack compatibility.",
      icon: <Target size={22} />
    },
    {
      num: "04",
      title: "Apply with 1-Click",
      desc: "Direct-route encrypted vector parameters straight to hiring panels. Secure scheduling in seconds.",
      icon: <CheckCircle2 size={22} />
    }
  ];

  return (
    <div className="w-full">
      {/* Horizontal timeline container (Desktop) / Vertical list (Mobile) */}
      <div className="relative">
        {/* Connection pipe line (Desktop only) */}
        <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-[2px] bg-white/10 z-0">
          {/* Glowing active animated pipeline track */}
          <div 
            className="h-full bg-gradient-to-r from-[#7B2FFF] via-[#00D4FF] to-[#00FFD1] transition-all duration-1000"
            style={{ 
              width: `${(activeStep / (steps.length - 1)) * 100}%`,
              boxShallow: "0 0 12px #00D4FF" 
            }}
          />
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-1">
          {steps.map((step, idx) => {
            const isActive = idx <= activeStep;
            const isCurrent = idx === activeStep;

            return (
              <div 
                key={idx}
                onClick={() => {
                  setActiveStep(idx);
                  if (onStepClick) {
                    onStepClick(idx);
                  }
                }}
                className={`group cursor-pointer p-6 rounded-2xl transition-all duration-500 relative flex flex-col items-center lg:items-start text-center lg:text-left ${
                  isCurrent 
                    ? 'bg-white/[0.04] border border-[#00D4FF]/30 shadow-[0_0_20px_rgba(0,212,255,0.05)]' 
                    : isActive 
                    ? 'bg-transparent border border-white/10' 
                    : 'bg-transparent border border-white/5 opacity-50 hover:opacity-80'
                }`}
              >
                {/* Step indicator index */}
                <span className="absolute top-4 right-5 font-mono text-xs text-[#8892A4]/40 font-bold">
                  {step.num}
                </span>

                {/* Rotating 3D icon node */}
                <div 
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-500 transform ${
                    isCurrent 
                      ? 'bg-gradient-to-br from-[#00D4FF] to-[#7B2FFF] text-white rotate-[10deg] shadow-[0_0_15px_rgba(0,212,255,0.4)] scale-110' 
                      : isActive 
                      ? 'bg-[#00D4FF]/10 text-[#00D4FF] rotate-0' 
                      : 'bg-white/5 text-[#8892A4] group-hover:rotate-6'
                  }`}
                  style={{
                    perspective: '100px'
                  }}
                >
                  {step.icon}
                </div>

                <h4 className={`font-display font-bold text-lg mb-2 transition-colors ${isCurrent ? 'text-white' : 'text-[#8892A4] group-hover:text-white'}`}>
                  {step.title}
                </h4>

                <p className="text-sm text-[#8892A4] leading-relaxed">
                  {step.desc}
                </p>

                {/* Active progress feedback */}
                {isCurrent && (
                  <span className="mt-4 font-mono text-[9px] text-[#00FFD1] tracking-widest uppercase">
                    • NODE STAGE ACTIVE
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
