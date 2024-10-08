import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LayoutHome from '../template/LayoutHome/LayoutHome'
import GuestHomePage from '../page/GuestHomePage'
import Contact from '../components/Guest-HomePage/Guest-Header/contact/Contact'
import SignIn from '../components/Guest-HomePage/SignIn/SignIn'
import SignUp from '../components/Guest-HomePage/SignUp/SignUp'
import RestorePassword from '../components/Guest-HomePage/Restorepassword/RestorePassword'
import PrivateRoutes from './PrivateRoutes'
import MemberRouter from './MemberRouter'
import NewsPage from '../page/NewsPage/NewsPage'
import { useUser } from '../data/UserContext'
import CompetitionPage from '../page/CompetitionPage/CompetitionPage'


function AppRouter() {
  const { user } = useUser(); // Lấy thông tin user từ context

  return (
    <BrowserRouter>
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
        {/* Các route khác */}
      </Routes>
    </BrowserRouter>
  );
}
export default AppRouter;
