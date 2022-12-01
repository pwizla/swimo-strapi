function formatMonthNumber(monthNumber) {
  const formatted = monthNumber < 10 
    ? `0${monthNumber.toString()}` 
    : `${monthNumber.toString()}`
  return formatted
}

function format2Decimals (number) {
  return ((number) % 1) !== 0
  ? (number).toFixed(2)
  : (number)
}

export { formatMonthNumber, format2Decimals }