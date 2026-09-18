import {
  Plus,
  MessageCircle,
  Trash2,
  Settings,
  ChevronsLeft
} from "lucide-react";
export const Sidebar = ({
  isOpen,
  onToggle,
  recentChats,
  activeChatId,
  onSelectChat,
  onNewChat,
  onDeleteChat,
  onOpenSettings,
  currentUser
}) => {
  if (!isOpen) return null;
  const todayChats = recentChats.filter((c) => c.timeGroup === "Today" || !c.timeGroup);
  const olderChats = recentChats.filter((c) => c.timeGroup && c.timeGroup !== "Today");
  const getInitials = (name) => {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return (name.slice(0, 2) || "US").toUpperCase();
  };
  return <aside className="w-[260px] shrink-0 h-screen flex flex-col justify-between select-none bg-[#f9f9f9] dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 z-30 transition-colors duration-200">
      {
    /* Top Header & New Chat */
  }
      <div className="p-3 pb-2 space-y-2">
        {
    /* Top bar with Toggle */
  }
        <div className="flex items-center justify-between px-1">
          <button
    onClick={onToggle}
    title="Collapse sidebar"
    className="p-2 rounded-lg text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
  >
            <ChevronsLeft className="w-4 h-4" />
          </button>
        </div>

        {
    /* Full "+ New Chat" Button */
  }
        <button
    onClick={onNewChat}
    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-lg text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200/70 dark:hover:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700/60 bg-white dark:bg-neutral-850 shadow-2xs transition-all cursor-pointer group"
  >
          <div className="w-5 h-5 rounded-md bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 flex items-center justify-center shrink-0">
            <Plus className="w-3.5 h-3.5" />
          </div>
          <span className="flex-1 text-left text-xs font-semibold">New conversation</span>
        </button>
      </div>

      {
    /* Chat History List */
  }
      <div className="flex-1 overflow-y-auto px-3 py-1 space-y-4">
        {recentChats.length === 0 ? <div className="py-8 px-2 text-center">
            <div className="w-8 h-8 rounded-full bg-neutral-200/60 dark:bg-neutral-800 flex items-center justify-center mx-auto mb-2 text-neutral-400">
              <MessageCircle className="w-4 h-4" />
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-300 font-medium">No chats yet</p>
            <p className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-1 leading-relaxed">
              Send a message or upload a document to start your conversation.
            </p>
          </div> : <>
            {
    /* Today Chats */
  }
            <div>
              <div className="px-2 py-1 text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                Today
              </div>
              <div className="space-y-0.5 mt-1">
                {todayChats.length === 0 ? <div className="px-2 py-2 text-xs text-neutral-400 dark:text-neutral-500 italic">No chats today</div> : todayChats.map((chat) => {
    const isSelected = activeChatId === chat.id;
    return <div
      key={chat.id}
      className={`group relative flex items-center rounded-lg transition-colors ${isSelected ? "bg-neutral-200/80 dark:bg-neutral-800 text-neutral-900 dark:text-white font-medium" : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/50 dark:hover:bg-neutral-800/60"}`}
    >
                        <button
      onClick={() => onSelectChat(chat.id)}
      title={chat.title}
      className="flex-1 flex items-center gap-2.5 px-2.5 py-2 text-xs text-left truncate cursor-pointer min-w-0"
    >
                          <MessageCircle
      className={`w-3.5 h-3.5 shrink-0 ${isSelected ? "text-neutral-900 dark:text-neutral-100" : "text-neutral-400 dark:text-neutral-500"}`}
    />
                          <span className="truncate flex-1">{chat.title}</span>
                        </button>

                        {onDeleteChat && <button
      onClick={(e) => {
        e.stopPropagation();
        onDeleteChat(chat.id);
      }}
      title="Delete chat"
      className="opacity-0 group-hover:opacity-100 p-1.5 mr-1 rounded text-neutral-400 hover:text-red-500 transition-opacity cursor-pointer"
    >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>}
                      </div>;
  })}
              </div>
            </div>

            {
    /* Older Chats */
  }
            {olderChats.length > 0 && <div>
                <div className="px-2 py-1 text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                  Previous 7 Days
                </div>
                <div className="space-y-0.5 mt-1">
                  {olderChats.map((chat) => {
    const isSelected = activeChatId === chat.id;
    return <div
      key={chat.id}
      className={`group relative flex items-center rounded-lg transition-colors ${isSelected ? "bg-neutral-200/80 dark:bg-neutral-800 text-neutral-900 dark:text-white font-medium" : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/50 dark:hover:bg-neutral-800/60"}`}
    >
                        <button
      onClick={() => onSelectChat(chat.id)}
      title={chat.title}
      className="flex-1 flex items-center gap-2.5 px-2.5 py-2 text-xs text-left truncate cursor-pointer min-w-0"
    >
                          <MessageCircle
      className={`w-3.5 h-3.5 shrink-0 ${isSelected ? "text-neutral-900 dark:text-neutral-100" : "text-neutral-400 dark:text-neutral-500"}`}
    />
                          <span className="truncate flex-1">{chat.title}</span>
                        </button>

                        {onDeleteChat && <button
      onClick={(e) => {
        e.stopPropagation();
        onDeleteChat(chat.id);
      }}
      title="Delete chat"
      className="opacity-0 group-hover:opacity-100 p-1.5 mr-1 rounded text-neutral-400 hover:text-red-500 transition-opacity cursor-pointer"
    >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>}
                      </div>;
  })}
                </div>
              </div>}
          </>}
      </div>

      {
    /* Bottom Profile & Settings Section */
  }
      <div className="p-3 border-t border-neutral-200 dark:border-neutral-800 bg-[#f4f4f4]/60 dark:bg-neutral-900/90 space-y-1">
        <button
    onClick={onOpenSettings}
    className="w-full flex items-center gap-2.5 px-2.5 py-2 text-xs font-medium rounded-lg text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
  >
          <Settings className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
          <span>Settings</span>
        </button>

        {
    /* Authenticated User Display */
  }
        <div className="flex items-center gap-2.5 px-2.5 py-2 text-xs font-medium rounded-lg text-neutral-800 dark:text-neutral-200">
          <div className="w-7 h-7 rounded-full bg-neutral-900 dark:bg-neutral-105 text-white dark:text-neutral-900 bg-neutral-900 dark:bg-white flex items-center justify-center text-xs font-bold shrink-0 shadow-2xs">
            {currentUser ? getInitials(currentUser.name) : "NR"}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="truncate font-semibold text-xs text-neutral-900 dark:text-neutral-100">
              {currentUser?.name || "Niharika Reddi"}
            </span>
            <span className="truncate text-[11px] text-neutral-400 dark:text-neutral-500">
              {currentUser?.email || "niharikareddi1308@gmail.com"}
            </span>
          </div>
        </div>
      </div>
    </aside>;
};
