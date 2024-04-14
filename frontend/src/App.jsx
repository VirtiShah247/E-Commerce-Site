import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import { Home } from './pages/Home'
import { Navbar } from './components/Navbar'
// import { Logo } from './components/Logo'
import { Footer } from './components/Footer';
import { AuthProvide } from './context/AuthProvide'
import { GeoLocation } from './components/GeoLocation';
// import './App.css'
// import Login from './pages/Login'


function App() {
  return (
    <>
      {/* <Logo /> */}
      <BrowserRouter>
        <AuthProvide>
          <GeoLocation />
          <div className="mainBody grid grid-rows-[auto_1fr_auto]">
            <Navbar />
            <Routes>
              <Route index path='/' element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
            <Footer />
          </div>
          {/* <MobileSidebar openMenu={openMenu} handleOpenMenu={setOpenMenu}/> */}
        </AuthProvide>
      </BrowserRouter>


    </>
  )
}

export default App
