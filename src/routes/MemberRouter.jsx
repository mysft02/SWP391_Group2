import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MemberLayout from '../template/LayoutHome/MemeberLayout'; // Kiểm tra tên component đúng không
import MemberPage from '../page/MemberPage';
import Contact from '../components/Customer-Page/Customer-Header/contact/Contact';
import NewsPage from '../page/NewsPage/NewsPage';

function MemberRouter() {
  return (
    <Routes>
      <Route path="/" element={<MemberLayout />}>
        {/* Các trang không yêu cầu phân quyền */}
        <Route index element={<MemberPage />} />
        <Route path="/news" element={<NewsPage/>} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default MemberRouter;
