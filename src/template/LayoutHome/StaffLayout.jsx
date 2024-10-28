import React from 'react'
import { Outlet } from 'react-router-dom'
import StaffHeader from '../../components/Staff-page/Staff-header/StaffHeader'
import StaffFooter from '../../components/Staff-page/Staff-footer/StaffFooter'

function StaffLayout() {
  return (
    <div>
      <div className='staff-header'>
        <StaffHeader/>
      </div>
      <div className='staff-body'>
        <Outlet/>
      </div>
      <div className='staff-footer'>
        <StaffFooter/>
      </div>
    </div>
  )
}

export default StaffLayout
