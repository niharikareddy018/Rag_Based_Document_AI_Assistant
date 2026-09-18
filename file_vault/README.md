# File Vault Storage Directory

This directory stores uploaded and ingested documents:
- PDF files (`.pdf`)
- Word documents (`.docx`)
- Text & Markdown files (`.txt`, `.md`)
- CSV and Data files (`.csv`)

These files are read by `vector_service`, chunked into semantic segments by `DocumentChunkerService`, and indexed with vector embeddings into PostgreSQL via `PgVectorAdapter`.
