import mammoth from 'mammoth';

/**
 * Universal File Text Extractor
 * 
 * 1. Sends file to `/api/upload` where Node.js parses it reliably with pdf-parse / mammoth.
 * 2. If the API is unreachable, performs client-side fallback parsing.
 */
export async function extractTextFromFile(file: File): Promise<{
  text: string;
  pageCount: number;
  sections: Array<{ heading: string; content: string }>;
}> {
  // 1. Try server extraction first (robust, handles any complex PDF/DOCX)
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      if (data.text && data.text.trim().length > 10) {
        const paragraphs = data.text
          .split(/\n\s*\n/)
          .map((p: string) => p.trim())
          .filter((p: string) => p.length > 20);

        return {
          text: data.text,
          pageCount: data.pageCount || Math.max(1, Math.ceil(data.text.length / 2500)),
          sections: paragraphs.slice(0, 10).map((p: string, i: number) => ({
            heading: `Section ${i + 1}`,
            content: p,
          })),
        };
      }
    }
  } catch (err) {
    console.warn('Server upload extraction not available, using client fallback:', err);
  }

  // 2. Client-side fallback: Text formats (.txt, .md, .csv, .json, code)
  const fileName = file.name.toLowerCase();
  if (
    file.type.startsWith('text/') ||
    fileName.endsWith('.txt') ||
    fileName.endsWith('.md') ||
    fileName.endsWith('.json') ||
    fileName.endsWith('.csv') ||
    fileName.endsWith('.log') ||
    fileName.endsWith('.py') ||
    fileName.endsWith('.java') ||
    fileName.endsWith('.ts') ||
    fileName.endsWith('.js')
  ) {
    try {
      const text = await file.text();
      const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
      return {
        text,
        pageCount: Math.max(1, Math.ceil(text.length / 2500)),
        sections: paragraphs.slice(0, 10).map((p, i) => ({
          heading: `Section ${i + 1}`,
          content: p.trim(),
        })),
      };
    } catch {
      // Continue
    }
  }

  // 3. Client-side fallback: DOCX via Mammoth
  if (fileName.endsWith('.docx') || file.type.includes('wordprocessingml')) {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      const text = result.value || '';
      if (text.trim().length > 10) {
        const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
        return {
          text,
          pageCount: Math.max(1, Math.ceil(text.length / 2500)),
          sections: paragraphs.slice(0, 10).map((p, i) => ({
            heading: `Section ${i + 1}`,
            content: p.trim(),
          })),
        };
      }
    } catch {
      // Continue
    }
  }

  // 4. Default fallback: Read as string or plain text
  try {
    const raw = await file.text();
    if (raw && raw.length > 20) {
      return {
        text: raw,
        pageCount: 1,
        sections: [{ heading: 'Content', content: raw.slice(0, 500) }],
      };
    }
  } catch {
    // Continue
  }

  return {
    text: `Uploaded document: ${file.name} (${(file.size / 1024).toFixed(1)} KB).`,
    pageCount: 1,
    sections: [{ heading: 'Document Information', content: `Name: ${file.name}` }],
  };
}
