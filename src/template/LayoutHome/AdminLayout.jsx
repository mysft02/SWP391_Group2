import React from 'react'
import AdminHeader from '../../components/Admin-page/Admin-header/AdminHeader'
import { Outlet } from 'react-router-dom'
import AdminFooter from '../../components/Admin-page/Admin-footer/AdminFooter'

function AdminLayout() {
  return (
    <div>
        <div className='admin-header'>
            <AdminHeader/>
        </div>
        <div className='admin-body'>
            <Outlet/>
        </div>
        <div className='admin-footer'>
            <AdminFooter/>
        </div>
      
    </div>
  )
}

export default AdminLayout
