import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import { Home } from './pages/Home'
import { Logo } from './components/Logo'
import { AuthProvide } from './context/AuthProvide'
import { GeoLocation } from './components/GeoLocation';


function App() {
  return (
    <>
      <Logo />
      <BrowserRouter>
        <AuthProvide>
          <GeoLocation />
          <Routes>
            <Route index path='/' element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </AuthProvide>
      </BrowserRouter>

    </>
  )
}

export default App
