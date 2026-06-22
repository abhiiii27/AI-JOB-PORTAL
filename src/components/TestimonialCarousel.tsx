import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  avatarColor: string;
  quote: string;
}

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    name: "Elena Rostova",
    role: "Core Compiler Lead @ DeepMind",
    avatarColor: "#00FFD1",
    quote: "Synapse's neural matchmaking bypasses standard recruiter layers completely. The vectors plotted my WebAssembly stack to exactly the compiler division here. Reached signing in 4 days."
  },
  {
    name: "Marcus Vance",
    role: "ML Platforms Director @ ScaleAI",
    avatarColor: "#7B2FFF",
    quote: "Our ingestion rates grew 10x, and sourcing quality spiked. Having candidates pre-parsed and pre-committed on specific salary vectors saves dozens of technical screening hours."
  },
  {
    name: "Akihiro Tanaka",
    role: "Distributed Core Engineer @ Vercel",
    avatarColor: "#00D4FF",
    quote: "The visual portal interface felt futuristic, and the actual match precision was scary. I did my coach training runs against the voice bot. Felt standard when we stepped into the actual console panel."
  }
];

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto position-relative" style={{ minHeight: '360px' }}>
      {/* 3D container alignment */}
      <div 
        className="relative w-full flex items-center justify-center pt-8 pb-12"
        style={{ perspective: "1200px" }}
      >
        {TESTIMONIALS_DATA.map((t, idx) => {
          const isActive = idx === currentIndex;
          const isPrev = idx === (currentIndex - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length;
          const isNext = idx === (currentIndex + 1) % TESTIMONIALS_DATA.length;

          // Compute custom 3D state class variables
          let transformStyle = '';
          let opacityStyle = 0;
          let zIndexStyle = 0;

          if (isActive) {
            transformStyle = 'rotateY(0deg) translateZ(50px) scale(1)';
            opacityStyle = 1;
            zIndexStyle = 10;
          } else if (isPrev) {
            transformStyle = 'rotateY(35deg) translateZ(-150px) translateX(-50%)';
            opacityStyle = 0.35;
            zIndexStyle = 1;
          } else if (isNext) {
            transformStyle = 'rotateY(-35deg) translateZ(-150px) translateX(50%)';
            opacityStyle = 0.35;
            zIndexStyle = 1;
          } else {
            transformStyle = 'rotateY(0deg) translateZ(-300px)';
            opacityStyle = 0;
            zIndexStyle = 0;
          }

          return (
            <div
              key={idx}
              className="absolute w-full max-w-md md:max-w-xl transition-all duration-700 ease-out cursor-pointer pointer-events-auto"
              style={{
                transform: transformStyle,
                opacity: opacityStyle,
                zIndex: zIndexStyle,
                transformStyle: 'preserve-3d'
              }}
              onClick={() => setCurrentIndex(idx)}
            >
              <div 
                className={`glass-panel p-6 md:p-8 rounded-3xl border border-white/10 ${
                  isActive ? 'border-[#00D4FF]/30 shadow-[0_15px_35px_rgba(0,212,255,0.06)]' : ''
                }`}
              >
                {/* Floating quotes bracket decorative */}
                <div 
                  className="font-serif select-none absolute top-4 left-6 text-6xl leading-none font-bold opacity-10"
                  style={{ color: t.avatarColor }}
                >
                  “
                </div>

                <div className="relative z-1">
                  <p className="text-[#8892A4] text-base md:text-lg italic leading-relaxed mb-6 font-sans">
                    {t.quote}
                  </p>

                  <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                    {/* Character Avatar Glow */}
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-[#050A14] font-bold text-sm"
                      style={{ 
                        background: t.avatarColor,
                        boxShadow: `0 0 12px ${t.avatarColor}55`
                      }}
                    >
                      <User size={16} />
                    </div>

                    <div>
                      <h5 className="font-display font-bold text-white text-sm md:text-base leading-none mb-1">
                        {t.name}
                      </h5>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#8892A4]">
                        {t.role}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Manual chips selector indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {TESTIMONIALS_DATA.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            style={{ pointerEvents: 'auto' }}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              idx === currentIndex ? 'w-8 bg-[#00FFD1] shadow-[0_0_8px_#00FFD1]' : 'w-2 bg-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
