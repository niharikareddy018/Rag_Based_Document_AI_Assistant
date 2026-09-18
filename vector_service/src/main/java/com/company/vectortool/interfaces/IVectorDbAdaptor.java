package com.company.vectortool.interfaces;

import com.company.vectortool.models.VectorEmbeddings;
import java.util.List;

public interface IVectorDbAdaptor {
    VectorEmbeddings create(VectorEmbeddings embedding);
    VectorEmbeddings read(String id);
    List<VectorEmbeddings> readByDocumentId(String documentId);
    VectorEmbeddings update(String id, VectorEmbeddings embedding);
    boolean delete(String id);
    boolean deleteByDocumentId(String documentId);
}
