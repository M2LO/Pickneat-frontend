import './registration.css';
import React, { useState } from "react";
import registerimg from './../asset/registerBanner.png';
import { Icon } from '@iconify/react';
import { Link, useNavigate } from "react-router-dom";


export default function Registration() {

    const history = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: ""
    });

    const handleInputs = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    const PostData = async (e) => {
        e.preventDefault();

        const { name, email, password, cpassword } = user;

        if (!name || !email || !password || !cpassword) {
            window.alert("Fields required!");
            return;
        }
        else {

            const res = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, password, cpassword
                })
            });

            const data = await res.json();

            if (data.error) {
                // window.alert("Invalid Registration!");
                console.log("Invalid Registration!");
                window.alert(data.error);
            }
            else {
                window.alert("Registration Successful!");
                console.log("Registration Successful!");
                history("/login");
            }
        }
    }
    return (
        <div className="regitser">
            <img src={registerimg} alt='' />
            <div className="rightsideregister">
                <div className='registertxt'>
                    <h1 className='userresgistertxt'>USER LOGIN</h1>
                </div>

                <div className='registerform'>
                    <form method="POST">
                        <div className='userpassregister'>
                            <input type='text' name="name" autoComplete="off" value={user.name} onChange={handleInputs} placeholder='USERNAME' required></input>
                            <Icon icon="ph:user" color="white" width={24} />
                        </div>

                        <div className='userpassregister'>
                            <input type='EMAIL' name="email" autoComplete="off" value={user.email} onChange={handleInputs} placeholder='EMAIL' required></input>
                            <Icon icon="ic:baseline-email" color="white" width={24} />
                        </div>

                        <div className='userpassregister'>
                            <input type='password' name="password" autoComplete="off" value={user.password} onChange={handleInputs} placeholder='PASSWORD' required></input>
                            <Icon icon="mdi:password" color="white" width={24} />
                        </div>

                        <div className='userpassregister'>
                            <input type='password' name="cpassword" autoComplete="off" value={user.cpassword} onChange={handleInputs} placeholder='CONFIRMEED PASSWORD' required></input>
                            <Icon icon="game-icons:confirmed" color="white" width={24} />
                        </div>

                        <div className='registerremember'>
                            <div className='radiobtn'>
                                <input type='checkbox'></input>
                            </div>
                            <h2>REMEMBER ME</h2>
                        </div>

                        <div className='registerbutton'>
                            {/* <button value="register" name='signup' type='submit' onClick={PostData}>REGISTER</button> */}
                            <input type='submit' name='signup' value="Register" onClick={PostData}></input>
                        </div>
                    </form>

                    <div className='loginpagetxt'>
                        <Link to="/Login">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}