import React from 'react';
import { X, HelpCircle, BookOpen, Sparkles, FileText, CheckCircle2 } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div
        className="w-full max-w-md bg-[#0d1610] rounded-3xl shadow-2xl border border-[#233827] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-[#1b2b20] flex items-center justify-between bg-[#0a110c]">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#4ade80]" />
            <h3 className="text-sm font-semibold text-white">Help & Quick Tips</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-neutral-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs text-neutral-300">
          <div className="p-3 rounded-2xl bg-[#09110b] border border-[#1b2b20]">
            <h4 className="font-semibold text-white mb-1 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#4ade80]" />
              Attaching Documents
            </h4>
            <p className="text-neutral-400 leading-relaxed">
              Click the paperclip button in the chat box to upload PDF, DOCX, or TXT files, or switch between pre-indexed documents.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-[#09110b] border border-[#1b2b20]">
            <h4 className="font-semibold text-white mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#4ade80]" />
              Verified Citations
            </h4>
            <p className="text-neutral-400 leading-relaxed">
              Every AI answer provides green citation badges (e.g. [Page 4]). Click any badge to inspect the exact chunk or view it side-by-side in the Split Reader.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-[#09110b] border border-[#1b2b20]">
            <h4 className="font-semibold text-white mb-1 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#4ade80]" />
              Split Reader Mode
            </h4>
            <p className="text-neutral-400 leading-relaxed">
              Use the Scales icon on the left rail or click "Inspect in Split View" on any response to open the synchronized document reader.
            </p>
          </div>
        </div>

        <div className="px-6 py-3 bg-[#0a110b] border-t border-[#1b2b20] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-[#182a1d] text-xs text-white font-medium hover:bg-[#233a28]"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
