import React, { useContext } from "react";
import CartContext from "../../Store/cart-context";
import Modal from "../UI/Modal";
import "./Cart.css";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  console.log(cartCtx);

  const onCartHandler = () => {
    props.setCartOpen(false);
  };

  const onPlcaeOrderHandler = () => {
    cartCtx.placeItem();
  }

  const consolidatedItems = cartCtx.items.reduce((acc, item) => {
    const key = `${item.id}-${item.name}`;

    if (!acc[key]) {
      acc[key] = { ...item, sizes: { [item.size]: item.amount } };
    } else {
      if (!acc[key].sizes[item.size]) {
        acc[key].sizes[item.size] = item.amount;
      } else {
        acc[key].sizes[item.size] += item.amount;
      }

      acc[key].amount += item.amount;
    }

    return acc;
  }, {});

  const cartItemDetails = Object.values(consolidatedItems).map((item) => (
    <div key={`${item.id}-${item.name}`}>
      <h1>{item.name}</h1>
      {Object.entries(item.sizes).map(([size, quantity]) => (
        <span key={size}>
          {size} ({quantity}),{" "}
        </span>
      ))}
      <br />
    </div>
  ));

  return (
    <Modal>
      <div className="cart-items">
        {cartItemDetails}
        <h3>Total: {cartCtx.totalAmount}</h3>
        <button onClick={onCartHandler}>Close </button>
        <button onClick={onPlcaeOrderHandler}>Place Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
