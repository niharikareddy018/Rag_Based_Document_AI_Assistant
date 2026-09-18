import { useState } from "react";
import {
  ScanSearch,
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
  FileText
} from "lucide-react";
import { removeStarsAndAsterisks, cleanFindings } from "../../utils/textCleaner";
export const ChatMessageItem = ({
  message,
  onSelectPrompt
}) => {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const cleanText = removeStarsAndAsterisks(message.text);
  const cleanFindingsList = cleanFindings(message.findings);
  const cleanConclusion = removeStarsAndAsterisks(message.conclusion);
  const handleCopy = () => {
    let fullText = cleanText;
    if (cleanFindingsList && cleanFindingsList.length > 0) {
      fullText += "\n\n" + cleanFindingsList.map((f) => `\u2022 ${f}`).join("\n");
    }
    if (cleanConclusion) {
      fullText += `

${cleanConclusion}`;
    }
    navigator.clipboard?.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  if (message.sender === "user") {
    return <div className="flex justify-end mb-6">
        <div className="max-w-2xl bg-[#f4f4f4] dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-4 py-2.5 rounded-3xl text-sm leading-relaxed shadow-2xs font-normal border border-transparent dark:border-neutral-700/60 transition-colors">
          {message.attachedDoc && <div className="flex items-center gap-2 px-3 py-1.5 mb-2 rounded-xl bg-white dark:bg-neutral-750 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-800 dark:text-neutral-200">
              <FileText className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400" />
              <span className="font-medium truncate max-w-[200px]">{message.attachedDoc.name}</span>
            </div>}
          <p className="whitespace-pre-wrap">{cleanText}</p>
        </div>
      </div>;
  }
  return <div className="flex justify-start mb-8 group">
      <div className="flex gap-4 max-w-3xl w-full items-start">
        {
    /* Unique DocLens Document Scanner Icon */
  }
        <div className="w-7 h-7 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs border border-neutral-800 dark:border-neutral-200">
          <ScanSearch className="w-3.5 h-3.5 text-neutral-100 dark:text-neutral-900" />
        </div>

        {
    /* Message Body */
  }
        <div className="flex-1 min-w-0 space-y-3">
          {
    /* Document Attachment Card if this is an upload event or has attachedDoc */
  }
          {message.attachedDoc && <div className="flex items-center gap-3 p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-2xs">
              <div className="w-9 h-9 rounded-xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-xs text-neutral-900 dark:text-neutral-100 truncate">
                    {message.attachedDoc.name}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium">
                    {message.attachedDoc.fileType}
                  </span>
                </div>
                <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  {message.attachedDoc.pages} {message.attachedDoc.pages === 1 ? "page" : "pages"} • {message.attachedDoc.size}
                </div>
              </div>
              <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2.5 py-0.5 rounded-full">
                Ready in Chat
              </span>
            </div>}

          {
    /* Main text - Star and asterisk free */
  }
          <div className="text-neutral-900 dark:text-neutral-100 text-[15px] leading-7 font-normal">
            <p className="whitespace-pre-wrap">{cleanText}</p>
          </div>

          {
    /* Suggested Prompts (Clickable chips) */
  }
          {message.suggestedPrompts && message.suggestedPrompts.length > 0 && onSelectPrompt && <div className="pt-2 flex flex-wrap gap-2">
              {message.suggestedPrompts.map((prompt, idx) => <button
    key={idx}
    onClick={() => onSelectPrompt(removeStarsAndAsterisks(prompt))}
    className="px-3 py-1.5 text-xs font-medium bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-full border border-neutral-200/80 dark:border-neutral-700 transition-colors cursor-pointer"
  >
                  {removeStarsAndAsterisks(prompt)} →
                </button>)}
            </div>}

          {
    /* Key Findings (Clean bullet list if present, stars stripped) */
  }
          {cleanFindingsList && cleanFindingsList.length > 0 && <div className="pt-1 space-y-1.5">
              <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                Key Points
              </div>
              <ul className="space-y-1.5 pl-1">
                {cleanFindingsList.map((f, idx) => <li key={idx} className="flex items-start gap-2 text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-500 mt-2 shrink-0" />
                    <span>{f}</span>
                  </li>)}
              </ul>
            </div>}

          {
    /* Conclusion */
  }
          {cleanConclusion && <p className="text-xs text-neutral-500 dark:text-neutral-400 italic pt-1">
              {cleanConclusion}
            </p>}

          {
    /* Bottom Actions Row (Copy, Thumbs Up, Thumbs Down) */
  }
          <div className="flex items-center gap-1 pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
    onClick={handleCopy}
    title={copied ? "Copied" : "Copy response"}
    className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors cursor-pointer"
  >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>

            <button
    onClick={() => setFeedback(feedback === "up" ? null : "up")}
    title="Helpful response"
    className={`p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer ${feedback === "up" ? "text-emerald-600" : "text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"}`}
  >
              <ThumbsUp className="w-3.5 h-3.5" />
            </button>

            <button
    onClick={() => setFeedback(feedback === "down" ? null : "down")}
    title="Unhelpful response"
    className={`p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer ${feedback === "down" ? "text-red-500" : "text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"}`}
  >
              <ThumbsDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>;
};
