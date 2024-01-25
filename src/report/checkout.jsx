import './checkout.css';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from 'react';

function Checkout() {

    const [userData, setUserData] = useState();
    const navigate = useNavigate();

    const callNavPage = async () => {
        try {
            const res = await axios.post("/checkout", {
                token: localStorage.getItem("token"),
            });

            setUserData(res.data);
        } catch (err) {
            console.log(err);
            navigate("/login");
        }
    };

    useEffect(() => {
        callNavPage();
    }, []);

    const [Bill, setReport] = useState({
        fullName: "",
        email: "",
        address: "",
        city: "",
        state: "",
        zipCode: ""

    });

    const handleInputs = (e) => {
        const { name, value } = e.target;
        setReport({ ...Bill, [name]: value });
    }

    const PostData = async (e) => {
        e.preventDefault();

        const { fullName, email, address, city, state, zipCode } = Bill;

        if (!fullName || !email || !address || !city || !state || !zipCode) {
            window.alert("Fields required!");
            return;
        }
        else {

            const res = await fetch("/submit-bill", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fullName, email, address, city, state, zipCode
                })
            });

            const data = await res.json();

            if (data.error) {
                console.log("Something Went Wrong!");
                window.alert(data.error);
            }
            else {
                // window.alert("Thank You For Buying!");
                console.log("Submitted Successful!");
                navigate("/thankyou");
            }
        }
    }
    return (
        <div className="container">
            <div className='opacity'>
            <form action="" method='POST'>

                <div className="row">

                    <div className="col">
                        
                        <h3 style={{ fontSize: "20px", color: "#333", paddingBottom: "5px", textTransform: "uppercase" }}>Billing Form</h3>

                        <div className="inputBox">
                            <span>full name </span>
                            <input type="text" name="fullName" value={Bill.fullName} onChange={handleInputs} placeholder="john deo" />
                        </div>
                        <div className="inputBox">
                            <span>email </span>
                            <input type="email" name="email" value={Bill.email} onChange={handleInputs} placeholder="example@example.com" />
                        </div>
                        <div className="inputBox">
                            <span>address </span>
                            <input type="text" name="address" value={Bill.address} onChange={handleInputs} placeholder="room - street - locality" />
                        </div>
                        <div className="inputBox">
                            <span>city </span>
                            <input type="text" name="city" value={Bill.city} onChange={handleInputs} placeholder="city" />
                        </div>

                        <div className="flex">
                            <div className="inputBox">
                                <span>state </span>
                                <input type="text" name="state" value={Bill.state} onChange={handleInputs} placeholder="state" />
                            </div>
                            <div className="inputBox">
                                <span>zip code </span>
                                <input type="text" name="zipCode" value={Bill.zipCode} onChange={handleInputs} placeholder="123 456" />
                            </div>
                        </div>

                    </div>
                </div>

                <input type="submit" name='Generate Bill' value="Proceed To Checkout" onClick={PostData} className="submit-btn" />

            </form>
            </div>
        </div>
    )
}
export default Checkout