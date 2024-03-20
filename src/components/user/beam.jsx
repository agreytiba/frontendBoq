
import React from 'react'
import ReadBoq from '../ReadBoq'

const Wall = () => {
  const tableHeaders = [
  'Material ID',
    'Unit',
    'Quantity',
     'Rate(Tsh)',
     'Amount'
]
  const infoData = {
    urlName: 'savedbeams',
    collectionName: 'beamData',
    Title: 'Ground Beam',
    pdfTitle:'Ground_Beam_Boq',
    tableHeaders
  }
  return (
 <ReadBoq infoData={infoData}/>
  )
}

export default Wall
