import { useState } from 'react';
import './App.css'
import { Navbar } from './components/Navbar'
import Login from './pages/Login'
import { MobileSidebar } from './components/MobileSidebar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
     <div className={"MainBody"}>
      <BrowserRouter>
        <Navbar openMenu={openMenu} handleOpenMenu={setOpenMenu}/>
        <Routes>
          <Route path="/login" element={<Login />}/>
        </Routes>
      </BrowserRouter>
      </div>
    <MobileSidebar openMenu={openMenu}/>
     

    </>
  )
}

export default App
