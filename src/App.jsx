import "./styles/App.css";
import logo from "./assets/logo.png";
import { Link } from "react-router";

const App = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <img className="shopify-logo" src={logo} alt="Shopify Logo" />
        <h1>Welcome to Our Store!</h1>
        <p>
          Buy products easily and securely. Our platform makes shopping simple,
          fast, and fun. Explore our selection and enjoy seamless checkout
          experience powered by Shopify.
        </p>
        <Link to="/shop" className="shop-now">
          Shop Now
        </Link>
      </section>
    </div>
  );
};

export default App;
