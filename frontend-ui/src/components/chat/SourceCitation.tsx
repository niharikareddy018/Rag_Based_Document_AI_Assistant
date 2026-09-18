import React from 'react';
import { DocumentSourceCitation } from '../../types';
import { Bookmark, ExternalLink } from 'lucide-react';

interface SourceCitationProps {
  citation: DocumentSourceCitation;
  onClick: (citation: DocumentSourceCitation) => void;
  isActive?: boolean;
  size?: 'sm' | 'md';
}

export const SourceCitation: React.FC<SourceCitationProps> = ({
  citation,
  onClick,
  isActive = false,
  size = 'md',
}) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  return (
    <button
      onClick={() => onClick(citation)}
      title={`Click to preview citation from ${citation.label} (${citation.relevanceScore}% similarity)`}
      className={`inline-flex items-center gap-1.5 rounded-full font-medium transition-all cursor-pointer border select-none group ${
        isActive
          ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm ring-1 ring-neutral-900'
          : 'bg-neutral-100 hover:bg-neutral-200/90 text-neutral-800 hover:text-neutral-900 border-neutral-200 hover:border-neutral-300'
      } ${sizeClasses}`}
    >
      <Bookmark className={`w-3 h-3 ${isActive ? 'text-white' : 'text-neutral-500 group-hover:text-neutral-800'}`} />
      <span className="font-medium">{citation.label}</span>
      <span className={`text-[10px] ${isActive ? 'text-neutral-300' : 'text-neutral-500 group-hover:text-neutral-700'}`}>
        {citation.relevanceScore}%
      </span>
      <ExternalLink className={`w-2.5 h-2.5 opacity-60 group-hover:opacity-100 ${isActive ? 'text-neutral-300' : 'text-neutral-400'}`} />
    </button>
  );
};
