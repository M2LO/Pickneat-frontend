import React, { useContext } from "react";
import { ShopContext } from "../context/shopcontext";
import './cart.css'

export const CartItem = (props) => {
    const { id, productName, price, productImage } = props.data;
    const { cartItems, addToCart, removeFromCart, updateCartItemCount } =
        useContext(ShopContext);
        const totalQuantity = cartItems[id] || 0;

    return (

        <div className="cartItem">
            <div>
                <img src={productImage} />
            </div>
            <div className="description">
                <p>
                    <b>{productName}</b>
                </p>
                <p> Price: ₹{price}</p>
            </div>
            
            <div className="countHandler">
                <button onClick={() => removeFromCart(id)} className="less"> - </button>
                <input
                    value={cartItems[id]}
                    onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
                />
                <button onClick={() => addToCart(id)} className="plus"> + </button>
            </div>
        </div>

    );
};