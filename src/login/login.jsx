import './login.css';
import React, { useState } from "react";
import loginimg from './../asset/LoginBanner.png';
import { Icon } from '@iconify/react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('/signin', {
                email,
                password
            });

            if (res.status === 200) {
                window.alert("Login Successful!");
                console.log(res)
                localStorage.setItem('token',res.data.token)
                
                if (email === "admin@gmail.com") {
                    navigate("/admin");
                } else {
                    navigate("/");
                }

            } else {
                window.alert("Invalid Email & Password!");
            }
        } catch (error) {
            console.error("Error:", error);
            window.alert("An error occurred during login.");
        }
    }

    return (
        <div className="login">
            <img src={loginimg} alt='' />
            <div className="rightsidelogin">
                <div className='logintxt'>
                    <h1 className='userlogintxt'>USER LOGIN</h1>
                </div>

                <div className='loginform'>
                    <form method="POST" onSubmit={loginUser}> {/* Use onSubmit for the form */}
                        <div className='userpass'>
                            <input type='email' name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="EMAIL" />
                            <Icon icon="ph:user" color="white" width={24} />
                        </div>

                        <div className='userpass'>
                            <input type='password' name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="PASSWORD" />
                            <Icon icon="mdi:password" color="white" width={24} />
                        </div>

                        <div className='loginremember'>
                            <div className='radiobtn'>
                                <input type='checkbox' />
                            </div>
                            <h2>REMEMBER ME</h2>
                        </div>

                        <div className='loginbutton'>
                            <input type='submit' name="signin" value="Log In" />
                        </div>
                    </form>

                    <div className='createtxt'>
                        {/* <Link to="/registration">Create Account</Link> */}
                        <Link to="/registration">Create Account</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
