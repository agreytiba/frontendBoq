
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
    urlName: 'savedgrills',
    collectionName: 'grillData',
    Title: 'window Grills',
    pdfTitle:'Window_Grills_Boq',
    tableHeaders
  }
  return (
 <ReadBoq infoData={infoData}/>
  )
}

export default DataBoq
