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
    mainUrl: 'doors',
    collectionName: 'shutterData',
    TITLE: '1.Door Shutters',
    savedUrl: 'savedshutters',
   filterData:'shutter',
    tableHeaders
  }
  return (
   <CreateBoq  infoData={infoData}/>
  )
}

export default BoqData