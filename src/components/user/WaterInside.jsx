import React from 'react'
import ReadBoq from '../ReadBoq'

const WaterInside = () => {
  const tableHeaders = [
  'Material ID',
    'Unit',
    'Quantity',
     'Rate(Tsh)',
     'Amount'
]
  const infoData = {
    urlName: 'savedwaterIn',
    collectionName: 'waterInsideData',
    Title: 'Clean water inside',
    pdfTitle:'Water_Inside_Boq',
    tableHeaders
  }
  return (
 <ReadBoq infoData={infoData}/>
  )
}

export default WaterInside
