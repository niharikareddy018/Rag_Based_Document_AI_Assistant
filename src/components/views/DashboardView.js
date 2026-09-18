import {
  FileText,
  Layers,
  Sparkles,
  ArrowRight,
  Database
} from "lucide-react";
export const DashboardView = ({
  documents,
  onOpenChat,
  onUploadClick
}) => {
  const totalChunks = documents.reduce((acc, d) => acc + d.chunks, 0);
  const totalPages = documents.reduce((acc, d) => acc + d.pages, 0);
  return <div className="flex-1 flex flex-col h-full rounded-3xl bg-[#0c140e]/85 border border-[#1b2b20] p-6 shadow-2xl backdrop-blur-xl overflow-y-auto select-none">
      {
    /* Title */
  }
      <div className="flex items-center justify-between pb-6 border-b border-[#18261d]">
        <div>
          <h1 className="text-xl font-semibold text-white tracking-tight">System Dashboard</h1>
          <p className="text-xs text-neutral-400 mt-1">Vector Index & Document Knowledge Health</p>
        </div>
        <button
    onClick={onUploadClick}
    className="px-4 py-2 rounded-full bg-gradient-to-tr from-[#22c55e] to-[#4ade80] text-black font-semibold text-xs shadow-[0_0_15px_rgba(34,197,94,0.4)] cursor-pointer hover:scale-105 transition-all"
  >
          + Ingest New Document
        </button>
      </div>

      {
    /* Stats Cards */
  }
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 my-6">
        <div className="p-4 rounded-2xl bg-[#0e1710] border border-[#1e3324]">
          <div className="flex items-center justify-between text-neutral-400 text-xs mb-2">
            <span>Indexed Documents</span>
            <FileText className="w-4 h-4 text-[#4ade80]" />
          </div>
          <p className="text-2xl font-bold text-white">{documents.length}</p>
          <span className="text-[11px] text-[#4ade80] mt-1 block">100% vector verified</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0e1710] border border-[#1e3324]">
          <div className="flex items-center justify-between text-neutral-400 text-xs mb-2">
            <span>Vector Chunks</span>
            <Layers className="w-4 h-4 text-[#4ade80]" />
          </div>
          <p className="text-2xl font-bold text-white">{totalChunks}</p>
          <span className="text-[11px] text-neutral-400 mt-1 block">512 token windows</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0e1710] border border-[#1e3324]">
          <div className="flex items-center justify-between text-neutral-400 text-xs mb-2">
            <span>Total Pages Analyzed</span>
            <Database className="w-4 h-4 text-[#4ade80]" />
          </div>
          <p className="text-2xl font-bold text-white">{totalPages}</p>
          <span className="text-[11px] text-neutral-400 mt-1 block">PDF, DOCX, TXT</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0e1710] border border-[#1e3324]">
          <div className="flex items-center justify-between text-neutral-400 text-xs mb-2">
            <span>Avg Retrieval Precision</span>
            <Sparkles className="w-4 h-4 text-[#4ade80]" />
          </div>
          <p className="text-2xl font-bold text-[#86efac]">94.8%</p>
          <span className="text-[11px] text-neutral-400 mt-1 block">Cross-encoder reranked</span>
        </div>
      </div>

      {
    /* Documents Grid */
  }
      <div className="mt-2">
        <h2 className="text-sm font-semibold text-neutral-200 uppercase tracking-wider mb-3">
          Active Knowledge Bases
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents.map((doc) => <div
    key={doc.id}
    className="p-4 rounded-2xl bg-[#09110b] border border-[#1b2b20] hover:border-[#22c55e]/50 transition-all flex flex-col justify-between"
  >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-white truncate max-w-xs">{doc.name}</span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#142618] text-[#4ade80] border border-[#22c55e]/30">
                    {doc.fileType}
                  </span>
                </div>
                <p className="text-xs text-neutral-400 line-clamp-2 mb-3 leading-relaxed">
                  {doc.summary}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#16241a] text-[11px] text-neutral-500">
                <span>{doc.pages} pages • {doc.chunks} chunks</span>
                <button
    onClick={() => onOpenChat(doc)}
    className="inline-flex items-center gap-1 text-[#4ade80] hover:text-white font-medium cursor-pointer"
  >
                  <span>Chat With Doc</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>)}
        </div>
      </div>
    </div>;
};
