import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/UseCart';
import { useAuth } from '@/context/UseAuth'; 
import { CartItem } from '@/components/Cart/CartItem/CartItem';
import PaymentOptions from '@/components/Cart/PaymentOptions/PaymentOptions';
import TotalSum from '@/components/Cart/TotalSum/TotalSum';
import OrderForm from '@/components/Cart/OrderForm/OrderForm';
import { createOrder } from "@/api/DataFetch"; 
import './CartPage.css';

export default function CartPage() {
    const { cartItems, total, RemoveItem, clearCart } = useCart();
    const { user, loading } = useAuth(); 
    const navigate = useNavigate();
    const [selectedPayment, setSelectedPayment] = useState('cash');
    const [errorMessage, setErrorMessage] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        phone: '+7',
        address: '',
        entrance: '',
        apartment: '',
        floor: '',
        email: '',
        comment: '',
    });

    useEffect(() => {
        if (!loading && user) {
            setFormData((prevData) => ({
                ...prevData,
                name: user.first_name || '',
                phone: user.phone || '+7',
                email: user.email || '',
            }));
        }
    }, [user, loading]);

    const PaymentChange = (e) => {
        setSelectedPayment(e.target.value);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;

        if (name === 'phone') {
            if (!value.startsWith('+7')) return;
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const SubmitOrder = async () => {
        if (!user) {
            navigate('/login'); 
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
                    <h2>Доставка</h2>
                    <OrderForm formData={formData} onFormChange={handleFormChange} />
                    <h2>Оплата</h2>
                    <PaymentOptions
                        selectedPayment={selectedPayment}
                        onPaymentChange={PaymentChange}
                    />
                    <TotalSum total={total} />
                    <button onClick={SubmitOrder} className="submit-button">
                        Оформить заказ
                    </button>
                </div>
            ) : (
                <p>Ваша корзина пуста</p>
            )}
        </div>
    );
}
