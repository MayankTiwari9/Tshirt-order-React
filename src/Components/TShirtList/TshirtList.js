import React, { useContext } from "react";
import ListContext from "../../Store/list-context";
import CartContext from "../../Store/cart-context";
import "./TshirtList.css";

function TshirtList() {
  const listCtx = useContext(ListContext);
  const cartCtx = useContext(CartContext);

  const addItemToCartHandler = (item, size) => {
    const cartItem = {
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      amount: 1,
      size: size,
    };

    cartCtx.addItem(cartItem);
    listCtx.decreaseItemQuantity(item.id, size);
  };

  return (
    <div className="list-container">
      {listCtx.items &&
        listCtx.items.map((item) => {
          return (
            <div className="list-main" key={item.id}>
              <div>
                <h1>{item.name}</h1>
                <h1>{item.description}</h1>
                <h1>{item.price}</h1>
              </div>
              <div>
                <button onClick={() => addItemToCartHandler(item, "large")}>
                  Buy Large {item.large}
                </button>
                <button onClick={() => addItemToCartHandler(item, "medium")}>
                  Buy Medium {item.medium}
                </button>
                <button onClick={() => addItemToCartHandler(item, "small")}>
                  Buy Small {item.small}
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default TshirtList;
