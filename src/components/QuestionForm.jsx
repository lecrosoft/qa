import { useState } from "react";
import { ref, push } from "firebase/database";
import { database } from "../firebase";

export default function QuestionForm() {
  const [question, setQuestion] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const [name, setName] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    const questionRef = ref(database, "questions");
    push(questionRef, {
      question,
      name: anonymous ? "Anonymous" : name.trim() || "Anonymous",
      timestamp: Date.now(),
      answered: false,
    });

    setQuestion("");
    setName("");
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "3rem auto",
        padding: "1rem",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <form onSubmit={handleSubmit}>
        <h1>GGPPM LIVE QUESTION (ASK YOUR QUESTION)</h1>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question..."
          rows={4}
          style={{
            width: "100%",
            padding: "12px",
            fontSize: 16,
            borderRadius: 8,
            border: "2px solid #ccc",
            resize: "vertical",
            outline: "none",
            fontFamily: "inherit",
          }}
          required
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 12,
            userSelect: "none",
          }}
        >
          <input
            type="checkbox"
            checked={anonymous}
            onChange={() => setAnonymous((a) => !a)}
            id="anonymousSwitch"
            style={{ cursor: "pointer", marginRight: 8, width: 18, height: 18 }}
          />

          <label
            htmlFor="anonymousSwitch"
            style={{ cursor: "pointer", fontSize: 15 }}
          >
            Ask Anonymously
          </label>
        </div>
        <br />
        <p>Uncheck the box above to show your name on your questions</p>
        {!anonymous && (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            style={{
              marginTop: 12,
              width: "100%",
              padding: "10px",
              fontSize: 16,
              borderRadius: 8,
              border: "2px solid #ccc",
              outline: "none",
              fontFamily: "inherit",
            }}
            required={!anonymous}
          />
        )}

        <button
          type="submit"
          style={{
            marginTop: 18,
            width: "100%",
            padding: "14px",
            backgroundColor: "#2563eb",
            color: "white",
            fontWeight: "600",
            fontSize: 18,
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#1e40af")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#2563eb")}
        >
          Submit Question
        </button>
      </form>

      {/* Success Alert */}
      {showSuccess && (
        <div
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            backgroundColor: "#16a34a",
            color: "white",
            padding: "1rem 1.5rem",
            borderRadius: 8,
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            fontWeight: "600",
            zIndex: 9999,
            animation: "fadein 0.3s, fadeout 0.5s 2.5s",
          }}
        >
          Question submitted successfully!
        </div>
      )}

      <style>{`
        @keyframes fadein {
          from {opacity: 0;}
          to {opacity: 1;}
        }
        @keyframes fadeout {
          from {opacity: 1;}
          to {opacity: 0;}
        }
      `}</style>
    </div>
  );
}
