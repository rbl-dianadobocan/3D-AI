# AI Workflow

> **⚠️ Important notice:** As of the current codebase, **TeamPulse does not implement any AI features**. The repository is named "3D-AI" but the application itself is a static SaaS dashboard with no AI/ML integrations, no language model calls, and no AI-powered functionality of any kind.

This document records that fact accurately and describes what would be needed to add AI capabilities in the future.

---

## Current State

| Area | Status |
|---|---|
| Language model integration (OpenAI, Anthropic, etc.) | ❌ Not implemented |
| AI-generated content | ❌ Not implemented |
| Prompt engineering / system prompts | ❌ Not implemented |
| Embeddings / semantic search | ❌ Not implemented |
| AI API routes | ❌ Not implemented |
| AI SDK dependencies | ❌ Not present in `package.json` |
| Environment variables for AI services | ❌ None defined |

---

## Potential Future AI Integrations

Below are AI features that would be natural extensions of a team productivity dashboard, along with the approach that would be required to implement each.

### 1. AI Task Summary / Smart Descriptions

**What it would do:** Generate a concise task description or acceptance criteria from a short user-provided title.

**How to implement:**
- Add an API route: `app/api/ai/task-summary/route.ts`
- Call an LLM (e.g. OpenAI `gpt-4o-mini`) with a prompt like:
  ```
  Given this task title: "<title>", write a 1–2 sentence description suitable for a development task card.
  ```
- Stream the response back to the client using the Vercel AI SDK (`ai` package).
- Required environment variable: `OPENAI_API_KEY`

### 2. Sprint Velocity Forecast

**What it would do:** Predict next sprint's velocity based on historical data and team capacity.

**How to implement:**
- Could use a simple statistical model (moving average) without LLM, or an LLM for natural-language explanation of the trend.
- API route: `app/api/ai/velocity-forecast/route.ts`
- Input: last N sprints' velocity data points
- Output: predicted range + reasoning

### 3. Team Productivity Insights

**What it would do:** Analyse productivity chart data and surface natural-language observations (e.g. "Backend team productivity has grown 32% over 6 months").

**How to implement:**
- Pass chart data as structured JSON to an LLM.
- Display AI-generated insights below the `ProductivityChart` component.

### 4. Natural Language Task Search

**What it would do:** Allow users to search tasks using plain English (e.g. "show me high-priority backend tasks due this week").

**How to implement:**
- Use embeddings (e.g. OpenAI `text-embedding-3-small`) to encode task titles + descriptions at task-creation time.
- Store vectors in a vector database (e.g. pgvector, Pinecone).
- At search time, embed the query and perform similarity search.

---

## What Would Be Required to Add AI

### Dependencies to Add

```bash
npm install ai openai          # Vercel AI SDK + OpenAI client
# or
npm install ai @anthropic-ai/sdk  # if using Anthropic Claude
```

### Environment Variables to Add

```env
# .env.local
OPENAI_API_KEY=sk-...
# or
ANTHROPIC_API_KEY=sk-ant-...
```

### API Route Pattern (Next.js App Router)

```typescript
// app/api/ai/example/route.ts
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const result = streamText({
    model: openai("gpt-4o-mini"),
    prompt,
  });

  return result.toDataStreamResponse();
}
```

### Error Handling Considerations

| Scenario | Recommended Handling |
|---|---|
| API key missing | Return 500 with "AI service not configured" message |
| Rate limit hit | Return 429 and show retry-after guidance to user |
| LLM timeout | Set a reasonable `maxDuration` and surface a friendly error |
| Invalid / empty response | Fallback to a default static message |
| CORS / network error | Catch in `try/catch` and display toast notification |

---

## Summary

There is currently a **gap between the repository name ("3D-AI") and the actual codebase** (a frontend-only dashboard). AI functionality would need to be designed and implemented from scratch if it is a project requirement. The sections above provide a starting roadmap for doing so.
