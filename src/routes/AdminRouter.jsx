import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLayout from '../template/LayoutHome/AdminLayout'
import Contact from '../components/Admin-page/Admin-header/contact/Contact'

function AdminRouter() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        {/* Các trang không yêu cầu phân quyền
        <Route index element={<MemberPage />} />
        <Route path="/news" element={<NewsPage/>} />
        <Route path="competition" element={<CompetitionPage/>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<DashBoardPage/>} /> */}

      </Route>
    </Routes>
  )
}

export default AdminRouter
