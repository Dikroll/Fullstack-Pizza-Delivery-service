import React from 'react';
import './TotalSum.css';

const TotalSum = ({ total }) => {
    return (
        <div className="total-amount">
            <h3>Итоговая сумма: {total} руб.</h3>
        </div>
    );
};

export default TotalSum;
