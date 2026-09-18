# DocLens - AI Document Assistant & Vector RAG Platform

Full-stack Document Grounding and Retrieval-Augmented Generation (RAG) platform powered by **Meta Llama 3**, **Ollama**, **PostgreSQL + pgvector**, **Spring Boot Java (vector_service)**, and **React + Tailwind (frontend-ui)**.

---

## Project Structure

This repository contains the complete multi-service stack:

```
├── .github/                # CI/CD Workflows (ci.yml)
├── database/               # Database initialization scripts (init.sql with pgvector & HNSW index)
├── docker/                 # Multi-container orchestration (docker-compose.yml)
├── file_vault/             # Document ingestion directory (PDF, DOCX, TXT, MD)
├── frontend-ui/            # Standalone React + Vite + Tailwind UI (Port 3000)
│   ├── src/                # React components, hooks, chat views (pure JS)
│   ├── package.json
│   ├── vite.config.js
│   └── Dockerfile
├── scripts/                # Utility scripts (ai_agent.py for Ollama/Llama 3 CLI & testing)
├── src/                    # Integrated React UI sources (pure JS)
├── vector_service/         # Standalone Spring Boot Java Microservice (Port 8086)
│   ├── pom.xml
│   ├── Dockerfile
│   ├── ServiceConfig.json  # Unified service configuration (ports, models, vector dimensions)
│   └── src/main/java/com/company/vectortool/
│       ├── Main.java               # Spring Boot Application entrypoint
│       ├── adpaters/               # SqlDbAdaptor, VectorDbAdaptor
│       ├── config/                 # RabbitMqConfig
│       ├── controllers/            # GatewayController, VectorToolController
│       ├── interfaces/             # ISqlDbAdaptor, IVectorDbAdaptor
│       ├── middleware/             # AuthMiddlewareHandler, AuthService
│       ├── models/                 # Document, VectorEmbeddings
│       ├── services/               # FileStorageService
│       └── workers/                # AsyncEmbeddingWorker, ChunkingWorker
├── .env.example
├── .gitignore
├── eslint.config.js
├── index.html
├── metadata.json
├── package.json
├── README.md
├── server.js
└── vite.config.js
```

---

## 🚀 Quick Start with Docker Compose (All Services)

Run the entire system (Database + AI Engine + Backend + Frontend) with one command:

```bash
docker-compose -f docker/docker-compose.yml up --build
```

This boots:
1. **PostgreSQL + pgvector** on `localhost:5432` (`vectordb`)
2. **RabbitMQ** on `localhost:5672` (Management UI: `15672`)
3. **Ollama (Llama 3)** on `localhost:11434`
4. **Spring Boot Vector Service** on `localhost:8080`
5. **DocLens Frontend UI** on `http://localhost:3000`

---

## 🛠️ Running Services Individually

### 1. Vector Database (PostgreSQL with pgvector)
```bash
docker run -d \
  --name postgres-vector \
  -e POSTGRES_DB=vectordb \
  -e POSTGRES_PASSWORD=your_secure_password \
  -p 5432:5432 \
  pgvector/pgvector:pg16

# Apply database/init.sql schema:
psql -h localhost -U postgres -d vectordb -f database/init.sql
```

### 2. Local AI Model (Ollama with Llama 3)
```bash
# Start Ollama
ollama run llama3

# Pull embedding model
ollama pull nomic-embed-text
```

### 3. Java Spring Boot Vector Service (`vector_service`)
```bash
# Build and run with mvnd (Apache Maven Daemon for parallel builds):
mvnd clean spring-boot:run
```
Service runs on `http://localhost:8080`.

### 4. Frontend Web UI (`frontend-ui`)
```bash
cd frontend-ui
npm install
npm run dev
```
Open `http://localhost:3000` in your browser.

### 5. Python AI Agent (`ai_agent.py`)
```bash
python ai_agent.py "What are the main insights in the document?"
```

---

## Key Features
- **Strict Clean Plain-Text Output**: Zero asterisks (`*`) or markdown stars in answers.
- **Context Grounding**: Accurate answers directly cited from uploaded documents.
- **Full File Support**: PDF (via PDFBox / pdf-parse), DOCX (Apache POI / mammoth), TXT, Markdown, CSV.
- **Document History**: Interactive history drawer and top-bar counter pill.
- **Dark & Light Mode**: Built-in visual theme toggle.
