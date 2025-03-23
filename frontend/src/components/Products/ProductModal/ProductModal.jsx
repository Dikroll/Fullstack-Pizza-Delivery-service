import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { config } from "@/services/config";
import { useCart } from "@/context/UseCart";
import "./Product_modal.css";

const ProductModal = ({ product, onClose }) => {
  const { cart, AddItem, UpdateQuantity } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [cartQuantity, setCartQuantity] = useState(1);
  const pizzaWindowRef = useRef(null);

  const cartItem = cart?.find(
    (item) => item.product.id === product.id && item.size.id === selectedSize.id
  );

  useEffect(() => {
    if (pizzaWindowRef.current) {
      pizzaWindowRef.current.style.display = "flex";
    }
    return () => {
      if (pizzaWindowRef.current) {
        pizzaWindowRef.current.style.display = "none";
      }
    };
  }, []);

  useEffect(() => {
    if (cartItem) {
      setCartQuantity(cartItem.quantity);
    } else {
      setCartQuantity(1);
    }
  }, [cartItem, selectedSize]);

  const SizeSelect = (size) => {
    setSelectedSize(size);
  };

  const AddToCart = async () => {
    try {
      await AddItem(product.id, selectedSize.id, cartQuantity);
      onClose();
    } catch (error) {
      console.error("Ошибка при добавлении товара:", error);
    }
  };

  const QuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;

    if (cartItem) {
      try {
        await UpdateQuantity(cartItem.id, newQuantity);
        setCartQuantity(newQuantity);
      } catch (error) {
        console.error("Ошибка при изменении количества:", error);
      }
    } else {
      setCartQuantity(newQuantity);
    }
  };

  return (
    <div className="pizzaWindowArea" ref={pizzaWindowRef} onClick={onClose}>
      <div className="pizzaWindowBody" onClick={(e) => e.stopPropagation()}>
        {/* Крестик в правом верхнем углу */}
        <button className="pizzaWindowCloseButton" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="pizzaBig">
          <img src={`${config.apiUrl}${product.image_url}`} alt={product.name} />
        </div>
        <div className="pizzaInfo">
          <h1>{product.name}</h1>
          <div className="pizzaInfo--desc">{product.description}</div>
          <span>{selectedSize.grammas}</span>
          <div className="pizzaInfo--sizearea">
            <div className="pizzaInfo--sector">Размер</div>
            <div className="pizzaInfo--sizes">
              {product.sizes.map((size, index) => (
                <div
                  key={index}
                  className={`pizzaInfo--size ${
                    selectedSize.size === size.size ? "selected" : ""
                  }`}
                  onClick={() => SizeSelect(size)}
                >
                  {size.size}
                </div>
              ))}
            </div>
          </div>

          <div className="pizzaInfo--pricearea">
            <div className="pizzaInfo--sector">Цена</div>
            <div className="pizzaInfo--price">
              <div className="pizzaInfo--actualPrice">{selectedSize.price}₽</div>
              <div className="pizzaInfo--qtarea">
                <button onClick={() => QuantityChange(cartQuantity - 1)}>-</button>
                <span>{cartQuantity}</span>
                <button onClick={() => QuantityChange(cartQuantity + 1)}>+</button>
              </div>
            </div>
          </div>

          {cartItem ? (
            <div className="pizzaInfo--addButton" onClick={AddToCart}>
              Обновить корзину
            </div>
          ) : (
            <div className="pizzaInfo--addButton" onClick={AddToCart}>
              Добавить в корзину
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
