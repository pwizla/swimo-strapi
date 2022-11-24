// import logo from './logo.svg';
import React from "react";
import{
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import MonthlyView from "./MonthlyView";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="monthly" element={<MonthlyView />} />
      </Routes>
    </Router>
  )
}

function Home() {
  return (
    <header className="App-header">
      Welcome to Swimo!
      <Link className="router-link" to="/monthly">Voir le mois en cours</Link>
    </header>
  )
}

export default App;
