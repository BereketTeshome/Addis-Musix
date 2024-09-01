import Footer from "./components/Footer";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Suspense } from "react";
import "./App.css";
import MainPage from "./pages/MainPage";
import SignIn from "./pages/SignIn";
import Registration from "./pages/Registration";
import { Global, css } from "@emotion/react";

function App() {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/register" || location.pathname === "/signIn";

  return (
    <>
      <Global
        styles={css`
          body {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          .container {
            max-width: 1535px;
            margin: 0 auto;
          }
        `}
      />
      {!isAuthPage && <Navbar />}
      <Suspense fallback={<Loader />}>
        <div className="container">
          <Routes>
            <Route path="*" element={<MainPage />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/register" element={<Registration />} />
          </Routes>
        </div>
      </Suspense>
      {!isAuthPage && <Footer />}
    </>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;
