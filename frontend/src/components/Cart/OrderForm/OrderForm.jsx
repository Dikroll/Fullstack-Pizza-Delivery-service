import React, { useState } from 'react';
import './OrderForm.css';

const OrderForm = ({ formData, onFormChange }) => {
    return (
        <form className="order-form">
            <div>
                <label>Имя:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={onFormChange}
                    required
                />
            </div>
            <div>
                <label>Телефон:</label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={onFormChange}
                    required
                />
            </div>
            <div>
                <label>Адрес:</label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={onFormChange}
                    required
                />
            </div>
            <div>
                <label>Подъезд:</label>
                <input
                    type="text"
                    name="entrance"
                    value={formData.entrance}
                    onChange={onFormChange}
                    required
                />
            </div>
            <div>
                <label>Квартира:</label>
                <input
                    type="text"
                    name="apartment"
                    value={formData.apartment}
                    onChange={onFormChange}
                    required
                />
            </div>
            <div>
                <label>Этаж:</label>
                <input
                    type="text"
                    name="floor"
                    value={formData.floor}
                    onChange={onFormChange}
                    required
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={onFormChange}
                    required
                />
            </div>
            <div>
                <label>Комментарий курьеру:</label>
                <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={onFormChange}
                ></textarea>
            </div>
        </form>
    );
};

export default OrderForm;