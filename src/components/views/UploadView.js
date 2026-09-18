import { useState, useRef } from "react";
import {
  UploadCloud,
  FileText,
  FileSpreadsheet,
  FileCode,
  CheckCircle2,
  Clock,
  Columns2,
  MessageSquare
} from "lucide-react";
export const UploadView = ({
  onDocumentProcessed,
  onNavigateToChat,
  onNavigateToSplit
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedDoc, setProcessedDoc] = useState(null);
  const [pipelineSteps, setPipelineSteps] = useState([
    { id: "upload", label: "File uploaded", sublabel: "Payload verified and sanitized", status: "pending" },
    { id: "extract", label: "Text extracted", sublabel: "OCR and layout parser executed", status: "pending" },
    { id: "chunk", label: "Semantic chunks created", sublabel: "512-token windows with 64-token overlap", status: "pending" },
    { id: "embed", label: "Generating embeddings", sublabel: "Vectorizing via text-embedding-3-large (1536 dim)", status: "pending" },
    { id: "store", label: "Storing vectors", sublabel: "Inserting into HNSW vector index & inverted index", status: "pending" }
  ]);
  const fileInputRef = useRef(null);
  const startPipeline = (fileName, fileSize, fileType) => {
    setSelectedFile({ name: fileName, size: fileSize, type: fileType });
    setIsProcessing(true);
    setProcessedDoc(null);
    setPipelineSteps([
      { id: "upload", label: "File uploaded", sublabel: "Payload verified and sanitized", status: "in_progress" },
      { id: "extract", label: "Text extracted", sublabel: "OCR and layout parser executed", status: "pending" },
      { id: "chunk", label: "Semantic chunks created", sublabel: "512-token windows with 64-token overlap", status: "pending" },
      { id: "embed", label: "Generating embeddings", sublabel: "Vectorizing via text-embedding-3-large (1536 dim)", status: "pending" },
      { id: "store", label: "Storing vectors", sublabel: "Inserting into HNSW vector index & inverted index", status: "pending" }
    ]);
    setTimeout(() => {
      setPipelineSteps(
        (prev) => prev.map((s, idx) => idx === 0 ? { ...s, status: "completed" } : idx === 1 ? { ...s, status: "in_progress" } : s)
      );
    }, 900);
    setTimeout(() => {
      setPipelineSteps(
        (prev) => prev.map((s, idx) => idx <= 1 ? { ...s, status: "completed" } : idx === 2 ? { ...s, status: "in_progress" } : s)
      );
    }, 1800);
    setTimeout(() => {
      setPipelineSteps(
        (prev) => prev.map((s, idx) => idx <= 2 ? { ...s, status: "completed" } : idx === 3 ? { ...s, status: "in_progress" } : s)
      );
    }, 2800);
    setTimeout(() => {
      setPipelineSteps(
        (prev) => prev.map((s, idx) => idx <= 3 ? { ...s, status: "completed" } : idx === 4 ? { ...s, status: "in_progress" } : s)
      );
    }, 3900);
    setTimeout(() => {
      setPipelineSteps((prev) => prev.map((s) => ({ ...s, status: "completed" })));
      setIsProcessing(false);
      const newDoc = {
        id: `doc-${Date.now()}`,
        name: fileName,
        fileType,
        pages: 14,
        size: fileSize,
        uploadDate: "Just now",
        status: "Ready",
        chunks: 48,
        vectorDimensions: 1536,
        embeddingModel: "text-embedding-3-large",
        summary: `Newly indexed ${fileType} document parsed into 48 semantic chunks for hybrid RAG retrieval.`,
        sampleQuestions: [
          `Summarize the key takeaways of ${fileName}`,
          "What are the core methodologies discussed?",
          "Highlight any constraints or metrics listed."
        ],
        pageContent: [
          {
            pageNumber: 1,
            title: "Executive Summary & Introduction",
            subtitle: "Vectorized Document Ingestion",
            sections: [
              {
                heading: "1. Document Overview",
                paragraphs: [
                  `This document (${fileName}) was successfully ingested and indexed into the DocuMind vector store.`,
                  "All structural paragraphs and tables have been partitioned into dense vector embeddings."
                ]
              }
            ]
          }
        ]
      };
      setProcessedDoc(newDoc);
      onDocumentProcessed(newDoc);
    }, 4900);
  };
  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const ext = file.name.split(".").pop()?.toUpperCase();
      const type = ext === "PDF" ? "PDF" : ext === "DOCX" ? "DOCX" : "TXT";
      const sizeStr = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
      startPipeline(file.name, sizeStr, type);
    }
  };
  const handleManualUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const ext = file.name.split(".").pop()?.toUpperCase();
      const type = ext === "PDF" ? "PDF" : ext === "DOCX" ? "DOCX" : "TXT";
      const sizeStr = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
      startPipeline(file.name, sizeStr, type);
    }
  };
  const getDocIcon = (type) => {
    if (type === "PDF") return <FileText className="w-5 h-5 text-red-600" />;
    if (type === "DOCX") return <FileSpreadsheet className="w-5 h-5 text-blue-600" />;
    return <FileCode className="w-5 h-5 text-neutral-600" />;
  };
  return <div className="flex-1 flex flex-col h-full bg-[#fcfcfc] overflow-y-auto items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        {
    /* Title */
  }
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Upload your documents</h1>
          <p className="text-sm text-neutral-500 mt-2 max-w-md mx-auto leading-relaxed">
            Ingest PDFs, Word documents, or text files into DocuMind's semantic vector database for instant retrieval.
          </p>
        </div>

        {
    /* Drag-and-Drop Box */
  }
        {!selectedFile ? <div
    onDragOver={(e) => {
      e.preventDefault();
      setIsDragging(true);
    }}
    onDragLeave={() => setIsDragging(false)}
    onDrop={handleFileDrop}
    className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all bg-white cursor-pointer group ${isDragging ? "border-blue-500 bg-blue-50/40 ring-4 ring-blue-500/10" : "border-neutral-300 hover:border-blue-400 hover:bg-neutral-50/50"}`}
    onClick={() => fileInputRef.current?.click()}
  >
            <input
    type="file"
    ref={fileInputRef}
    onChange={handleManualUpload}
    accept=".pdf,.docx,.txt"
    className="hidden"
  />

            <div className="w-16 h-16 rounded-2xl bg-neutral-100 group-hover:bg-blue-50 text-neutral-500 group-hover:text-blue-600 flex items-center justify-center mx-auto mb-5 transition-all">
              <UploadCloud className="w-8 h-8" />
            </div>

            <h3 className="text-base font-semibold text-neutral-800 mb-1">
              Drag & drop your files here
            </h3>
            <p className="text-xs text-neutral-500 mb-4">
              or <span className="text-blue-600 font-medium underline underline-offset-2">browse files</span> from your computer
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-600 text-xs font-medium">
              <span>PDF</span>
              <span>•</span>
              <span>DOCX</span>
              <span>•</span>
              <span>TXT</span>
              <span className="text-neutral-400 pl-1">(Up to 50MB)</span>
            </div>

            {
    /* Quick Demo Pre-fill Buttons */
  }
            <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center justify-center gap-2">
              <span className="text-xs text-neutral-400">Quick Test Files:</span>
              <button
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      startPipeline("Research_Paper.pdf", "4.2 MB", "PDF");
    }}
    className="px-2.5 py-1 text-xs rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium transition-colors"
  >
                Research_Paper.pdf
              </button>
              <button
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      startPipeline("Project_Report.docx", "2.8 MB", "DOCX");
    }}
    className="px-2.5 py-1 text-xs rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium transition-colors"
  >
                Project_Report.docx
              </button>
            </div>
          </div> : (
    /* Processing State (RAG Document Ingestion Pipeline) */
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-7">
            {
      /* Header: Document Title */
    }
            <div className="flex items-center justify-between pb-5 border-b border-neutral-100 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200">
                  {getDocIcon(selectedFile.type)}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-neutral-900">{selectedFile.name}</h3>
                  <p className="text-xs text-neutral-400">{selectedFile.size} • RAG Ingestion Pipeline</p>
                </div>
              </div>

              <div>
                <span
      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${isProcessing ? "bg-amber-50 text-amber-700 border border-amber-200/60" : "bg-emerald-50 text-emerald-700 border border-emerald-200/60"}`}
    >
                  {isProcessing ? <>
                      <Clock className="w-3.5 h-3.5 animate-spin text-amber-600" />
                      Status: Processing...
                    </> : <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Status: Ready
                    </>}
                </span>
              </div>
            </div>

            {
      /* Pipeline Steps List */
    }
            <div className="space-y-4 mb-8">
              {pipelineSteps.map((step) => {
      const isCompleted = step.status === "completed";
      const isInProgress = step.status === "in_progress";
      const isPending = step.status === "pending";
      return <div
        key={step.id}
        className={`flex items-start gap-3.5 p-3 rounded-xl transition-all ${isInProgress ? "bg-blue-50/50 border border-blue-200/60" : isCompleted ? "bg-neutral-50/50" : "opacity-40"}`}
      >
                    <div className="mt-0.5 shrink-0">
                      {isCompleted ? <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                          ✓
                        </div> : isInProgress ? <div className="w-5 h-5 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" /> : <div className="w-5 h-5 rounded-full border border-neutral-300 bg-white" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-semibold ${isCompleted ? "text-neutral-900" : isInProgress ? "text-blue-900 font-bold" : "text-neutral-500"}`}>
                          {step.label}
                        </span>
                        {isInProgress && <span className="text-[11px] font-mono text-blue-600 font-medium animate-pulse">
                            Processing...
                          </span>}
                        {isCompleted && <span className="text-[11px] font-medium text-emerald-600">
                            Done
                          </span>}
                      </div>
                      <p className="text-xs text-neutral-500 mt-0.5">{step.sublabel}</p>
                    </div>
                  </div>;
    })}
            </div>

            {
      /* Actions after completion */
    }
            {processedDoc && <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
                <button
      onClick={() => {
        setSelectedFile(null);
        setProcessedDoc(null);
      }}
      className="px-3.5 py-2 rounded-lg border border-neutral-200 text-xs font-medium text-neutral-600 hover:bg-neutral-50 cursor-pointer transition-colors"
    >
                  Upload Another File
                </button>

                <div className="flex items-center gap-2">
                  <button
      onClick={() => onNavigateToSplit(processedDoc)}
      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-medium transition-colors cursor-pointer"
    >
                    <Columns2 className="w-4 h-4 text-neutral-500" />
                    <span>Open in Split View</span>
                  </button>

                  <button
      onClick={() => onNavigateToChat(processedDoc)}
      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
    >
                    <MessageSquare className="w-4 h-4" />
                    <span>Start Chat</span>
                  </button>
                </div>
              </div>}
          </div>
  )}
      </div>
    </div>;
};
