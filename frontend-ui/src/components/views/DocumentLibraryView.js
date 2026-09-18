import { StatusBadge, FileFormatBadge } from "../ui/StatusBadge";
import { PrimaryButton } from "../ui/Buttons";
import {
  Plus,
  FileText,
  FileSpreadsheet,
  FileCode,
  MessageSquare,
  Columns2,
  Trash2
} from "lucide-react";
export const DocumentLibraryView = ({
  documents,
  onUploadClick,
  onSelectDocForChat,
  onSelectDocForSplitView,
  onDeleteDoc
}) => {
  const getDocIcon = (format) => {
    if (format === "PDF") return <FileText className="w-5 h-5 text-neutral-800" />;
    if (format === "DOCX") return <FileSpreadsheet className="w-5 h-5 text-neutral-800" />;
    return <FileCode className="w-5 h-5 text-neutral-800" />;
  };
  return <div className="flex-1 flex flex-col h-full bg-[#fcfcfc] overflow-y-auto">
      {
    /* Header */
  }
      <div className="border-b border-neutral-200/80 bg-white px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-neutral-900 tracking-tight">Documents</h1>
            <p className="text-xs text-neutral-500 mt-1">
              Active knowledge sources available for grounded retrieval and chat.
            </p>
          </div>

          <PrimaryButton
    icon={<Plus className="w-4 h-4" />}
    onClick={onUploadClick}
  >
            Upload Document
          </PrimaryButton>
        </div>
      </div>

      {
    /* Main Content: Document List */
  }
      <div className="p-8">
        {documents.length === 0 ? <div className="text-center py-16 px-4 bg-white rounded-2xl border border-dashed border-neutral-300">
            <FileText className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-neutral-800 mb-1">No documents available</h3>
            <p className="text-xs text-neutral-500 mb-4 max-w-sm mx-auto">
              Upload your first PDF, DOCX, or TXT file to start chatting.
            </p>
            <PrimaryButton onClick={onUploadClick}>
              + Upload Document
            </PrimaryButton>
          </div> : <div className="bg-white rounded-xl border border-neutral-200/80 shadow-2xs overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-50/80 border-b border-neutral-200/80 text-neutral-500 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Document Name</th>
                  <th className="py-3 px-3">File Type</th>
                  <th className="py-3 px-3">Pages</th>
                  <th className="py-3 px-3">Size</th>
                  <th className="py-3 px-3">Upload Date</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-neutral-700">
                {documents.map((doc) => <tr
    key={doc.id}
    className="hover:bg-neutral-50/70 transition-colors group"
  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-neutral-100 border border-neutral-200/60 shrink-0">
                          {getDocIcon(doc.fileType)}
                        </div>
                        <div className="min-w-0">
                          <button
    onClick={() => onSelectDocForChat(doc)}
    className="font-semibold text-neutral-900 hover:underline transition-colors text-left cursor-pointer truncate block max-w-xs"
  >
                            {doc.name}
                          </button>
                          <span className="text-[11px] text-neutral-400 truncate block max-w-sm">
                            {doc.summary}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <FileFormatBadge format={doc.fileType} size="sm" />
                    </td>
                    <td className="py-3 px-3 font-medium text-neutral-800">
                      {doc.pages} {doc.pages === 1 ? "page" : "pages"}
                    </td>
                    <td className="py-3 px-3 text-neutral-500">
                      {doc.size}
                    </td>
                    <td className="py-3 px-3 text-neutral-500">
                      {doc.uploadDate}
                    </td>
                    <td className="py-3 px-3">
                      <StatusBadge status={doc.status} size="sm" />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
    onClick={() => onSelectDocForChat(doc)}
    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium transition-colors cursor-pointer"
    title="Chat with document"
  >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Chat</span>
                        </button>

                        <button
    onClick={() => onSelectDocForSplitView(doc)}
    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-neutral-700 text-xs font-medium transition-colors cursor-pointer"
    title="Open Split View"
  >
                          <Columns2 className="w-3.5 h-3.5 text-neutral-500" />
                          <span>View</span>
                        </button>

                        <button
    onClick={() => onDeleteDoc(doc.id)}
    className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
    title="Delete document"
  >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>}
      </div>
    </div>;
};
