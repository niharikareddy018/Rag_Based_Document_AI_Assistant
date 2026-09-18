import {
  Sun,
  Moon,
  MessageSquare,
  Bell
} from "lucide-react";
export const TopNav = ({
  currentView,
  onNavigate
}) => {
  return <header className="w-full flex items-center justify-between px-6 py-3 select-none">
      {
    /* 1. Left Brand Icon */
  }
      <div className="flex items-center gap-3">
        <button
    onClick={() => onNavigate("chat")}
    className="group flex items-center gap-2 cursor-pointer focus:outline-none"
    title="Chatterbox AI / DocuMind"
  >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#22c55e] via-[#4ade80] to-[#86efac] flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.4)] group-hover:scale-105 transition-all">
            {
    /* Custom leaf / abstract geometric mark resembling the reference */
  }
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
    d="M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12"
    stroke="#040905"
    strokeWidth="3.5"
    strokeLinecap="round"
  />
              <path
    d="M12 8V16M16 12H8"
    stroke="#040905"
    strokeWidth="3"
    strokeLinecap="round"
  />
            </svg>
          </div>
        </button>
      </div>

      {
    /* 2. Center-Left Navigation Pill Bar */
  }
      <div className="flex items-center p-1 rounded-full bg-[#0b130e]/90 border border-[#1b2c20] shadow-xl backdrop-blur-md">
        <button
    onClick={() => onNavigate("dashboard")}
    className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${currentView === "dashboard" ? "bg-[#15271a] text-[#4ade80] border border-[#22c55e]/40 shadow-xs" : "text-neutral-400 hover:text-neutral-200"}`}
  >
          Dashboard
        </button>

        <button
    onClick={() => onNavigate("chat")}
    className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${currentView === "chat" ? "bg-[#15271a] text-[#4ade80] border border-[#22c55e]/40 shadow-[0_0_15px_rgba(34,197,94,0.2)]" : "text-neutral-400 hover:text-neutral-200"}`}
  >
          AI Chat
        </button>

        <button
    onClick={() => onNavigate("help")}
    className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${currentView === "help" ? "bg-[#15271a] text-[#4ade80] border border-[#22c55e]/40" : "text-neutral-400 hover:text-neutral-200"}`}
  >
          Help
        </button>

        <button
    onClick={() => onNavigate("account")}
    className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${currentView === "account" ? "bg-[#15271a] text-[#4ade80] border border-[#22c55e]/40" : "text-neutral-400 hover:text-neutral-200"}`}
  >
          Account
        </button>
      </div>

      {
    /* 3. Top Right Utility Cluster */
  }
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#0b130e]/90 border border-[#1b2c20] shadow-md">
          {
    /* Sun (inactive) */
  }
          <button
    title="Light theme"
    className="p-1.5 rounded-full text-neutral-500 hover:text-neutral-300 transition-colors"
  >
            <Sun className="w-4 h-4" />
          </button>

          {
    /* Moon (active with green glow) */
  }
          <button
    title="Dark theme (Active)"
    className="p-1.5 rounded-full text-[#4ade80] bg-[#142618] border border-[#22c55e]/30 shadow-[0_0_10px_rgba(34,197,94,0.3)] transition-colors"
  >
            <Moon className="w-4 h-4" />
          </button>

          <div className="w-[1px] h-4 bg-[#1b2b20] mx-0.5" />

          {
    /* Chat bubble */
  }
          <button
    title="Active sessions"
    onClick={() => onNavigate("chat")}
    className="p-1.5 rounded-full text-neutral-400 hover:text-[#4ade80] transition-colors"
  >
            <MessageSquare className="w-4 h-4" />
          </button>

          {
    /* Bell */
  }
          <button
    title="Notifications"
    className="relative p-1.5 rounded-full text-neutral-400 hover:text-[#4ade80] transition-colors"
  >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#22c55e] shadow-[0_0_6px_#22c55e]" />
          </button>
        </div>

        {
    /* User Profile Avatar (Emily) */
  }
        <button
    onClick={() => onNavigate("account")}
    className="relative group cursor-pointer focus:outline-none"
    title="Emily Watson (Account)"
  >
          <div className="w-9 h-9 rounded-full ring-2 ring-[#22c55e]/50 ring-offset-2 ring-offset-[#070c09] overflow-hidden bg-[#16271a] flex items-center justify-center text-xs font-semibold text-white shadow-md">
            <img
    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
    alt="Emily"
    className="w-full h-full object-cover"
    onError={(e) => {
      e.target.style.display = "none";
    }}
  />
            <span className="select-none">EW</span>
          </div>
        </button>
      </div>
    </header>;
};
