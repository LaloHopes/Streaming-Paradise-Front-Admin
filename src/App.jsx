import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import { UserProvider } from './contexts/UserContext'; 
import AdminTemplate from './templates/AdminTemplate';
import HomeComponent from "./components/HomeComponent/HomeComponent";
import LoginComponent from "./components/LoginComponent/LoginComponent";
import RegistroComponent from "./components/RegistroComponent/RegistroComponent";
import AboutComponent from "./components/AboutComponent/AboutComponent";
import CatalogoComponent from "./components/CatalogoComponent/CatalogoComponent";
import PaquetesComponent from "./components/PaquetesComponent/PaquetesComponent";
import PaypalPage from "./components/PaypalComponent/PaypalPage";
import UploadVideoComponent from "./components/UploadVideoComponent/UploadVideoComponent";
import AdminComponent from "./components/AdminComponent/AdminComponent";
import VideoPlayer from "./components/VideoPlayerComponent/VideoPlayerComponent";
import FooterComponent from "./components/FooterComponent/FooterComponent";

function App() {
  const [footerFlag, setFooterFlag] = useState(true);
  // const [navbarFlag, setNavbarFlag] = useState(true); // También puedes comentar este estado si no lo usas

  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/admin/*" element={<AdminTemplate />} />
          <Route
            path="*"
            element={
              <>
                {/* {navbarFlag && <NavbarComponent />} */} 
                <div>
                  <Routes>
                    <Route path="/" element={<HomeComponent />} />
                    <Route path="/login" element={<LoginComponent handleFooter={setFooterFlag} />} />
                    <Route path="/registro" element={<RegistroComponent handleFooter={setFooterFlag} />} />
                    <Route path="/paypalPage" element={<PaypalPage />} />
                    <Route path="/about" element={<AboutComponent />} />
                    <Route path="/upload" element={<UploadVideoComponent />} />
                    <Route path="/admin" element={<AdminComponent />} />
                    <Route path="/catalogo" element={<CatalogoComponent handleFooter={setFooterFlag} />} />
                    <Route
                      path="/video"
                      element={
                        <VideoPlayer videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
                      }
                    />
                    <Route path="/paquetes" element={<PaquetesComponent />} />
                  </Routes>
                </div>
                {footerFlag && <FooterComponent />}
              </>
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
