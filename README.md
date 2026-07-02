# 🌍 Planet Atlas

> **An AI-powered History Exploration Platform built using Retrieval-Augmented Generation (RAG).**

Planet Atlas is an intelligent history assistant that allows users to explore civilizations, empires, historical figures, wars, and major events through natural conversations.

Instead of relying solely on a Large Language Model, Planet Atlas combines **semantic search** with **Retrieval-Augmented Generation (RAG)** to retrieve relevant historical knowledge before generating responses. This significantly improves factual accuracy, reduces hallucinations, and provides context-aware answers grounded in curated historical data.

---

## Overview

Traditional chatbots often generate convincing but inaccurate historical information.

Planet Atlas solves this problem by:

* Converting user questions into vector embeddings
* Searching a historical knowledge base using semantic similarity
* Retrieving the most relevant historical passages
* Supplying retrieved context to a local LLM
* Generating accurate, context-aware responses

This architecture ensures that answers are based on historical sources rather than model memory alone.

---

# Features

* 🤖 AI-powered historical question answering
* 📚 Retrieval-Augmented Generation (RAG)
* 🔍 Semantic search using vector embeddings
* 🧠 Context-aware AI responses
* 🌍 Explore civilizations, empires, leaders and historical events
* 💬 Interactive chat interface
* ⚡ Fast REST API built with Express.js
* 🦙 Local LLM inference using Ollama
* 📦 MongoDB knowledge base
* 🔗 Source-aware response generation
* 🚀 Modern React frontend

---

# System Architecture

```text
                User Question
                      │
                      ▼
             React Frontend
                      │
                      ▼
             Express REST API
                      │
                      ▼
        Generate Question Embedding
                      │
                      ▼
      Vector Similarity Search (MongoDB)
                      │
        Top Relevant History Chunks
                      │
                      ▼
      Prompt + Retrieved Context
                      │
                      ▼
          Ollama (Llama 3.2)
                      │
                      ▼
             AI Generated Answer
                      │
                      ▼
                React Frontend
```

---

# Tech Stack

## Frontend

* React
* JavaScript
* CSS

## Backend

* Node.js
* Express.js

## Database

* MongoDB
* MongoDB Atlas

## AI Stack

* Ollama
* Llama 3.2
* nomic-embed-text
* Retrieval-Augmented Generation (RAG)

## APIs & Tools

* REST API
* Postman
* dotenv
* CORS

---

# RAG Pipeline

Planet Atlas follows a Retrieval-Augmented Generation workflow.

```text
User Question
      │
      ▼
Generate Embedding
      │
      ▼
Semantic Search
      │
      ▼
Retrieve Top Historical Chunks
      │
      ▼
Build Context Prompt
      │
      ▼
Generate Response using Ollama
      │
      ▼
Return Answer
```

---



# Current Development

* ✅ Historical dataset creation
* ✅ Embedding generation
* ✅ MongoDB knowledge base
* ✅ Semantic similarity search
* ✅ RAG pipeline
* ✅ Ollama integration
* ✅ Express REST API
* 🚧 React frontend improvements
* 🚧 Source citations
* 🚧 Timeline visualization
* 🚧 Multi-civilization knowledge expansion

---

# Future Roadmap

* Interactive historical timelines
* AI-generated historical maps
* Civilization comparison engine
* Historical event visualization
* Quiz generation
* Voice interaction
* Image generation for historical scenes
* User accounts and saved conversations
* Multi-language support
* Advanced citation system

---

# Educational Purpose

Planet Atlas is designed to make history learning more engaging, interactive, and accessible by combining modern AI techniques with curated historical knowledge.

The platform encourages users to explore the past through natural conversations while promoting factual accuracy through Retrieval-Augmented Generation.

---

