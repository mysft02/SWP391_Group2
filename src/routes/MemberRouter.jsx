import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MemberLayout from '../template/LayoutHome/MemeberLayout'; // Kiểm tra tên component đúng không
import MemberPage from '../page/CustomerPage/MemberPage';
import Contact from '../components/Customer-Page/Customer-Header/contact/Contact';
import CompetitionPage from '../page/CompetitionPage/CompetitionPage';
import NewsPage from '../page/CustomerPage/NewsPage/NewsPage';
import PaymentCustomer from '../components/Customer-Page/Customer-Body/Payment/paymentCustomer';
import DetailCompetition from '../components/Competition/DetailCompetition/DetailCompetition';
import BetCompetition from '../components/Competition/BetCompetition/BetCompetition';
import CustomeProfile from '../components/Customer-Page/Customer-Body/CustomeProfile/CustomeProfile';
import CustomerFish from '../components/Customer-Page/Customer-Body/CustomerFish/CustomerFish';

function MemberRouter() {
  return (
    <Routes>
      <Route path="/" element={<MemberLayout />}>
        {/* Các trang không yêu cầu phân quyền */}
        <Route index element={<MemberPage />} />
        <Route path="/news" element={<NewsPage/>} />
        <Route path="competition" element={<CompetitionPage/>} />
        <Route path="detail-competition" element={<DetailCompetition/>} />
        <Route path="/bet-competition" element={<BetCompetition/>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/customerProfile" element={<CustomeProfile/>} />
        <Route path="/fish-koi" element={<CustomerFish/>} />
        <Route path="/payment" element={<PaymentCustomer/>} />
        


      </Route>
    </Routes>
  );
}

export default MemberRouter;
