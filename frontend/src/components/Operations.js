import React, { Suspense  } from 'react';
import { months } from '../utils/months';
import OperationLine from './OperationLine';

// type props
const Operations = ({ operations, currentMonthName, getCurrentMonth, onNextMonth, substractMonth }) => (
  <Suspense fallback={"Loading…"}>
    {/* TODO: add beautiful loader */}
    <div className="operations">
      <button className="button button__month" onClick={() => substractMonth()}>{'<< Mois précédent'}</button>
      <button className="button button__month" title={`${months[new Date().getMonth()].name} ${new Date().getFullYear()}`} onClick={() => getCurrentMonth()}>Mois en cours</button>
      <button className="button button__month" onClick={() => onNextMonth()}>{'Mois suivant >>'}</button>
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
                <OperationLine
                  key={id}
                  id={id}
                  attributes={attributes}
                />
              ))}
            </tbody>
          </table>
        : <div>Pas d'opérations à afficher.</div>
      }
    </div>
  </Suspense>
)

export default Operations;
