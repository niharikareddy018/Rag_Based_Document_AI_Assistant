import { Menu, Plus, FileStack, Moon, Sun } from "lucide-react";
export const Header = ({
  isSidebarOpen,
  onToggleSidebar,
  onNewChat,
  uploadedDocsCount = 0,
  onOpenDocumentHistory,
  theme = "light",
  onToggleTheme
}) => {
  return <header className="relative h-13 px-4 flex items-center justify-between shrink-0 select-none bg-white dark:bg-neutral-900 border-b border-neutral-200/70 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 z-10 transition-colors">
      {
    /* Left: Sidebar Toggle + DocLens Title */
  }
      <div className="flex items-center gap-2">
        {!isSidebarOpen && <button
    onClick={onToggleSidebar}
    title="Open navigation menu"
    className="p-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
  >
            <Menu className="w-4 h-4" />
          </button>}

        <div className="flex items-center gap-1.5 px-2 py-1 font-semibold text-neutral-800 dark:text-neutral-200 text-sm tracking-tight">
          <span>DocLens</span>
        </div>
      </div>

      {
    /* Top Middle: Document History & Uploaded Count */
  }
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
        <button
    onClick={onOpenDocumentHistory}
    title="View uploaded document history"
    className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-200/90 dark:border-neutral-700 bg-neutral-50/90 dark:bg-neutral-800 hover:bg-neutral-100/90 dark:hover:bg-neutral-750 hover:border-neutral-300 dark:hover:border-neutral-600 text-neutral-800 dark:text-neutral-200 transition-all cursor-pointer shadow-2xs group"
  >
          <FileStack className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-200 transition-colors" />
          <span className="text-xs font-medium">Documents</span>
          <span className="px-1.5 py-0.2 rounded-full text-[11px] font-semibold bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 min-w-[20px] text-center">
            {uploadedDocsCount}
          </span>
        </button>
      </div>

      {
    /* Right: New Chat before Mode Toggle */
  }
      <div className="flex items-center gap-2">
        {onNewChat && <button
    onClick={onNewChat}
    title="New chat"
    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700/60 transition-colors cursor-pointer text-xs font-medium"
  >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New Chat</span>
          </button>}

        {onToggleTheme && <button
    onClick={onToggleTheme}
    title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    className="p-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700/60 transition-colors cursor-pointer"
  >
            {theme === "dark" ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-neutral-600" />}
          </button>}
      </div>
    </header>;
};
