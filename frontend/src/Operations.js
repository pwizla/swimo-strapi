import React, { Suspense  } from 'react';
import { months } from './months';

function Operations({ operations, currentMonthName, getCurrentMonth, addMonth, substractMonth }) {

  return (
    <Suspense fallback={"Loading…"}>
      {/* TODO: add beautiful loader */}
      <div className="operations">
        <button className="button button__month" onClick={() => substractMonth()}>{'<< Mois précédent'}</button>
        <button className="button button__month" title={`${months[new Date().getMonth()].name} ${new Date().getFullYear()}`} onClick={() => getCurrentMonth()}>Mois en cours</button>
        <button className="button button__month" onClick={() => addMonth()}>{'Mois suivant >>'}</button>
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
