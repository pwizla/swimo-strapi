import React, { useEffect, useState } from 'react';
import { fetcher } from '../utils/fetcher';
import EnvelopeLine from './EnvelopeLine';

// type state & api & props
function Envelopes ( { operations }) {
  // const [error, setError ] = useState(null);
  const [envelopes, setEnvelopes] = useState([]);

  useEffect(() => {
    fetcher('http://localhost:1337/api/enveloppes', setEnvelopes)
  }, [])

  // if (error) {
  //   return <div>Une erreur s'est produite: <span className="error">{error.message}</span></div>;
  // }

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
                <EnvelopeLine
                  key={id}
                  attributes={attributes}
                  operations={operations}
                />
              ))}
            </tbody>
        </table>
        : "Pas d'enveloppes de budget définies."
      }
    </div>
  )
}

export default Envelopes;