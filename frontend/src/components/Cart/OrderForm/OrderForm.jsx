import React, { useState } from 'react';
import { validatePhone, validateEmail } from '@/utils/validateData'; 
import './OrderForm.css';

const OrderForm = ({ formData, onFormChange }) => {
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        let newErrors = { ...errors };
        let newValue = value;

        if (name === 'phone') {
            if (!newValue.startsWith('+7')) {
                newValue = '+7' + newValue.replace(/[^0-9]/g, '').slice(1); // Гарантируем, что +7 всегда в начале
            }
            if (!validatePhone(newValue)) {
                newErrors.phone = 'Некорректный номер телефона';
            } else {
                delete newErrors.phone;
            }
        }

        if (name === 'email') {
            if (!validateEmail(newValue)) {
                newErrors.email = 'Некорректный email';
            } else {
                delete newErrors.email;
            }
        }

        setErrors(newErrors);
        onFormChange({ target: { name, value: newValue } }); 
    };

    return (
        <form className="order-form">
            <div className="form-row">
                <div className="form-group">
                    <label>Имя:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Телефон:</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        maxLength="12"
                        required
                    />
                    {errors.phone && <p className="error-message">{errors.phone}</p>}
                </div>
            </div>

            <div className="form-group">
                <label>Адрес:</label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Подъезд:</label>
                    <input
                        type="text"
                        name="entrance"
                        value={formData.entrance}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Квартира:</label>
                    <input
                        type="text"
                        name="apartment"
                        value={formData.apartment}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Этаж:</label>
                    <input
                        type="text"
                        name="floor"
                        value={formData.floor}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div className="form-group">
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            <div className="form-group">
                <label>Комментарий курьеру:</label>
                <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    className="fixed-textarea"
                ></textarea>
            </div>
        </form>
    );
};

export default OrderForm;
