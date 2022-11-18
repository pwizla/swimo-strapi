import React from "react";
import {
  useEffect,
  useState
} from 'react'
// import MonthPicker from './MonthPicker'
const qs = require('qs');

function getQuery() {

  const {firstDayOfMonth, lastDayOfMonth} = getCurrentMonth();

  return qs.stringify(
    {
      filters: {
        'Date': {
          $between: [firstDayOfMonth, lastDayOfMonth]
        }
      },
      sort: ['Date:asc']
    },
    {
      encodeValuesOnly: true
    }
  )
}

function getCurrentMonth() {
  const today = new Date()
  const month = today.getMonth() + 1
  const year = today.getFullYear()
  const firstDayOfMonth = [year, month, '01'].join('-')
  const lastDayOfMonth = [year, month, '30'].join('-') // should adapt to get last day of month

  const locale = "fr-fr";
  const monthName = today.toLocaleString(locale, { month: "long" });

  return {
    firstDayOfMonth,
    lastDayOfMonth,
    monthName,
    year
  }
}

function Operations() {
  const [error, setError] = useState(null);
  const [operations, setOperations] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:1337/api/operations?${getQuery()}`, {
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
  
  const currentMonthName = `${getCurrentMonth().monthName} ${getCurrentMonth().year}`;

  // TODO: add prev/next month selector
  return (
    <div className="operations">
      <h1>Liste d'opérations pour le mois de <span className="current current-month">{currentMonthName}</span></h1>
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
                // TODO: convert to component
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

export default Operations;
