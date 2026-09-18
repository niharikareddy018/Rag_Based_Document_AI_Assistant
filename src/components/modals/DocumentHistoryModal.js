import { useState, useRef } from "react";
import {
  FileStack,
  X,
  FileText,
  Trash2,
  Check,
  Search,
  Calendar,
  Layers,
  ChevronDown,
  ChevronUp,
  FileUp,
  MessageCircle
} from "lucide-react";
export const DocumentHistoryModal = ({
  isOpen,
  onClose,
  documents,
  activeDocId,
  onSelectDocumentForChat,
  onDeleteDocument,
  onUploadFile,
  isProcessingFile = false
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedDocId, setExpandedDocId] = useState(null);
  const fileInputRef = useRef(null);
  if (!isOpen) return null;
  const filteredDocs = documents.filter(
    (doc) => doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const getFormatBadge = (format) => {
    switch (format) {
      case "PDF":
        return {
          icon: <FileText className="w-4 h-4 text-red-500" />,
          badgeClass: "bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 border-red-200 dark:border-red-900/60"
        };
      case "DOCX":
        return {
          icon: <FileText className="w-4 h-4 text-blue-500" />,
          badgeClass: "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-900/60"
        };
      case "TXT":
      default:
        return {
          icon: <FileText className="w-4 h-4 text-neutral-500" />,
          badgeClass: "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700"
        };
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && onUploadFile) {
      onUploadFile(file);
    }
    if (e.target) {
      e.target.value = "";
    }
  };
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in select-none">
      {
    /* Hidden file input for uploading directly from modal */
  }
      <input
    type="file"
    ref={fileInputRef}
    onChange={handleFileChange}
    accept=".pdf,.docx,.txt,.doc,.md,.json,.csv"
    className="hidden"
  />

      <div className="bg-white dark:bg-neutral-900 w-full max-w-2xl rounded-2xl shadow-xl border border-neutral-200/80 dark:border-neutral-800 overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150 transition-colors">
        {
    /* Modal Header */
  }
        <div className="p-5 border-b border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-850">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 flex items-center justify-center shadow-xs">
              <FileStack className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">Document History</h2>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
                  {documents.length} {documents.length === 1 ? "document" : "documents"}
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                History of all documents uploaded and parsed for chat analysis
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
    onClick={() => fileInputRef.current?.click()}
    disabled={isProcessingFile}
    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-lg hover:bg-neutral-800 dark:hover:bg-white transition-colors shadow-2xs cursor-pointer disabled:opacity-50"
  >
              <FileUp className="w-3.5 h-3.5" />
              <span>{isProcessingFile ? "Processing..." : "Upload Document"}</span>
            </button>

            <button
    onClick={onClose}
    className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
  >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {
    /* Search Bar (if documents exist) */
  }
        {documents.length > 0 && <div className="p-3 border-b border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
    type="text"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="Search uploaded documents by name..."
    className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-500 focus:ring-1 focus:ring-neutral-400 dark:focus:ring-neutral-500 bg-neutral-50/50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400"
  />
              {searchQuery && <button
    onClick={() => setSearchQuery("")}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 text-xs"
  >
                  Clear
                </button>}
            </div>
          </div>}

        {
    /* Documents List */
  }
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {documents.length === 0 ? (
    /* Empty State */
    <div className="py-12 px-4 text-center flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-2xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-400 mb-4 shadow-2xs">
                <FileUp className="w-7 h-7 text-neutral-500 dark:text-neutral-400" />
              </div>
              <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                No documents uploaded yet
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mb-5 leading-relaxed">
                Upload your PDF, DOCX, or TXT documents. Once uploaded, they will appear here in your document history and can be analyzed in chat anytime.
              </p>
              <button
      onClick={() => fileInputRef.current?.click()}
      disabled={isProcessingFile}
      className="flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-xl hover:bg-neutral-800 dark:hover:bg-white transition-all shadow-2xs cursor-pointer"
    >
                <FileUp className="w-4 h-4" />
                <span>Upload Your First Document</span>
              </button>
            </div>
  ) : filteredDocs.length === 0 ? <div className="py-8 text-center text-xs text-neutral-500 dark:text-neutral-400">
              No documents matching "{searchQuery}"
            </div> : filteredDocs.map((doc) => {
    const isActive = activeDocId === doc.id;
    const isExpanded = expandedDocId === doc.id;
    const formatInfo = getFormatBadge(doc.fileType);
    return <div
      key={doc.id}
      className={`rounded-xl border transition-all ${isActive ? "border-neutral-900/30 dark:border-neutral-700 bg-neutral-50/70 dark:bg-neutral-850 shadow-2xs" : "border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-850 hover:border-neutral-300 dark:hover:border-neutral-700"}`}
    >
                  <div className="p-3.5 flex items-center justify-between gap-3">
                    {
      /* Left: Document Icon & Details */
    }
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-9 h-9 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700 flex items-center justify-center shrink-0">
                        {formatInfo.icon}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xs text-neutral-900 dark:text-neutral-100 truncate">
                            {doc.name}
                          </span>
                          <span
      className={`text-[10px] px-1.5 py-0.5 rounded border font-medium ${formatInfo.badgeClass}`}
    >
                            {doc.fileType}
                          </span>
                          {isActive && <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full">
                              <Check className="w-3 h-3" />
                              Active in chat
                            </span>}
                        </div>

                        <div className="flex items-center gap-2 text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 flex-wrap">
                          <span>{doc.pages} {doc.pages === 1 ? "page" : "pages"}</span>
                          <span>•</span>
                          <span>{doc.size}</span>
                          {doc.uploadDate && <>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3 text-neutral-400" />
                                {doc.uploadDate}
                              </span>
                            </>}
                        </div>
                      </div>
                    </div>

                    {
      /* Right: Actions */
    }
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
      onClick={() => {
        onSelectDocumentForChat(doc);
        onClose();
      }}
      className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${isActive ? "bg-neutral-200/70 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200" : "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-white"}`}
      title="Chat with this document"
    >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>{isActive ? "Current Chat" : "Chat"}</span>
                      </button>

                      <button
      onClick={() => setExpandedDocId(isExpanded ? null : doc.id)}
      title={isExpanded ? "Hide preview" : "View preview"}
      className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
    >
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>

                      <button
      onClick={() => onDeleteDocument(doc.id)}
      title="Delete from history"
      className="p-1.5 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
    >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {
      /* Expandable Preview Section */
    }
                  {isExpanded && <div className="px-4 pb-3.5 pt-1 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-300 bg-neutral-50/40 dark:bg-neutral-900/60 rounded-b-xl space-y-2">
                      {doc.summary && <div>
                          <div className="font-semibold text-neutral-700 dark:text-neutral-300 text-[11px] uppercase tracking-wider mb-1">
                            Summary Preview
                          </div>
                          <p className="leading-relaxed bg-white dark:bg-neutral-800 p-2.5 rounded-lg border border-neutral-200/80 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 text-[11px]">
                            {doc.summary}
                          </p>
                        </div>}

                      {doc.rawText && <div>
                          <div className="font-semibold text-neutral-700 dark:text-neutral-300 text-[11px] uppercase tracking-wider mb-1">
                            Extracted Text Snippet
                          </div>
                          <p className="leading-relaxed bg-white dark:bg-neutral-800 p-2.5 rounded-lg border border-neutral-200/80 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-[11px] max-h-28 overflow-y-auto font-mono">
                            {doc.rawText.slice(0, 500)}
                            {doc.rawText.length > 500 ? "..." : ""}
                          </p>
                        </div>}

                      <div className="flex items-center justify-between pt-1 text-[11px] text-neutral-400 dark:text-neutral-500">
                        <span className="flex items-center gap-1">
                          <Layers className="w-3 h-3" />
                          Parsed Chunks: {doc.chunks || Math.max(1, Math.round((doc.rawText?.length || 1e3) / 1e3))}
                        </span>
                        <button
      onClick={() => {
        onSelectDocumentForChat(doc);
        onClose();
      }}
      className="text-neutral-900 dark:text-neutral-100 font-semibold hover:underline cursor-pointer"
    >
                          Start conversation with this document →
                        </button>
                      </div>
                    </div>}
                </div>;
  })}
        </div>

        {
    /* Modal Footer */
  }
        <div className="p-3.5 border-t border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-850 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>{documents.length} {documents.length === 1 ? "file" : "files"} recorded in history</span>
          </div>

          <button
    onClick={onClose}
    className="px-3 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-750 transition-colors cursor-pointer shadow-2xs"
  >
            Close
          </button>
        </div>
      </div>
    </div>;
};
