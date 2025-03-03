import './assets/css/style.css'
import Main from './components/Main'
import Register from './components/Register'
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './components/Login'
import About from './components/About'

import AuthProvider from './AuthProvider'
import Dashboard from './components/dashboard/Dashboard'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
    <Header></Header>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<PublicRoute><About /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path='/dashboard' element={<PrivateRoute> <Dashboard/> </PrivateRoute>} /> 
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
