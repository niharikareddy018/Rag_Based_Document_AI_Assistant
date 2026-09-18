import React from 'react';
import { DocumentItem, DocumentSourceCitation } from '../../types';
import { StatusBadge, FileFormatBadge } from '../ui/StatusBadge';
import {
  FileText,
  Layers,
  CheckCircle2,
  Database,
  ExternalLink,
  BookOpen,
  ChevronRight,
  Info,
  X,
  Sparkles,
  Columns2
} from 'lucide-react';

interface RightDocInfoPanelProps {
  document: DocumentItem;
  citations: DocumentSourceCitation[];
  onSelectCitation: (citation: DocumentSourceCitation) => void;
  activeCitationId?: string;
  onClose?: () => void;
  onOpenSplitView?: () => void;
}

export const RightDocInfoPanel: React.FC<RightDocInfoPanelProps> = ({
  document,
  citations,
  onSelectCitation,
  activeCitationId,
  onClose,
  onOpenSplitView,
}) => {
  return (
    <aside className="w-[340px] shrink-0 h-full border-l border-neutral-200/80 bg-white flex flex-col justify-between overflow-y-auto select-none">
      <div className="p-4 space-y-5">
        {/* Header with Close */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            <Info className="w-3.5 h-3.5 text-neutral-400" />
            <span>Document Inspector</span>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 rounded-md text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
              title="Close panel"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* DOCUMENT Section */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1.5">
            DOCUMENT
          </span>
          <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/70">
            <div className="flex items-start gap-2.5">
              <FileFormatBadge format={document.fileType} size="sm" />
              <div className="min-w-0 flex-1">
                <h3 className="text-xs font-semibold text-neutral-900 truncate" title={document.name}>
                  {document.name}
                </h3>
                <p className="text-[11px] text-neutral-400 mt-0.5">{document.size} • Uploaded {document.uploadDate}</p>
              </div>
            </div>
            {document.summary && (
              <p className="mt-2.5 text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                {document.summary}
              </p>
            )}
          </div>
        </div>

        {/* INFORMATION Section */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1.5">
            INFORMATION
          </span>
          <div className="divide-y divide-neutral-100 rounded-xl border border-neutral-200/70 bg-white text-xs">
            <div className="flex items-center justify-between px-3 py-2.5">
              <span className="text-neutral-500 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-neutral-400" />
                Pages
              </span>
              <span className="font-semibold text-neutral-800">{document.pages}</span>
            </div>

            <div className="flex items-center justify-between px-3 py-2.5">
              <span className="text-neutral-500 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-neutral-400" />
                Chunks
              </span>
              <span className="font-semibold text-neutral-800">{document.chunks}</span>
            </div>

            <div className="flex items-center justify-between px-3 py-2.5">
              <span className="text-neutral-500 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                Status
              </span>
              <StatusBadge status={document.status} size="sm" />
            </div>

            <div className="flex items-center justify-between px-3 py-2.5">
              <span className="text-neutral-500 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-neutral-400" />
                Vector Index
              </span>
              <span className="text-[11px] font-mono text-neutral-600">
                {document.vectorDimensions}d • HNSW
              </span>
            </div>
          </div>
        </div>

        {/* SOURCES Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              SOURCES ({citations.length})
            </span>
            <span className="text-[10px] text-neutral-500 font-medium">Click to inspect</span>
          </div>

          <div className="space-y-2">
            {citations.map((cite) => {
              const isSelected = activeCitationId === cite.id;
              return (
                <div
                  key={cite.id}
                  onClick={() => onSelectCitation(cite)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer group ${
                    isSelected
                      ? 'border-neutral-900 bg-neutral-100 ring-1 ring-neutral-900'
                      : 'border-neutral-200/80 bg-white hover:border-neutral-300 hover:bg-neutral-50/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-800 font-semibold text-[11px] border border-neutral-200/80">
                        {cite.label}
                      </span>
                      {cite.sectionTitle && (
                        <span className="text-[11px] text-neutral-500 truncate max-w-[170px]" title={cite.sectionTitle}>
                          {cite.sectionTitle}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-semibold text-neutral-800 bg-neutral-100 px-1.5 py-0.2 rounded border border-neutral-200">
                      {cite.relevanceScore}% match
                    </span>
                  </div>

                  <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed italic">
                    "{cite.previewSnippet}"
                  </p>

                  <div className="mt-2 flex items-center justify-between text-[11px] text-neutral-700 font-medium opacity-80 group-hover:opacity-100">
                    <span className="flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" />
                      Preview source context
                    </span>
                    <ChevronRight className="w-3 h-3 text-neutral-400 group-hover:text-neutral-800 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Action: Split View reader */}
      {onOpenSplitView && (
        <div className="p-3 border-t border-neutral-200/80 bg-neutral-50/80">
          <button
            onClick={onOpenSplitView}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-900 rounded-lg shadow-2xs transition-colors cursor-pointer"
          >
            <Columns2 className="w-3.5 h-3.5 text-white" />
            <span>Open Document in Split View</span>
          </button>
        </div>
      )}
    </aside>
  );
};
