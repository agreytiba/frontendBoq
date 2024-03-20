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
    mainUrl: 'tiles',
    collectionName: 'tileData',
    TITLE: 'Tiles',
    savedUrl: 'savedtiles',
   filterData:'',
    tableHeaders
  }
  return (
   <CreateBoq  infoData={infoData}/>
  )
}

export default BoqData