import React, { useEffect, useState } from 'react';

function Envelopes ( { operations }) {
  const [error, setError ] = useState(null);
  const [envelopes, setEnvelopes] = useState([]);

  function calculateSumForCategorie(categoryName) {
    const sums = operations.reduce((accumulator, currentValue) => {
      const name = currentValue.attributes.enveloppe.data.attributes.Categorie;
      return {
        ...accumulator,
        [name]: (accumulator[name] ?? 0) + currentValue.attributes.Montant,
    }}, {});

    return sums.hasOwnProperty(categoryName) ? sums[categoryName] : 0;
  }

  useEffect(() => {
    fetch('http://localhost:1337/api/enveloppes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then( ({ data }) => {
        setEnvelopes(data)
      })
      .catch((error) => setError(error))
  }, [])

  if (error) {
    return <div>Une erreur s'est produite: <span className="error">{error.message}</span></div>;
  }

  return (
    <div className="envelopes">
      <h2>Enveloppes</h2>
      { envelopes && envelopes.length > 0 
        ? <table
            cellPadding="10px"
            rules="groups"
            className="enveloppes-table">
            <thead>
              <tr>
                <th>Catégorie</th>
                <th>Budget</th>
                <th>Restant</th>
              </tr>
            </thead>
            <tbody>
              {envelopes.map(({ id, attributes }) => (
                <tr key={id}>
                  <td>{attributes.Categorie}</td>
                  <td>{attributes.Budget}</td>
                  <td className={`budget number ${(attributes.Budget + calculateSumForCategorie(attributes.Categorie) < 0) ? 'number--negative' : ''}`}>
                    {attributes.Budget + calculateSumForCategorie(attributes.Categorie)}
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
        : "Pas d'enveloppes de budget définies."
      }
    </div>
  )
}

export default Envelopes;