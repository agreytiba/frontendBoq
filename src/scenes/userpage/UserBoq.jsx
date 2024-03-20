import React from 'react'
import Pre from '../../components/user/pre'
import Wall from '../../components/user/walling'
import Plaster from '../../components/user/Plaster'
import Tile from '../../components/user/Tile'
import Roof from '../../components/user/Roof'
import Electric from '../../components/user/Electric'
import Gypsum from '../../components/user/Gysum'
import Pvc from '../../components/user/Pvc'
import Blinding from '../../components/user/blinding'
import { Typography,Box } from '@mui/material'
import Strip from '../../components/user/Strip'
import Pad from '../../components/user/pad'
import WallFound from '../../components/user/wallfound'
import Beams from '../../components/user/beam'
import Concrete from '../../components/user/Concerate'
import BlanderingInside from '../../components/boqComponents/BlandInside'
import BlanderingOutside from '../../components/boqComponents/BlandOutside'
import Blandin from '../../components/user/Blandin'
import Blandout from '../../components/user/BlandOut'
import Skimin from '../../components/user/Skimin'
import Skimout from '../../components/user/Skimout'
import Grills from '../../components/user/grills'
import Panels from '../../components/user/panel'
import Shutter from '../../components/user/Shutter'
import Frame from '../../components/user/Frame'

const userBoq = () => {
  return (
    <div>
      <Pre />
      <Wall />
      <Plaster />
      <Tile />
      <Roof />
      <Electric />
      <Gypsum />
      <Pvc />
      <Box marginY={"20px"}>
      <Typography align='center' variant='h3'>SUBSTRUCTURE</Typography>
      <Blinding />
        <Strip />
        <Pad />
        <WallFound />
        <Beams />
        <Concrete/>
      </Box>
      <Box marginY={"20px"}>
      <Typography align='center' variant='h3'>BLANDERING</Typography>
        <Blandin />
        <Blandout/>
      </Box>
      <Box marginY={"20px"}>
      <Typography align='center' variant='h3'>WAll SKIMMING</Typography>
        <Skimin />
        <Skimout/>
      </Box>
      <Box marginY={"20px"}>
      <Typography align='center' variant='h3'>WINDOWS</Typography>
        <Grills />
        <Panels/>
      </Box>
      <Box marginY={"20px"}>
      <Typography align='center' variant='h3'>DOORS</Typography>
        <Shutter />
        <Frame/>
      </Box>
    </div>
  )
}

export default userBoq