import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MemberLayout from '../template/LayoutHome/MemeberLayout'; // Kiểm tra tên component đúng không
import MemberPage from '../page/CustomerPage/MemberPage';
import Contact from '../components/Customer-Page/Customer-Header/contact/Contact';
import CompetitionPage from '../page/CompetitionPage/CompetitionPage';
import NewsPage from '../page/CustomerPage/NewsPage/NewsPage';
import DashBoardPage from '../page/CustomerPage/DashBoardPage/DashBoardPage';

function MemberRouter() {
  return (
    <Routes>
      <Route path="/" element={<MemberLayout />}>
        {/* Các trang không yêu cầu phân quyền */}
        <Route index element={<MemberPage />} />
        <Route path="/news" element={<NewsPage/>} />
        <Route path="competition" element={<CompetitionPage/>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<DashBoardPage/>} />

      </Route>
    </Routes>
  );
}

export default MemberRouter;
