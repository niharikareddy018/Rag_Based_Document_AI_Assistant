package com.company.vectortool.controllers;

import com.company.vectortool.adpaters.SqlDbAdaptor;
import com.company.vectortool.models.Document;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/gateway")
@CrossOrigin(origins = "*")
public class GatewayController {

    private final SqlDbAdaptor sqlDbAdaptor;

    public GatewayController(SqlDbAdaptor sqlDbAdaptor) {
        this.sqlDbAdaptor = sqlDbAdaptor;
    }

    // CRUD: Read Status
    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getStatus() {
        Map<String, Object> status = new HashMap<>();
        try {
            status.put("gateway", "ONLINE");
            status.put("service", "vector_service");
            status.put("timestamp", LocalDateTime.now().toString());
            return ResponseEntity.ok(status);
        } catch (Exception e) {
            status.put("gateway", "ERROR");
            status.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(status);
        }
    }

    // CRUD: Create Document
    @PostMapping("/documents")
    public ResponseEntity<Document> createDocument(@RequestBody Document document) {
        try {
            if (document == null) {
                return ResponseEntity.badRequest().build();
            }
            if (document.getId() == null || document.getId().isBlank()) {
                document.setId("doc_" + System.currentTimeMillis());
            }
            document.setCreatedAt(LocalDateTime.now().toString());
            Document created = sqlDbAdaptor.create(document);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (Exception e) {
            System.err.println("[GatewayController] Create error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // CRUD: Read All Documents
    @GetMapping("/documents")
    public ResponseEntity<List<Document>> readAllDocuments() {
        try {
            List<Document> documents = sqlDbAdaptor.readAll();
            return ResponseEntity.ok(documents);
        } catch (Exception e) {
            System.err.println("[GatewayController] ReadAll error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // CRUD: Read One Document
    @GetMapping("/documents/{id}")
    public ResponseEntity<Document> readDocument(@PathVariable String id) {
        try {
            Document doc = sqlDbAdaptor.read(id);
            if (doc != null) {
                return ResponseEntity.ok(doc);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            System.err.println("[GatewayController] Read error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // CRUD: Update Document
    @PutMapping("/documents/{id}")
    public ResponseEntity<Document> updateDocument(@PathVariable String id, @RequestBody Document document) {
        try {
            document.setUpdatedAt(LocalDateTime.now().toString());
            Document updated = sqlDbAdaptor.update(id, document);
            if (updated != null) {
                return ResponseEntity.ok(updated);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            System.err.println("[GatewayController] Update error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // CRUD: Delete Document
    @DeleteMapping("/documents/{id}")
    public ResponseEntity<Map<String, Object>> deleteDocument(@PathVariable String id) {
        Map<String, Object> res = new HashMap<>();
        try {
            boolean deleted = sqlDbAdaptor.delete(id);
            res.put("deleted", deleted);
            res.put("id", id);
            return ResponseEntity.ok(res);
        } catch (Exception e) {
            res.put("deleted", false);
            res.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }
}
