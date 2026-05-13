"""Minimal RAG ingestion helpers for the Enterprise-Sundai-Bot blueprint.

This module keeps the first implementation step intentionally small and
inspectable. It demonstrates how a document can be normalised, chunked and
represented with metadata before a future vector-store adapter is added.
"""
from __future__ import annotations

from dataclasses import dataclass
from hashlib import sha256


@dataclass(frozen=True)
class TextChunk:
    chunk_id: str
    source_id: str
    text: str
    index: int
    total_chunks: int


def normalise_text(text: str) -> str:
    """Normalise whitespace while preserving readable sentence flow."""
    if not isinstance(text, str):
        raise TypeError("text must be a string")
    return " ".join(text.split()).strip()


def chunk_text(text: str, source_id: str, chunk_size: int = 280, overlap: int = 40) -> list[TextChunk]:
    """Split text into overlapping character chunks for RAG experiments."""
    if chunk_size <= 0:
        raise ValueError("chunk_size must be positive")
    if overlap < 0:
        raise ValueError("overlap must be non-negative")
    if overlap >= chunk_size:
        raise ValueError("overlap must be smaller than chunk_size")

    clean_text = normalise_text(text)
    if not clean_text:
        return []

    raw_chunks: list[str] = []
    start = 0
    step = chunk_size - overlap
    while start < len(clean_text):
        raw_chunks.append(clean_text[start : start + chunk_size])
        start += step

    total = len(raw_chunks)
    chunks: list[TextChunk] = []
    for index, body in enumerate(raw_chunks):
        digest = sha256(f"{source_id}:{index}:{body}".encode("utf-8")).hexdigest()[:16]
        chunks.append(
            TextChunk(
                chunk_id=digest,
                source_id=source_id,
                text=body,
                index=index,
                total_chunks=total,
            )
        )
    return chunks
