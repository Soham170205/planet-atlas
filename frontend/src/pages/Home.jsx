import { useState } from "react";
import { askQuestion } from "../api/askApi";
import ReactMarkdown from "react-markdown";
import "./Home.css";

function Home() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || loading) return;

    setLoading(true);
    setError("");
    setResponse(null);

    try {
      const data = await askQuestion(trimmedQuestion);
      setResponse(data);
    } catch (err) {
      console.error("Failed to fetch answer:", err);
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Unable to get an answer. Please check that the backend and Ollama are running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="planet-atlas">
      <header className="hero">
        <p className="eyebrow">YOUR JOURNEY THROUGH HISTORY</p>
        <h1>Planet Atlas</h1>
        <p className="subtitle">
          Explore civilizations, uncover ancient mysteries, and discover the
          stories that shaped our world.
        </p>
      </header>

      <form className="question-form" onSubmit={handleSubmit}>
        <input
          className="question-input"
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question about history..."
          aria-label="Ask a historical question"
          disabled={loading}
        />

        <button
          className="ask-button"
          type="submit"
          disabled={loading || !question.trim()}
        >
          {loading ? "Exploring..." : "Ask Atlas"}
        </button>
      </form>

      {loading && (
        <div className="loading-state" role="status">
          <span className="loading-spinner" />
          <p>Searching historical knowledge and generating your answer...</p>
        </div>
      )}

      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}

      {response && (
        <section className="answer-card" aria-live="polite">
          <div className="answer-heading">
            <span className="answer-label">HISTORICAL INSIGHTS</span>
            <h2>Your Answer</h2>
          </div>

          <article className="answer-content">
            <ReactMarkdown>
              {response.answer || "No answer was returned by the server."}
            </ReactMarkdown>
          </article>

          {Array.isArray(response.sources) && response.sources.length > 0 && (
            <section className="sources-section">
              <h3>Historical Sources</h3>

              <div className="sources-list">
                {response.sources.map((source, index) => (
                  <div
                    className="source-card"
                    key={`${source.civilization || "source"}-${source.section || index}-${index}`}
                  >
                    <h4>{source.civilization || "Historical reference"}</h4>

                    {source.section && <p>{source.section}</p>}

                    {source.era && (
                      <span className="source-era">{source.era}</span>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </section>
      )}

      <footer className="footer">
        Discover the past. Understand the present.
      </footer>
    </main>
  );
}

export default Home;