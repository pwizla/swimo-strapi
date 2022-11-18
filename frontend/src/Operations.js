import React from "react";
import {
  useEffect,
  useState
} from 'react'
// import MonthPicker from './MonthPicker'
const qs = require('qs');

function matchMonth(monthNumber){
  let monthName, numberOfDaysPerMonth;
  switch(monthNumber) {
    case 1:
      monthName = 'janvier';
      numberOfDaysPerMonth = 31;
      break;
    case 2:
      monthName = 'février';
      numberOfDaysPerMonth = 28;
      break;
    case 3:
      monthName = 'mars';
      numberOfDaysPerMonth = 31;
      break;
    case 4:
      monthName = 'avril';
      numberOfDaysPerMonth = 30;
      break;
    case 5:
      monthName = 'mai';
      numberOfDaysPerMonth = 31;
      break;
    case 6:
      monthName = 'juin';
      numberOfDaysPerMonth = 30;
      break;
    case 7:
      monthName = 'juillet';
      numberOfDaysPerMonth = 31;
      break;
    case 8:
      monthName = 'août';
      numberOfDaysPerMonth = 31;
      break;
    case 9:
      monthName = 'septembre';
      numberOfDaysPerMonth = 30;
      break;
    case 10:
      monthName = 'octobre';
      numberOfDaysPerMonth = 31;
      break;
    case 11:
      monthName = 'novembre';
      numberOfDaysPerMonth = 30;
      break;
    case 12:
      monthName = 'décembre';
      numberOfDaysPerMonth = 31;
      break;
    default: 
      monthName = new Date().toLocaleString('fr-fr', { month: "long" }); 
  }
  return {
    monthName,
    numberOfDaysPerMonth
  };
}

function Operations() {
  const [error, setError] = useState(null);
  const [operations, setOperations] = useState([]);
  let [displayedMonthNumber, setDisplayedMonthNumber] = useState(new Date().getMonth() + 1);
  let [displayedYear, setDisplayedYear] = useState(new Date().getFullYear());
  let [displayedMonthName, setDisplayedMonthName] = useState(new Date().toLocaleString('fr-fr', { month: "long" }));
  const [query, setQuery] = useState(getQuery(new Date().getMonth() + 1));

  function addMonth() {
    if (displayedMonthNumber === 12) { 
      displayedMonthNumber = 0;
      displayedMonthName = 'janvier';
      setDisplayedYear(displayedYear + 1);
    }
    setDisplayedMonthNumber(displayedMonthNumber + 1);
    setDisplayedMonthName(matchMonth(displayedMonthNumber + 1));
    setQuery(getQuery(displayedMonthNumber + 1));
    console.log(displayedMonthNumber, displayedMonthName);
  }

  function substractMonth() {
    if (displayedMonthNumber === 1) { 
      displayedMonthNumber = 13;
      displayedMonthName = 'décembre';
      setDisplayedYear(displayedYear - 1);
    }
    setDisplayedMonthNumber(displayedMonthNumber - 1);
    setDisplayedMonthName(matchMonth(displayedMonthNumber - 1));
    setQuery(getQuery(displayedMonthNumber - 1));
    console.log(displayedMonthNumber, displayedMonthName);
  }

  function formatMonthNumber(monthNumber) {
    const formatted = monthNumber < 10 ? `0${monthNumber.toString()}` : `${monthNumber.toString()}`
    return formatted
  }

  function getQuery(displayedMonthNumber) {

    const firstDayOfMonth = `${displayedYear}-${formatMonthNumber(displayedMonthNumber)}-01`;
    const lastDayOfMonth = `${displayedYear}-${formatMonthNumber(displayedMonthNumber)}-${matchMonth(displayedMonthNumber).numberOfDaysPerMonth}`;
  
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

  useEffect(() => {
    fetch(`http://localhost:1337/api/operations?${query}`, {
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
  }, [query])

  if (error) {
    return <div>An error occured: {error.message}</div>;
  }
  
  const currentMonthName = `${matchMonth(displayedMonthNumber).monthName} ${displayedYear}`;

  // TODO: add prev/next month selector
  return (
    <div className="operations">
      <button onClick={substractMonth}>Mois précédent</button>
      <button onClick={addMonth}>Mois suivant</button>
      <h1>Liste d'opérations pour le mois de <span className="current current-month">{currentMonthName}</span></h1>
      { operations && operations.length > 0
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
