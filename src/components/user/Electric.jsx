
import React from 'react'
import ReadBoq from '../ReadBoq'

const DataBoq = () => {
  const tableHeaders = [
  'Material ID',
    'Unit',
    'Quantity',
     'Rate(Tsh)',
     'Amount'
]
  const infoData = {
    urlName: 'savedelectrical',
    collectionName: 'electricData',
    Title: 'Electrical installation boq',
    pdfTitle:'Electrical_installation_Boq',
    tableHeaders
  }
  return (
 <ReadBoq infoData={infoData}/>
  )
}

export default DataBoq
