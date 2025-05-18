import { useState, useEffect } from "react";
import { ref, onValue, update } from "firebase/database";
import { database } from "../firebase";
import dayjs from "dayjs";
import "./QuestionList.css"; // import your CSS here

export default function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [lastCount, setLastCount] = useState(0);

  useEffect(() => {
    const questionRef = ref(database, "questions");
    onValue(questionRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const questionArray = Object.entries(data).map(([id, val]) => ({
          id,
          ...val,
        }));
        const sortedQuestions = questionArray.sort(
          (a, b) => b.timestamp - a.timestamp
        );

        // Play beep and vibrate if new message arrives
        if (lastCount !== 0 && sortedQuestions.length > lastCount) {
          playBeep();
        }

        setLastCount(sortedQuestions.length);
        setQuestions(sortedQuestions);
      }
    });
  }, [lastCount]);

  const markAsAnswered = (id) => {
    const questionRef = ref(database, `questions/${id}`);
    update(questionRef, { answered: true });
  };

  const playBeep = () => {
    const audio = new Audio("/beep.mp3");
    audio.play();

    if (navigator.vibrate) {
      navigator.vibrate(200);
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Questions</h2>

      {questions.map((q) => (
        <div
          key={q.id}
          className={`question-card ${q.answered ? "answered" : ""}`}
        >
          <p className="question-text">{q.question}</p>

          <div className="question-meta">
            <span>— {q.name}</span>
            <span>{dayjs(q.timestamp).format("MMM D, YYYY h:mm A")}</span>
          </div>

          {!q.answered && (
            <button
              onClick={() => markAsAnswered(q.id)}
              className="answer-button"
            >
              Mark as Answered
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
