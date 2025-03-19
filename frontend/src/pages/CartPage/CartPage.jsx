import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/UseCart';
import { CartItem } from '@/components/Cart/CartItem/CartItem';
import PaymentOptions from '@/components/Cart/PaymentOptions/PaymentOptions';
import TotalSum from '@/components/Cart/TotalSum/TotalSum';
import OrderForm from '@/components/Cart/OrderForm/OrderForm';
import { createOrder, authenticated_user } from "@/api/DataFetch"; 
import './CartPage.css';

const CartPage = () => {
    const { cartItems, total, RemoveItem, clearCart } = useCart();
    const navigate = useNavigate();
    const [selectedPayment, setSelectedPayment] = useState('cash');
    const [formData, setFormData] = useState({
        name: '',
        phone: '', 
        address: '',
        apartment: '',
        entrance: '',
        floor: '',
        comment: '',
        email: '',
    });
    const [isAuthenticated, setIsAuthenticated] = useState(false); 
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const user = await authenticated_user();
                if (user) {
                    setIsAuthenticated(true); 
                    setFormData((prevData) => ({
                        ...prevData,
                        phone: user.phone, 
                    }));
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    const PaymentChange = (e) => {
        setSelectedPayment(e.target.value);
    };

    const FormChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const SubmitOrder = async () => {
        if (!isAuthenticated) {
            navigate('/login'); 
            return; 
        }

        // Проверка обязательных полей
        if (!formData.phone || !formData.address) {
            setErrorMessage('Пожалуйста, заполните все обязательные поля.');
            return;
        }

        const finalOrderData = {
            ...formData,
            paymentMethod: selectedPayment,
            items: cartItems.map(item => ({
                product: item.product.id,
                size: item.size.id,
                quantity: item.quantity,
            })),
        };

        try {
            const response = await createOrder(finalOrderData);
            const orderId = response.id;

            setFormData({
                name: '',
                phone: '', 
                address: '',
                apartment: '',
                entrance: '',
                floor: '',
                comment: '',
                email: '',
            });

            clearCart();

            if (selectedPayment === 'card_online') {
                navigate('/payment', { state: { orderId } });
            } else {
                navigate(`/order-success/${orderId}`);
            }
        } catch (error) {
            setErrorMessage('Ошибка оформления заказа. Пожалуйста, попробуйте еще раз.');
            console.error('Ошибка оформления заказа:', error.response?.data || error.message);
        }
    };

    return (
        <div className="cart-page">
            <h2>Корзина</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {cartItems.length > 0 ? (
                <div>
                    {cartItems.map((item) => (
                        <CartItem key={item.id} item={item} size={item.size} onRemove={RemoveItem} />
                    ))}
                    <OrderForm formData={formData} onFormChange={FormChange} />
                    <PaymentOptions
                        selectedPayment={selectedPayment}
                        onPaymentChange={PaymentChange}
                    />
                    <TotalSum total={total} />
                    <button type="button" onClick={SubmitOrder}>
                        Оформить заказ
                    </button>
                </div>
            ) : (
                <p>Ваша корзина пуста</p>
            )}
        </div>
    );
};

export default CartPage;