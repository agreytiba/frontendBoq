
import ReadBoq from '../ReadBoq'

const FinishIn = () => {
  const tableHeaders = [
  'Material ID',
    'Unit',
    'Quantity',
     'Rate(Tsh)',
     'Amount'
]
  const infoData = {
    urlName: 'savedfinishIn',
    collectionName: 'finishInData',
    Title: 'Finishings Inside',
    pdfTitle:'Finishings_Inside_Boq',
    tableHeaders
  }
  return (
 <ReadBoq infoData={infoData}/>
  )
}

export default FinishIn
