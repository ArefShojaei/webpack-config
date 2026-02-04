import React from "react";
import "./Product.css"

export default ({ title, price, onDelete }) => {
    return (
        <div className="product-item">
            <h3>{title}</h3>
            <p>Price: ${price}</p>
            <button onClick={onDelete}>Delete</button>
        </div>
    );
};
