import { useState, useEffect, useRef } from "react";
import { ChatMessageItem } from "../chat/ChatMessageItem";
import { ChatInput } from "../chat/ChatInput";
import { FileFormatBadge } from "../ui/StatusBadge";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Bookmark,
  Highlighter,
  Sparkles
} from "lucide-react";
export const SplitView = ({
  document,
  messages,
  onSendMessage,
  isLoading = false,
  activeCitation,
  onCitationSelect
}) => {
  const [currentPage, setCurrentPage] = useState(4);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [highlightActive, setHighlightActive] = useState(true);
  const [searchInDoc, setSearchInDoc] = useState("");
  const documentContainerRef = useRef(null);
  const highlightElementRef = useRef(null);
  const chatMessagesEndRef = useRef(null);
  useEffect(() => {
    if (messages.length > 0) {
      chatMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);
  useEffect(() => {
    if (activeCitation) {
      setCurrentPage(activeCitation.page);
      setTimeout(() => {
        highlightElementRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 150);
    }
  }, [activeCitation]);
  const pageData = document.pageContent.find((p) => p.pageNumber === currentPage) || {
    pageNumber: currentPage,
    title: `Page ${currentPage}`,
    subtitle: "Section Document Body",
    sections: [
      {
        heading: `Section ${currentPage}.0 Analysis & Data Points`,
        paragraphs: [
          `This represents indexed text extracted from ${document.name} on Page ${currentPage}.`,
          "The multi-dimensional vector embeddings reflect contextual relationships across sentences.",
          "Paragraph boundaries are preserved according to semantic chunk definitions."
        ]
      }
    ]
  };
  const totalPages = document.pages;
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  return <div className="flex-1 flex h-full overflow-hidden bg-neutral-100">
      {
    /* ================= LEFT: DOCUMENT VIEWER ================= */
  }
      <div className="w-1/2 h-full flex flex-col border-r border-neutral-300/80 bg-neutral-100 overflow-hidden select-none">
        {
    /* Document Viewer Toolbar */
  }
        <div className="h-12 bg-white border-b border-neutral-200/80 px-4 flex items-center justify-between shrink-0 shadow-2xs z-10">
          {
    /* Document name & badge */
  }
          <div className="flex items-center gap-2 truncate">
            <FileFormatBadge format={document.fileType} size="sm" />
            <span className="text-xs font-semibold text-neutral-800 truncate max-w-[180px]">
              {document.name}
            </span>
          </div>

          {
    /* Page navigation controls */
  }
          <div className="flex items-center gap-1.5 bg-neutral-50 px-2 py-1 rounded-lg border border-neutral-200/80">
            <button
    onClick={handlePrevPage}
    disabled={currentPage <= 1}
    className="p-1 rounded text-neutral-600 hover:text-neutral-900 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
    title="Previous page"
  >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-xs font-medium text-neutral-700 px-1">
              Page <strong className="text-neutral-900 font-bold">{currentPage}</strong> of {totalPages}
            </span>

            <button
    onClick={handleNextPage}
    disabled={currentPage >= totalPages}
    className="p-1 rounded text-neutral-600 hover:text-neutral-900 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
    title="Next page"
  >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {
    /* Zoom and Highlight Toggles */
  }
          <div className="flex items-center gap-1 text-neutral-500">
            <button
    onClick={() => setZoomLevel((prev) => Math.max(75, prev - 10))}
    className="p-1.5 rounded hover:bg-neutral-100 hover:text-neutral-800 transition-colors cursor-pointer"
    title="Zoom out"
  >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono w-10 text-center">{zoomLevel}%</span>
            <button
    onClick={() => setZoomLevel((prev) => Math.min(150, prev + 10))}
    className="p-1.5 rounded hover:bg-neutral-100 hover:text-neutral-800 transition-colors cursor-pointer"
    title="Zoom in"
  >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>

            <div className="h-4 w-px bg-neutral-200 mx-1" />

            <button
    onClick={() => setHighlightActive(!highlightActive)}
    className={`p-1.5 rounded transition-colors cursor-pointer ${highlightActive ? "bg-amber-100 text-amber-800 font-semibold" : "hover:bg-neutral-100 text-neutral-500"}`}
    title={highlightActive ? "Highlighting Enabled" : "Enable Highlight"}
  >
              <Highlighter className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {
    /* Quick Jump Bar to Cited Pages */
  }
        <div className="bg-amber-50/70 border-b border-amber-200/50 px-4 py-1.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-amber-900 font-medium">
            <Bookmark className="w-3.5 h-3.5 text-amber-700" />
            <span>Active Citations in Query:</span>
          </div>
          <div className="flex items-center gap-1.5">
            {[4, 8, 12].map((p) => <button
    key={p}
    onClick={() => setCurrentPage(p)}
    className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${currentPage === p ? "bg-amber-500 text-white font-bold shadow-2xs" : "bg-white text-neutral-700 hover:bg-amber-100 border border-amber-200/80"}`}
  >
                Page {p}
              </button>)}
          </div>
        </div>

        {
    /* Document Page Canvas / Simulation */
  }
        <div
    ref={documentContainerRef}
    className="flex-1 overflow-y-auto p-6 flex justify-center items-start"
  >
          <div
    style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: "top center" }}
    className="w-full max-w-[620px] bg-white rounded-lg shadow-md border border-neutral-300/80 min-h-[760px] p-10 flex flex-col justify-between transition-transform duration-100"
  >
            {
    /* Academic / Document Page Header */
  }
            <div>
              <div className="flex items-center justify-between border-b border-neutral-200 pb-3 mb-6 text-[10px] text-neutral-400 font-mono uppercase tracking-widest">
                <span>{document.name}</span>
                <span>Page {currentPage} of {totalPages}</span>
              </div>

              {
    /* Page Title */
  }
              <div className="mb-6">
                <h2 className="text-base font-bold text-neutral-900 font-serif">
                  {pageData.title}
                </h2>
                {pageData.subtitle && <p className="text-xs text-neutral-500 font-serif italic mt-0.5">
                    {pageData.subtitle}
                  </p>}
              </div>

              {
    /* Page Paragraphs & Highlighted Sections */
  }
              <div className="space-y-4 font-serif text-neutral-800 text-[13px] leading-relaxed">
                {pageData.sections.map((section, sIdx) => {
    return <div key={sIdx} className="space-y-3">
                      {section.heading && <h3 className="font-sans font-bold text-xs uppercase tracking-wide text-neutral-800 mt-4 mb-2">
                          {section.heading}
                        </h3>}

                      {section.paragraphs.map((pText, pIdx) => {
      const isCitationHighlighted = highlightActive && (activeCitation?.page === currentPage || currentPage === 4 && pText.includes("Combining dense vector embeddings") || currentPage === 8 && pText.includes("optimal semantic chunk overlap") || currentPage === 12 && pText.includes("Cross-encoder re-ranking"));
      if (isCitationHighlighted) {
        return <div
          key={pIdx}
          ref={highlightElementRef}
          className="relative my-3 p-3.5 rounded-lg bg-amber-50 border-2 border-amber-400 text-neutral-900 shadow-sm transition-all animate-pulse duration-1000"
        >
                              <div className="absolute -top-3 left-3 px-2 py-0.5 rounded-full bg-amber-500 text-white font-sans text-[10px] font-bold tracking-wide flex items-center gap-1 shadow-2xs">
                                <Sparkles className="w-2.5 h-2.5" />
                                <span>Grounding Source Cited</span>
                              </div>
                              <p className="font-serif leading-relaxed select-text font-medium">
                                {pText}
                              </p>
                              <div className="mt-2 pt-1.5 border-t border-amber-200/80 flex items-center justify-between text-[10px] font-sans text-amber-800">
                                <span className="font-semibold">Vector Chunk: chk_{String(currentPage).padStart(3, "0")}</span>
                                <span>Relevance: 96.4%</span>
                              </div>
                            </div>;
      }
      return <p key={pIdx} className="leading-relaxed select-text">
                            {pText}
                          </p>;
    })}
                    </div>;
  })}
              </div>
            </div>

            {
    /* Document Page Footer */
  }
            <div className="pt-8 border-t border-neutral-100 mt-8 flex items-center justify-between text-[10px] text-neutral-400 font-sans">
              <span>DocLens AI Semantic Grounding Engine</span>
              <span>Doc ID: {document.id} • P.{currentPage}</span>
            </div>
          </div>
        </div>
      </div>

      {
    /* ================= RIGHT: CHAT CONVERSATION ================= */
  }
      <div className="w-1/2 h-full flex flex-col bg-white overflow-hidden">
        {
    /* Chat Header */
  }
        <div className="h-12 border-b border-neutral-200/80 px-4 flex items-center justify-between shrink-0 bg-neutral-50/50 select-none">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-neutral-900" />
            <span className="text-xs font-semibold text-neutral-900">DocLens AI</span>
            <span className="text-[11px] text-neutral-400">• Linked to Document Viewer</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-neutral-500">
            <span className="w-2 h-2 rounded-full bg-neutral-900" />
            <span className="text-[11px]">Synced with Page {currentPage}</span>
          </div>
        </div>

        {
    /* Chat Message Scroll Area */
  }
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-2xl mx-auto">
            {messages.map((msg) => <ChatMessageItem
    key={msg.id}
    message={msg}
    activeCitationId={activeCitation?.id}
    onCitationClick={(citation) => {
      onCitationSelect(citation);
      setCurrentPage(citation.page);
    }}
  />)}

            {isLoading && <div className="flex items-center gap-2 text-neutral-500 text-xs py-4">
                <div className="w-4 h-4 border-2 border-neutral-400 border-t-neutral-900 rounded-full animate-spin" />
                <span>Searching vector embeddings and synthesizing answer...</span>
              </div>}
            <div ref={chatMessagesEndRef} />
          </div>
        </div>

        {
    /* Chat Input at Bottom */
  }
        <div className="border-t border-neutral-100 bg-white pt-2">
          <ChatInput
    onSendMessage={onSendMessage}
    isLoading={isLoading}
    sampleQuestions={document.sampleQuestions}
    placeholder={`Ask DocLens AI about ${document.name}...`}
  />
        </div>
      </div>
    </div>;
};
