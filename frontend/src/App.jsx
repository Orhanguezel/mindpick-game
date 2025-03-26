import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Question from "./components/Question";
import Answer from "./components/Answer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Results from "./pages/Results";
import Header from "./components/Header"; 

function App() {
  return (
    <Router>
      <Header /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/questions" element={<Question />} />
        <Route path="/answer" element={<Answer />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;
