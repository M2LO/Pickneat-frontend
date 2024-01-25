import { PRODUCTS } from "../products";
import { Product } from "./product";
import "./products.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Products = () => {


    const navigate = useNavigate();
    const callProductPage = async () => {
        try{
            const res = await axios.post('/', {
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
        callProductPage();
    }, [])


    return (
        <div className="produtcshop">
            <div>
                <center><h1>PRODUCT</h1></center>
            </div>

            <div className="productdesign">
                <div className="productmap">
                {PRODUCTS.map((product, index) => (
                    <Product key={product.id} data={product} />
                    ))}
                </div>
            </div> 
        </div>
    )
}