import React, { useState } from 'react';
import { useCart } from '@/context/UseCart';
import './CartItem.css';
import { config } from "@/services/config";

export const CartItem = ({ item }) => {
  const { RemoveItem, UpdateQuantity } = useCart();
  const [quantity, setQuantity] = useState(item.quantity);

  const QuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await UpdateQuantity(item.id, newQuantity);
      setQuantity(newQuantity);
    } catch (error) {
      console.error('Ошибка при изменении количества:', error);
    }
  };

  const RemoveProduct = async () => {
    try {
      await RemoveItem(item.id);
    } catch (error) {
      console.error('Ошибка при удалении товара:', error);
    }
  };

  return (
    <div className="cart-item">
      <img
        src={`${config.apiUrl}${item.product.image_url}`}
        alt={item.product.name}
        className="cart-item-image"
      />
      <div className="cart-item-details">
        <h3 className="cart-item-title">{item.product.name}</h3>
        <p className="cart-item-size">Размер: {item.size?.size || "Неизвестно"}</p>
        <p className="cart-item-price">Цена: {item.size?.price || 0}₽</p>
        <div className="quantity-controls">
          <button
            onClick={() => QuantityChange(quantity - 1)}
            className="quantity-btn"
          >
            −
          </button>
          <span className="quantity-value">{quantity}</span>
          <button
            onClick={() => QuantityChange(quantity + 1)}
            className="quantity-btn"
          >
            +
          </button>
        </div>
        <button onClick={RemoveProduct} className="remove-btn">
          Удалить
        </button>
      </div>
    </div>
  );
};