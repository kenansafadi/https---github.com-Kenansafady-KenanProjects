import React, { useEffect, useState } from 'react';
import { BusinessProvider } from './components/context/BussinessContext';
import { AuthProvider } from './components/context/AuthContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import businessService from './Services/BusinessServices';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Navbar from './components/common/Navbar';
import Footer from './components/Common/Footer';
import Home from './pages/Home';
import About from './pages/About';
import CardDetails from './components/Bussiness/BussinessDetails';
import Favorites from './pages/Favorites';
import BusinessList from './pages/BusinessList';
import NoCardsFound from './pages/noCardsFound';
import Profile from './components/Auth/profile';
const App = () => {
  const [cards, setCards] = useState([]);
  const [originalCards, setOriginalCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await businessService.getAllCards();
        setCards(data);
        setOriginalCards(data);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };
    fetchCards();
  }, []);

  const handleSearch = (query) => {
    if (!query) {
      setCards(originalCards);
      return;
    }
    const filteredCards = originalCards.filter(card =>
      card.title.toLowerCase().includes(query.toLowerCase()) ||
      card.description.toLowerCase().includes(query.toLowerCase())
    );
    setCards(filteredCards);
  };


  return (
    <AuthProvider>
      <BusinessProvider>
        <Router>
          <Navbar onSearch={handleSearch} />

          <Routes>
            <Route path="/" element={<Home cards={cards} />} />
            <Route path="/favourites" element={<Favorites />} />
            <Route path="/business/:id" element={<CardDetails />} />
            <Route path="/no-cards-found" element={<NoCardsFound />} />
            <Route path="/my-business-cards" element={<BusinessList />} />
            <Route path="/card/:cardId" element={<CardDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/profile"
              element={<Profile />

              }
            />
            <Route path="/register" element={<Register />} />


            <Route path="*" element={<h2>Page Not Found</h2>} />

          </Routes>
          <Footer />
        </Router>
      </BusinessProvider>
    </AuthProvider>
  );
};

export default App;
