-- ==============================================================================
-- Vector Database Initialization Script (PostgreSQL + pgvector)
-- ==============================================================================

-- 1. Enable the pgvector extension for high-performance similarity search
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Create the document_chunks table with 768-dimension vector support (nomic-embed-text / bert)
CREATE TABLE IF NOT EXISTS document_chunks (
    id BIGSERIAL PRIMARY KEY,
    document_id VARCHAR(255) NOT NULL,
    document_name VARCHAR(512) NOT NULL,
    chunk_index INT NOT NULL,
    content TEXT NOT NULL,
    char_count INT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    embedding vector(768),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create indices for metadata and fast document retrieval
CREATE INDEX IF NOT EXISTS idx_document_chunks_doc_id ON document_chunks(document_id);
CREATE INDEX IF NOT EXISTS idx_document_chunks_doc_name ON document_chunks(document_name);

-- 4. Create an HNSW index on the vector column for lightning-fast cosine similarity lookups
CREATE INDEX IF NOT EXISTS idx_document_chunks_embedding_hnsw 
ON document_chunks 
USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

-- 5. Helper similarity search function
CREATE OR REPLACE FUNCTION match_document_chunks (
    query_embedding vector(768),
    match_threshold float,
    match_count int,
    filter_doc_id varchar DEFAULT NULL
)
RETURNS TABLE (
    id bigint,
    document_id varchar,
    document_name varchar,
    chunk_index int,
    content text,
    similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        dc.id,
        dc.document_id,
        dc.document_name,
        dc.chunk_index,
        dc.content,
        1 - (dc.embedding <=> query_embedding) AS similarity
    FROM document_chunks dc
    WHERE 
        (filter_doc_id IS NULL OR dc.document_id = filter_doc_id)
        AND 1 - (dc.embedding <=> query_embedding) > match_threshold
    ORDER BY dc.embedding <=> query_embedding
    LIMIT match_count;
END;
$$;
