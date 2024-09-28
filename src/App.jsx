import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutHome from "./template/LayoutHome/LayoutHome";
import SignIn from "./components/Guest-HomePage/SignIn/SignIn";
import SignUp from "./components/Guest-HomePage/SignUp/SignUp";
import RestorePassword from "./components/Guest-HomePage/Restorepassword/RestorePassword";
import GuestHomePage from './page/GuestHomePage';
import Contact from './components/Guest-HomePage/Guest-Header/contact/Contact';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutHome />}>
          <Route index element = {<GuestHomePage/>}/>
          <Route path="contact" element={<Contact/>} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<RestorePassword/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
