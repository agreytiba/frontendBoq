
import React from 'react'
import ReadBoq from '../ReadBoq'

const pre = () => {
  const tableHeaders = [
  'Material ID',
    'Unit',
    'Quantity',
     'Rate(Tsh)',
     'Amount'
]
  const infoData = {
    urlName: 'savedpres',
    collectionName: 'preData',
    Title: 'Preliminaries Boq',
    pdfTitle:'preliminariesBoq',
    tableHeaders
  }
  return (
 <ReadBoq infoData={infoData}/>
  )
}

export default pre
