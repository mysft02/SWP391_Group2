import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ManagerLayout from '../template/LayoutHome/ManagerLayout'
import Contact from '../components/Manager-page/Manager-header/contact/Contact'
import DashBoardManager from '../page/ManagerPage/DashBoardManager'

function ManagerRouter() {
  return (
    <div>
    <Routes>
      <Route path="/" element={<ManagerLayout/>}>
        {/* Các trang không yêu cầu phân quyền */}
        <Route index element={<DashBoardManager/>} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
    </div>
  )
}

export default ManagerRouter
