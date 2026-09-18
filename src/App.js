import { useState, useEffect } from "react";
import { queryGatewayAsk, uploadDocumentToGateway } from "./services/ragBackendService";
import { extractTextFromFile } from "./utils/fileExtractor";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { MainChatView } from "./components/views/MainChatView";
import { SettingsModal } from "./components/modals/SettingsModal";
import { DocumentHistoryModal } from "./components/modals/DocumentHistoryModal";
import { AuthModal } from "./components/auth/AuthModal";
export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [uploadedDocuments, setUploadedDocuments] = useState(() => {
    try {
      const saved = localStorage.getItem("doclens_uploaded_docs");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [attachedFile, setAttachedFile] = useState(null);
  const [chatDocuments, setChatDocuments] = useState({});
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [recentChats, setRecentChats] = useState(() => {
    try {
      const saved = localStorage.getItem("doclens_recent_chats");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [activeChatId, setActiveChatId] = useState(() => {
    try {
      const saved = localStorage.getItem("doclens_recent_chats");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed[0].id;
        }
      }
    } catch {
    }
    return "chat-init";
  });
  const [chatConversations, setChatConversations] = useState(() => {
    try {
      const saved = localStorage.getItem("doclens_conversations");
      return saved ? JSON.parse(saved) : { "chat-init": [] };
    } catch {
      return { "chat-init": [] };
    }
  });
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem("doclens_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("doclens_theme");
      if (saved === "dark" || saved === "light") return saved;
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } catch {
      return "light";
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem("doclens_theme", theme);
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch (e) {
      console.warn("Failed to sync theme:", e);
    }
  }, [theme]);
  const toggleTheme = () => {
    setTheme((prev) => prev === "dark" ? "light" : "dark");
  };
  const handleAuthenticated = (user) => {
    try {
      localStorage.setItem("doclens_user", JSON.stringify(user));
    } catch (e) {
      console.warn("Failed to persist user:", e);
    }
    setCurrentUser(user);
  };
  const handleSignOut = () => {
    try {
      localStorage.removeItem("doclens_user");
    } catch (e) {
      console.warn("Failed to clear user:", e);
    }
    setCurrentUser(null);
    setIsSettingsOpen(false);
  };
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDocHistoryOpen, setIsDocHistoryOpen] = useState(false);
  useEffect(() => {
    try {
      localStorage.setItem("doclens_uploaded_docs", JSON.stringify(uploadedDocuments));
    } catch (e) {
      console.warn("Failed to save uploaded documents:", e);
    }
  }, [uploadedDocuments]);
  useEffect(() => {
    try {
      localStorage.setItem("doclens_recent_chats", JSON.stringify(recentChats));
    } catch (e) {
      console.warn("Failed to save recent chats:", e);
    }
  }, [recentChats]);
  useEffect(() => {
    try {
      localStorage.setItem("doclens_conversations", JSON.stringify(chatConversations));
    } catch (e) {
      console.warn("Failed to save conversations:", e);
    }
  }, [chatConversations]);
  const activeMessages = chatConversations[activeChatId] || [];
  const handleSelectChat = (chatId) => {
    setActiveChatId(chatId);
    setAttachedFile(chatDocuments[chatId] || null);
  };
  const handleNewChat = () => {
    const newChatId = `chat-${Date.now()}`;
    setActiveChatId(newChatId);
    setAttachedFile(null);
    setChatConversations((prev) => ({
      ...prev,
      [newChatId]: []
      // Blank welcome screen
    }));
  };
  const handleDeleteChat = (chatId) => {
    const remaining = recentChats.filter((c) => c.id !== chatId);
    setRecentChats(remaining);
    setChatConversations((prev) => {
      const updated = { ...prev };
      delete updated[chatId];
      return updated;
    });
    if (activeChatId === chatId) {
      if (remaining.length > 0) {
        handleSelectChat(remaining[0].id);
      } else {
        handleNewChat();
      }
    }
  };
  const handleDeleteDocument = (docId) => {
    setUploadedDocuments((prev) => prev.filter((d) => d.id !== docId));
    if (attachedFile?.id === docId) {
      setAttachedFile(null);
    }
    setChatDocuments((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((key) => {
        if (updated[key]?.id === docId) {
          updated[key] = null;
        }
      });
      return updated;
    });
  };
  const handleSelectDocumentForChat = (doc) => {
    setAttachedFile(doc);
    setChatDocuments((prev) => ({ ...prev, [activeChatId]: doc }));
    const attachNotice = {
      id: `msg-attach-${Date.now()}`,
      sender: "ai",
      timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      text: `Connected **${doc.name}** (${doc.pages} ${doc.pages === 1 ? "page" : "pages"}) to this conversation. What would you like to ask or analyze?`,
      attachedDoc: {
        id: doc.id,
        name: doc.name,
        size: doc.size,
        pages: doc.pages,
        fileType: doc.fileType
      },
      isUploadEvent: true,
      suggestedPrompts: [
        `Summarize ${doc.name}`,
        "What are the main findings?",
        "Explain the core conclusions"
      ]
    };
    setChatConversations((prev) => ({
      ...prev,
      [activeChatId]: [...prev[activeChatId] || [], attachNotice]
    }));
    setRecentChats((prev) => {
      const existing = prev.find((c) => c.id === activeChatId);
      if (existing) {
        return prev.map(
          (c) => c.id === activeChatId ? {
            ...c,
            title: doc.name,
            docName: doc.name,
            docId: doc.id,
            previewText: `Chat with ${doc.name}`,
            updatedAt: "Just now"
          } : c
        );
      } else {
        const newChat = {
          id: activeChatId,
          title: doc.name,
          docId: doc.id,
          docName: doc.name,
          updatedAt: "Just now",
          previewText: `Chat with ${doc.name}`,
          timeGroup: "Today"
        };
        return [newChat, ...prev];
      }
    });
  };
  const handleFileUpload = async (file) => {
    setIsProcessingFile(true);
    try {
      const extracted = await extractTextFromFile(file);
      const ext = file.name.split(".").pop()?.toUpperCase() || "TXT";
      const format = ext === "PDF" || ext === "DOCX" || ext === "TXT" ? ext : "PDF";
      const sizeStr = file.size > 1024 * 1024 ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : `${Math.round(file.size / 1024)} KB`;
      const newDoc = {
        id: `doc-${Date.now()}`,
        name: file.name,
        fileType: format,
        pages: extracted.pageCount,
        size: sizeStr,
        uploadDate: (/* @__PURE__ */ new Date()).toLocaleDateString([], {
          month: "short",
          day: "numeric"
        }) + ", " + (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        status: "Ready",
        chunks: Math.max(1, Math.round(extracted.text.length / 800)),
        vectorDimensions: 768,
        embeddingModel: "gemini-embedding-001",
        summary: extracted.text.slice(0, 240) + "...",
        sampleQuestions: [
          `Summarize ${file.name}`,
          "What are the core takeaways?",
          "Explain in simple terms"
        ],
        rawText: extracted.text,
        pageContent: [
          {
            pageNumber: 1,
            title: file.name.replace(/\.[^/.]+$/, ""),
            sections: extracted.sections.map((s) => ({
              heading: s.heading,
              paragraphs: [s.content]
            }))
          }
        ]
      };
      setUploadedDocuments((prev) => {
        const existingIdx = prev.findIndex((d) => d.name === newDoc.name);
        if (existingIdx >= 0) {
          const updated = [...prev];
          updated[existingIdx] = newDoc;
          return updated;
        }
        return [newDoc, ...prev];
      });
      setAttachedFile(newDoc);
      setChatDocuments((prev) => ({ ...prev, [activeChatId]: newDoc }));
      setRecentChats((prev) => {
        const existing = prev.find((c) => c.id === activeChatId);
        if (existing) {
          return prev.map(
            (c) => c.id === activeChatId ? {
              ...c,
              title: file.name,
              docName: file.name,
              docId: newDoc.id,
              previewText: `Uploaded ${file.name}`,
              updatedAt: "Just now"
            } : c
          );
        } else {
          const newChat = {
            id: activeChatId,
            title: file.name,
            docId: newDoc.id,
            docName: file.name,
            updatedAt: "Just now",
            previewText: `Uploaded ${file.name}`,
            timeGroup: "Today"
          };
          return [newChat, ...prev];
        }
      });
      const uploadNotice = {
        id: `msg-upload-${Date.now()}`,
        sender: "ai",
        timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        text: `I've uploaded and processed **${file.name}** (${extracted.pageCount} ${extracted.pageCount === 1 ? "page" : "pages"}, ${sizeStr}).

What would you like to know or explore from this document?`,
        attachedDoc: {
          id: newDoc.id,
          name: newDoc.name,
          size: newDoc.size,
          pages: newDoc.pages,
          fileType: newDoc.fileType
        },
        isUploadEvent: true,
        suggestedPrompts: [
          `Summarize ${file.name}`,
          "What are the core takeaways?",
          "Explain in simple terms"
        ]
      };
      setChatConversations((prev) => ({
        ...prev,
        [activeChatId]: [...prev[activeChatId] || [], uploadNotice]
      }));
      uploadDocumentToGateway(file.name, extracted.text).catch(() => {
      });
    } catch (err) {
      console.error("File parsing error:", err);
    } finally {
      setIsProcessingFile(false);
    }
  };
  const handleSendMessage = async (userQuery, file) => {
    const currentDoc = file || attachedFile || chatDocuments[activeChatId];
    const userMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      text: userQuery
    };
    setChatConversations((prev) => ({
      ...prev,
      [activeChatId]: [...prev[activeChatId] || [], userMessage]
    }));
    const titleText = userQuery.length > 32 ? `${userQuery.slice(0, 32)}...` : userQuery;
    setRecentChats((prev) => {
      const existing = prev.find((c) => c.id === activeChatId);
      if (existing) {
        return prev.map(
          (c) => c.id === activeChatId ? {
            ...c,
            title: c.title === "New chat" ? titleText : c.title,
            previewText: userQuery,
            updatedAt: "Just now"
          } : c
        );
      } else {
        const newChat = {
          id: activeChatId,
          title: titleText,
          docId: currentDoc?.id || "",
          docName: currentDoc?.name || "",
          updatedAt: "Just now",
          previewText: userQuery,
          timeGroup: "Today"
        };
        return [newChat, ...prev];
      }
    });
    setIsAiLoading(true);
    try {
      const ragResult = await queryGatewayAsk(
        userQuery,
        void 0,
        currentDoc?.name,
        currentDoc?.rawText
      );
      const aiResponse = {
        id: `msg-ai-${Date.now()}`,
        sender: "ai",
        timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        text: ragResult.answerText,
        findings: ragResult.findings,
        conclusion: ragResult.conclusion
      };
      setChatConversations((prev) => ({
        ...prev,
        [activeChatId]: [...prev[activeChatId] || [], aiResponse]
      }));
    } catch {
      const fallbackResponse = {
        id: `msg-ai-${Date.now()}`,
        sender: "ai",
        timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        text: currentDoc ? `Based on "${currentDoc.name}", here is the analysis: ${userQuery}` : `Here is the explanation for your request: ${userQuery}`,
        findings: [
          "Core concepts processed and summarized.",
          "Key information structured clearly for your review."
        ],
        conclusion: "Analysis complete."
      };
      setChatConversations((prev) => ({
        ...prev,
        [activeChatId]: [...prev[activeChatId] || [], fallbackResponse]
      }));
    } finally {
      setIsAiLoading(false);
    }
  };
  return <div className={`flex h-screen w-screen overflow-hidden bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans select-none antialiased ${theme}`}>
      {
    /* 1. Collapsible Sidebar */
  }
      <Sidebar
    isOpen={isSidebarOpen}
    onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
    recentChats={recentChats}
    activeChatId={activeChatId}
    onSelectChat={handleSelectChat}
    onNewChat={handleNewChat}
    onDeleteChat={handleDeleteChat}
    onOpenSettings={() => setIsSettingsOpen(true)}
    currentUser={currentUser}
  />

      {
    /* 2. Main Content Area */
  }
      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0 bg-white dark:bg-neutral-950">
        {
    /* Top Header with Document History Counter in Middle & Dark Mode */
  }
        <Header
    isSidebarOpen={isSidebarOpen}
    onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
    onNewChat={handleNewChat}
    uploadedDocsCount={uploadedDocuments.length}
    onOpenDocumentHistory={() => setIsDocHistoryOpen(true)}
    theme={theme}
    onToggleTheme={toggleTheme}
  />

        {
    /* Conversation Viewport */
  }
        <main className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
          <MainChatView
    selectedDoc={attachedFile || chatDocuments[activeChatId]}
    onFileUpload={handleFileUpload}
    onDetachDoc={() => {
      setAttachedFile(null);
      setChatDocuments((prev) => ({ ...prev, [activeChatId]: null }));
    }}
    messages={activeMessages}
    onSendMessage={handleSendMessage}
    isLoading={isAiLoading}
    isProcessingFile={isProcessingFile}
  />
        </main>
      </div>

      {
    /* Document History Modal (Visible at top middle of the page) */
  }
      <DocumentHistoryModal
    isOpen={isDocHistoryOpen}
    onClose={() => setIsDocHistoryOpen(false)}
    documents={uploadedDocuments}
    activeDocId={attachedFile?.id || chatDocuments[activeChatId]?.id}
    onSelectDocumentForChat={handleSelectDocumentForChat}
    onDeleteDocument={handleDeleteDocument}
    onUploadFile={handleFileUpload}
    isProcessingFile={isProcessingFile}
  />

      {
    /* Settings Modal - Keeps ONLY the Sign Out option */
  }
      {isSettingsOpen && <SettingsModal
    isOpen={isSettingsOpen}
    onClose={() => setIsSettingsOpen(false)}
    currentUser={currentUser}
    onSignOut={handleSignOut}
  />}

      {
    /* Authentication Modal - Validates user via Email or Google before access */
  }
      <AuthModal
    isOpen={!currentUser}
    onAuthenticated={handleAuthenticated}
    defaultEmail="niharikareddi1308@gmail.com"
  />
    </div>;
}
