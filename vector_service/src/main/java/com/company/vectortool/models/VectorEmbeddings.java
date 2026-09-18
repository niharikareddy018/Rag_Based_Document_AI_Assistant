package com.company.vectortool.models;

public class VectorEmbeddings {
    private String id;
    private String documentId;
    private Integer chunkIndex;
    private String chunkText;
    private float[] embedding;
    private String createdAt;

    public VectorEmbeddings() {}

    public VectorEmbeddings(String id, String documentId, Integer chunkIndex, String chunkText, float[] embedding) {
        this.id = id;
        this.documentId = documentId;
        this.chunkIndex = chunkIndex;
        this.chunkText = chunkText;
        this.embedding = embedding;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getDocumentId() { return documentId; }
    public void setDocumentId(String documentId) { this.documentId = documentId; }

    public Integer getChunkIndex() { return chunkIndex; }
    public void setChunkIndex(Integer chunkIndex) { this.chunkIndex = chunkIndex; }

    public String getChunkText() { return chunkText; }
    public void setChunkText(String chunkText) { this.chunkText = chunkText; }

    public float[] getEmbedding() { return embedding; }
    public void setEmbedding(float[] embedding) { this.embedding = embedding; }

    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }
}
