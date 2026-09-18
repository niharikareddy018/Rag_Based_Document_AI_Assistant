import React, { useRef, useEffect } from 'react';
import { DocumentItem, ChatMessage } from '../../types';
import { ChatMessageItem } from '../chat/ChatMessageItem';
import { ChatInput } from '../chat/ChatInput';
import { ScanSearch } from 'lucide-react';

interface MainChatViewProps {
  selectedDoc: DocumentItem | null;
  onFileUpload: (file: File) => void;
  onDetachDoc: () => void;
  messages: ChatMessage[];
  onSendMessage: (query: string, file?: DocumentItem | null) => void;
  isLoading: boolean;
  isProcessingFile?: boolean;
}

/**
 * MainChatView Component (DocLens Conversational Interface)
 * 
 * - Unique welcome state with DocLens Scanner icon and query suggestions
 * - Message stream with star-free responses and document intelligence
 * - Bottom input with direct document upload and send controls
 * - Full Dark Mode Support
 */
export const MainChatView: React.FC<MainChatViewProps> = ({
  selectedDoc,
  onFileUpload,
  onDetachDoc,
  messages,
  onSendMessage,
  isLoading,
  isProcessingFile = false,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const hasMessages = messages.length > 0;

  // Generic clean prompt suggestions
  const suggestions = [
    'Summarize this document',
    'What are the key points and conclusions?',
    'Explain this topic in simple terms',
    'Help me analyze and take notes',
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-white dark:bg-neutral-950 relative overflow-hidden select-none transition-colors">
      {/* ================= 1. SCROLLABLE CHAT MESSAGES AREA ================= */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto w-full min-h-0 px-4 py-6"
      >
        <div className="max-w-3xl mx-auto w-full">
          {!hasMessages ? (
            /* CLEAN UNIQUE EMPTY STATE */
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
              <div className="w-13 h-13 rounded-2xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 flex items-center justify-center mb-5 shadow-sm border border-neutral-800 dark:border-neutral-200">
                <ScanSearch className="w-7 h-7" />
              </div>

              <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight mb-8">
                What can I help with?
              </h1>

              {/* Minimalist Prompt Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-xl w-full">
                {suggestions.map((promptText, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSendMessage(promptText, selectedDoc)}
                    className="p-3 text-left rounded-2xl border border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all cursor-pointer text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white shadow-2xs group"
                  >
                    <span className="line-clamp-2">{promptText}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* ACTIVE MESSAGES STREAM */
            <div className="space-y-6 pt-2 pb-6">
              {messages.map((msg) => (
                <ChatMessageItem
                  key={msg.id}
                  message={msg}
                  onSelectPrompt={(prompt) => onSendMessage(prompt, selectedDoc)}
                />
              ))}

              {/* Scroll anchor */}
              <div ref={messagesEndRef} className="h-4" />
            </div>
          )}
        </div>
      </div>

      {/* ================= 2. FIXED BOTTOM INPUT BAR ================= */}
      <div className="shrink-0 w-full bg-white dark:bg-neutral-950 pt-2 pb-4 z-20 transition-colors">
        <ChatInput
          onSendMessage={onSendMessage}
          onFileUpload={onFileUpload}
          attachedDoc={selectedDoc}
          onDetachDoc={onDetachDoc}
          isLoading={isLoading}
          isProcessingFile={isProcessingFile}
          placeholder="Message DocLens..."
        />
      </div>
    </div>
  );
};
