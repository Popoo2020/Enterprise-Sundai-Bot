"""RAG ingestion pipeline stub.

This module defines a simple interface for ingesting unstructured documents into a
retrieval-augmented generation (RAG) system. The actual implementation should
handle loading files, chunking text, computing embeddings and storing them in
a vector store.
"""

from typing import Iterable, List


class IngestionPipeline:
    def __init__(self, chunk_size: int = 500):
        self.chunk_size = chunk_size

    def load_documents(self, sources: Iterable[str]) -> List[str]:
        """Load raw documents from the provided sources.

        Args:
            sources: Iterable of file paths or URLs.

        Returns:
            List of document strings.
        """
        # TODO: Implement actual loading logic (e.g., PDF/Text/HTML)
        return [open(src, 'r', encoding='utf-8').read() for src in sources]

    def chunk_documents(self, documents: List[str]) -> List[str]:
        """Split documents into smaller chunks for embedding.

        Args:
            documents: List of document strings.

        Returns:
            List of text chunks.
        """
        chunks = []
        for doc in documents:
            for i in range(0, len(doc), self.chunk_size):
                chunks.append(doc[i : i + self.chunk_size])
        return chunks

    def ingest(self, sources: Iterable[str]):
        """End-to-end ingestion: load, chunk and store.

        Args:
            sources: Iterable of file paths or URLs.
        """
        documents = self.load_documents(sources)
        chunks = self.chunk_documents(documents)
        # TODO: Compute embeddings and store them in a vector store
        print(f"Ingested {len(chunks)} chunks from {len(documents)} documents")