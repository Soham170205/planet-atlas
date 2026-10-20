# 🌍 Planet Atlas

> **An AI-powered History Exploration Platform built using Retrieval-Augmented Generation (RAG).**

Planet Atlas is an AI-powered history assistant that helps users explore civilizations, empires, historical events, and cultural achievements through natural-language conversations.

Rather than relying entirely on a Large Language Model (LLM), Planet Atlas uses **Retrieval-Augmented Generation (RAG)** to retrieve relevant historical paragraphs from a curated MongoDB knowledge base before generating an answer using a locally running LLM through Ollama.

The project combines semantic similarity search, vector embeddings, historical data, and a React-based chat interface to make history exploration more interactive and context-aware.

**Current focus:** Improving retrieval relevance, expanding historical coverage, and ensuring generated answers remain grounded in the retrieved evidence.

---

## 📌 Project Overview

Traditional AI chatbots can generate plausible but unsupported historical claims. Planet Atlas aims to reduce this problem by grounding its answers in a curated historical knowledge base.

The system follows these steps:

1. Accept a historical question from the user.
2. Generate a vector embedding for the question.
3. Compare the question embedding with stored historical paragraph embeddings.
4. Rank paragraphs using cosine similarity.
5. Select the top relevant paragraphs, with additional coverage for civilizations explicitly named in the question.
6. Construct a prompt containing the retrieved historical context.
7. Generate an answer using Ollama and Llama 3.2.
8. Return the answer and source metadata to the frontend.

The current implementation is a development-stage RAG application. Retrieval and answer grounding are being tested and improved; factual accuracy is not guaranteed for every question.

---

## ✨ Features

### Implemented

- 🤖 AI-powered historical question answering
- 📚 Retrieval-Augmented Generation pipeline
- 🔍 Semantic search using vector embeddings
- 🧮 Cosine similarity ranking
- 🗄️ MongoDB historical knowledge base
- 🦙 Local LLM inference using Ollama
- 🧠 Question embedding generation using `nomic-embed-text`
- ⚡ REST API built with Express.js
- 💬 React chat interface
- 📝 Markdown rendering for generated answers
- 🔗 Retrieved source metadata, including civilization, section, and similarity score
- 🧪 Retrieval smoke tests for relevance and evidence coverage
- 🛡️ Prompt instructions designed to discourage unsupported historical claims

### Under Development

- 🎯 More precise paragraph-level retrieval
- ⚖️ Reliable evidence-grounded civilization comparisons
- 🧾 Improved source attribution and citation handling
- 🧹 Better detection of irrelevant retrieved context
- 📖 Expanded historical dataset
- 🧪 More comprehensive answer-quality evaluation

---

## 🏛️ Historical Knowledge Base

The current knowledge base covers ten civilizations and empires.

| No. | Civilization |
|---:|---|
| 1 | Indus Valley Civilization |
| 2 | Ancient Egypt |
| 3 | Mesopotamia |
| 4 | Ancient Greece |
| 5 | Roman Empire |
| 6 | Mauryan Empire |
| 7 | Gupta Empire |
| 8 | Han Dynasty |
| 9 | Maya Civilization |
| 10 | Inca Empire |

Historical records are organized into sections such as:

- Overview
- Government and Society
- Economy and Trade
- Culture and Achievements
- Decline and Legacy

Each record contains historical text and its associated embedding, along with metadata used to identify the civilization and section.

The dataset is being expanded with more focused passages to improve answers to specific questions, particularly questions about administration, urban planning, and comparisons between civilizations.

---

## 🛠️ Tech Stack

### Frontend

- React
- JavaScript
- Vite
- CSS
- React Markdown

### Backend

- Node.js
- Express.js
- JavaScript

### Database

- MongoDB
- MongoDB Atlas

### AI and Retrieval

- Ollama
- Llama 3.2 — local language model
- `nomic-embed-text` — embedding model
- Cosine similarity
- Retrieval-Augmented Generation (RAG)

### Development Tools

- Git and GitHub
- Postman
- dotenv
- REST API

---

## 🏗️ System Architecture

```text
                   User Question
                         |
                         v
                  React Frontend
                         |
                         v
                 Express REST API
                         |
                         v
               Generate Question Embedding
                   nomic-embed-text
                         |
                         v
                MongoDB Historical Records
                         |
                         v
               Cosine Similarity Ranking
                         |
                         v
              Select Top Historical Paragraphs
                         |
                         v
                 Build Evidence Prompt
                         |
                         v
                  Ollama / Llama 3.2
                         |
                         v
                Generate Historical Answer
                         |
                         v
             Answer + Retrieved Source Metadata
                         |
                         v
                  React Frontend
```

**Note:** The current retrieval implementation calculates cosine similarity against stored embeddings loaded from MongoDB. It is not yet a dedicated vector database search implementation.

---

## 🔄 RAG Pipeline

Planet Atlas follows a Retrieval-Augmented Generation workflow.

### 1. Question Input

The user submits a historical question through the React chat interface.

Example:

> What were the major cities and urban planning features of the Indus Valley Civilization?

### 2. Embedding Generation

The backend converts the question into a numerical vector using `nomic-embed-text` through Ollama.

The current embedding output has **768 dimensions**.

### 3. Semantic Retrieval

The retrieval service loads historical records from MongoDB, calculates cosine similarity between the question embedding and each stored paragraph embedding, and sorts the results by similarity.

### 4. Context Selection

The system selects a limited number of paragraphs using the configured `TOP_K` value. It also attempts to reserve a result for each explicitly named civilization before filling the remaining slots using similarity ranking.

This improves civilization coverage for comparison questions, but does not guarantee that every selected paragraph is relevant to the specific topic.

### 5. Prompt Construction

The prompt service combines the question and retrieved historical context. It instructs the language model to use the supplied evidence, avoid inventing facts, and acknowledge missing information.

### 6. Answer Generation

Ollama runs Llama 3.2 locally to generate a Markdown-formatted response.

### 7. Response and Source Metadata

The backend returns the generated answer and retrieved source metadata for display and debugging.

---

## 🧪 Retrieval Testing

Planet Atlas includes a retrieval smoke-test script:

```text
backend/test/retrieval-smoke-test.mjs
```

The script tests three scenarios.

| Test | Question type | What it evaluates |
|---|---|---|
| 1 | Indus Valley cities and urban planning | Retrieval of relevant urban-planning evidence |
| 2 | Roman and Mauryan government comparison | Evidence coverage across multiple civilizations |
| 3 | Exact Inca weather in 1200 CE | Appropriate handling of unsupported questions |

The tests also display retrieved civilizations, section names, and cosine similarity scores.

### Current Findings

- The Indus Valley test retrieves a relevant Overview paragraph, but additional passages are needed for detailed city-specific evidence.
- The Roman–Mauryan comparison now retrieves paragraphs from both civilizations, but the Roman passage may not adequately describe its administrative system.
- The Inca weather test demonstrates that the dataset does not contain the requested exact daily weather records.

These tests are diagnostic checks, not a complete benchmark of factual accuracy.

---

## 🚧 Current Development Status

| Component | Status |
|---|---|
| Historical dataset creation | Implemented; expansion ongoing |
| Embedding generation | Implemented |
| MongoDB knowledge base | Implemented |
| Cosine similarity retrieval | Implemented |
| Top-K paragraph selection | Implemented |
| Named-civilization coverage logic | Implemented |
| Prompt construction | Implemented; grounding improvements ongoing |
| Ollama integration | Implemented |
| Express REST API | Implemented |
| React chat interface | Implemented |
| Markdown response rendering | Implemented |
| Source metadata display | Implemented |
| Retrieval smoke tests | Implemented |
| Fine-grained retrieval relevance | In progress |
| Answer-grounding validation | In progress |
| Advanced citations | Planned |
| Interactive historical timelines | Planned |
| Historical maps and visualizations | Planned |

---

## 🗺️ Roadmap

### Phase 1 — Improve Retrieval Quality

- Add focused paragraphs for major historical topics.
- Improve retrieval relevance beyond broad civilization-level matches.
- Improve evidence coverage for multi-civilization questions.
- Evaluate whether retrieved passages directly answer the question.

### Phase 2 — Improve Answer Reliability

- Strengthen evidence-grounding instructions.
- Reduce unrelated information in answers.
- Detect insufficient or irrelevant context.
- Evaluate generated claims against retrieved evidence.
- Improve source attribution.

### Phase 3 — Expand Historical Coverage

- Add more civilizations, empires, rulers, wars, and events.
- Develop topic-specific historical records.
- Improve dataset consistency and factual verification.

### Phase 4 — Enhance User Experience

- Interactive historical timelines.
- Historical maps and geographical exploration.
- Civilization comparison views.
- Historical quizzes and learning tools.
- Saved conversations and user accounts.
- Multilingual support.
- Voice-based history exploration.

---

## ⚙️ Local Development Setup

### Prerequisites

Install the following before running the project:

- Node.js and npm
- MongoDB or a MongoDB Atlas connection
- Ollama
- Git

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd planet-atlas
```

Replace the repository URL with your actual GitHub repository URL.

### 2. Install backend dependencies

Navigate to the backend directory:

```bash
cd backend
npm install
```

### 3. Configure environment variables

Create a `.env` file in the backend directory using the variable names required by your implementation.

Example configuration:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
TOP_K=5
```

Configure any additional variables required by your code. Never commit database credentials, API keys, or other secrets to GitHub.

### 4. Start Ollama

Install Ollama, then download the required models:

```bash
ollama pull llama3.2
ollama pull nomic-embed-text
```

Ensure the Ollama service is running before making requests to the backend.

### 5. Start the backend

From the backend directory, run the startup command configured in `package.json`, for example:

```bash
npm run dev
```

If your project uses a different script, use that script instead.

### 6. Start the frontend

Open a second terminal, navigate to the frontend directory, and install dependencies:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite in your terminal.

**Important:** Directory names and environment variables should match your actual repository structure and implementation.

---

## 🔐 Security and Reliability Considerations

- Keep `.env` files out of version control.
- Validate incoming API requests.
- Handle Ollama and database connection errors.
- Avoid treating similarity scores as confidence probabilities.
- Do not assume retrieved paragraphs support every generated claim.
- Test unsupported questions as well as answerable questions.
- Verify historical content before adding it to the knowledge base.

---

## 🎓 Educational Purpose

Planet Atlas aims to make historical learning more accessible through conversational AI and curated historical information.

The project also explores practical applications of:

- Retrieval-Augmented Generation
- Natural-language processing
- Vector embeddings
- Semantic similarity
- Large Language Models
- Backend API development
- Database design
- AI evaluation and hallucination reduction

Planet Atlas is an ongoing learning and development project. Its goal is to evolve into a reliable, interactive platform for exploring world history while clearly distinguishing supported historical evidence from missing information.

---

## 👨‍💻 Project

**Planet Atlas — AI-Powered History Exploration**

Built with React, Node.js, MongoDB, Ollama, and Retrieval-Augmented Generation.

