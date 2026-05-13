# Enterprise-Sundai-Bot

[![CI](https://github.com/Popoo2020/Enterprise-Sundai-Bot/actions/workflows/ci.yml/badge.svg)](https://github.com/Popoo2020/Enterprise-Sundai-Bot/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Enterprise-Sundai-Bot** is a secure RAG-assistant blueprint that now includes a working **document normalisation and chunking layer** as the first practical building block for ingestion pipelines.  
The repository is intentionally developed in transparent stages: implemented modules are clearly separated from future architecture work such as retrieval adapters, API endpoints, authentication and audit logging.

> **Status:** working RAG-ingestion baseline / active expansion.

## What is implemented

| Capability | Status |
|---|---|
| Text normalisation | ✅ Implemented |
| Overlapping document chunking | ✅ Implemented |
| Deterministic chunk IDs | ✅ Implemented |
| Chunk metadata model | ✅ Implemented |
| Pytest coverage for ingestion helpers | ✅ Implemented |
| CI that runs the test suite | ✅ Implemented |
| Vector-store adapter | 🟡 Planned |
| Retrieval API | 🟡 Planned |
| Authentication / RBAC | 🟡 Planned |
| Audit logging | 🟡 Planned |

## Repository structure

```text
src/
  rag_ingestion.py            # Document normalisation and chunking helpers

tests/
  test_rag_ingestion.py       # Test coverage for ingestion behaviour

requirements.txt
.github/workflows/ci.yml
```

## Current implemented workflow

```text
Raw text document
        │
        ▼
Whitespace normalisation
        │
        ▼
Overlapping chunk generation
        │
        ▼
Metadata-rich chunk objects
```

## Implemented module

### `src/rag_ingestion.py`

Provides:

- `normalise_text(text)`
- `chunk_text(text, source_id, chunk_size=280, overlap=40)`
- deterministic `TextChunk` objects with:
  - `chunk_id`
  - `source_id`
  - `text`
  - `index`
  - `total_chunks`

This creates a credible ingestion foundation for a future secure RAG pipeline.

## Quickstart

```bash
git clone https://github.com/Popoo2020/Enterprise-Sundai-Bot.git
cd Enterprise-Sundai-Bot

python -m venv .venv
source .venv/bin/activate

pip install -r requirements.txt
pytest -q
```

## Example

```python
from src.rag_ingestion import chunk_text

chunks = chunk_text(
    "This is a sample enterprise policy document for secure RAG testing.",
    source_id="policy-001",
)

for chunk in chunks:
    print(chunk.chunk_id, chunk.index, chunk.text)
```

## Security-oriented development path

The next layers should be implemented with explicit enterprise controls:

1. retrieval restricted by user/role context
2. source metadata validation
3. prompt assembly that distinguishes trusted instructions from untrusted retrieved content
4. auditability for ingestion and retrieval events
5. rate limiting and abuse prevention at the API layer

## Roadmap

1. Add vector-store adapter interface
2. Add retrieval helper with metadata filtering
3. Add FastAPI query endpoint
4. Add role-aware retrieval controls
5. Add structured audit logging
6. Add threat model and architecture diagrams
7. Add safe prompt assembly patterns for retrieved content

## Limitations

- This is not yet a running chatbot service
- There is no vector database integration yet
- There is no authentication layer yet
- The current value is a tested and documented ingestion baseline that can be expanded safely
