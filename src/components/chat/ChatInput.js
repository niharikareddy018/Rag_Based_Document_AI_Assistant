import { useState, useRef, useEffect } from "react";
import { FileUp, SendHorizontal, X, FileText, Loader2 } from "lucide-react";
export const ChatInput = ({
  onSendMessage,
  onFileUpload,
  attachedDoc,
  onDetachDoc,
  isLoading = false,
  isProcessingFile = false,
  placeholder = "Message DocLens..."
}) => {
  const [text, setText] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [text]);
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && onFileUpload) {
      onFileUpload(file);
    }
    if (e.target) {
      e.target.value = "";
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && onFileUpload) {
      onFileUpload(file);
    }
  };
  const handleSubmit = (e) => {
    e?.preventDefault();
    const query = text.trim();
    if (!query && !attachedDoc) return;
    onSendMessage(query || `Analyzing uploaded file: ${attachedDoc?.name}`, attachedDoc);
    setText("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.focus();
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  return <div className="w-full max-w-3xl mx-auto px-4">
      {
    /* Hidden File Input for Document Trigger */
  }
      <input
    type="file"
    ref={fileInputRef}
    onChange={handleFileChange}
    accept=".pdf,.docx,.txt,.doc,.md,.json,.csv"
    className="hidden"
  />

      {
    /* Input Card Container */
  }
      <div
    onDragOver={handleDragOver}
    onDragLeave={handleDragLeave}
    onDrop={handleDrop}
    className={`relative rounded-3xl transition-all ${isDragging ? "bg-neutral-100 dark:bg-neutral-800 border-2 border-dashed border-neutral-900 dark:border-white shadow-md" : "bg-[#f4f4f4] dark:bg-neutral-850 focus-within:bg-white dark:focus-within:bg-neutral-800 border border-transparent focus-within:border-neutral-300 dark:focus-within:border-neutral-700 focus-within:shadow-md"}`}
  >
        {
    /* Attached File Pill */
  }
        {(attachedDoc || isProcessingFile) && <div className="px-4 pt-3 pb-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-800 dark:text-neutral-200 shadow-2xs">
              {isProcessingFile ? <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-neutral-600 dark:text-neutral-400" />
                  <span className="font-medium text-neutral-600 dark:text-neutral-400">Reading and processing file...</span>
                </> : <>
                  <FileText className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400" />
                  <span className="font-medium truncate max-w-[260px]">{attachedDoc?.name}</span>
                  {onDetachDoc && <button
    type="button"
    onClick={onDetachDoc}
    title="Remove file"
    className="p-0.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors cursor-pointer ml-1"
  >
                      <X className="w-3 h-3" />
                    </button>}
                </>}
            </div>
          </div>}

        {
    /* Text Input Row */
  }
        <div className="px-4 pt-3 pb-1">
          <textarea
    ref={textareaRef}
    value={text}
    onChange={(e) => setText(e.target.value)}
    onKeyDown={handleKeyDown}
    placeholder={attachedDoc ? `Ask anything about ${attachedDoc.name}...` : placeholder}
    rows={1}
    className="w-full resize-none text-[15px] text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 bg-transparent focus:outline-none min-h-[36px] max-h-[160px] leading-relaxed"
  />
        </div>

        {
    /* Bottom Control Row */
  }
        <div className="flex items-center justify-between px-3 pb-2.5 pt-1">
          {
    /* File Upload Button */
  }
          <div className="flex items-center gap-1">
            <button
    type="button"
    onClick={() => fileInputRef.current?.click()}
    title="Upload document (PDF, DOCX, TXT)"
    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full hover:bg-neutral-200/70 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer text-xs font-medium"
  >
              <FileUp className="w-4 h-4" />
              <span className="hidden sm:inline text-[11px]">Upload</span>
            </button>
          </div>

          {
    /* Right Action: Send Button */
  }
          <div className="flex items-center gap-2">
            {isLoading && <div className="flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-500 mr-1 animate-pulse">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-neutral-600 dark:text-neutral-400" />
                <span className="text-[11px] hidden sm:inline">Analyzing...</span>
              </div>}
            <button
    type="button"
    onClick={() => handleSubmit()}
    disabled={!text.trim() && !attachedDoc}
    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${text.trim() || attachedDoc ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-white shadow-xs" : "bg-neutral-200 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-600 cursor-not-allowed opacity-50"}`}
    title="Send message (Enter)"
    aria-label="Send message"
  >
              <SendHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {
    /* Disclaimer caption */
  }
      <div className="text-center mt-2">
        <p className="text-[11px] text-neutral-400 dark:text-neutral-500">
          DocLens provides grounded answers from uploaded files. Sourced via Llama 3.
        </p>
      </div>
    </div>;
};
