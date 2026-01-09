import { useState, useEffect } from "react";
import "./styles/cart.css";
import { useOutletContext } from "react-router";
const Cart = () => {
  const { cart, setCart, amount, setAmount } = useOutletContext();
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const newTotal = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(Number(newTotal.toFixed(2)));
  }, [cart]);
  const removeItem = (itemId) => {
    const itemToRemove = cart.find((item) => item.id === itemId);
    if (itemToRemove) {
      setAmount((prev) => prev - itemToRemove.quantity);
      setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    }
  };
  if (cart.length === 0)
    return (
      <div className="cart-container">
        <h2>Your cart is empty</h2>
      </div>
    );
  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <ul className="cart-list">
        {cart.map((item) => (
          <li key={item.id} className="cart-item">
            <img
              src={item.image}
              alt={item.title}
              className="cart-item-image"
            />
            <div className="cart-item-details">
              <h3 className="cart-item-title">{item.title}</h3>
              <p className="cart-item-quantity">Quantity: {item.quantity}</p>
              <p className="cart-item-price">
                Price: {item.price * item.quantity}$
              </p>
              <div className="cart-item-actions">
                <button
                  className="remove-item-button"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
                <div className="quantity-controls">
                  <button
                    className="change-quantity-button"
                    onClick={() => {
                      if (item.quantity > 0) {
                        setCart((prevCart) =>
                          prevCart.map((cartItem) =>
                            cartItem.id === item.id
                              ? { ...cartItem, quantity: item.quantity - 1 }
                              : cartItem
                          )
                        );
                        setAmount((prev) => prev - 1);
                      }
                    }}
                  >
                    -
                  </button>
                  <button
                    className="change-quantity-button"
                    onClick={() => {
                      setCart((prevCart) =>
                        prevCart.map((cartItem) =>
                          cartItem.id === item.id
                            ? { ...cartItem, quantity: item.quantity + 1 }
                            : cartItem
                        )
                      );
                      setAmount((prev) => prev + 1);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="cart-item-separator"></div>
          </li>
        ))}
      </ul>
      <div className="total">
        <div className="cart-total">Total Items: {amount}</div>
        <div className="cart-total">Total Price: {total} $</div>
      </div>
    </div>
  );
};

export default Cart;
