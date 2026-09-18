import { X } from "lucide-react";
export const AccountModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div
    className="w-full max-w-md bg-[#0d1610] rounded-3xl shadow-2xl border border-[#233827] overflow-hidden"
    onClick={(e) => e.stopPropagation()}
  >
        <div className="px-6 py-4 border-b border-[#1b2b20] flex items-center justify-between bg-[#0a110c]">
          <h3 className="text-sm font-semibold text-white">User Account</h3>
          <button onClick={onClose} className="p-1 rounded-full text-neutral-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs text-neutral-300">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#09110b] border border-[#1b2b20]">
            <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#22c55e]/50 bg-[#16271a] flex items-center justify-center">
              <img
    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
    alt="Emily Watson"
    className="w-full h-full object-cover"
  />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">Emily Watson</h4>
              <p className="text-neutral-400 text-[11px]">Senior AI Research Lead</p>
              <span className="inline-block mt-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#16271a] text-[#4ade80] border border-[#22c55e]/30">
                Enterprise Pro Plan
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between py-2 border-b border-[#18261d]">
              <span className="text-neutral-400">Email</span>
              <span className="text-white">emily.watson@enterprise.ai</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#18261d]">
              <span className="text-neutral-400">Storage Usage</span>
              <span className="text-[#4ade80]">14.2 MB / 10 GB</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#18261d]">
              <span className="text-neutral-400">Vector Embeddings</span>
              <span className="text-white">8,420 vectors</span>
            </div>
          </div>
        </div>

        <div className="px-6 py-3 bg-[#0a110c] border-t border-[#1b2b20] flex justify-end">
          <button
    onClick={onClose}
    className="px-4 py-1.5 rounded-full bg-[#182a1d] text-xs text-white font-medium hover:bg-[#233a28]"
  >
            Close
          </button>
        </div>
      </div>
    </div>;
};
