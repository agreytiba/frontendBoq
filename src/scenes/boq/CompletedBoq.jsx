import React from 'react'
import SavedPreList from '../../components/boqComponents/SavedPreList'
import { Box } from '@mui/material'
import SavedRoofingList from '../../components/UserBoq/SavedRoofingList'
import SavedWallingList from '../../components/UserBoq/SavedWallingList'
import SavedGypsumList from '../../components/UserBoq/SavedGypsumList'
import SavedPlasteringList from '../../components/UserBoq/SavedPlasteringList'
import SavedElectricalList from '../../components/UserBoq/SavedElectricalList'
const CompletedBoq = () => {
  return (
      <Box>
      <SavedPreList />
      <SavedRoofingList />
      <SavedWallingList />
      <SavedGypsumList />
      <SavedPlasteringList />
      <SavedElectricalList/>
    </Box>
  )
}

export default CompletedBoq