# SundAI — website APIs and RAG ingestion baseline

This repository contains the [SundAI website](https://sundaibot.com/), its Cloudflare Worker APIs, and a separate Python document-ingestion baseline. The website work demonstrates API integration, input validation, error handling, consent flows and automated checks.

**For recruiters and technical reviewers:** start with the contact API and its tests. They show concrete implementation decisions and failure cases that can be reviewed and exercised locally.

[My profile and project guide](https://github.com/Popoo2020) · [Website source](site/) · [Website CI](.github/workflows/site-ci.yml)

## Start with the implemented website work

| What to review | Source | Evidence |
|---|---|---|
| Validate a form before contacting providers: allowed fields, bounded streamed JSON, field lengths and origin checks | [Contact API](site/functions/api/contact.js) | [Validation and abuse-control tests](site/tests/contact-security.test.mjs) |
| Verify Turnstile results against the expected hostname and action; handle provider failures | [Contact API](site/functions/api/contact.js) | [Challenge and failure cases](site/tests/contact-security.test.mjs) |
| Route enquiries to the configured recipient, escape HTML, retry with a stable idempotency key and require a provider receipt | [Email integration](site/functions/api/contact.js) | [Routing, retry and receipt tests](site/tests/contact-delivery.test.mjs) |
| Queue requested guides and require confirmation before follow-up emails; support unsubscribe | [Lead API](site/functions/api/leads.js), [Durable Object workflow](site/functions/_shared/lead-flow.js) | [Consent and workflow tests](site/tests/lead-flow.test.mjs) |
| Keep browser validation and feedback aligned with the API | [Form client](site/assets/upgrade-forms.js) | [Form tests](site/tests/upgrade-forms.test.mjs), [client tests](site/tests/contact-client.test.mjs) |

The contact API also applies local and edge-cache rate checks. It supports an optional native rate-limiter binding, which is not declared in the checked-in deployment configuration; this is not a globally atomic rate-limit guarantee.

## Run the website tests

With Node.js 22 or later, from the repository root:

```bash
node --test site/tests/*.test.mjs
```

**Verified result: 114 passed, zero failed or skipped** at [commit `2fde43b`](https://github.com/Popoo2020/Enterprise-Sundai-Bot/commit/2fde43b61379b57ee9d6a2b744301acf0d38377f). [GitHub CI](https://github.com/Popoo2020/Enterprise-Sundai-Bot/actions/runs/38821188605) recorded this on 15 October 2026 with Node 22; a local rerun on 19 October with Node 24 produced the same count. The [website workflow](.github/workflows/site-ci.yml) additionally checks syntax, pages, assets, multilingual content and security configuration.

These are offline tests with synthetic data and mocked external providers. They establish behavior under the tested conditions, not live email delivery, production uptime, conversion gains or a comprehensive security assessment. No live form submission is needed to run them.

## Separate Python RAG ingestion baseline

The Python module implements text normalisation, overlapping chunks, deterministic IDs and chunk metadata. Retrieval, a vector-store adapter, RAG authentication and a query API remain planned. The implemented website contact/lead APIs above are separate from those future RAG layers.

### RAG baseline status

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

### RAG baseline files

```text
src/
  rag_ingestion.py            # Document normalisation and chunking helpers

tests/
  test_rag_ingestion.py       # Test coverage for ingestion behaviour

requirements.txt
.github/workflows/ci.yml
```

### Ingestion flow

Raw document → whitespace normalisation → overlapping chunks → chunks with metadata.

### Ingestion module

`src/rag_ingestion.py`

Provides:

- `normalise_text(text)`
- `chunk_text(text, source_id, chunk_size=280, overlap=40)`
- deterministic `TextChunk` objects with:
  - `chunk_id`
  - `source_id`
  - `text`
  - `index`
  - `total_chunks`

The module prepares documents for a future retrieval layer.

### Run the Python ingestion tests

```bash
git clone https://github.com/Popoo2020/Enterprise-Sundai-Bot.git
cd Enterprise-Sundai-Bot

python -m venv .venv
source .venv/bin/activate

pip install -r requirements.txt
pytest -q
```

### Ingestion example

```python
from src.rag_ingestion import chunk_text

chunks = chunk_text(
    "This is a sample enterprise policy document for secure RAG testing.",
    source_id="policy-001",
)

for chunk in chunks:
    print(chunk.chunk_id, chunk.index, chunk.text)
```

### RAG security development path

Future RAG layers need their own controls; the website contact API does not provide these for retrieval:

1. retrieval restricted by user/role context
2. source metadata validation
3. prompt assembly that distinguishes trusted instructions from untrusted retrieved content
4. auditability for ingestion and retrieval events
5. rate limiting and abuse prevention at the API layer

### RAG roadmap

1. Add vector-store adapter interface
2. Add retrieval helper with metadata filtering
3. Add FastAPI query endpoint
4. Add role-aware retrieval controls
5. Add structured audit logging
6. Add threat model and architecture diagrams
7. Add safe prompt assembly patterns for retrieved content

### RAG baseline limitations

- The RAG baseline is not yet a running chatbot service
- There is no vector database integration yet
- There is no RAG authentication layer yet
- Its implemented scope is document normalisation and chunking with metadata

## SundAI public governance resources

This repository also contains the source for selected public materials from [SundAI](https://sundaibot.com/), an independent European initiative focused on practical AI governance, AI security, responsible adoption and training.

- [European AI Governance Readiness Brief 2026](https://sundaibot.com/resources/european-ai-governance-readiness-2026/) — a dated, source-backed synthesis and 12-question evidence-readiness rubric. It is not a market survey, legal opinion or compliance score.
- [SundAI AI Control Matrix](https://sundaibot.com/resources/ai-control-matrix/) — a practical thematic mapping aid across the EU AI Act, ISO/IEC 42001, ISO/IEC 27001 and NIST AI RMF. It is not an official legal or standards crosswalk.
- [AI governance resources](https://sundaibot.com/resources/) — editable inventory, supplier-review, impact-assessment and readiness artifacts.
- [Evidence & trust policy](https://sundaibot.com/trust/) — how SundAI separates verified facts, source-backed guidance, illustrative scenarios and measured outcomes.

Localised versions are published in [Danish](https://sundaibot.com/da/ressourcer/) and [Swedish](https://sundaibot.com/sv/resurser/).
