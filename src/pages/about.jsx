import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './about.css';
import axios from 'axios';

export default function About() {

    const navigate = useNavigate();
    const callAboutPage = async () => {
        try{
            const res = await axios.post('/about', {
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
        <div className="AboutUs">
            <div>
                <h1>ABOUT US</h1>
            </div>

            <div className="aboutustxt">
                <p>The practice of pickling has a rich history that spans over 4000 years.
                    Making pickles at home has been a time-honored tradition that evokes fond childhood memories for many.
                    It reminds us of a time when women of the household would carefully select the finest ingredients, skillfully blend them, and wait patiently for the perfect result.
                    Unfortunately, the art of homemade pickling and its distinctive taste is slowly disappearing as commercial varieties become more prevalent.</p>
                <br></br>
                <p>Growing up in a family where pickle was an essential part of every meal, we were accustomed to having a variety of pickles on our dining table.
                    My Grandmother’s pickles were especially famous for their delicious taste.
                    She had acquired the art of making Telangana and Andhra Pickles after being raised in Amalapuram, Andhra Pradesh, and getting married in Hyderabad.
                    My mother-in-law learned the recipes from her and became an expert in making them. Eventually, the tradition was passed down to Prasanna, the Founder of Pickle Story.
                    We have been making our homemade pickles for years and have gifted them to friends and family who appreciate their unique flavor. Their appreciation and encouragement inspired us to start Pickle Story.</p>
                <br></br>
                <p>Prasanna’s culinary expertise extends beyond her excellent mango pickles.
                    She is renowned for her spice powders, especially her Curry Leaf powder, Idly Powder (also known as Molaga Podi, and Idly Karam.
                    She crafts 21 distinct types of powders and 18 varieties of pickles, each of which pairs exceptionally well with steaming hot rice and a drizzle of ghee.
                    Prasanna’s talents also extend to tomato pickle and Gongura Pachadi, which she prepares with great skill.</p>
                <br></br>
                <p>Over the past three years, Pickle Story has enhanced the dining experience of more than 5000 households, both in India and overseas.
                    The company has a diverse clientele spread throughout India and also caters to many Indian households in countries such as the USA, Singapore, Australia, Canada, the UK, and Germany.
                    It’s time to savor the original taste of pickles and powders, using recipes that have been passed down from generation to generation. Note that we do not utilize any artificial preservatives or colors.</p>
            </div>
        </div>
    )
}