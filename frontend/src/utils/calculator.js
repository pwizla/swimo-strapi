function calculateSumForCategorie(operations, categoryName) {
  const sums = operations.reduce((accumulator, currentValue) => {
    const name = currentValue.attributes.enveloppe.data.attributes.Categorie;
    return {
      ...accumulator,
      [name]: (accumulator[name] ?? 0) + currentValue.attributes.Montant,
  }}, {});

  return sums.hasOwnProperty(categoryName) ? sums[categoryName] : 0;
}

export { calculateSumForCategorie }