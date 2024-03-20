
import React from 'react'
import ReadBoq from '../ReadBoq'

const Walling = () => {
  const tableHeaders = [
  'Material ID',
    'Unit',
    'Quantity',
     'Rate(Tsh)',
     'Amount'
]
  const infoData = {
    urlName: 'savedwalling',
    collectionName: 'wallData',
    Title: 'Walling',
    pdfTitle:'Walling_Boq',
    tableHeaders
  }
  return (
 <ReadBoq infoData={infoData}/>
  )
}

export default Walling
