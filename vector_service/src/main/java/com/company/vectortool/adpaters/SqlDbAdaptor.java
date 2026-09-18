package com.company.vectortool.adpaters;

import com.company.vectortool.interfaces.ISqlDbAdaptor;
import com.company.vectortool.models.Document;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class SqlDbAdaptor implements ISqlDbAdaptor {

    private final Map<String, Document> store = new ConcurrentHashMap<>();

    @Override
    public Document create(Document document) {
        try {
            if (document != null && document.getId() != null) {
                store.put(document.getId(), document);
                return document;
            }
        } catch (Exception e) {
            System.err.println("[SqlDbAdaptor] Create error: " + e.getMessage());
        }
        return null;
    }

    @Override
    public Document read(String id) {
        try {
            if (id != null) {
                return store.get(id);
            }
        } catch (Exception e) {
            System.err.println("[SqlDbAdaptor] Read error: " + e.getMessage());
        }
        return null;
    }

    @Override
    public List<Document> readAll() {
        try {
            return new ArrayList<>(store.values());
        } catch (Exception e) {
            System.err.println("[SqlDbAdaptor] ReadAll error: " + e.getMessage());
            return new ArrayList<>();
        }
    }

    @Override
    public Document update(String id, Document document) {
        try {
            if (id != null && document != null && store.containsKey(id)) {
                store.put(id, document);
                return document;
            }
        } catch (Exception e) {
            System.err.println("[SqlDbAdaptor] Update error: " + e.getMessage());
        }
        return null;
    }

    @Override
    public boolean delete(String id) {
        try {
            if (id != null) {
                return store.remove(id) != null;
            }
        } catch (Exception e) {
            System.err.println("[SqlDbAdaptor] Delete error: " + e.getMessage());
        }
        return false;
    }
}
