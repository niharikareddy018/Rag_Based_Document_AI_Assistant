package com.company.vectortool.workers;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ChunkingWorker {

    public List<String> chunkText(String content, int chunkSize, int overlap) {
        List<String> chunks = new ArrayList<>();
        try {
            if (content == null || content.isBlank()) {
                return chunks;
            }

            int length = content.length();
            int start = 0;

            while (start < length) {
                int end = Math.min(start + chunkSize, length);
                if (end < length) {
                    int lastSpace = content.lastIndexOf(' ', end);
                    if (lastSpace > start + (chunkSize / 2)) {
                        end = lastSpace;
                    }
                }
                String chunk = content.substring(start, end).trim();
                if (!chunk.isEmpty()) {
                    chunks.add(chunk);
                }
                if (end >= length) break;
                start = Math.max(start + 1, end - overlap);
            }
        } catch (Exception e) {
            System.err.println("[ChunkingWorker] Chunking error: " + e.getMessage());
        }
        return chunks;
    }
}
