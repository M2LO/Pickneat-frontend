import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useContext } from "react";
import { ShopContext } from "../context/shopcontext";

function Navbar() {
  const { cartItems } = useContext(ShopContext);
  const totalQuantity = Object.values(cartItems).reduce(
    (total, quantity) => total + quantity,
    0
  );

  const [userData, setUserData] = useState();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const callNavPage = async () => {
    try {
      const res = await axios.post("/", {
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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <div className="header">
        <Link to="/" className="brand-name">
          pick'neat
        </Link>

        <div className="navigation">
          <div className="navigation-items">
            <Link to="/" className="a">
              <p>Home</p>
            </Link>
            <Link to="/products" className="a">
            <p>Product</p>
            </Link>
            <Link to="/about" className="a">
            <p>About</p>
            </Link>
          </div>
        </div>

        <div className="navigation-icon">
          <div className="navigation-items-icon">
            <Link to="/cart">
              <Icon icon="fluent:cart-16-regular" color="white" width={30} />
            </Link>
            <p>Cart({totalQuantity})</p>
            <div className="dropdown">
              <Icon
                icon="ph:user-bold"
                color="white"
                width={24}
                onClick={toggleDropdown}
                style={{ cursor: "pointer" }}
              />
              {isDropdownOpen && (
                <div className="dropdown-content">
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
            <p>{userData?.name || ""}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
