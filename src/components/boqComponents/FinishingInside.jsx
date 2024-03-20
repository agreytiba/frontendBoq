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
    collectionName: 'finishInData',
    TITLE: 'Finishings Inside',
    savedUrl: 'savedfinishIn',
   filterData:'finishIn',
    tableHeaders
  }
  return (
   <CreateBoq  infoData={infoData}/>
  )
}

export default BoqData