import { useState, useEffect } from "react";
import "./styles/shop.css";
import Navbar from "./Navbar";
import { useOutletContext } from "react-router";

const useProducts = () => {
  const [list, setList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((res) =>
        setList(
          res
            .sort(() => Math.random() - 0.5)
            .slice(0, 4)
            .map((item) => ({ ...item, quantity: 0 }))
        )
      )
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);
  return { list, error, loading };
};

const Shop = () => {
  const { list, error, loading } = useProducts();
  const { amount, setAmount, cart, setCart } = useOutletContext();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A Network error was encountered</p>;
  const register = (item) => {
    if (item.quantity > 0) {
      setAmount((prev) => prev + item.quantity);
      setCart((prevCart) => {
        const cartItem = prevCart.find((cartItem) => cartItem.id === item.id);

        if (cartItem) {
          return prevCart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
              : cartItem
          );
        } else {
          return [...prevCart, { ...item }];
        }
      });
    } else {
      alert(`Please select a quantity for ${item.title}`);
    }
  };
  const handleQuantity = (item, e) => {
    let value = Number(e.target.value);
    if (Number.isNaN(value)) value = 0;

    value = Math.min(999, Math.max(0, value));

    e.target.value = value;
    item.quantity = value;
  };

  return (
    <>
      <div className="items">
        {list.map((item, index) => (
          <div key={index} className="item">
            <div className="pic">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="info">
              <div className="name-price">
                <div className="name">{item.title}</div>
                <div className="price">{item.price}$</div>
              </div>
              <div className="amount">
                <label className="quantity-label">Quantity:</label>
                <input
                  type="number"
                  className="quantity-input"
                  name="number"
                  min="0"
                  max="999"
                  defaultValue={0}
                  onChange={(e) => handleQuantity(item, e)}
                />
              </div>
            </div>
            <button className="add-to-cart" onClick={() => register(item)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Shop;
