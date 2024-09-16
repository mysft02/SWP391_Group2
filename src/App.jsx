import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Layout from "./template/Layout";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import RestorePassword from "./components/RestorePassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<RestorePassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
