import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/HomePage/HomePage';
import CartPage from '@/pages/CartPage/CartPage';
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';
import ContactPage from '@/pages/ContactPage/ContactPage';
import PromotionPage from '@/pages/PromotionPage/PromotionPage';
import OrderConfirm from './components/Orders/OrderConfirm/OrderConfirm';
import NavBar from '@/layouts/NavBar';
import Footer from '@/layouts/Footer';
import { fetchCategories, fetchProducts, fetchBanners, fetchPromotions, fetchUserProfile, updateUserProfile } from '@/api/DataFetch';
import { AuthProvider } from '@/context/UseAuth';
import { CartProvider } from '@/context/UseCart';
import RegisterForm from '@/components/Auth/RegisterForm/RegisterForm';
import LoginForm from '@/components/Auth/LoginForm/LoginForm';
import PromotionDetails from '@/components/Promotions/PromotionDetails/PromotionDetails';
import ProfilePage from '@/pages/ProfilePage/ProfilePage';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import '@/css/App.css';

const App = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [banners, setBanners] = useState([]);
    const [promotions, setPromotions] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchCategories()
            .then(setCategories)
            .catch(err => console.error('Error:', err.message));

        fetchProducts()
            .then(setProducts)
            .catch(err => console.error('Error:', err.message));

        fetchBanners()
            .then(setBanners)
            .catch(err => console.error('Error:', err.message));

        fetchPromotions()
            .then(setPromotions)
            .catch(err => console.error('Error:', err.message));

        fetchUserProfile()
            .then(setUser)
            .catch(err => console.error('Error fetching user data:', err.message));
    }, []);

    const saveUser = async (updatedUser) => {
        try {
            const data = await updateUserProfile(updatedUser);
            setUser(data);
        } catch (error) {
            console.error('Error saving user data:', error);
        }
    };

    return (
        <Router>
            <CartProvider>
                <AuthProvider>
                    <NavBar categories={categories} />
                    <Routes>
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/register" element={<RegisterForm />} />
                        <Route path="/" element={<HomePage banners={banners} categories={categories} products={products} />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/delivery" element={<ContactPage />} />
                        <Route path="/promotions" element={<PromotionPage promotions={promotions} />} />
                        <Route path="/promotions/:id" element={<PromotionDetails />} />
                        <Route path="/profile" element={<ProfilePage requestUser={user} onSaveUser={saveUser} />} />
                        <Route path="/order-success/:orderId" element={<OrderConfirm />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                    <Footer categories={categories} />
                </AuthProvider>
            </CartProvider>
        </Router>
    );
};

export default App;