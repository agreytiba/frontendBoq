
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
    urlName: 'savedpanels',
    collectionName: 'panelData',
    Title: 'Aluminium panels',
    pdfTitle:'Aluminium_panels_Boq',
    tableHeaders
  }
  return (
 <ReadBoq infoData={infoData}/>
  )
}

export default DataBoq
