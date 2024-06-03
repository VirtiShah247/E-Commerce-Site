import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import { Home } from './pages/Home'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer';
import { AuthProvide } from './context/AuthProvide'
import { GeoLocation } from './components/GeoLocation';
import { ProductDetails } from './pages/ProductDetails'

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvide>
          <GeoLocation />
          <Navbar />
          <div className="mainBody grid grid-rows-[auto_1fr_auto] bg-base-color pt-24">
            <Routes>
              <Route path="/" >
                <Route index path='/' element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="/product/:id" element={<ProductDetails />} />
              </Route>
            </Routes>
          <Footer />
          </div>
        </AuthProvide>
      </BrowserRouter>
    </>
  )
}

export default App
