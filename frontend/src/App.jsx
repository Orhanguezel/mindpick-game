// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Results from "./pages/Results";
import Answer from "./pages/Answer";
import Layout from "./layout/Layout";
import QuestionCard from "./components/QuestionCard";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/questions" element={<QuestionCard />} />
          <Route path="/results" element={<Results />} />
          <Route path="/answers" element={<Answer />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

