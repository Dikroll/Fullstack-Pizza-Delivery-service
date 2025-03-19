import React from 'react';
import './PaymentOptions.css';

const PaymentOptions = ({ selectedPayment, onPaymentChange }) => {
    return (
        <div className="payment-options">
            <h4>Выберите способ оплаты:</h4>
            <label>
                <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={selectedPayment === 'cash'}
                    onChange={onPaymentChange}
                />
                Наличные
            </label>
            <label>
                <input
                    type="radio"
                    name="payment"
                    value="card_online"
                    checked={selectedPayment === 'card_online'}
                    onChange={onPaymentChange}
                />
                Онлайн
            </label>
            <label>
                <input
                    type="radio"
                    name="payment"
                    value="card_on_delivery"
                    checked={selectedPayment === 'card_on_delivery'}
                    onChange={onPaymentChange}
                />
                Картой при получении
            </label>
        </div>
    );
};

export default PaymentOptions;