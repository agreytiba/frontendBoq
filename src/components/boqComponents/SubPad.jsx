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
    mainUrl: 'substructure',
    collectionName: 'psdata',
    TITLE: 'pad foundation',
    savedUrl: 'savedpads',
   filterData:'pad',
    tableHeaders
  }
  return (
   <CreateBoq  infoData={infoData}/>
  )
}

export default BoqData