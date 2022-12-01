import { React } from 'react';
import { format2Decimals } from '../utils/formatter';
import { calculateSumForCategorie } from '../utils/calculator';

const EnvelopeLine = ({ id, attributes, operations }) => (
  <tr key={id}>
  <td>{attributes.Categorie}</td>
  <td>{attributes.Budget}</td>
  <td className={`budget number ${(attributes.Budget + calculateSumForCategorie(operations, attributes.Categorie) < 0) ? 'number--negative' : ''}`}>
    {format2Decimals(attributes.Budget + calculateSumForCategorie(operations, attributes.Categorie))}
  </td>
</tr>
)

export default EnvelopeLine;