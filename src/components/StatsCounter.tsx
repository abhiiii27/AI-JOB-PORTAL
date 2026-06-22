import React, { useState, useEffect, useRef } from 'react';

interface CounterProps {
  endValue: number;
  suffix: string;
  duration?: number;
}

function Counter({ endValue, suffix, duration = 1500 }: CounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Curved easing out
      const easeProgress = 1 - Math.pow(1 - percentage, 3);
      setCount(Math.floor(easeProgress * endValue));

      if (percentage < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);
  }, [hasStarted, endValue, duration]);

  // Format with commas if large
  const formatValue = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <div ref={elementRef} className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight text-center">
      <span className="bg-gradient-to-r from-white via-white to-[#00D4FF] bg-clip-text text-transparent">
        {formatValue(count)}
      </span>
      <span className="text-[#00FFD1] text-glow-electric ml-0.5">{suffix}</span>
    </div>
  );
}

export function StatsCounter() {
  const stats = [
    { label: "Active Nodes Loaded", endVal: 50000, suffix: "+" },
    { label: "Talent Corridors", endVal: 120, suffix: "+" },
    { label: "Ingestion Vector Precision", endVal: 98, suffix: "%" },
    { label: "Ingress Acceleration", endVal: 10, suffix: "x" }
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.01] grid-mesh p-10 md:p-14">
      {/* Decorative neon ambient background blurs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 bg-[#7B2FFF] rounded-full filter blur-[120px] opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 h-72 bg-[#00D4FF] rounded-full filter blur-[120px] opacity-10 pointer-events-none" />

      {/* Stats grid framework */}
      <div className="relative z-1 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 divide-y lg:divide-y-0 lg:divide-x divide-white/5">
        {stats.map((stat, index) => {
          // Fix border division layout alignment for grid columns on mobile
          const borderStyle = index >= 2 ? "pt-8 lg:pt-0 lg:pl-8" : index === 1 ? "pt-0 lg:pl-8" : "pt-0";
          return (
            <div key={index} className={`flex flex-col items-center justify-center text-center ${borderStyle} border-white/5`}>
              <Counter endValue={stat.endVal} suffix={stat.suffix} />
              <p className="mt-2 text-xs md:text-sm font-mono tracking-widest text-[#8892A4] uppercase">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
