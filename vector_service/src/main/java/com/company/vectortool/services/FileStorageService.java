package com.company.vectortool.services;

import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Service
public class FileStorageService {

    private final Path rootPath = Paths.get("./file_vault");

    public FileStorageService() {
        try {
            if (!Files.exists(rootPath)) {
                Files.createDirectories(rootPath);
            }
        } catch (Exception e) {
            System.err.println("[FileStorageService] Init error: " + e.getMessage());
        }
    }

    // CRUD: Create (Save file)
    public boolean create(String fileName, byte[] data) {
        try {
            if (fileName == null || data == null) return false;
            Path filePath = rootPath.resolve(fileName);
            try (FileOutputStream fos = new FileOutputStream(filePath.toFile())) {
                fos.write(data);
                return true;
            }
        } catch (Exception e) {
            System.err.println("[FileStorageService] Create error: " + e.getMessage());
            return false;
        }
    }

    // CRUD: Read (Get file bytes)
    public byte[] read(String fileName) {
        try {
            if (fileName == null) return null;
            Path filePath = rootPath.resolve(fileName);
            if (Files.exists(filePath)) {
                return Files.readAllBytes(filePath);
            }
        } catch (Exception e) {
            System.err.println("[FileStorageService] Read error: " + e.getMessage());
        }
        return null;
    }

    // CRUD: Update (Overwrite file)
    public boolean update(String fileName, byte[] data) {
        try {
            return create(fileName, data);
        } catch (Exception e) {
            System.err.println("[FileStorageService] Update error: " + e.getMessage());
            return false;
        }
    }

    // CRUD: Delete (Remove file)
    public boolean delete(String fileName) {
        try {
            if (fileName == null) return false;
            Path filePath = rootPath.resolve(fileName);
            return Files.deleteIfExists(filePath);
        } catch (Exception e) {
            System.err.println("[FileStorageService] Delete error: " + e.getMessage());
            return false;
        }
    }

    // List all files
    public List<String> listAll() {
        List<String> fileNames = new ArrayList<>();
        try {
            File folder = rootPath.toFile();
            File[] files = folder.listFiles();
            if (files != null) {
                for (File f : files) {
                    if (f.isFile()) {
                        fileNames.add(f.getName());
                    }
                }
            }
        } catch (Exception e) {
            System.err.println("[FileStorageService] List error: " + e.getMessage());
        }
        return fileNames;
    }
}
