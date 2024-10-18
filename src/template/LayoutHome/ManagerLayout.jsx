import React from 'react'
import ManagerHeader from '../../components/Manager-page/Manager-header/ManagerHeader'
import { Outlet } from 'react-router-dom'
import ManagerFooter from '../../components/Manager-page/Manager-footer/ManagerFooter'

function ManagerLayout() {
  return (
    <div>
      <div className='manager-header'>
        <ManagerHeader/>
      </div>
      <div className='manager-body'>
        <Outlet/>
      </div>
      <div className='manager-footer'>
        <ManagerFooter/>
      </div>      
    </div>
  )
}

export default ManagerLayout
