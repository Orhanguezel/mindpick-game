import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Question from "./components/Question";
import Ansver from "./components/Ansver"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/question" element={<Question />} />
        <Route path="/ansver" element={<Ansver />} />
      </Routes>
    </Router>
  );
}

export default App;

