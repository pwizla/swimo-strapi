import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import MonthlyView from "./components/MonthlyView";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}

function Home() {
  return (
    <header className="App-header">
      <MonthlyView />
    </header>
  )
}

export default App;
