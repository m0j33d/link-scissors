import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { lazy } from "react";

//Pages
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Shortener = lazy(() => import("./pages/Shortener"));
const PageNotFound = lazy(() => import("./pages/404"));

const App: React.FC = () => {
  return (
    <Router>
       <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Auth routes */}
          <Route path="/shortner" element={<Shortener />} />

          {/* No match */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
