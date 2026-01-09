import "./styles/navbar.css";
import Footer from "./Footer";
import { Outlet, Link } from "react-router";
import { useState } from "react";

const Navbar = () => {
  const [amount, setAmount] = useState(0);
  const [cart, setCart] = useState([]);
  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/cart">Cart</Link>
        </div>
        <div className="nav-right">
          <img
            className="profile-pic"
            src="https://i.pravatar.cc/40"
            alt="Profile"
          />
          <Link to="/cart">
            <span className="cart-icon">🛒 {amount}</span>
          </Link>
        </div>
      </nav>

      <main className="main-content">
        <Outlet context={{ amount, setAmount, cart, setCart }} />
      </main>

      <Footer />
    </div>
  );
};

export default Navbar;
