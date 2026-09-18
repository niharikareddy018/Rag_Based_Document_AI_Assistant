package com.company.vectortool.interfaces;

import com.company.vectortool.models.Document;
import java.util.List;

public interface ISqlDbAdaptor {
    Document create(Document document);
    Document read(String id);
    List<Document> readAll();
    Document update(String id, Document document);
    boolean delete(String id);
}
