import React from 'react'
import ReadBoq from '../ReadBoq'

const WaterOutside = () => {
  const tableHeaders = [
  'Material ID',
    'Unit',
    'Quantity',
     'Rate(Tsh)',
     'Amount'
]
  const infoData = {
    urlName: 'savedwaterOut',
    collectionName: 'waterOutData',
    Title: 'Clean  and Sewage water outside',
    pdfTitle:'Water_Outside_Boq',
    tableHeaders
  }
  return (
 <ReadBoq infoData={infoData}/>
  )
}

export default WaterOutside