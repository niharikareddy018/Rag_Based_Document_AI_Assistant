import React from 'react';
import { DocumentSourceCitation } from '../../types';
import {
  X,
  FileText,
  Columns2,
  Copy,
  Check,
  Bookmark,
} from 'lucide-react';

interface SourcePreviewModalProps {
  citation: DocumentSourceCitation | null;
  onClose: () => void;
  onOpenDocument: (citation: DocumentSourceCitation) => void;
}

export const SourcePreviewModal: React.FC<SourcePreviewModalProps> = ({
  citation,
  onClose,
  onOpenDocument,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!citation) return null;

  const handleCopy = () => {
    navigator.clipboard?.writeText(citation.previewSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in select-none">
      <div
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center">
              <Bookmark className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-900">Source Citation Preview</h3>
              <p className="text-xs text-neutral-500">Extracted RAG Grounding Context</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-4">
          {/* Metadata Row */}
          <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-0.5">
                Document
              </span>
              <div className="flex items-center gap-1.5 font-medium text-neutral-900 truncate" title={citation.docName}>
                <FileText className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
                <span className="truncate">{citation.docName}</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-0.5">
                Page & Score
              </span>
              <div className="flex items-center gap-2 font-medium text-neutral-900">
                <span className="px-2 py-0.5 bg-neutral-200 rounded-md font-semibold text-neutral-900">
                  {citation.label}
                </span>
                <span className="text-neutral-600 text-[11px]">
                  {citation.relevanceScore}% similarity
                </span>
              </div>
            </div>
          </div>

          {/* Section Heading if available */}
          {citation.sectionTitle && (
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                Section
              </span>
              <p className="text-xs font-semibold text-neutral-900">
                {citation.sectionTitle}
              </p>
            </div>
          )}

          {/* Relevant Extracted Text */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                Relevant Extracted Text
              </span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1 text-[11px] text-neutral-700 hover:text-neutral-900 cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-neutral-900" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy snippet'}</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-800 text-xs leading-relaxed font-sans">
              <p className="border-l-2 border-neutral-900 pl-3 italic text-neutral-700">
                "{citation.previewSnippet}"
              </p>
            </div>
          </div>

          {/* Chunk Details */}
          <div className="flex items-center justify-between text-[11px] text-neutral-400 px-1">
            <span>Vector Chunk ID: <code className="font-mono text-neutral-700">{citation.chunkId}</code></span>
            <span>Retrieved via Dense Embeddings</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 border-t border-neutral-100 bg-neutral-50/60 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-neutral-600 hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            Close
          </button>

          <button
            onClick={() => onOpenDocument(citation)}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-xs shadow-2xs transition-colors cursor-pointer"
          >
            <Columns2 className="w-3.5 h-3.5" />
            <span>Open in Document Reader ({citation.label})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
