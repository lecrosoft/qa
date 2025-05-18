import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import QuestionForm from "./components/QuestionForm";
import QuestionList from "./components/QuestionList";

function App() {
  return (
    <Router>
      <div className="max-w-2xl mx-auto p-6">
        {/* <nav className="flex justify-center space-x-6 mb-6">
          <Link to="/ask" className="text-blue-600 font-medium">
            Ask Question
          </Link>
          <Link to="/host" className="text-blue-600 font-medium">
            Host View
          </Link>
        </nav> */}

        <Routes>
          <Route path="/ask" element={<QuestionForm />} />
          <Route path="/host" element={<QuestionList />} />
          <Route
            path="*"
            element={<p className="text-center">Choose a view above 👆</p>}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
