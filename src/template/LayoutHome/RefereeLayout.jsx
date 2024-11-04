import React from 'react'
import RefeerFooter from '../../components/Referee-page/Referee-footer/RefereeFooter'
import RefeerHeader from '../../components/Referee-page/Referee-header/RefereeHeader'
import { Outlet } from 'react-router-dom'

function RefereeLayout() {
  return (
    <div>
      <div className='Refeer-header'>
        <RefeerHeader/>
      </div>
      <div className='Refeer-body'>
        <Outlet/>
      </div>
      <div className='Refeer-footer'>
        <RefeerFooter/>
      </div>
    </div>
  )
}

export default RefereeLayout
