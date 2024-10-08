import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MemberLayout from '../template/LayoutHome/MemeberLayout'; // Kiểm tra tên component đúng không
import MemberPage from '../page/MemberPage';
import Contact from '../components/Customer-Page/Customer-Header/contact/Contact';
import NewsPage from '../page/NewsPage/NewsPage';
import CompetitionPage from '../page/CompetitionPage/CompetitionPage';
import DashBoardPage from '../page/DashBoardPage/DashBoardPage';

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
