
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
    urlName: 'savedpvcs',
    collectionName: 'pvcData',
    Title: 'Pvc Over hang',
    pdfTitle:'Pvc_Overhang_Boq',
    tableHeaders
  }
  return (
 <ReadBoq infoData={infoData}/>
  )
}

export default DataBoq
