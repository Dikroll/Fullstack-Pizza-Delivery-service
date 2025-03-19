import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPromotionById } from '@/api/DataFetch';
import { config } from '@/services/config';
import './PromotionDetails.css';

const PromotionDetails = () => {
    const { id } = useParams();
    const [promotion, setPromotion] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPromotionById(id)
            .then(data => setPromotion(data))
            .catch(error => {
                console.error('Error fetching promotion:', error);
                setError(error.message);
            });
    }, [id]);

    if (error) {
        return <div className="error-message">Error: {error}</div>; 
    }

    if (!promotion) {
        return <div className="loading-message">Loading...</div>; 
    }

    return (
        <div className="promotion-details">
            <h1 className="promotion-title">{promotion.name}</h1>
            <img
                className="promotion-image"
                src={`${config.apiUrl}${promotion.image_url}`}
                alt={promotion.name}
            />
            <p className="promotion-description">{promotion.description}</p>
            <p className="promotion-date">
                Дата создания: {new Date(promotion.created_at).toLocaleDateString()}
            </p>
            <button className="back-button" onClick={() => navigate(-1)}>
                Назад
            </button>
        </div>
    );
};

export default PromotionDetails;