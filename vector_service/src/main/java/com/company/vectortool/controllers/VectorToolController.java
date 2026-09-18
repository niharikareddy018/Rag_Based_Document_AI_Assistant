package com.company.vectortool.controllers;

import com.company.vectortool.adpaters.VectorDbAdaptor;
import com.company.vectortool.models.VectorEmbeddings;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/vectors")
@CrossOrigin(origins = "*")
public class VectorToolController {

    private final VectorDbAdaptor vectorDbAdaptor;

    public VectorToolController(VectorDbAdaptor vectorDbAdaptor) {
        this.vectorDbAdaptor = vectorDbAdaptor;
    }

    // CRUD: Create Vector Embedding
    @PostMapping
    public ResponseEntity<VectorEmbeddings> createVector(@RequestBody VectorEmbeddings embedding) {
        try {
            if (embedding == null) {
                return ResponseEntity.badRequest().build();
            }
            if (embedding.getId() == null || embedding.getId().isBlank()) {
                embedding.setId("vec_" + System.currentTimeMillis());
            }
            embedding.setCreatedAt(LocalDateTime.now().toString());
            VectorEmbeddings created = vectorDbAdaptor.create(embedding);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (Exception e) {
            System.err.println("[VectorToolController] Create error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // CRUD: Read Vector Embedding by ID
    @GetMapping("/{id}")
    public ResponseEntity<VectorEmbeddings> readVector(@PathVariable String id) {
        try {
            VectorEmbeddings ve = vectorDbAdaptor.read(id);
            if (ve != null) {
                return ResponseEntity.ok(ve);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            System.err.println("[VectorToolController] Read error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // CRUD: Read All Vectors for a Document
    @GetMapping("/document/{documentId}")
    public ResponseEntity<List<VectorEmbeddings>> readByDocumentId(@PathVariable String documentId) {
        try {
            List<VectorEmbeddings> list = vectorDbAdaptor.readByDocumentId(documentId);
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            System.err.println("[VectorToolController] ReadByDoc error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // CRUD: Update Vector Embedding
    @PutMapping("/{id}")
    public ResponseEntity<VectorEmbeddings> updateVector(@PathVariable String id, @RequestBody VectorEmbeddings embedding) {
        try {
            VectorEmbeddings updated = vectorDbAdaptor.update(id, embedding);
            if (updated != null) {
                return ResponseEntity.ok(updated);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            System.err.println("[VectorToolController] Update error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // CRUD: Delete Vector Embedding by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteVector(@PathVariable String id) {
        Map<String, Object> res = new HashMap<>();
        try {
            boolean deleted = vectorDbAdaptor.delete(id);
            res.put("deleted", deleted);
            res.put("id", id);
            return ResponseEntity.ok(res);
        } catch (Exception e) {
            res.put("deleted", false);
            res.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }

    // CRUD: Delete All Vectors for a Document
    @DeleteMapping("/document/{documentId}")
    public ResponseEntity<Map<String, Object>> deleteByDocumentId(@PathVariable String documentId) {
        Map<String, Object> res = new HashMap<>();
        try {
            boolean deleted = vectorDbAdaptor.deleteByDocumentId(documentId);
            res.put("deleted", deleted);
            res.put("documentId", documentId);
            return ResponseEntity.ok(res);
        } catch (Exception e) {
            res.put("deleted", false);
            res.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }
}
