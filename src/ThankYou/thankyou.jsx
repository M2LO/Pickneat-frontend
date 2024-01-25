import React from 'react'
import './thankyou.css'
import { CheckCircle } from 'phosphor-react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { Icon } from "@iconify/react";

export default function Thankyou() {

    const navigate = useNavigate();
    const callProductPage = async () => {
        try{
            const res = await axios.post('/admin', {
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
        <div className='order-main'>
            <div className='tq'>
                <div><CheckCircle size={32} color="#5fe4ce" weight="bold" /></div>
                <h1>Thank you for your purchase!</h1>
                <h5>The instructions and your access code will be emailed to you shortly.</h5>
            </div>
            <div className='innn'>
                <h6>You can access your account through this link, and you'll also be able to see
                    all the subscriptions and downloads linked to your account.</h6>
                <h6>in the meantime, we invite you to connect With us through social media!</h6>
                
                <div className='icons'>
                    <a href="https://www.instagram.com/m2lo.official/"><Icon icon="basil:instagram-solid" color="white" width="25" /></a>
                    <a href="https://www.youtube.com/channel/UCs48CGJ6wAtvHoBXmh9e5ww"><Icon icon="bi:youtube" color="white" width="25" /></a>
                    <a href="https://www.facebook.com"><Icon icon="ic:baseline-facebook" color="white" width="25" /></a>
                </div>

                <div>
                    <Link to="/"><button>Back To Home</button></Link>
                </div>
            </div>
        </div>
    )
}