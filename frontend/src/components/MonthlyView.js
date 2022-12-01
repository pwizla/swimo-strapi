import React, { useState, useEffect } from 'react';
import Operations from './Operations.js'
import { months } from '../utils/months';
import { formatMonthNumber } from '../utils/formatter.js';
import { fetcher } from '../utils/fetcher.js';
import Envelopes from './Envelopes.js'
const qs = require('qs');

function MonthlyView () {
  // const [error, setError] = useState(null);
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
    fetcher(`http://localhost:1337/api/operations?${query}`, setOperations)
  }, [query])

  // if (error) {
  //   return <div>Une erreur s'est produite: <span className="error">{error.message}</span></div>;
  // }
  
  const currentMonthName = `${months[selectedMonthNumber - 1].name} ${selectedYear}`;

  return (
    <div className="monthly-view">
      <Operations
        operations={operations}
        currentMonthName={currentMonthName}
        setSelectedMonthNumber={setSelectedMonthNumber}
        substractMonth={substractMonth}
        addMonth={addMonth}
        getCurrentMonth={getCurrentMonth}
        setOperations={setOperations}/>
      <Envelopes
        operations={operations}
      />
    </div>
  )
}

export default MonthlyView;