import { CheckCircle2, Clock, AlertCircle, FileText, FileSpreadsheet, FileCode } from "lucide-react";
export const StatusBadge = ({ status, size = "sm" }) => {
  const isReady = status.toLowerCase() === "ready";
  const isProcessing = status.toLowerCase() === "processing";
  const isIndexing = status.toLowerCase() === "indexing";
  const sizeClasses = size === "sm" ? "text-xs px-2 py-0.5" : "text-xs px-2.5 py-1";
  if (isReady) {
    return <span className={`inline-flex items-center gap-1 font-medium rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 ${sizeClasses}`}>
        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
        <span>Ready</span>
      </span>;
  }
  if (isProcessing) {
    return <span className={`inline-flex items-center gap-1 font-medium rounded-full bg-amber-50 text-amber-700 border border-amber-200/60 ${sizeClasses}`}>
        <Clock className="w-3 h-3 text-amber-600 animate-spin" />
        <span>Processing</span>
      </span>;
  }
  if (isIndexing) {
    return <span className={`inline-flex items-center gap-1 font-medium rounded-full bg-blue-50 text-blue-700 border border-blue-200/60 ${sizeClasses}`}>
        <Clock className="w-3 h-3 text-blue-600 animate-pulse" />
        <span>Indexing</span>
      </span>;
  }
  return <span className={`inline-flex items-center gap-1 font-medium rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200 ${sizeClasses}`}>
      <AlertCircle className="w-3 h-3" />
      <span>{status}</span>
    </span>;
};
export const FileFormatBadge = ({
  format,
  size = "md"
}) => {
  const upper = format.toUpperCase();
  const iconSize = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";
  const containerClasses = size === "sm" ? "text-xs px-1.5 py-0.5" : "text-xs px-2 py-1";
  if (upper === "PDF") {
    return <span className={`inline-flex items-center gap-1.5 rounded-md font-medium bg-red-50 text-red-700 border border-red-200/60 ${containerClasses}`}>
        <FileText className={`${iconSize} text-red-600`} />
        <span>PDF</span>
      </span>;
  }
  if (upper === "DOCX") {
    return <span className={`inline-flex items-center gap-1.5 rounded-md font-medium bg-blue-50 text-blue-700 border border-blue-200/60 ${containerClasses}`}>
        <FileSpreadsheet className={`${iconSize} text-blue-600`} />
        <span>DOCX</span>
      </span>;
  }
  return <span className={`inline-flex items-center gap-1.5 rounded-md font-medium bg-neutral-100 text-neutral-700 border border-neutral-200 ${containerClasses}`}>
      <FileCode className={`${iconSize} text-neutral-600`} />
      <span>{upper}</span>
    </span>;
};
