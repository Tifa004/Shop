import "./styles/footer.css";
import logo from "./assets/logo.png";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="contact-info">
        <h4>Contact Us</h4>
        <p>Phone: +1 (555) 123-4567</p>
        <p>Email: shopify@fake.com</p>
      </div>
      <div className="footer-shopify">
        <img src={logo} alt="Shopify" />
      </div>
    </footer>
  );
};

export default Footer;
