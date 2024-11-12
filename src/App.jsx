import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <Router>
        <Routes >
          <Route path="/" exact element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Dashboard />} />
        </Routes>
    </Router>
    // <Dashboard />
  )
}

export default App;
