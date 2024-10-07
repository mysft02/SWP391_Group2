import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LayoutHome from '../template/LayoutHome/LayoutHome'
import GuestHomePage from '../page/GuestHomePage'
import Contact from '../components/Guest-HomePage/Guest-Header/contact/Contact'
import SignIn from '../components/Guest-HomePage/SignIn/SignIn'
import SignUp from '../components/Guest-HomePage/SignUp/SignUp'
import RestorePassword from '../components/Guest-HomePage/Restorepassword/RestorePassword'
import PrivateRoutes from './PrivateRoutes'
import MemberRouter from './MemberRouter'
import NewsPage from '../page/NewsPage/NewsPage'


function AppRouter() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutHome />}>
            {/* Các trang không yêu cầu phân quyền */}
            <Route index element={<GuestHomePage />} />
            <Route path="news" element={<NewsPage/>} />
            <Route path="contact" element={<Contact />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/forgot-password" element={<RestorePassword />} />
          </Route>
          
          {/* Các trang yêu cầu phân quyền */}
          <Route element={<PrivateRoutes requiredRoles={['R1']} />}> 
            <Route path="/member/*" element={<MemberRouter />} />
          </Route>
          
          <Route element={<PrivateRoutes requiredRoles={['R5']} />}>
            {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
          </Route>

          <Route element={<PrivateRoutes requiredRoles={['staff']} />}>
            {/* <Route path="/staff-dashboard" element={<StaffDashboard />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default AppRouter;
