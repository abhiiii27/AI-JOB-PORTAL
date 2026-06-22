import React, { useRef, useState, useEffect } from 'react';
import { Cpu, Sparkles, BrainCircuit } from 'lucide-react';

interface TiltCardProps {
  icon: React.ReactNode;
  tag: string;
  title: string;
  desc: string;
  glowColor: string; // Tailwinds colors or hex codes
  onClick?: () => void;
}

function TiltCard({ icon, tag, title, desc, glowColor, onClick }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Mouse coords relative to card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalized coords (-0.5 to 0.5)
    const xc = x / rect.width - 0.5;
    const yc = y / rect.height - 0.5;
    
    // Max rotation 15deg
    setRotate({
      x: -yc * 20,
      y: xc * 20
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="glass-panel relative overflow-hidden p-6 md:p-8 hover:border-opacity-40 hover:shadow-[0_0_24px_rgba(0,212,255,0.06)] transition-all duration-300 w-full cursor-pointer select-none active:scale-[0.98]"
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${isHovered ? 1.02 : 1})`,
        transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1), border-color 0.3s ease, hover-shadow 0.3s ease',
        boxShadow: isHovered ? `0 15px 45px -10px ${glowColor}1a` : 'none',
        height: '100%',
        minHeight: '280px'
      }}
    >
      {/* Background glow node following cursor style inside card */}
      <div 
        className="absolute w-48 h-48 rounded-full pointer-events-none filter blur-2xl opacity-10 transition-opacity"
        style={{
          background: glowColor,
          top: '-20%',
          right: '-10%',
          zIndex: 0
        }}
      />

      <div className="relative z-1 flex flex-col h-full justify-between">
        <div>
          {/* Header Icon with background badge */}
          <div className="flex items-center gap-3 mb-5">
            <div 
              className="p-3.5 rounded-xl flex items-center justify-center transition-all duration-300"
              style={{
                background: `${glowColor}12`,
                border: `1px solid ${glowColor}25`,
                color: glowColor,
                boxShadow: isHovered ? `0 0 16px ${glowColor}22` : 'none'
              }}
            >
              {icon}
            </div>
            <span 
              className="font-mono text-xs uppercase tracking-wider px-2.5 py-1 rounded bg-white/5 border border-white/10"
              style={{ color: '#8892A4' }}
            >
              {tag}
            </span>
          </div>

          <h3 className="font-display text-xl md:text-2xl font-bold mb-3 text-white tracking-tight">
            {title}
          </h3>
          <p className="text-sm text-[#8892A4] leading-relaxed">
            {desc}
          </p>
        </div>

        {/* Micro indicator arrow drawing effect on hover */}
        <div className="pt-6 flex items-center gap-2 group text-xs font-mono tracking-widest text-[#00FFD1] w-fit">
          <span>ENGAGE SYSTEM</span>
          <span className="transform transition-transform duration-300 translate-x-0 group-hover:translate-x-1.5 font-bold">→</span>
        </div>
      </div>
    </div>
  );
}

interface FeatureCardGridProps {
  onScanClick?: () => void;
  onMatchClick?: () => void;
  onCoachClick?: () => void;
}

export function FeatureCardGrid({ onScanClick, onMatchClick, onCoachClick }: FeatureCardGridProps) {
  const cardsData = [
    {
      icon: <BrainCircuit size={22} />,
      tag: "Scanner.v2",
      title: "AI Resume Scanner",
      desc: "Our neural ingestion parser extracts deep vector parameters from your uploaded resume. Instantly maps latent engineering skills directly to top-tier requirements.",
      glowColor: "#00D4FF", // Electric blue
      onClick: onScanClick
    },
    {
      icon: <Cpu size={22} />,
      tag: "Match.v9",
      title: "Smart Job Matching",
      desc: "Scores match compatibility against active system index nodes. Evaluates engineering seniority, stack synergy, expected annuity margins, and cultural parameters.",
      glowColor: "#7B2FFF", // Neon violet
      onClick: onMatchClick
    },
    {
      icon: <Sparkles size={22} />,
      tag: "Coach.v4",
      title: "AI Interview Coach",
      desc: "Strap into real-time feedback simulator runs. Train against standard voice prompts, code structure constraints, and core technical vectors with Gemini model loops.",
      glowColor: "#00FFD1", // Cyan glow
      onClick: onCoachClick
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full">
      {cardsData.map((card, index) => (
        <div key={index} className="w-full">
          <TiltCard
            icon={card.icon}
            tag={card.tag}
            title={card.title}
            desc={card.desc}
            glowColor={card.glowColor}
            onClick={card.onClick}
          />
        </div>
      ))}
    </div>
  );
}
