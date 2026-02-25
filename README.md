# Enterprise‑Sundai‑Bot

**Production‑grade AI bot framework for business operations**

## Synopsis
Enterprise‑Sundai‑Bot is a sanitized showcase of an AI assistant that automates routine business processes. Originally developed to streamline operations at a multinational company, this framework demonstrates how to combine large‑language models, retrieval‑augmented generation (RAG) architectures and secure API deployment to deliver real ROI. Sensitive business logic and data have been removed, but the architecture and code patterns remain intact.

### Highlights
* **FastAPI API Layer:** Provides RESTful endpoints for chat interaction, knowledge retrieval and administrative functions.
* **RAG Architecture:** Uses a vector store (ChromaDB or Pinecone) to index corporate documents and provide contextually relevant responses.
* **Shift & Task Planning:** Implements scheduling algorithms and integrates with calendar APIs to automate shift assignment and task distribution.
* **Secure Deployment:** Follows best practices for secret management (using environment variables and managed identities), rate limiting and input sanitisation. Token‑based authentication is preferred over static secrets.
* **Observability:** Integrated logging and tracing across components with Prometheus exporters and structured logs.

### Structure
```
Enterprise-Sundai-Bot/
├── README.md
├── requirements.txt
├── src/
│   ├── main.py            # FastAPI app definition
│   ├── vector_store.py    # Vector database integration
│   ├── scheduler.py       # Shift planning logic
│   ├── auth.py            # Authentication and authorisation
│   ├── llm.py             # Interfaces with OpenAI or other LLMs
│   └── utils.py
└── configs/
    └── settings.yaml      # Configuration templates
```

### Quick Start
1. Install dependencies: `pip install -r requirements.txt`.
2. Configure environment variables or a credentials vault; avoid hard‑coded secrets and use token‑based authentication for Azure resources【987667603810256†L350-L394】.
3. Start the API with `uvicorn src.main:app --host 0.0.0.0 --port 8000`.
4. Experiment with the `/chat` endpoint to see RAG responses using dummy data in your vector store.

### Disclaimer
This repository is a demonstration. It does not contain proprietary company data. Use it as a reference architecture for your own enterprise AI bots.

