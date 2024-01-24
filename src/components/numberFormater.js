import React from 'react';

const NumberFormatComponent = ({ amount }) => {
    const formattedAmount = amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
    const formattedAmountWithoutDecimal = formattedAmount.replace(/,00$/, '');
    return (
        <div>
            <p>{formattedAmountWithoutDecimal}</p>
        </div>
    );
};

export default NumberFormatComponent;
