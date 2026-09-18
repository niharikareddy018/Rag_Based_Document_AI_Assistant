import React, { useState, useRef, useEffect } from 'react';
import { DocumentItem } from '../../types';
import { X, UploadCloud, FileText, Check } from 'lucide-react';

interface AttachDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  allDocs: DocumentItem[];
  attachedDoc: DocumentItem;
  onSelectDoc: (doc: DocumentItem) => void;
  onUploadNewDoc: (doc: DocumentItem) => void;
}

export const AttachDocumentModal: React.FC<AttachDocumentModalProps> = ({
  isOpen,
  onClose,
  allDocs,
  attachedDoc,
  onSelectDoc,
  onUploadNewDoc,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  if (!isOpen) return null;

  const handleFileUpload = (file: File) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    setUploadProgress(20);
    let currentProgress = 20;

    timerRef.current = setInterval(() => {
      currentProgress += 25;

      if (currentProgress >= 100) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        setUploadProgress(100);

        const ext = file.name.split('.').pop()?.toUpperCase();
        const format = ext === 'PDF' || ext === 'DOCX' || ext === 'TXT' ? ext : 'PDF';
        const newDoc: DocumentItem = {
          id: `doc-${Date.now()}`,
          name: file.name,
          fileType: format as any,
          pages: Math.floor(Math.random() * 20) + 4,
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          uploadDate: 'Just now',
          status: 'Ready',
          chunks: Math.floor(Math.random() * 40) + 12,
          vectorDimensions: 768,
          embeddingModel: 'nomic-embed-text',
          summary: `Vectorized document: ${file.name} parsed and indexed for DocLens AI grounded queries.`,
          sampleQuestions: [
            `Summarize key topics in ${file.name}`,
            `Extract main conclusions and statistics`,
            `What are the core findings?`,
          ],
          pageContent: [
            {
              pageNumber: 1,
              title: file.name.replace(/\.[^/.]+$/, ''),
              sections: [
                {
                  heading: 'Uploaded Document Content',
                  paragraphs: [
                    `This document was uploaded into DocLens AI for RAG parsing.`,
                    `Semantic embeddings were generated with chunk boundaries preserved.`,
                  ],
                },
              ],
            },
          ],
        };

        // Complete upload and update parent outside of React render phase
        setTimeout(() => {
          setUploadProgress(null);
          onUploadNewDoc(newDoc);
          onSelectDoc(newDoc);
          onClose();
        }, 300);
      } else {
        setUploadProgress(currentProgress);
      }
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div
        className="w-full max-w-lg rounded-2xl bg-white border border-neutral-200 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 tracking-tight">Attach Document</h3>
              <p className="text-xs text-neutral-500">Select or upload a document to ground your chat</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Quick Drag & Drop Upload Box */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              if (e.dataTransfer.files?.[0]) {
                handleFileUpload(e.dataTransfer.files[0]);
              }
            }}
            className={`border-2 border-dashed rounded-xl p-5 text-center transition-all cursor-pointer ${
              isDragging
                ? 'border-neutral-900 bg-neutral-50'
                : 'border-neutral-300 hover:border-neutral-400 bg-neutral-50/50'
            }`}
          >
            <input
              type="file"
              id="file-attach-input"
              accept=".pdf,.docx,.txt"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleFileUpload(e.target.files[0]);
                }
              }}
            />
            <label htmlFor="file-attach-input" className="cursor-pointer block">
              <UploadCloud className="w-8 h-8 text-neutral-600 mx-auto mb-2" />
              <p className="text-xs font-medium text-neutral-800">
                Click to upload or drag & drop file
              </p>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                PDF, DOCX, or TXT up to 50MB
              </p>
            </label>

            {uploadProgress !== null && (
              <div className="mt-3">
                <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-neutral-900 h-full transition-all duration-200"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <span className="text-[11px] text-neutral-600 font-mono mt-1 block">
                  Vectorizing chunks... {uploadProgress}%
                </span>
              </div>
            )}
          </div>

          {/* Existing Documents List */}
          <div>
            <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2.5">
              Or Choose from Indexed Documents
            </h4>
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {allDocs.map((doc) => {
                const isSelected = doc.id === attachedDoc?.id;
                return (
                  <button
                    key={doc.id}
                    onClick={() => {
                      onSelectDoc(doc);
                      onClose();
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-neutral-100 border-neutral-400 shadow-2xs'
                        : 'bg-white border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <FileText className={`w-4 h-4 shrink-0 ${isSelected ? 'text-neutral-900' : 'text-neutral-500'}`} />
                      <div className="truncate">
                        <div className="text-xs font-medium text-neutral-900 truncate">
                          {doc.name}
                        </div>
                        <div className="text-[11px] text-neutral-500">
                          {doc.pages} pages • {doc.chunks} chunks • {doc.size}
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-neutral-100 bg-neutral-50/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-medium text-neutral-700 hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
