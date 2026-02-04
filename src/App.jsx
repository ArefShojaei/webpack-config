import React from "react"
import ProductList from "@components/product-list/ProductList.jsx"
import "./App.css"

export default () => {
    return (
        <React.Fragment>
            <h1>Book-list app</h1>
            <ProductList />
        </React.Fragment>
    );
}
