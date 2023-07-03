import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { Suspense, lazy } from "react";

//Pages
const Home = lazy(() => import("./pages/Home"));
const Shortener = lazy(() => import("./pages/Shortener"));
const PageNotFound = lazy(() => import("./pages/404"));

const App: React.FC = () => {
  return (
    <Router>
       <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Auth routes */}
          <Route path="/short" element={<Shortener />} />

          {/* No match */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
