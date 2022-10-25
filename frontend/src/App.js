// import logo from './logo.svg';
import React from "react";
import{
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Operations from "./Operations";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="operations" element={<Operations />} />
      </Routes>
    </Router>
  )
}

function Home() {
  return (
    <header className="App-header">
      Welcome to Swimo!
      <Link className="router-link" to="/operations">Voir opérations</Link>
    </header>
  )
}

export default App;
