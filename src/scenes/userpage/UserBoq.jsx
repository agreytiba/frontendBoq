import React from 'react'
import Pre from '../../components/user/pre'
import Wall from '../../components/user/wall'
import Plaster from '../../components/user/Plaster'
import Tile from '../../components/user/Tile'
import Roof from '../../components/user/Roof'
import Electric from '../../components/user/Electric'
import Gypsum from '../../components/user/Gysum'
import Pvc from '../../components/user/Pvc'

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
      <Pvc/>
    </div>
  )
}

export default userBoq