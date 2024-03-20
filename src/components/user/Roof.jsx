
import React from 'react'
import ReadBoq from '../ReadBoq'

const Roofing = () => {
  const tableHeaders = [
  'Material ID',
    'Unit',
    'Quantity',
     'Rate(Tsh)',
     'Amount'
]
  const infoData = {
    urlName: 'savedroofing',
    collectionName: 'roofData',
    Title: 'Roofing',
    pdfTitle:'Roofing_Boq',
    tableHeaders
  }
  return (
 <ReadBoq infoData={infoData}/>
  )
}

export default Roofing
