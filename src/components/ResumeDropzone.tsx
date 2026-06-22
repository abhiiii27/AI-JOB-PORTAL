import React, { useRef, useState } from "react";
import { Upload, FileText, CheckCircle2, RefreshCw, Clipboard } from "lucide-react";

interface ResumeDropzoneProps {
  onParsed: (fileName: string, text: string) => void;
  isProcessing: boolean;
}

export default function ResumeDropzone({ onParsed, isProcessing }: ResumeDropzoneProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [pastedText, setPastedText] = useState("");
  const [showPasteArea, setShowPasteArea] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const processFile = (file: File) => {
    setUploadedFile(file.name);
    // Standard resume parsing simulator/extractor which feeds raw text to AI
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = (e.target?.result as string) || `Resume Content from ${file.name}`;
      onParsed(file.name, text);
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handlePasteSubmit = () => {
    if (pastedText.trim()) {
      setUploadedFile("Pasted_Resume_Profile.txt");
      onParsed("Pasted_Resume_Profile.txt", pastedText);
    }
  };

  return (
    <div className="mb-4">
      <label className="form-label text-neutral-700 fw-medium d-flex align-items-center mb-2">
        <FileText size={16} className="me-2 text-violet-600" />
        AI Resume Parser / Profile Extractor
      </label>

      {!showPasteArea ? (
        <div
          id="dropzone-container"
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={triggerFileInput}
          className={`border border-dashed rounded-3 p-4 text-center cursor-pointer transition-all ${
            isDragActive 
              ? "border-violet-500 bg-violet-50" 
              : "border-neutral-200 bg-neutral-50/50 hover:bg-neutral-150/40"
          }`}
          style={{ transition: "all 0.3s ease", cursor: "pointer" }}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="d-none"
            accept=".txt,.pdf,.doc,.docx"
            onChange={handleFileInput}
          />
          
          {isProcessing ? (
            <div className="py-2">
              <RefreshCw className="text-violet-600 animate-spin mb-2 mx-auto" size={28} style={{ animation: "spin 2s linear infinite" }} />
              <p className="text-neutral-500 fs-7 mb-0">Analyzing resume layers with Gemini models...</p>
            </div>
          ) : uploadedFile ? (
            <div className="py-2">
              <CheckCircle2 className="text-success mb-2 mx-auto" size={28} />
              <p className="text-success fw-semibold mb-1 fs-7">Resume upload detected!</p>
              <p className="text-neutral-600 opacity-90 small mb-0">{uploadedFile}</p>
              <p className="text-violet-600 small mt-2 mb-0 hover:underline">Click/Drop to upload another file</p>
            </div>
          ) : (
            <div>
              <Upload className="text-violet-600 opacity-75 mb-2 mx-auto" size={28} />
              <h6 className="text-neutral-800 fw-medium mb-1 fs-7">Drag & drop your resume file here</h6>
              <p className="text-neutral-500 small mb-2">Supports .pdf, .txt, .docx (Max 4MB)</p>
              <p className="text-violet-600 small mb-0 font-monospace">or click to browse local files</p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-neutral-50 p-3 rounded-3 border border-neutral-200/80">
          <textarea
            className="form-control bg-white text-neutral-800 border-neutral-300 font-monospace small mb-2"
            rows={4}
            placeholder="Paste your resume raw text, full work history, or academic achievements here directly..."
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
          />
          <div className="d-flex justify-content-between align-items-center">
            <button
              type="button"
              className="btn font-monospace !text-neutral-700 border border-neutral-300 hover:!bg-neutral-50 !bg-white !btn-sm shadow-sm"
              onClick={() => setShowPasteArea(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn !bg-neutral-900 hover:!bg-neutral-800 !text-white !btn-sm fw-semibold font-monospace border-0 shadow-sm"
              onClick={handlePasteSubmit}
              disabled={!pastedText.trim()}
            >
              Analyze Text
            </button>
          </div>
        </div>
      )}

      {!uploadedFile && !showPasteArea && (
        <div className="text-center mt-2">
          <span className="text-neutral-500 small opacity-75">Don't have a resume file? </span>
          <button
            type="button"
            className="btn btn-link py-0 text-violet-600 font-monospace small text-decoration-none"
            onClick={() => setShowPasteArea(true)}
          >
            <Clipboard size={12} className="me-1 align-middle" />
            Paste clean text instead
          </button>
        </div>
      )}
    </div>
  );
}
