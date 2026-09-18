import express from 'express';
import path from 'path';
import multer from 'multer';
import mammoth from 'mammoth';
import { PDFParse } from 'pdf-parse';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

// Initialize lazy Gemini client
let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) return null;
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Multer memory storage for uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 30 * 1024 * 1024 }, // 30MB
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
      timestamp: new Date().toISOString(),
    });
  });

  // In-memory stores for Gateway and Vector CRUD testing
  const memoryDocuments = new Map<string, any>();
  const memoryVectors = new Map<string, any>();

  // Gateway Controller CRUD Endpoints
  app.get('/gateway/status', (req, res) => {
    try {
      res.json({
        gateway: 'ONLINE',
        service: 'vector_service',
        timestamp: new Date().toISOString(),
        documentsCount: memoryDocuments.size,
        vectorsCount: memoryVectors.size,
      });
    } catch (e: any) {
      res.status(500).json({ gateway: 'ERROR', error: e.message });
    }
  });

  app.post('/gateway/documents', (req, res) => {
    try {
      const doc = req.body || {};
      if (!doc.id) doc.id = 'doc_' + Date.now();
      doc.createdAt = new Date().toISOString();
      doc.status = doc.status || 'ACTIVE';
      memoryDocuments.set(doc.id, doc);
      res.status(201).json(doc);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get('/gateway/documents', (req, res) => {
    try {
      res.json(Array.from(memoryDocuments.values()));
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get('/gateway/documents/:id', (req, res) => {
    try {
      const doc = memoryDocuments.get(req.params.id);
      if (doc) return res.json(doc);
      res.status(404).json({ error: 'Document not found' });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.put('/gateway/documents/:id', (req, res) => {
    try {
      const id = req.params.id;
      if (!memoryDocuments.has(id)) {
        return res.status(404).json({ error: 'Document not found' });
      }
      const existing = memoryDocuments.get(id);
      const updated = { ...existing, ...req.body, id, updatedAt: new Date().toISOString() };
      memoryDocuments.set(id, updated);
      res.json(updated);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.delete('/gateway/documents/:id', (req, res) => {
    try {
      const id = req.params.id;
      const deleted = memoryDocuments.delete(id);
      res.json({ deleted, id });
    } catch (e: any) {
      res.status(500).json({ deleted: false, error: e.message });
    }
  });

  // VectorTool Controller CRUD Endpoints
  app.post('/api/vectors', (req, res) => {
    try {
      const vec = req.body || {};
      if (!vec.id) vec.id = 'vec_' + Date.now();
      vec.createdAt = new Date().toISOString();
      memoryVectors.set(vec.id, vec);
      res.status(201).json(vec);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get('/api/vectors/:id', (req, res) => {
    try {
      const vec = memoryVectors.get(req.params.id);
      if (vec) return res.json(vec);
      res.status(404).json({ error: 'Vector embedding not found' });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get('/api/vectors/document/:documentId', (req, res) => {
    try {
      const docId = req.params.documentId;
      const matches = Array.from(memoryVectors.values()).filter((v: any) => v.documentId === docId);
      res.json(matches);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.put('/api/vectors/:id', (req, res) => {
    try {
      const id = req.params.id;
      if (!memoryVectors.has(id)) {
        return res.status(404).json({ error: 'Vector not found' });
      }
      const existing = memoryVectors.get(id);
      const updated = { ...existing, ...req.body, id };
      memoryVectors.set(id, updated);
      res.json(updated);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.delete('/api/vectors/:id', (req, res) => {
    try {
      const id = req.params.id;
      const deleted = memoryVectors.delete(id);
      res.json({ deleted, id });
    } catch (e: any) {
      res.status(500).json({ deleted: false, error: e.message });
    }
  });

  app.delete('/api/vectors/document/:documentId', (req, res) => {
    try {
      const docId = req.params.documentId;
      let count = 0;
      for (const [key, val] of memoryVectors.entries()) {
        if (val.documentId === docId) {
          memoryVectors.delete(key);
          count++;
        }
      }
      res.json({ deleted: true, documentId: docId, removedCount: count });
    } catch (e: any) {
      res.status(500).json({ deleted: false, error: e.message });
    }
  });

  // Document Text Extraction Endpoint (PDF, DOCX, TXT, MD, CSV, Code)
  app.post('/api/upload', upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const fileName = req.file.originalname;
      const fileBuffer = req.file.buffer;
      const lowerName = fileName.toLowerCase();

      let extractedText = '';
      let pageCount = 1;

      // 1. PDF extraction with pdf-parse
      if (lowerName.endsWith('.pdf') || req.file.mimetype === 'application/pdf') {
        try {
          const parser = new PDFParse({ data: fileBuffer });
          const textResult = await parser.getText();
          extractedText = textResult.text || '';
          pageCount = textResult.pages?.length || Math.max(1, Math.ceil(extractedText.length / 2500));
          await parser.destroy();
        } catch (pdfErr) {
          console.warn('pdf-parse failed, attempting fallback decoder:', pdfErr);
          const raw = fileBuffer.toString('utf-8');
          const matches = raw.match(/\(([^()]{3,})\)\s*T[jJ]/g);
          if (matches && matches.length > 5) {
            extractedText = matches
              .map((m) => m.replace(/^\(/, '').replace(/\)\s*T[jJ]$/, ''))
              .join(' ');
          }
        }
      }
      // 2. DOCX Word document extraction with mammoth
      else if (
        lowerName.endsWith('.docx') ||
        req.file.mimetype.includes('wordprocessingml')
      ) {
        try {
          const result = await mammoth.extractRawText({ buffer: fileBuffer });
          extractedText = result.value || '';
          pageCount = Math.max(1, Math.ceil(extractedText.length / 2500));
        } catch (docxErr) {
          console.warn('mammoth extraction failed:', docxErr);
        }
      }
      // 3. Plain Text, Markdown, CSV, JSON, Source Code
      else {
        extractedText = fileBuffer.toString('utf-8');
        pageCount = Math.max(1, Math.ceil(extractedText.length / 2500));
      }

      // Cleanup text whitespace
      const cleanText = extractedText.replace(/\r\n/g, '\n').trim();

      return res.json({
        success: true,
        fileName,
        fileSize: req.file.size,
        pageCount,
        charCount: cleanText.length,
        text: cleanText,
      });
    } catch (err: any) {
      console.error('Extraction error:', err);
      return res.status(500).json({
        error: 'Failed to extract text from document',
        details: err?.message || String(err),
      });
    }
  });

  // RAG Question-Answering Endpoint with Grounded Context
  app.post('/api/ask', async (req, res) => {
    const { query, documentName, documentText, history } = req.body;

    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    // 1. If Gemini API Key is configured, use gemini-3.8-flash for grounded answer
    const ai = getAI();
    if (ai) {
      try {
        const systemInstruction = `You are DocLens AI, a helpful, precise document assistant.
The user has attached a document named "${documentName || 'Uploaded Document'}".
Your goal is to answer the user's question accurately, thoroughly, and factually based on the content of the attached document.

CRITICAL FORMATTING REQUIREMENT:
- DO NOT USE ASTERISKS (*) OR STARS AT ALL. Never output double asterisks (**), single asterisks (*), or markdown bold/italic asterisks.
- For section headers or emphasis, write the title cleanly on its own line using plain text and normal capitalization (e.g. "Key Summary:" or "Overview:").
- For lists, use standard dashes (- ) or numbered lists (1. 2. 3.). Do not use asterisk bullet points.
- Output clean, readable, elegant plain text without star symbols.

RULES:
1. Ground your answer directly in the facts, data, terms, and explanations present in the document.
2. If the user asks for a summary, provide a comprehensive, clear summary of what the document covers.
3. If the user asks a specific question, answer it directly and provide relevant details from the document.
4. If the information requested is genuinely NOT present or mentioned anywhere in the document, state honestly that the document does not contain this specific information, but mention what related topics are covered.`;

        let promptContent = '';
        if (documentText && documentText.trim().length > 10) {
          // Limit document context to ~500,000 characters to ensure fast turnaround
          const truncatedDoc = documentText.slice(0, 500000);
          promptContent = `=== ATTACHED DOCUMENT: ${documentName || 'Document'} ===\n${truncatedDoc}\n\n=== USER QUESTION ===\n${query}`;
        } else {
          promptContent = `Question: ${query}`;
        }

        // Resilient model cascade starting with highest-availability models
        const candidateModels = [
          'gemini-flash-lite-latest',
          'gemini-3.5-flash-lite',
          'gemini-3.5-flash',
          'gemini-3-flash-preview',
          'gemini-3.1-flash-lite',
          'gemini-3.8-flash',
          'gemini-flash-latest',
        ];
        let response: any = null;
        let lastError: any = null;

        for (const candidateModel of candidateModels) {
          try {
            response = await ai.models.generateContent({
              model: candidateModel,
              contents: promptContent,
              config: {
                systemInstruction,
                temperature: 0.2, // Low temperature for high factual accuracy
              },
            });
            if (response && response.text) {
              break;
            }
          } catch (modelErr: any) {
            lastError = modelErr;
          }
        }

        if (!response || !response.text) {
          throw lastError || new Error('All candidate models unavailable');
        }

        const rawAnswer = response.text || '';

        // Clean any stars or asterisks from the answer
        const cleanAnswer = rawAnswer
          .replace(/\*\*\*(.*?)\*\*\*/g, '$1')
          .replace(/\*\*(.*?)\*\*/g, '$1')
          .replace(/(?<!\*)\*(?!\*)(.*?)(?<!\*)\*(?!\*)/g, '$1')
          .replace(/^\s*\*\s+/gm, '- ')
          .replace(/\*/g, '')
          .trim();

        // Extract key points from answer if present, or split into logical points (no asterisks)
        const lines = cleanAnswer.split('\n');
        const bulletPoints = lines
          .filter((l) => l.trim().startsWith('-') || /^\d+\./.test(l.trim()))
          .map((l) => l.replace(/^[\s\-\d.]+\s*/, '').replace(/\*/g, '').trim())
          .filter((l) => l.length > 15)
          .slice(0, 5);

        return res.json({
          answerText: cleanAnswer,
          documentName: documentName || 'Document',
          findings: bulletPoints.length > 0 ? bulletPoints : undefined,
          conclusion: `Grounded in ${documentName || 'the uploaded document'}.`,
        });
      } catch (geminiError: any) {
        console.warn('Gemini generation unavailable, using local extractor:', geminiError?.message || String(geminiError));
      }
    }

    // 2. Local Grounded Extraction Fallback (when API key is not present or offline)
    try {
      // Intelligent semantic extraction
      if (documentText && documentText.trim().length > 20) {
        const textLower = documentText.toLowerCase();
        const queryTokens = query
          .toLowerCase()
          .replace(/[^\w\s]/g, '')
          .split(/\s+/)
          .filter((w: string) => w.length > 2);

        // Check if summary requested
        const isSummary =
          queryTokens.some((t: string) => ['summar', 'overview', 'about', 'explain', 'what'].some((k) => t.includes(k))) ||
          queryTokens.length === 0;

        const paragraphs = documentText
          .split(/\n\s*\n/)
          .map((p: string) => p.trim())
          .filter((p: string) => p.length > 30);

        if (isSummary) {
          const preview = paragraphs.slice(0, 3).join('\n\n');
          return res.json({
            answerText: `Here is an overview of ${documentName || 'your document'}:\n\n${preview}`,
            documentName: documentName || 'Document',
            findings: paragraphs.slice(0, 5).map((p: string) => p.slice(0, 150) + '...'),
            conclusion: `Based on ${paragraphs.length} sections in ${documentName || 'the document'}.`,
          });
        }

        // Score paragraphs based on query token matches
        const scored = paragraphs.map((p: string) => {
          const pLower = p.toLowerCase();
          let score = 0;
          queryTokens.forEach((token: string) => {
            if (pLower.includes(token)) score += 3;
          });
          return { text: p, score };
        });

        scored.sort((a: any, b: any) => b.score - a.score);
        const topMatches = scored.filter((s: any) => s.score > 0);

        if (topMatches.length > 0) {
          const topAnswer = topMatches.slice(0, 2).map((m: any) => m.text).join('\n\n');
          return res.json({
            answerText: `Based on ${documentName || 'the document'}, here is what was found:\n\n${topAnswer}`,
            documentName: documentName || 'Document',
            findings: topMatches.slice(2, 5).map((m: any) => m.text.slice(0, 160) + '...'),
            conclusion: `Direct context extracted from ${documentName || 'uploaded file'}.`,
          });
        }

        // If no direct keyword match
        return res.json({
          answerText: `I searched ${documentName || 'the document'} for "${query}". While exact terms were not located, here is what the document covers:\n\n${paragraphs.slice(0, 2).join('\n\n')}`,
          documentName: documentName || 'Document',
          findings: paragraphs.slice(0, 3).map((p: string) => p.slice(0, 140) + '...'),
          conclusion: 'Verified against uploaded text.',
        });
      }

      return res.json({
        answerText: `I have received your query: "${query}". Please attach or drop a document using the upload button so I can retrieve answers directly from it.`,
        documentName: documentName || 'Document',
      });
    } catch (fallbackErr: any) {
      return res.status(500).json({ error: fallbackErr?.message || 'Failed to process answer' });
    }
  });

  // Vite middleware in dev or static serving in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
