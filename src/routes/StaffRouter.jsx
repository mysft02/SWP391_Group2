import React from 'react'
import { Route, Routes } from 'react-router-dom'
import StaffLayout from '../template/LayoutHome/StaffLayout'
import DashBoardStaff from '../page/StaffPage/DashBoardStaff'
import Contact from '../components/Staff-page/Staff-header/contact/Contact'

function StaffRouter() {
  return (
    <Routes >
    <Route path="/" element={<StaffLayout/>}>
        <Route index element={<DashBoardStaff/>}/>
        <Route path="/contact" element={<Contact />} />
        </Route>
    </Routes>
  )
}

export default StaffRouter
