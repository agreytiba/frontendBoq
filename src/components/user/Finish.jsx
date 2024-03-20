
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
    urlName: 'savedfinishing',
    collectionName: 'finishData',
    Title: 'Finishing',
    pdfTitle:'Finishing_Boq',
    tableHeaders
  }
  return (
 <ReadBoq infoData={infoData}/>
  )
}

export default DataBoq
