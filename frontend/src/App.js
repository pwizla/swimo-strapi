// import logo from './logo.svg';
import React from "react";
import{
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import {
  useEffect,
  useState
} from 'react'
// import Operations from "./operations";
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


function Operations() {
  const [error, setError] = useState(null);
  const [operations, setOperations] = useState([]);

  useEffect(() => {
    fetch('http://localhost:1337/api/operations', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then( response => response.json())
      .then( ({ data }) => { 
        setOperations(data)
      })
      .catch((error) => setError(error))
  }, [])

  if (error) {
    return <div>An error occured: {error.message}</div>;
  }

  return (
    <div className="operations">
      <h1>Liste d'opérations</h1>
      { operations
        ? <table
            cellPadding="10px"
            rules="groups"
            className="operations-table">
            <thead>
              <tr>
                <th>Libellé</th>
                <th>Date</th>
                <th>Montant</th>
                <th>Banque</th>
              </tr>
            </thead>
            <tbody>
              {operations.map(({ id, attributes }) => (
                <tr key={id}>
                  <td>{attributes.Libelle}</td>
                  <td>{attributes.Date}</td>
                  <td className={`number ${attributes.Montant > 0 ? "positive" : "negative"}`}>
                    {attributes.Montant}
                  </td>
                  <td>{attributes.Check ? '✅' : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        : <div>Nous n'avons malheureusement pas pu retrouver la liste d'opérations… 😅</div>
      }
    </div>
  )
}

export default App;
