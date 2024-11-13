import React from 'react'
import RefeerFooter from '../../components/Referee-page/Referee-footer/RefereeFooter'
import RefeerHeader from '../../components/Referee-page/Referee-header/RefereeHeader'
import { Outlet } from 'react-router-dom'

function RefereeLayout() {
  return (
    <div>
        <RefeerHeader/>

      <div className='Refeer-body'>
        <Outlet/>
      </div>
        <RefeerFooter/>

    </div>
  )
}

export default RefereeLayout
