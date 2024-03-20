import React from 'react'
import ReadBoq from '../ReadBoq'

const SewageIn = () => {
  const tableHeaders = [
  'Material ID',
    'Unit',
    'Quantity',
     'Rate(Tsh)',
     'Amount'
]
  const infoData = {
    urlName: 'savedsewageIn',
    collectionName: 'sewageInData',
    Title: 'Sewage Inside',
    pdfTitle:'Sewage_Inside_Boq',
    tableHeaders
  }
  return (
 <ReadBoq infoData={infoData}/>
  )
}

export default SewageIn
