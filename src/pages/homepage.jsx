import React, { useState } from "react";
import { Icon } from "@iconify/react";
import "../components/navbar.css";
import './homepage.css';
import floatinggarlic from './../asset/garlic floating.mp4';
import floatingchili from './../asset/chili floating.mp4';
import floatinglemon from './../asset/lemon floating.mp4';
import limeProduct from './../asset/Product LIME.png';
import garlicProduct from './../asset/Product Garlic.png';
import SichezwanProduct from './../asset/Product Sichezwan.png';
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Homepage() {
    const [activeIndex, setActiveIndex] = useState(0);

    const sliderNav = (manual) => {
        setActiveIndex(manual);
    }

    const [userData, setUserData] = useState({ name: "", email: "", message: "" });

    const navigate = useNavigate();
    const callHomePage = async () => {
        try {
            const res = await axios.post('/', {
                token: localStorage.getItem('token')
            });

            // setUserData(res.data);
            setUserData({ name: res.data.name, email: res.data.email });
            if (!res.status === 200) {
                const error = new Error(res.error)
                throw error;
            }

        }
        catch (err) {
            console.log(err);
            navigate("/login");
        }
    }

    useEffect(() => {
        callHomePage();
    }, [])

    
    const [contact, setContact] = useState({
        name: "",
        email: "",
        message: "",

    });

    const handleInputs = (e) => {
        const { name, value } = e.target;
        setContact({ ...contact, [name]: value });
    }

    const PostData = async (e) => {
        e.preventDefault();

        const { name, email, message} = contact;

        if (!name || !email || !message) {
            window.alert("Fields required!");
            return;
        }
        else {

            const res = await fetch("/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, message
                })
            });

            const data = await res.json();

            if (data.error) {
                console.log("Something Went Wrong!");
                window.alert(data.error);
            }
            else {
                window.alert("Submitted Successful!");
                console.log("Submitted Successful!");
            }
        }
    }

    return (
        <div>
            <section className="home">
                <div className={`content ${activeIndex === 0 ? 'active' : ''}`}>
                    <video className="video-slider" src={floatinggarlic} autoPlay muted loop></video>
                </div>

                <div className={`content ${activeIndex === 1 ? 'active' : ''}`}>
                    <video className="video-slider" src={floatingchili} autoPlay muted loop></video>
                </div>

                <div className={`content ${activeIndex === 2 ? 'active' : ''}`}>
                    <video className="video-slider" src={floatinglemon} autoPlay muted loop></video>
                </div>

                <div className={`content ${activeIndex === 0 ? 'active' : ''}`}>
                    <h1 className="txt">GARLIC PICKLE</h1>
                    <center><p className="p">20% OFF</p></center>
                    <center><Link to="/products"><button className="btn">BUY NOW</button></Link></center>
                </div>

                <div className={`content ${activeIndex === 1 ? 'active' : ''}`}>
                    <center><h1 className="txt">CHILI PICKLE</h1></center>
                    <center><p className="p">40% OFF</p></center>
                    <center><Link to="/products"><button className="btn">BUY NOW</button></Link></center>
                </div>

                <div className={`content ${activeIndex === 2 ? 'active' : ''}`}>
                    <center><h1 className="txt">LEMON PICKLE</h1></center>
                    <center><p className="p">60% OFF</p></center>
                    <center><Link to="/products"><button className="btn">BUY NOW</button></Link></center>
                </div>

                <div className="slider-navigation-icon">
                    <div className={`nav-btn ${activeIndex === 0 ? 'active' : ''}`} onClick={() => sliderNav(0)}></div>
                    <div className={`nav-btn ${activeIndex === 1 ? 'active' : ''}`} onClick={() => sliderNav(1)}></div>
                    <div className={`nav-btn ${activeIndex === 2 ? 'active' : ''}`} onClick={() => sliderNav(2)}></div>
                </div>
            </section>

            <div className="MainProduct">
                <div className="title">
                    <h1 className="titletext">PRODUCT</h1>
                </div>
                <div className="product1">
                    <div className="productimg"><center><img src={limeProduct} alt=""></img></center></div>
                    <div><center><Link to="/products"><button>BUY NOW</button></Link></center></div>
                </div>

                <div className="product2">
                    <div className="productimg"><center><img src={garlicProduct} alt=""></img></center></div>
                    <div><center><Link to="/products"><button>BUY NOW</button></Link></center></div>
                </div>

                <div className="product3">
                    <div className="productimg"><center><img src={SichezwanProduct} alt=""></img></center></div>
                    <div><center><Link to="/products"><button>BUY NOW</button></Link></center></div>
                </div>
            </div>


            <div className="homeimportant">
                <div className="importanttitle"><h1>IMPORTANT</h1></div>
                <div className="importantdes">
                    <p>Well, pickles are known for their impressive shelf life.
                        Unopened store-bought pickles can last for up to 1-2 years past their expiration date if stored properly.
                        Homemade pickles, on the other hand, have a shorter lifespan of about 1-2 months in the refrigerator.
                        Once opened, pickles should be consumed within 1-2 months for optimal taste and texture. However,
                        don’t fret if you find a forgotten jar in the back of your fridge. While the quality may deteriorate,
                        pickles can still be safe to eat even after their recommended shelf life. Just give them a sniff and a taste test before indulging!
                        <br></br>
                        By visiting our site and/ or purchasing something from us, you engage in our “Service” and agree to be bound by the following terms and conditions (“Terms of Service”, “Terms”), including those additional terms and conditions and policies referenced herein and/or available by hyperlink.
                        These Terms of Service apply  to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/ or contributors of content.
                    </p>

                </div>
                <div className="importantbutton"><Link to="/about"><button>READ MORE</button></Link></div>
            </div>

            <div className="footer">
                <div className="contactformbanner">
                    <div>
                        <h1>CONTACT</h1>
                    </div>
                    <div>
                        <form method="POST">
                            <div className="contactform">
                                <div><center><input type="text" name="name" value={contact.name} onChange={handleInputs} placeholder="Username" ></input></center></div>
                                <div><center><input type="email" name="email" value={contact.email} onChange={handleInputs} placeholder="Email"></input></center></div>
                                <div><center><textarea rows={6} cols={6} name="message" value={contact.message} onChange={handleInputs} placeholder="Message"></textarea></center></div>
                                <div><center><button type="submit" name='contact' onClick={PostData}>SUBMIT</button></center></div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="footerinfo">
                    <div className="socialicon">
                        <div><a href="https://www.instagram.com/m2lo.official/"><Icon icon="basil:instagram-solid" color="white" width="50" /></a></div>
                        <div><a href="https://www.youtube.com/channel/UCs48CGJ6wAtvHoBXmh9e5ww"><Icon icon="bi:youtube" color="white" width="50" /></a></div>
                        <div><a href="https://twitter.com/m2lo_official"><Icon icon="formkit:twitter" color="white" width="50" /></a></div>
                        <div><a href="https://www.facebook.com"><Icon icon="ic:baseline-facebook" color="white" width="50" /></a></div>
                    </div>

                    <div className="footertxt1">
                        <p>
                            For any queries, concerns, requests or suggestions, please feel free to contact us through Social Media
                        </p>
                    </div>

                    <div className="footertxt2">
                        <p>
                            Pick’nEat Ltd Copyright ©2023. All Rights Reserved Terms of Use | Privacy Policy | System Usage Policy
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Homepage;
