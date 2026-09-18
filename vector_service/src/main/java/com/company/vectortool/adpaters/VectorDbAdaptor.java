package com.company.vectortool.adpaters;

import com.company.vectortool.interfaces.IVectorDbAdaptor;
import com.company.vectortool.models.VectorEmbeddings;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class VectorDbAdaptor implements IVectorDbAdaptor {

    private final Map<String, VectorEmbeddings> vectorStore = new ConcurrentHashMap<>();

    @Override
    public VectorEmbeddings create(VectorEmbeddings embedding) {
        try {
            if (embedding != null && embedding.getId() != null) {
                vectorStore.put(embedding.getId(), embedding);
                return embedding;
            }
        } catch (Exception e) {
            System.err.println("[VectorDbAdaptor] Create error: " + e.getMessage());
        }
        return null;
    }

    @Override
    public VectorEmbeddings read(String id) {
        try {
            if (id != null) {
                return vectorStore.get(id);
            }
        } catch (Exception e) {
            System.err.println("[VectorDbAdaptor] Read error: " + e.getMessage());
        }
        return null;
    }

    @Override
    public List<VectorEmbeddings> readByDocumentId(String documentId) {
        List<VectorEmbeddings> result = new ArrayList<>();
        try {
            if (documentId != null) {
                for (VectorEmbeddings ve : vectorStore.values()) {
                    if (documentId.equals(ve.getDocumentId())) {
                        result.add(ve);
                    }
                }
            }
        } catch (Exception e) {
            System.err.println("[VectorDbAdaptor] ReadByDocumentId error: " + e.getMessage());
        }
        return result;
    }

    @Override
    public VectorEmbeddings update(String id, VectorEmbeddings embedding) {
        try {
            if (id != null && embedding != null && vectorStore.containsKey(id)) {
                vectorStore.put(id, embedding);
                return embedding;
            }
        } catch (Exception e) {
            System.err.println("[VectorDbAdaptor] Update error: " + e.getMessage());
        }
        return null;
    }

    @Override
    public boolean delete(String id) {
        try {
            if (id != null) {
                return vectorStore.remove(id) != null;
            }
        } catch (Exception e) {
            System.err.println("[VectorDbAdaptor] Delete error: " + e.getMessage());
        }
        return false;
    }

    @Override
    public boolean deleteByDocumentId(String documentId) {
        try {
            if (documentId != null) {
                vectorStore.values().removeIf(ve -> documentId.equals(ve.getDocumentId()));
                return true;
            }
        } catch (Exception e) {
            System.err.println("[VectorDbAdaptor] DeleteByDocumentId error: " + e.getMessage());
        }
        return false;
    }
}
