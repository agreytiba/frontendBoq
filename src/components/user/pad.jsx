
import React from 'react'
import ReadBoq from '../ReadBoq'

const Pad = () => {
  const tableHeaders = [
  'Material ID',
    'Unit',
    'Quantity',
     'Rate(Tsh)',
     'Amount'
]
  const infoData = {
    urlName: 'savedpads',
    collectionName: 'padData',
    Title: 'Pad Foundation And Columns Boq',
    pdfTitle:'Pad_Foundation_Boq',
    tableHeaders
  }
  return (
 <ReadBoq infoData={infoData}/>
  )
}

export default Pad
