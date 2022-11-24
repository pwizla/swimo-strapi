import React, { Suspense, useEffect, useState } from 'react';
import { months } from './months';
const qs = require('qs');

function Operations() {
  const [error, setError] = useState(null);
  const [operations, setOperations] = useState([]);
  let [selectedMonthNumber, setSelectedMonthNumber] = useState(new Date().getMonth() + 1);
  let [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [query, setQuery] = useState(getQuery());

  function addMonth() {
    if (selectedMonthNumber === 12) { 
      selectedMonthNumber = 0;
      setSelectedYear(selectedYear + 1);
    }
    setSelectedMonthNumber(selectedMonthNumber + 1);
    setQuery(getQuery(selectedMonthNumber + 1, selectedYear));
  }

  function getCurrentMonth() {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    setSelectedMonthNumber(currentMonth + 1);
    setSelectedYear(currentYear);
    setQuery(getQuery(currentMonth + 1));
  }

  function substractMonth() {
    if (selectedMonthNumber === 1) { 
      selectedMonthNumber = 13;
      setSelectedYear(selectedYear - 1);
    }
    setSelectedMonthNumber(selectedMonthNumber - 1);
    setQuery(getQuery(selectedMonthNumber - 1, selectedYear));
  }

  function formatMonthNumber(monthNumber) {
    const formatted = monthNumber < 10 
      ? `0${monthNumber.toString()}` 
      : `${monthNumber.toString()}`
    return formatted
  }

  function getQuery(selectedMonthNumber = new Date().getMonth() + 1, selectedYear = new Date().getFullYear()) {
    const formattedMonthNumber = formatMonthNumber(selectedMonthNumber);
    const numberOfDaysInSelectedMonth = months[selectedMonthNumber - 1].numberOfDays;
    const firstDayOfMonth = `${selectedYear}-${formattedMonthNumber}-01`;
    const lastDayOfMonth = `${selectedYear}-${formattedMonthNumber}-${numberOfDaysInSelectedMonth}`;
  
    return qs.stringify(
      {
        filters: {
          'Date': {
            $between: [firstDayOfMonth, lastDayOfMonth]
          }
        },
        populate: {
          enveloppe: {
            fields: ['Categorie']
          },
        },
        sort: ['Date:asc'],
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
      .then(response => response.json())
      .then( ({ data }) => { 
        setOperations(data)
      })
      .catch((error) => setError(error))
  }, [query])

  if (error) {
    return <div>Une erreur s'est produite: <span className="error">{error.message}</span></div>;
  }
  
  const currentMonthName = `${months[selectedMonthNumber - 1].name} ${selectedYear}`;

  return (
    <Suspense fallback={"Loading…"}>
      {/* TODO: add beautiful loader */}
      <div className="operations">
        <button className="button button__month" onClick={substractMonth}>{'<< Mois précédent'}</button>
        <button className="button button__month" title={`${months[new Date().getMonth()].name} ${new Date().getFullYear()}`} onClick={getCurrentMonth}>Mois en cours</button>
        <button className="button button__month" onClick={addMonth}>{'Mois suivant >>'}</button>
        <h1>Liste d'opérations - <span className="current current-month">{currentMonthName}</span></h1>
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
                  <th>Catégorie</th>
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
                    <td>{attributes.enveloppe.data
                          && attributes.enveloppe.data.attributes
                          &&  attributes.enveloppe.data.attributes.Categorie
                        ? attributes.enveloppe.data.attributes.Categorie
                        : '-'}
                    </td>
                    <td>{attributes.Check ? '✅' : ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          : <div>Pas d'opérations à afficher.</div>
        }
      </div>
    </Suspense>
  )
}

export default Operations;
