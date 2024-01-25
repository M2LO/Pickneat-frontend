import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
  Routes,
} from "react-router-dom";
import Navbar from "./components/navbar";
import Homepage from "./pages/homepage";
import { Products } from "./pages/products";
import { ShopContextProvider } from "./context/shopcontext";
import Login from "./login/login";
import Registration from "./createid/registration";
import Scroll from "./components/SmoothScroll";
import About from "./pages/about";
import { Cart } from "./cart/cart";
import Admin from "./admin/admin";
import Checkout from "./report/checkout";
import Thankyou from "./ThankYou/thankyou";

function App() {
  const location = useLocation();
  const pathsWithoutNavbar = ["/login", "/registration", "/admin"];
  const hideNavbar = pathsWithoutNavbar.includes(location.pathname);

  return (
    <div className="App">
      <ShopContextProvider>
        <Scroll />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        {!hideNavbar && <Navbar />}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/thankyou" element={<Thankyou />} />
        </Routes>
      </ShopContextProvider>
    </div>
  );
}

export default App;
