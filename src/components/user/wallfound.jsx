
import React from 'react'
import ReadBoq from '../ReadBoq'

const WallFound = () => {
  const tableHeaders = [
  'Material ID',
    'Unit',
    'Quantity',
     'Rate(Tsh)',
     'Amount'
]
  const infoData = {
    urlName: 'savedwallfoundations',
    collectionName: 'wallData',
    Title: 'Foundation Wall',
    pdfTitle:'Foundation_Wall_Boq',
    tableHeaders
  }
  return (
 <ReadBoq infoData={infoData}/>
  )
}

export default WallFound
