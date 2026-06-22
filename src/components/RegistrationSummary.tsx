import { AISpecialization, RegisterFormValues, AIResponseAnalysis } from "../types";
import { CheckCircle2, User, Sparkles, AlertCircle, Copy, Check, ExternalLink, ArrowRight, BookOpen, Search, LogIn } from "lucide-react";
import { useState } from "react";

interface RegistrationSummaryProps {
  formValues: RegisterFormValues;
  enhancedBio?: string;
  bulletPoints?: string[];
  analytics?: AIResponseAnalysis;
  onReset: () => void;
}

export default function RegistrationSummary({
  formValues,
  enhancedBio,
  bulletPoints,
  analytics,
  onReset
}: RegistrationSummaryProps) {
  const [copiedBio, setCopiedBio] = useState(false);
  const [copiedBullets, setCopiedBullets] = useState(false);
  const [redirectStatus, setRedirectStatus] = useState<string | null>(null);

  const handleCopyBio = () => {
    const textToCopy = enhancedBio || formValues.bio;
    navigator.clipboard.writeText(textToCopy);
    setCopiedBio(true);
    setTimeout(() => setCopiedBio(false), 2000);
  };

  const handleCopyBullets = () => {
    if (bulletPoints && bulletPoints.length > 0) {
      navigator.clipboard.writeText(bulletPoints.join("\n"));
      setCopiedBullets(true);
      setTimeout(() => setCopiedBullets(false), 2000);
    }
  };

  const readinessScore = analytics?.score || 85;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 55) return "text-info";
    return "text-warning";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return "READY FOR INFUSION";
    if (score >= 55) return "COACHABLE STACK";
    return "NEEDS ENHANCEMENT";
  };

  return (
    <div className="card border-0 rounded-4 text-neutral-800 p-4 shadow-lg position-relative overflow-hidden" 
         style={{
           background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 100%)",
           backdropFilter: "blur(24px) saturate(140%)",
           border: "1px solid rgba(0, 0, 0, 0.08)"
         }}>
      
      {/* Absolute Glow details */}
      <div className="position-absolute bg-violet-400 rounded-circle opacity-10 filter blur-3xl"
           style={{ top: "-15%", left: "30%", width: "300px", height: "300px", filter: "blur(110px)" }}></div>

      {/* Redirect Status Notification Banner */}
      {redirectStatus && (
        <div className="alert text-center font-monospace small py-2.5 px-3 mb-3 border border-violet-200/50 bg-violet-50/80 text-violet-700 rounded-3 d-flex align-items-center justify-content-center gap-2">
          <Sparkles size={14} className="text-violet-600 animate-bounce" />
          <span>{redirectStatus}</span>
        </div>
      )}

      <div className="text-center mb-5 mt-3">
        <CheckCircle2 size={56} className="text-success mx-auto mb-3 animate-bounce" />
        <h2 className="fw-bold tracking-tight font-serif-title text-neutral-900">Registration Synchronized!</h2>
        <p className="text-violet-600 font-monospace fw-semibold small mb-0">PORTAL IDENTIFIER: {Math.random().toString(36).substring(2, 9).toUpperCase()}-AI</p>
        <p className="text-neutral-500 mt-1 small">Your details have been successfully mapped into the AI Portal ecosystem.</p>
      </div>

      <div className="row g-4 mb-4">
        {/* Left Side: Score & Core details */}
        <div className="col-lg-5">
          <div className="bg-neutral-50 border border-neutral-200/80 rounded-4 p-4 text-center h-100 d-flex flex-column justify-content-center">
            <span className="font-monospace text-neutral-500 small mb-2 d-block">AI PROFILE READINESS SCORE</span>
            
            <div className="mb-3 position-relative d-inline-block mx-auto">
              {/* Circular score display placeholder */}
              <div className="h1 font-monospace fw-bold display-3 mb-0 text-violet-600">
                {readinessScore}
                <span className="fs-5 opacity-50">%</span>
              </div>
            </div>

            <span className={`mx-auto bg-white border border-neutral-200 px-3 py-2 rounded-pill font-monospace small d-inline-block ${getScoreColor(readinessScore)}`}>
              {getScoreBadge(readinessScore)}
            </span>

            <p className="small text-neutral-500 mt-3 mb-0" style={{ lineHeight: "1.4" }}>
              Our Gemini parser mapped your tech profile. You rank in the <b>top {100 - Math.round(readinessScore / 1.1)}%</b> of applicants matching the <b>{formValues.coreRole}</b> sector.
            </p>
          </div>
        </div>

        {/* Right Side: Account Credentials confirmation list */}
        <div className="col-lg-7">
          <div className="bg-neutral-50 border border-neutral-200/80 rounded-4 p-4 h-100">
            <h5 className="fw-bold font-heading text-violet-600 d-flex align-items-center gap-2 mb-3">
              <User size={18} />
              Candidate Profile Information
            </h5>
            
            <div className="row g-3">
              <div className="col-sm-6">
                <span className="text-neutral-500 fs-8 d-block font-monospace">FULL NAME</span>
                <span className="fw-semibold text-neutral-800 text-capitalize">{formValues.fullName}</span>
              </div>
              <div className="col-sm-6">
                <span className="text-neutral-500 fs-8 d-block font-monospace">EMAIL ACCOUNT</span>
                <span className="fw-semibold text-neutral-800">{formValues.email}</span>
              </div>
              <div className="col-sm-6">
                <span className="text-neutral-500 fs-8 d-block font-monospace">PORTAL TRACK PREFERENCE</span>
                <span className="fw-semibold text-violet-600 small font-monospace">{formValues.coreRole}</span>
              </div>
              <div className="col-sm-6">
                <span className="text-neutral-500 fs-8 d-block font-monospace">COMPENSATION PROFILE</span>
                <span className="fw-semibold text-neutral-800 font-monospace">${formValues.expectedSalary}k / year ({formValues.preferredWorkType})</span>
              </div>
              <div className="col-12 border-top border-neutral-200/60 pt-3">
                <span className="text-violet-600 fs-8 d-block font-monospace mb-1.5 fw-semibold">SKILLS MAP DISCOVERED ({analytics?.identifiedSkills.length || 3})</span>
                <div className="d-flex flex-wrap gap-1.5">
                  {(analytics?.identifiedSkills || formValues.skills.split(",").map(s => s.trim()).filter(Boolean)).map((s, idx) => (
                    <span key={idx} className="bg-white border border-neutral-200/80 text-neutral-700 py-1 px-2.5 rounded font-monospace small fw-normal d-inline-block">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Center Part: AI Enhanced Profile content */}
      <div className="bg-neutral-50 border border-neutral-200/80 rounded-4 p-4 mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold font-heading text-violet-600 d-flex align-items-center gap-2 mb-0">
            <Sparkles size={18} className="text-violet-600 animate-pulse" />
            Gemini Client-Enhanced Professional Bio
          </h5>
          <button 
            onClick={handleCopyBio}
            className="btn font-monospace !text-neutral-700 border border-neutral-200 hover:!bg-neutral-100 d-flex align-items-center gap-1.5 py-1 px-2.5 rounded-3 !bg-white shadow-xs"
            style={{ fontSize: "11px", minHeight: "26px" }}
          >
            {copiedBio ? <Check size={12} className="text-success" /> : <Copy size={12} />}
            {copiedBio ? "Copied!" : "Copy Bio"}
          </button>
        </div>

        <p className="text-neutral-750 opacity-90 italic fs-7 mb-4 bg-white p-3 rounded-2 border border-neutral-200" style={{ lineHeight: "1.6" }}>
          "{enhancedBio || formValues.bio}"
        </p>

        {/* Executive Bullets (if generated) */}
        {bulletPoints && bulletPoints.length > 0 && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-violet-650 fs-8 font-monospace tracking-wide fw-semibold">AI OPTIMIZED RESUME BULLETS</span>
              <button 
                onClick={handleCopyBullets}
                className="btn font-monospace !text-neutral-700 border border-neutral-200 hover:!bg-neutral-100 d-flex align-items-center gap-1 py-1 px-2.5 rounded-3 !bg-white shadow-xs"
                style={{ fontSize: "11px", minHeight: "26px" }}
              >
                {copiedBullets ? <Check size={12} className="text-success" /> : <Copy size={12} />}
                {copiedBullets ? "Copied!" : "Copy Bullets"}
              </button>
            </div>
            <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
              {bulletPoints.map((bullet, index) => (
                <li key={index} className="d-flex gap-2.5 text-neutral-650 fs-7" style={{ lineHeight: "1.4" }}>
                  <span className="text-violet-650 font-monospace select-none">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Skill Gaps & Strategic Advice */}
      {analytics && (
        <div className="row g-4 mb-4">
          <div className="col-md-6">
            <div className="bg-neutral-50 border border-neutral-200/80 rounded-4 p-4 h-100">
              <h6 className="fw-bold font-heading text-warning d-flex align-items-center gap-2 mb-3">
                <AlertCircle size={16} />
                Identified Tech Stack Skill Gaps
              </h6>
              <ul className="ps-3 text-neutral-600 small d-flex flex-column gap-2 mb-0">
                {analytics.skillsGap.map((gap, index) => (
                  <li key={index} className="fs-7">{gap}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-md-6">
            <div className="bg-neutral-50 border border-neutral-200/80 rounded-4 p-4 h-100">
              <h6 className="fw-bold font-heading text-success d-flex align-items-center gap-2 mb-3">
                <BookOpen size={16} />
                Strategic Career Advisory
              </h6>
              <p className="text-neutral-600 fs-7 mb-0" style={{ lineHeight: "1.5" }}>
                {analytics.personalizedAdvice}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Suggested next action buttons */}
      <div className="d-flex flex-wrap gap-3 mt-4 pt-3 border-top border-neutral-200 justify-content-between align-items-center">
        <button 
          onClick={onReset}
          className="btn font-monospace !text-neutral-700 border border-neutral-300 hover:!bg-neutral-50 py-2.5 px-4 rounded-3 fs-7 !bg-white shadow-sm"
        >
          Register Another Profile
        </button>
        <div className="d-flex gap-2.5">
          <button 
            onClick={() => {
              setRedirectStatus("Synchronizing profile vectors with console node...");
              setTimeout(() => {
                setRedirectStatus("Established link! Loaded Candidate console successfully.");
              }, 2500);
            }}
            className="btn font-monospace py-2.5 px-4 rounded-3 !text-white fw-semibold d-flex align-items-center gap-2 fs-7 border-0 !bg-neutral-900 hover:!bg-neutral-800 shadow-sm"
          >
            <LogIn size={16} />
            Enter Candidate Console
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

    </div>
  );
}
