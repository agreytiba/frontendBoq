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
    collectionName: 'frameData',
    TITLE: '1.Door Frames',
    savedUrl: 'savedframes',
   filterData:'frame',
    tableHeaders
  }
  return (
   <CreateBoq  infoData={infoData}/>
  )
}

export default BoqData