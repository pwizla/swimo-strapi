import React from "react";
import {
  useEffect,
  useState
} from 'react'

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
      .then(({ data }) => setOperations(data))
      .catch((error) => setError(error))
  }, [])

  if (error) {
    return <div>An error occured: {error.message}</div>;
  }

  return (
    <div>
      Liste d'opérations:
      <ul>
        {operations.map(({ id, Libelle }) => <li key={id}>{Libelle}</li>)}
      </ul>
    </div>
  )
}

export default Operations;