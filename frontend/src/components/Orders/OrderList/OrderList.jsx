import React, { useEffect, useState } from 'react';
import { fetchOrders } from '@/api/DataFetch'; 
import { translateStatus, translatePayment } from '@/utils/dataTranslate';
import './OrderList.css';


const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    useEffect(() => {
        const getOrders = async () => {
            try {
                const data = await fetchOrders(); 
                setOrders(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        getOrders();
    }, []);


    const toggleOrder = (orderId) => {
        if (expandedOrderId === orderId) {
            setExpandedOrderId(null); 
        } else {
            setExpandedOrderId(orderId); 
        }
    };



    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    return (
        <div className="order-list">
            <h1>Мои заказы</h1>
            {orders.length > 0 ? (
                <ul>
                    {orders.map(order => (
                        <li key={order.id} className="order-item">
                            <div 
                                className="order-summary" 
                                onClick={() => toggleOrder(order.id)} 
                            >
                                <h2>Заказ #{order.id}</h2>
                                <p>Дата создания: {new Date(order.created_at).toLocaleDateString()}</p>
                                <p>Статус: {translateStatus(order.status)}</p>
                                <p>Способ оплаты: {translatePayment(order.payment_method)}</p>
                            </div>
                            {expandedOrderId === order.id && (
                                <div className="order-details">
                                    <p>Адрес: {order.address}, кв. {order.apartment}, подъезд {order.entrance}, этаж {order.floor}</p>
                                    <ul>
                                        {order.items.map(item => (
                                            <li key={item.id}>
                                                <p>{item.product.name} {item.size.size} {item.quantity}шт</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>У вас пока нет заказов.</p>
            )}
        </div>
    );
};

export default OrderList;