import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Assets/Style/Login.css";
import "./Assets/Style/Landing.css";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import { Toaster } from "react-hot-toast";

import Loader from "./Components/Loader";

// Added Lazy loading, Routing and 2 Pages - Login and Landing page (countries page)

const Login = lazy(() => import("./Components/Login"));
const LandingPage = lazy(() => import("./Components/Landing"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
       <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/landing" element={<LandingPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

// ____________________________ L1 - MT - React Developer - Vishnudas M V _________________________
// Vishnudas MV