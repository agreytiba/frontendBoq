
import React from 'react'
import CreateBoq from '../CreateBoq'

const BoqData = () => {

    const tableHeaders = [
  'Material ID',
    'Unit',
    'Quantity',
     'Rate(Tsh)',
     'Amount'
]
  const infoData = {
    mainUrl: 'plumbing',
    collectionName: 'waterOutData',
    TITLE: 'Clean And sewage outside',
    savedUrl: 'savedwaterOut',
   filterData:'waterOut',
    tableHeaders
  }
  return (
   <CreateBoq  infoData={infoData}/>
  )
}

export default BoqData
