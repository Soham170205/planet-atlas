import { useState } from "react";
import { askQuestion } from "../api/askApi";

function Home() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async () => {
    const data = await askQuestion(question);
    setResponse(data);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Planet Atlas</h1>

      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a history question..."
      />

      <button onClick={handleSubmit}>
        Ask
      </button>

      {response && (
        <div>
          <h2>Answer</h2>
          <p>{response.answer}</p>
        </div>
      )}
    </div>
  );
}

export default Home;