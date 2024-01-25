import React, { useContext } from "react";
import { ShopContext } from "../context/shopcontext";

export const Product = (props) => {

    const { id, productName, price, productImage } = props.data;
    const { addToCart, cartItems } = useContext(ShopContext)

    const cartItemCount = cartItems[id];
    return (
        <div className="productmain">
            <img src={productImage} className="productimg" alt="productimggg"></img>

            <div className="productdes">
                <p>
                    <b>{productName}</b>
                </p>

                <p>
                    <b>₹{price}</b>
                </p>
            </div>
            <button className="buybtn" onClick={() => addToCart(id)}>ADD TO CART</button>
        </div>
    )
}


