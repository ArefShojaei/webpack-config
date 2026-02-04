import React, { useState } from "react";
import Product from "@components/product/Product.jsx"
import "./ProductList.css";

export default () => {
    const [products, setProducts] = useState([
        {
            id : 1,
            title : "Book-1",
            price : 79
        },
        {
            id : 2,
            title : "Book-2",
            price : 89
        },
        {
            id : 3,
            title : "Book-3",
            price : 99
        },
    ])

    const deleteProduct = id => {
        const newProducts = products.filter(product => product.id !== id)
    
        setProducts(newProducts)
    }

    return (
        <div className="product-list">
            {products.length ? products.map((product, index) => {
                const { id, title, price } = product;

                return (
                    <Product
                        key={id}
                        title={title}
                        price={price}
                        onDelete={() => deleteProduct(id)}
                    />
                );
            }) : "Empty"}
        </div>
    );
}