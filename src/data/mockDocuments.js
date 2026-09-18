export const INITIAL_CITATIONS = [
  {
    id: "cite-fw-1",
    page: 2,
    label: "Page 2",
    docName: "Microservice_Firewall_Rules.pdf",
    sectionTitle: "Section 2.4: Port Forwarding and Ingress Access Lists",
    previewSnippet: "External traffic must route exclusively through the gateway service on port 8086. Direct container exposure of 5432 or 11434 without perimeter TLS certificates is strictly prohibited.",
    highlightText: "External traffic must route exclusively through the gateway service on port 8086.",
    relevanceScore: 98.4,
    chunkId: "chk_fw_02"
  },
  {
    id: "cite-rmq-1",
    page: 3,
    label: "Page 3",
    docName: "Microservice_Firewall_Rules.pdf",
    sectionTitle: "Section 3.1: Asynchronous Message Broker Specifications",
    previewSnippet: 'RabbitMQ buffers incoming document byte streams into "document-task-queue", decoupling ingestion HTTP endpoints from compute-intensive embedding generation.',
    highlightText: 'RabbitMQ buffers incoming document byte streams into "document-task-queue".',
    relevanceScore: 95.8,
    chunkId: "chk_rmq_03"
  },
  {
    id: "cite-p4",
    page: 4,
    label: "Page 4",
    docName: "Research_Paper.pdf",
    sectionTitle: "Section 2.3: Dense vs Hybrid Retrieval Latency",
    previewSnippet: "Across all tested multi-hop benchmarks, combining dense vector embeddings with Reciprocal Rank Fusion (RRF) reduced retrieval hallucination rates by 34.8% compared to isolated cosine similarity indexing.",
    highlightText: "Combining dense vector embeddings with Reciprocal Rank Fusion (RRF) reduced retrieval hallucination rates by 34.8% compared to isolated cosine similarity indexing.",
    relevanceScore: 96.4,
    chunkId: "chk_004_18b"
  }
];
export const MOCK_DOCUMENTS = [
  {
    id: "doc-firewall-rules",
    name: "Microservice_Firewall_Rules.pdf",
    fileType: "PDF",
    pages: 8,
    size: "1.8 MB",
    uploadDate: "Sep 13, 2026",
    status: "Ready",
    chunks: 34,
    vectorDimensions: 768,
    embeddingModel: "nomic-embed-text",
    summary: "Firewall rules, port routing, and zero-trust policies for Docker containers, Spring Boot Gateway (port 8086), RabbitMQ (port 5672), and PostgreSQL pgvector (port 5432).",
    sampleQuestions: [
      "What are the rules for microservice firewall configurations?",
      "How does RabbitMQ document-task-queue process chunks?",
      "What ports are permitted through the Spring Boot gateway?",
      "How are vector embeddings stored in PostgreSQL pgvector?"
    ],
    pageContent: [
      {
        pageNumber: 1,
        title: "Microservice Security Architecture & Overview",
        subtitle: "Enterprise Zero-Trust Guidelines for Containerized Environments",
        sections: [
          {
            heading: "1.1 System Architecture",
            paragraphs: [
              "This security specification governs network topologies, ingress gateways, and secure inter-process communication for containerized RAG microservices.",
              "All client communications terminate at the Spring Boot Gateway Controller on port 8086. Direct public ingress to backend databases, message queues, and local AI engines is blocked at the container boundary."
            ]
          }
        ]
      },
      {
        pageNumber: 2,
        title: "Ingress Port Mapping & Firewall Enforcement",
        subtitle: "Gateway Controller and Reverse Proxy Hardening",
        sections: [
          {
            heading: "2.4 Port Forwarding and Ingress Access Lists",
            paragraphs: [
              "External traffic must route exclusively through the gateway service on port 8086. Direct container exposure of 5432 or 11434 without perimeter TLS certificates is strictly prohibited.",
              "The Spring Boot Gateway requires an authenticated Authorization header (e.g., secure-admin-token-xyz-123) for all endpoints under /api/gateway/upload and /api/gateway/ask.",
              "Unauthorized requests will be rejected with HTTP 401 Unauthorized status."
            ],
            isHighlighted: true,
            highlightCitationId: "cite-fw-1"
          }
        ]
      },
      {
        pageNumber: 3,
        title: "RabbitMQ Message Broker Topology",
        subtitle: "Queue Isolation and Asynchronous Decoupling",
        sections: [
          {
            heading: "3.1 Asynchronous Message Broker Specifications",
            paragraphs: [
              'RabbitMQ buffers incoming document byte streams into "document-task-queue", decoupling ingestion HTTP endpoints from compute-intensive embedding generation.',
              'The message payload format follows "documentId||filename||rawTextContent". ChunkingWorker instances subscribe with auto-acknowledgment disabled until vectors are committed to PostgreSQL.'
            ],
            isHighlighted: true,
            highlightCitationId: "cite-rmq-1"
          }
        ]
      },
      {
        pageNumber: 4,
        title: "PostgreSQL pgvector Database Security",
        subtitle: "Cos-Distance HNSW Index Specifications",
        sections: [
          {
            heading: "4.2 Vector Index and Isolation",
            paragraphs: [
              "Vector embeddings are generated using nomic-embed-text with 768 floating point dimensions and persisted into the vector_embeddings table.",
              "The HNSW index (documents_hnsw_idx) enables sub-10ms nearest neighbor searches using the cosine distance operator (<=>)."
            ]
          }
        ]
      }
    ]
  },
  {
    id: "doc-research-paper",
    name: "Research_Paper.pdf",
    fileType: "PDF",
    pages: 24,
    size: "4.2 MB",
    uploadDate: "May 18, 2026",
    status: "Ready",
    chunks: 86,
    vectorDimensions: 1536,
    embeddingModel: "text-embedding-3-large",
    summary: "Comprehensive empirical evaluation of hybrid dense retrieval and cross-encoder re-ranking mechanisms for enterprise multi-hop RAG systems.",
    sampleQuestions: [
      "Summarize the main findings of this document.",
      "What was the chunk size and token overlap strategy?",
      "How did cross-encoder re-ranking affect precision?",
      "What are the computational cost trade-offs?"
    ],
    pageContent: [
      {
        pageNumber: 1,
        title: "Title Page & Executive Abstract",
        subtitle: "Empirical Benchmarks in Vector-Augmented Context Synthesis",
        sections: [
          {
            heading: "Abstract",
            paragraphs: [
              "Retrieval-Augmented Generation (RAG) architectures have emerged as the foundational paradigm for grounding Large Language Models (LLMs) with dynamic knowledge. However, conventional dense vector search often struggles with out-of-vocabulary technical terminology and complex multi-hop queries.",
              "This paper evaluates over 100,000 queries across 14 enterprise corpora to measure precision, recall, and end-to-end token latency under hybrid retrieval configurations."
            ]
          }
        ]
      },
      {
        pageNumber: 4,
        title: "Section 2: Dense vs Hybrid Retrieval Latency & Hallucination",
        subtitle: "Comparative Analysis on Enterprise Corpora",
        sections: [
          {
            heading: "2.3 Quantitative Retrieval Performance",
            paragraphs: [
              "We compared standalone dense bi-encoders, BM25 sparse lexical matching, and hybrid reciprocal rank fusion (RRF). While standalone vector search exhibits superior semantic generalization, sparse lexical search captures deterministic serial identifiers, acronyms, and product codes.",
              "Combining dense vector embeddings with Reciprocal Rank Fusion (RRF) reduced retrieval hallucination rates by 34.8% compared to isolated cosine similarity indexing.",
              "This performance divergence is particularly pronounced in regulatory and financial compliance documents where exact keyword precision is paramount."
            ],
            isHighlighted: true,
            highlightCitationId: "cite-p4"
          }
        ]
      },
      {
        pageNumber: 8,
        title: "Section 3: Semantic Chunking & Boundary Optimization",
        subtitle: "Token Window Allocation & Boundary Preservation",
        sections: [
          {
            heading: "3.1 Chunk Partitioning Trade-offs",
            paragraphs: [
              "Arbitrary character-based splitters break semantic coherence across syntax nodes. We evaluated dynamic markdown-aware recursive character chunking against structural semantic chunking.",
              "An optimal semantic chunk overlap window of 64 tokens with 512-token chunks yielded an 18.2% boost in context recall while preventing token truncation at sentence boundaries.",
              "Furthermore, recursive chunking preserves markdown table structure, preventing key-value pair corruption across adjoining embeddings."
            ],
            isHighlighted: true,
            highlightCitationId: "cite-p8"
          }
        ]
      },
      {
        pageNumber: 12,
        title: "Section 4: Cross-Encoder Re-ranking Benchmark",
        subtitle: "Post-Retrieval Precision Filtering",
        sections: [
          {
            heading: "4.4 Cross-Encoder Precision Gains",
            paragraphs: [
              "While first-stage bi-encoders quickly narrow millions of chunks down to top-k candidates, their representation bottleneck loses fine-grained cross-token attention. Introducing a secondary cross-encoder scoring step resolves this.",
              "Cross-encoder re-ranking applied to the top-20 retrieved candidates restored top-3 retrieval precision to 94.7%, eliminating irrelevant context before LLM prompt injection.",
              "Although re-ranking adds 28ms to aggregate pipeline latency, the reduction in downstream token generation costs and hallucinated outputs delivers a net 42% ROI."
            ],
            isHighlighted: true,
            highlightCitationId: "cite-p12"
          }
        ]
      },
      {
        pageNumber: 24,
        title: "Section 6: Conclusion & Future Research",
        subtitle: "Recommendations for Production Ingestion Pipelines",
        sections: [
          {
            heading: "6.1 Summary of Contributions",
            paragraphs: [
              "Modern enterprise RAG systems should not rely on naive vector similarity alone. By uniting hybrid retrieval, optimal chunk overlap, and cross-encoder re-ranking, organizations achieve verifiable, citation-backed answers with sub-200ms round trips."
            ]
          }
        ]
      }
    ]
  },
  {
    id: "doc-project-report",
    name: "Project_Report.docx",
    fileType: "DOCX",
    pages: 18,
    size: "2.8 MB",
    uploadDate: "May 16, 2026",
    status: "Ready",
    chunks: 64,
    vectorDimensions: 1536,
    embeddingModel: "text-embedding-3-large",
    summary: "Quarterly architecture and deployment assessment detailing microservices latency, auto-scaling thresholds, and multi-region failover.",
    sampleQuestions: [
      "What were the primary infrastructure bottlenecks identified in Q3?",
      "What is the target SLA for API response time?",
      "Explain the failover testing protocol."
    ],
    pageContent: [
      {
        pageNumber: 1,
        title: "Q3 Infrastructure Architecture Review",
        subtitle: "Platform Engineering & Resiliency Operations",
        sections: [
          {
            heading: "Executive Summary",
            paragraphs: [
              "During the third quarter, global platform traffic surged by 140% month-over-month. This report outlines our migration to containerized edge caching and partitioned database nodes."
            ]
          }
        ]
      },
      {
        pageNumber: 6,
        title: "Cluster Autoscaling & Service Mesh",
        subtitle: "P99 Latency Tuning",
        sections: [
          {
            heading: "Service Mesh Configuration",
            paragraphs: [
              "Migrating to Envoy sidecar proxies reduced inter-service mTLS handshakes to under 1.2ms. Auto-scaling thresholds now trigger at 70% sustained memory saturation."
            ]
          }
        ]
      }
    ]
  },
  {
    id: "doc-resume",
    name: "Resume.pdf",
    fileType: "PDF",
    pages: 2,
    size: "480 KB",
    uploadDate: "May 12, 2026",
    status: "Ready",
    chunks: 8,
    vectorDimensions: 1536,
    embeddingModel: "text-embedding-3-large",
    summary: "Staff AI Systems Engineer candidate resume with 8+ years experience in distributed vector indexing, LLM fine-tuning, and production RAG.",
    sampleQuestions: [
      "What is the candidate\u2019s experience with vector databases?",
      "Summarize key career accomplishments and leadership roles.",
      "Which programming languages and frameworks are listed?"
    ],
    pageContent: [
      {
        pageNumber: 1,
        title: "Curriculum Vitae \u2014 Senior Machine Learning Architect",
        subtitle: "Vector Systems & Generative AI Specialist",
        sections: [
          {
            heading: "Core Competencies",
            paragraphs: [
              "Vector Indexing (HNSW, ScaNN, Milvus, Pinecone), Large Language Model Grounding, JavaScript, React, Python, PyTorch, Distributed Systems, High-throughput Inference Pipelines."
            ]
          }
        ]
      }
    ]
  },
  {
    id: "doc-arch-guide",
    name: "Architecture_Guide.txt",
    fileType: "TXT",
    pages: 8,
    size: "1.1 MB",
    uploadDate: "May 09, 2026",
    status: "Ready",
    chunks: 32,
    vectorDimensions: 1536,
    embeddingModel: "text-embedding-3-large",
    summary: "Internal engineering document detailing chunking boundaries, embedding pipeline retry strategies, and vector index update cadences.",
    sampleQuestions: [
      "What is the ingestion pipeline chunking strategy?",
      "How are vector store updates synchronized?"
    ],
    pageContent: [
      {
        pageNumber: 1,
        title: "DocuMind Pipeline Ingestion Specification",
        subtitle: "System Architecture & Schema",
        sections: [
          {
            heading: "1.0 Ingestion Pipeline Stages",
            paragraphs: [
              "The ingestion pipeline parses raw binaries into normalized text, segments documents using semantic punctuation boundaries, generates vector embeddings, and stores indexed embeddings in the distributed vector cluster."
            ]
          }
        ]
      }
    ]
  }
];
export const RECENT_CHATS = [
  {
    id: "chat-firewall-1",
    title: "What are the rules for microserv...",
    docId: "doc-firewall-rules",
    docName: "Microservice_Firewall_Rules.pdf",
    updatedAt: "Just now",
    previewText: "External ingress is strictly locked to port 8086 via Spring Boot Gateway.",
    timeGroup: "Today"
  },
  {
    id: "chat-mortgage-1",
    title: "Research paper dense vs hybrid...",
    docId: "doc-research-paper",
    docName: "Research_Paper.pdf",
    updatedAt: "12m ago",
    previewText: "Last week, mortgage rates rose sharply following Treasury yield shifts.",
    timeGroup: "Today"
  },
  {
    id: "chat-mortgage-2",
    title: "Two weeks ago, rates dipped to 6...",
    docId: "doc-research-paper",
    docName: "Research_Paper.pdf",
    updatedAt: "2h ago",
    previewText: "Two weeks ago, rates dipped to 6.45% during market consolidation.",
    timeGroup: "Today"
  },
  {
    id: "chat-mortgage-3",
    title: "Three weeks ago, rates increase...",
    docId: "doc-research-paper",
    docName: "Research_Paper.pdf",
    updatedAt: "4h ago",
    previewText: "Three weeks ago, rates increased by 14 basis points across lenders.",
    timeGroup: "Today"
  },
  {
    id: "chat-mortgage-4",
    title: "A month ago, rates remained sta...",
    docId: "doc-arch-guide",
    docName: "Architecture_Guide.txt",
    updatedAt: "6h ago",
    previewText: "A month ago, rates remained stable amidst federal interest deliberations.",
    timeGroup: "Today"
  },
  {
    id: "chat-mortgage-5",
    title: "Recent months show gradual ris...",
    docId: "doc-project-report",
    docName: "Project_Report.docx",
    updatedAt: "8h ago",
    previewText: "Recent months show gradual rising pressure across refinancing portfolios.",
    timeGroup: "Today"
  },
  {
    id: "chat-5d-1",
    title: "Five weeks ago, mortgage rates a...",
    docId: "doc-research-paper",
    docName: "Research_Paper.pdf",
    updatedAt: "5d ago",
    previewText: "Five weeks ago, mortgage rates stabilized near the quarterly baseline.",
    timeGroup: "5 Days Ago"
  },
  {
    id: "chat-5d-2",
    title: "Earlier this year, rates dropped to...",
    docId: "doc-project-report",
    docName: "Project_Report.docx",
    updatedAt: "5d ago",
    previewText: "Earlier this year, rates dropped to attractive refinancing margins.",
    timeGroup: "5 Days Ago"
  },
  {
    id: "chat-5d-3",
    title: "January saw rates rise quickly fro...",
    docId: "doc-arch-guide",
    docName: "Architecture_Guide.txt",
    updatedAt: "5d ago",
    previewText: "January saw rates rise quickly from post-holiday commercial borrowing.",
    timeGroup: "5 Days Ago"
  },
  {
    id: "chat-7d-1",
    title: "Research paper dense vs hybrid...",
    docId: "doc-research-paper",
    docName: "Research_Paper.pdf",
    updatedAt: "7d ago",
    previewText: "Empirical benchmark comparison between BM25 and vector indexing.",
    timeGroup: "7 Days Ago"
  },
  {
    id: "chat-7d-2",
    title: "Senior ML Architect candidate r...",
    docId: "doc-resume",
    docName: "Resume.pdf",
    updatedAt: "8d ago",
    previewText: "Assessment of vector database competencies and distributed systems experience.",
    timeGroup: "7 Days Ago"
  }
];
export const INITIAL_CHAT_MESSAGES = {
  "chat-firewall-1": [
    {
      id: "msg-fw-1",
      sender: "user",
      timestamp: "10:15 AM",
      text: "What are the rules for microservice firewall configurations?"
    },
    {
      id: "msg-fw-2",
      sender: "ai",
      timestamp: "10:15 AM",
      text: "Microservice firewall configurations require zero-trust perimeter isolation. External ingress is strictly locked to port 8086 via the Spring Boot gateway, internal RabbitMQ message exchanges reside on port 5672, and PostgreSQL pgvector database queries on port 5432 must be restricted to internal container bridges with authenticated bearer tokens.",
      findings: [
        "Ingress Protection: Gateway port 8086 is the single external entry point.",
        "Broker Isolation: RabbitMQ (port 5672) is only accessible within the internal Docker network.",
        "Database Security: pgvector on port 5432 requires password authentication and TLS encryption."
      ],
      conclusion: "Verified against PostgreSQL vector embeddings with cosine similarity distance < 0.14.",
      citations: [INITIAL_CITATIONS[0], INITIAL_CITATIONS[1]]
    }
  ],
  "chat-research-summary": [
    {
      id: "msg-user-1",
      sender: "user",
      timestamp: "10:42 AM",
      text: "Summarize the main findings of this document."
    },
    {
      id: "msg-ai-1",
      sender: "ai",
      timestamp: "10:42 AM",
      text: "Based on an empirical analysis across 14 enterprise corpora and over 100,000 retrieval benchmarks, this paper demonstrates that hybrid retrieval pipelines significantly outperform isolated dense vector search in accuracy, recall, and hallucination reduction.",
      findings: [
        "Hybrid Retrieval Superiority: Combining dense vector embeddings with Reciprocal Rank Fusion (RRF) reduced retrieval hallucination rates by 34.8% compared to isolated cosine similarity indexing.",
        "Semantic Chunk Sizing: An optimal semantic chunk overlap window of 64 tokens with 512-token chunks yielded an 18.2% boost in context recall while preventing sentence boundary truncation.",
        "Cross-Encoder Precision: Secondary cross-encoder re-ranking on the top-20 retrieved candidates restored top-3 retrieval precision to 94.7%, eliminating irrelevant context before LLM prompt injection."
      ],
      conclusion: "The authors conclude that production enterprise RAG systems should standardize on hybrid dense-sparse retrieval coupled with selective cross-encoder re-ranking. This architecture delivers deterministic factual grounding with sub-200ms round trips while dramatically cutting token hallucination.",
      citations: INITIAL_CITATIONS
    }
  ],
  "chat-rag-arch": [
    {
      id: "msg-rag-1",
      sender: "user",
      timestamp: "9:15 AM",
      text: "Explain the chunking and vector storage pipeline."
    },
    {
      id: "msg-rag-2",
      sender: "ai",
      timestamp: "9:15 AM",
      text: "The DocuMind ingestion pipeline operates through four discrete stages: raw document normalization, semantic token chunking (512 tokens with 64 overlap), batch embedding generation via 1536-dimensional models, and transactional vector store insertion.",
      findings: [
        "Deterministic Boundary Detection: Punctuation and markdown headers serve as hard boundary markers to keep logical paragraphs intact.",
        "Transactional Batch Commits: Vector writes are committed in idempotent batches with checksum validation."
      ],
      conclusion: "This guarantees complete data provenance and prevents indexing anomalies across document revisions.",
      citations: [
        {
          id: "cite-arch-1",
          page: 1,
          label: "Page 1",
          docName: "Architecture_Guide.txt",
          sectionTitle: "1.0 Ingestion Pipeline Stages",
          previewSnippet: "The ingestion pipeline parses raw binaries into normalized text, segments documents using semantic punctuation boundaries, generates vector embeddings, and stores indexed embeddings in the distributed vector cluster.",
          highlightText: "The ingestion pipeline parses raw binaries into normalized text, segments documents using semantic punctuation boundaries",
          relevanceScore: 97.5,
          chunkId: "chk_arch_01"
        }
      ]
    }
  ]
};
