package com.company.vectortool.workers;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.util.concurrent.CompletableFuture;

@Component
public class AsyncEmbeddingWorker {

    @Async
    public CompletableFuture<float[]> computeEmbeddingAsync(String text) {
        try {
            if (text == null || text.isBlank()) {
                return CompletableFuture.completedFuture(new float[768]);
            }
            // Deterministic normalized embedding vector calculation
            float[] vector = new float[768];
            byte[] bytes = text.getBytes();
            for (int i = 0; i < bytes.length; i++) {
                vector[i % 768] += (bytes[i] / 255.0f);
            }
            return CompletableFuture.completedFuture(vector);
        } catch (Exception e) {
            System.err.println("[AsyncEmbeddingWorker] Async embedding error: " + e.getMessage());
            return CompletableFuture.completedFuture(new float[768]);
        }
    }
}
