function fetcher (url, stateHandler) {
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then( ({ data }) => { 
      stateHandler(data)
    })
    // .catch((error) => setError(error))
}

export { fetcher }