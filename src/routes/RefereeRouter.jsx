import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RefereeLayout from '../template/LayoutHome/RefereeLayout'
import Competition from '../components/Competition/Competition/Competition'
import Contact from '../components/Referee-page/Referee-header/contact/Contact'

function RefereeRouter() {
  return (
    <div>
    <Routes >
        <Route path="/" element={<RefereeLayout/>}>
            <Route index element={<Competition/>}/>
            <Route path="/contact" element={<Contact />} />
        </Route>
    </Routes>
    </div>
  )
}

export default RefereeRouter
