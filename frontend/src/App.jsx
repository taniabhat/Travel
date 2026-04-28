import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import ProductPage from './Pages/ProductPage';
import DetailPage from './Pages/DetailPage';
import RegSign from './Pages/RegSign';
import ProfilePage from './Pages/ProfilePage';
import CheckoutPage from './Pages/CheckoutPage';
import NotFoundPage from './Pages/NotFoundPage';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/detail/:id" element={<DetailPage />} />
            <Route path="/login" element={<RegSign />} />
            <Route path="/register" element={<RegSign />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default App;
