import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Services from './pages/Services';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar onSearch={setSearchQuery} />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu searchQuery={searchQuery} />} />
              <Route path="/services" element={<Services />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;