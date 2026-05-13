from src.rag_ingestion import chunk_text, normalise_text


def test_normalise_text_collapses_whitespace() -> None:
    assert normalise_text("Hello\n\nsecure   RAG") == "Hello secure RAG"


def test_empty_document_returns_no_chunks() -> None:
    assert chunk_text("   ", source_id="doc-1") == []


def test_chunk_text_produces_metadata() -> None:
    text = "A" * 600
    chunks = chunk_text(text, source_id="policy-1", chunk_size=200, overlap=20)

    assert len(chunks) >= 3
    assert chunks[0].source_id == "policy-1"
    assert chunks[0].index == 0
    assert chunks[0].total_chunks == len(chunks)
    assert chunks[0].chunk_id


def test_invalid_overlap_is_rejected() -> None:
    try:
        chunk_text("hello", source_id="doc-1", chunk_size=100, overlap=100)
    except ValueError as exc:
        assert "overlap" in str(exc)
    else:
        raise AssertionError("Expected ValueError for invalid overlap")
