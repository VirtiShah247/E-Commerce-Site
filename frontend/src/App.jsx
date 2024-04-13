import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import { Home } from './pages/Home'
import { Navbar } from './components/Navbar'
// import { Logo } from './components/Logo'
import { MobileSidebar } from './components/MobileSidebar';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { AuthProvide } from './context/AuthProvide'
import { GeoLocation } from './components/GeoLocation';
// import './App.css'
// import Login from './pages/Login'


function App() {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <>
      {/* <Logo /> */}
      <BrowserRouter>
        <AuthProvide>
          <GeoLocation />
          <div className="mainBody grid grid-rows-[auto_1fr_auto]">
            <Navbar openMenu={openMenu} handleOpenMenu={setOpenMenu} />
            <LandingPage />
            <Routes>
              <Route index path='/' element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
            <Footer />
          </div>
          <MobileSidebar openMenu={openMenu} />
        </AuthProvide>
      </BrowserRouter>


    </>
  )
}

export default App
