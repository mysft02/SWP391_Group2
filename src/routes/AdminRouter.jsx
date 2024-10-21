import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLayout from '../template/LayoutHome/AdminLayout'
import DashBoardAdmin from '../page/AdminPage/DashBoardAdmin'
import Contact from '../components/Admin-page/Admin-header/contact/Contact'

function AdminRouter() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<DashBoardAdmin/>}/>
        <Route path="/contact" element={<Contact />} />


      </Route>
    </Routes>
  )
}

export default AdminRouter
