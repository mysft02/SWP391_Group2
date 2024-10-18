import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LayoutHome from '../template/LayoutHome/LayoutHome'
import Contact from '../components/Guest-HomePage/Guest-Header/contact/Contact'
import SignIn from '../components/Guest-HomePage/SignIn/SignIn'
import SignUp from '../components/Guest-HomePage/SignUp/SignUp'
import RestorePassword from '../components/Guest-HomePage/Restorepassword/RestorePassword'
import PrivateRoutes from './PrivateRoutes'
import MemberRouter from './MemberRouter'
import { useUser } from '../data/UserContext'
import CompetitionPage from '../page/CompetitionPage/CompetitionPage'
import AdminRouter from './AdminRouter'
import ManagerRouter from './ManagerRouter'
import GuestHomePage from '../page/GuestPage/GuestHomePage'
import NewsPage from '../page/CustomerPage/NewsPage/NewsPage'


function AppRouter() {
  const { user } = useUser(); // Lấy thông tin user từ context

  return (
      <Routes>
        <Route path="/" element={<LayoutHome />}>
          {/* Kiểm tra trạng thái đăng nhập */}
          <Route index element={user ? <Navigate to="/member" /> : <GuestHomePage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="competition" element={<CompetitionPage/>} />

          <Route path="contact" element={<Contact />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<RestorePassword />} />
        </Route>
        {/* Các route yêu cầu phân quyền */}
        <Route element={<PrivateRoutes requiredRoles={['R1']} />}>
          <Route path="/member/*" element={<MemberRouter />} />
        </Route>
        <Route element={<PrivateRoutes requiredRoles={['R4']} />}>
          <Route path="/manager/*" element={<ManagerRouter/>} />
        </Route>
        <Route element={<PrivateRoutes requiredRoles={['R5']} />}>
          <Route path="/admin/*" element={<AdminRouter />} />
        </Route>
        {/* Các route khác */}
      </Routes>
  );
}
export default AppRouter;
