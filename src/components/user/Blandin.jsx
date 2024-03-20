
import React from 'react'
import ReadBoq from '../ReadBoq'

const Blandin = () => {
  const tableHeaders = [
  'Material ID',
    'Unit',
    'Quantity',
     'Rate(Tsh)',
     'Amount'
]
  const infoData = {
    urlName: 'savedblandinside',
    collectionName: 'insideData',
    Title: 'Blandering inside',
    pdfTitle:'Blanderin_inside_Boq',
    tableHeaders
  }
  return (
 <ReadBoq infoData={infoData}/>
  )
}

export default Blandin
