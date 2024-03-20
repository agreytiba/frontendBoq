
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
    urlName: 'savedconcretes',
    collectionName: 'concreteData',
    Title: 'Over Site Concrete(jamvi) Boq',
    pdfTitle:'Site_Concrete_Boq',
    tableHeaders
  }
  return (
 <ReadBoq infoData={infoData}/>
  )
}

export default Wall
