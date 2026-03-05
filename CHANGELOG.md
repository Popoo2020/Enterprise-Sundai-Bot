# Changelog

All notable changes to **Enterprise‑Sundai‑Bot** will be documented in this
file, following the guidelines of [Keep a Changelog](https://keepachangelog.com)
and [Semantic Versioning](https://semver.org/).

## [0.1.0] – 2026‑03‑01

### Added

* **Architecture documentation:** Added `docs/architecture.md` with a detailed
  description of the system components and data flow.  Included a PNG
  diagram (`docs/architecture.png`) to visualise how the chatbot ingests
  data, uses retrieval‑augmented generation (RAG) and interacts with users.
* **RAG ingestion stub:** Added `src/rag_ingestion.py` containing a
  placeholder class illustrating where ingestion logic will live.  This sets
  the stage for implementing loaders, chunking and metadata handling.
* **Repository standards:** Added licensing, security policy, code of
  conduct, contribution guidelines and code owner definitions.
* **Initial release:** Bumped to version `v0.1.0` to indicate the first
  structured release.
