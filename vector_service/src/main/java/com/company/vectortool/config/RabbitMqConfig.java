package com.company.vectortool.config;

import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMqConfig {

    public static final String CHUNKING_QUEUE = "document.chunking.queue";
    public static final String EMBEDDING_QUEUE = "document.embedding.queue";
    public static final String EXCHANGE = "vectortool.exchange";
    public static final String CHUNKING_ROUTING_KEY = "document.chunking";
    public static final String EMBEDDING_ROUTING_KEY = "document.embedding";

    public String getChunkingQueue() {
        return CHUNKING_QUEUE;
    }

    public String getEmbeddingQueue() {
        return EMBEDDING_QUEUE;
    }

    public String getExchange() {
        return EXCHANGE;
    }
}
