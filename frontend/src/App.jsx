import { useState } from 'react';
import './App.css'
import { Navbar } from './components/Navbar'
import Login from './pages/Login'
import { MobileSidebar } from './components/MobileSidebar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer';

function App() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <BrowserRouter>
        <div className="mainBody grid grid-rows-[auto_1fr_auto]">
          <Navbar openMenu={openMenu} handleOpenMenu={setOpenMenu} />
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
          <Footer />
        </div>
        <MobileSidebar openMenu={openMenu} />

      </BrowserRouter>


    </>
  )
}

export default App
