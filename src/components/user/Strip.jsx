
import React from 'react'
import ReadBoq from '../ReadBoq'

const Strip = () => {
  const tableHeaders = [
  'Material ID',
    'Unit',
    'Quantity',
     'Rate(Tsh)',
     'Amount'
]
  const infoData = {
    urlName: 'savedStrips',
    collectionName: 'stripData',
    Title: 'Strip Foundation Boq',
    pdfTitle:'Strip_Foundation_Boq',
    tableHeaders
  }
  return (
 <ReadBoq infoData={infoData}/>
  )
}

export default Strip
