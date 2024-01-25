import React, { useContext } from "react";
import { ShopContext } from "../context/shopcontext";
import { PRODUCTS } from "../products";
import { CartItem } from "./cartitem";
import { useNavigate } from "react-router-dom";
import Emptycartimg from "./../asset/Empty Cart.png";
import "./cart.css";
import axios from "axios";
import { useEffect } from 'react';
import { Link } from "react-router-dom";

export const Cart = () => {
    const { cartItems, getTotalCartAmount, checkout } = useContext(ShopContext);
    const totalAmount = getTotalCartAmount();

    const isCartEmpty = totalAmount === 0;

    const navigate = useNavigate();
    const callAboutPage = async () => {
        try{
            const res = await axios.post('/cart', {
                token:localStorage.getItem('token')
            });

            if(!res.status === 200)
            {
                const error = new Error(res.error)
                throw error;
            }
        }
        catch(err)
        {
            console.log(err);
            navigate("/login");
        }
    }

    useEffect (() =>{
        callAboutPage();
    }, [])

    return (
        <div className="cart1">
            <div className="carttitle">
                {/* <h1>Cart</h1> */}
            </div>
            {isCartEmpty ? (
                <div className="empty-cart">
                    <div className="emp1">
                        <img src={Emptycartimg} alt="Empty Cart" />
                    </div>
                    <div className="emp2">
                        <center><h1>Your Cart is Empty</h1></center>
                        <center><h6>Looks like you haven't made your choice yet.</h6></center>
                        <center><a href="/products"><button>Start Shopping</button></a></center>
                    </div>
                </div>
            ) : (
                <div className="cart-grid">
                    <div className="cart-items">
                        <div>
                            <h2>CART</h2>
                        </div>
                        <div className="itemsdetails">
                            <h4>Items Details</h4>
                            <h4>Quantity</h4>
                            <h4>Amount</h4>
                        </div>
                        {PRODUCTS.map((product) => {
                            if (cartItems[product.id] !== 0) {
                                return <CartItem key={product.id} data={product} />;
                            }
                        })}
                        <Link to="/products"><button className="btn222"><span>&lt;</span>CONTINUE SHOPPING</button></Link>
                    </div>

                    <div className="cart-total">
                        <div className="toooootoal">
                            <p>items Total: </p>
                            <span>₹{totalAmount}</span>
                        </div>
                        <div className="appprox">
                            <p>Approx. Delivery Charge</p><span className="green">Free</span>
                        </div>
                        <div className="lineee">
                            <hr></hr>
                        </div>
                        <div>
                            <div className="totooool">
                                <p>Amount Payable:</p> <span>₹{totalAmount}</span>
                            </div>
                            <h6>Prices may change based on shipping address</h6>
                        </div>
                        {/* <Link to="/products"><button className="btn222"><span>&lt;</span>CONTINUE SHOPPING</button></Link> */}
                        <Link to="/checkout"><center><button>CHECKOUT</button></center></Link>
                    </div>
                </div>
            )}
        </div>
    );
};
