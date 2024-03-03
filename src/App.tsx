import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Box from "@mui/material/Box";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from "react-dom";
import SignUpPage from "./pages/signup";
import './style.css';


function App() {
  return (
    <Router>
      <div>
        <Routes>
        <Route path="/" element={<SignUpPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
ReactDOM.render(<App/>, document.getElementById("root"));
