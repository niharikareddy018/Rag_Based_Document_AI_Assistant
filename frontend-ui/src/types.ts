export type FileFormat = 'PDF' | 'DOCX' | 'TXT';

export interface DocumentSourceCitation {
  id: string;
  page: number;
  label: string; // e.g. "Page 4"
  docName: string;
  sectionTitle?: string;
  previewSnippet: string;
  highlightText: string;
  relevanceScore: number;
  chunkId: string;
}

export interface DocumentPageData {
  pageNumber: number;
  title: string;
  subtitle?: string;
  sections: Array<{
    heading?: string;
    paragraphs: string[];
    isHighlighted?: boolean;
    highlightCitationId?: string;
    tableOrList?: string[];
  }>;
}

export interface DocumentItem {
  id: string;
  name: string;
  fileType: FileFormat;
  pages: number;
  size: string;
  uploadDate: string;
  status: 'Ready' | 'Processing' | 'Indexing';
  chunks: number;
  vectorDimensions: number;
  embeddingModel: string;
  summary: string;
  sampleQuestions: string[];
  pageContent: DocumentPageData[];
  rawText?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  timestamp: string;
  text: string;
  findings?: string[];
  conclusion?: string;
  citations?: DocumentSourceCitation[];
  attachedDoc?: {
    id?: string;
    name: string;
    size: string;
    pages: number;
    fileType: FileFormat;
  };
  isUploadEvent?: boolean;
  suggestedPrompts?: string[];
}

export interface RecentChat {
  id: string;
  title: string;
  docId: string;
  docName: string;
  updatedAt: string;
  previewText: string;
  timeGroup?: 'Today' | '5 Days Ago' | '7 Days Ago' | 'Older';
}

export type AppView = 'chat' | 'documents' | 'upload' | 'split';

export interface UploadPipelineStep {
  id: string;
  label: string;
  status: 'pending' | 'active' | 'completed';
  detail?: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  provider: 'google' | 'email';
  authenticatedAt: string;
}

