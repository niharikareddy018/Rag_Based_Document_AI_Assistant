import React from 'react';
import { RecentChat } from '../types';
import { MessageSquare, Plus, Trash2 } from 'lucide-react';

interface HistoryChatPanelProps {
  recentChats: RecentChat[];
  activeChatId: string;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
  onDeleteChat?: (chatId: string) => void;
}

export const HistoryChatPanel: React.FC<HistoryChatPanelProps> = ({
  recentChats,
  activeChatId,
  onSelectChat,
  onNewChat,
  onDeleteChat,
}) => {
  // Group chats by timeGroup
  const groups: { label: string; chats: RecentChat[] }[] = [
    {
      label: 'Today',
      chats: recentChats.filter((c) => !c.timeGroup || c.timeGroup === 'Today'),
    },
    {
      label: '5 Days Ago',
      chats: recentChats.filter((c) => c.timeGroup === '5 Days Ago'),
    },
    {
      label: '7 Days Ago',
      chats: recentChats.filter((c) => c.timeGroup === '7 Days Ago' || c.timeGroup === 'Older'),
    },
  ];

  return (
    <aside className="w-[310px] shrink-0 h-full rounded-3xl bg-[#0c140e]/90 border border-[#1b2c20] p-5 shadow-2xl backdrop-blur-xl flex flex-col justify-between overflow-hidden select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#18261d]">
        <h2 className="text-base font-semibold text-neutral-100 tracking-tight">History Chat</h2>
        <button
          onClick={onNewChat}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0d1710] hover:bg-[#15271a] border border-[#22c55e]/30 text-neutral-200 hover:text-[#4ade80] text-xs font-medium transition-all shadow-xs cursor-pointer group"
        >
          <Plus className="w-3.5 h-3.5 text-[#4ade80] group-hover:rotate-90 transition-transform" />
          <span>New Chat</span>
        </button>
      </div>

      {/* Scrollable Timeline List */}
      <div className="flex-1 overflow-y-auto pt-3 space-y-5 pr-1 scrollbar-thin">
        {groups.map((group) => {
          if (group.chats.length === 0) return null;
          return (
            <div key={group.label} className="space-y-2">
              <span className="text-xs font-medium text-neutral-400 pl-1 block tracking-wide">
                {group.label}
              </span>
              <div className="space-y-1.5">
                {group.chats.map((chat) => {
                  const isActive = chat.id === activeChatId;
                  return (
                    <div
                      key={chat.id}
                      onClick={() => onSelectChat(chat.id)}
                      className={`w-full group relative flex items-center justify-between px-3.5 py-2.5 rounded-2xl border transition-all cursor-pointer text-left ${
                        isActive
                          ? 'bg-[#142618] border-[#22c55e] text-white shadow-[0_0_15px_rgba(34,197,94,0.15)]'
                          : 'bg-[#0e1710]/70 border-[#19281d] hover:border-[#28422e] hover:bg-[#121f15] text-neutral-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <MessageSquare
                          className={`w-4 h-4 shrink-0 transition-colors ${
                            isActive ? 'text-[#4ade80]' : 'text-neutral-500 group-hover:text-neutral-300'
                          }`}
                        />
                        <span className="text-xs font-medium truncate block leading-snug">
                          {chat.title}
                        </span>
                      </div>

                      {onDeleteChat && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteChat(chat.id);
                          }}
                          title="Delete session"
                          className="opacity-0 group-hover:opacity-100 p-1 rounded-md text-neutral-500 hover:text-red-400 hover:bg-black/40 transition-all shrink-0"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
