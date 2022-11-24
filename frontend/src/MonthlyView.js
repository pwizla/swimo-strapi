import React from 'react';
import Operations from './Operations.js'
import Envelopes from './Envelopes.js'

function MonthlyView () {
  return (
    <div className="monthly-view">
      <Operations />
      <Envelopes />
    </div>
  )
}

export default MonthlyView;