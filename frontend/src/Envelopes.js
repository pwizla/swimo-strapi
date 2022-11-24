import React, { useEffect, useState } from 'react';

function Envelopes () {
  /**
   * 1. fetch envelopes
   * 2. display a table for envelopes
   * 3. for each envelope, display name, total budget, and remaining budget
   * 4. remaining budget is calculated based on relations (develop reasoning)
   */

  const [error, setError ] = useState(null);
  const [envelopes, setEnvelopes] = useState([]);
  const [sumsPerCategory, setSumsPerCategory] = useState([]);

  function calculateSumForCategorie(categorie) {
    const budgets = envelopes.reduce((accumulator, currentValue) => ({
      ...accumulator,
      [currentValue.attributes.Categorie]: currentValue.attributes.Budget,
    }), {});
    /**
     * TODO: update by making this component aware of operations
     * Lift state up to MonthlyView parent component
     * see https://openclassrooms.com/en/courses/7132446-create-a-web-application-with-react-js/7208826-share-state-between-different-components
     */
    // const sums = operations.reduce((accumulator, currentValue) => ({
    //   ...accumulator,
    //   [currentValue.attributes.enveloppe.data.attributes.Categorie]: currentValue.attributes.Montant,
    // }), {});
    // console.log('sums', sums);
    return budgets[categorie];
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
                  <td>{calculateSumForCategorie(attributes.Categorie)}</td>
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