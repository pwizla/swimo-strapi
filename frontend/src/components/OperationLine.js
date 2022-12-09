import { React } from 'react';

// type props
const OperationLine = ({ id, attributes }) => (
  <tr key={id}>
    <td>{attributes.Libelle}</td>
    <td>{attributes.Date}</td>
    <td className={`number ${attributes.Montant > 0 ? "number--positive" : "number--negative"}`}>
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
)

export default OperationLine;