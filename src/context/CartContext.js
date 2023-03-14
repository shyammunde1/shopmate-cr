import { createContext, useContext, useReducer } from "react";
import { cartReducer } from "../reducer/cartReducer";

const initialState = {
  cartList: [],
  total: 0,
};

const CartContext = createContext(initialState);

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => {
    const updatedCartlist = state.cartList.concat(product);
    updateTotal(updatedCartlist);
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        products: updatedCartlist,
      },
    });
  };
  const removeFromCart = (product) => {
    const updatedCartlist = state.cartList.filter(
      (current) => current.id !== product.id
    );
    updateTotal(updatedCartlist);
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: {
        products: updatedCartlist,
      },
    });
  };

  const updateTotal = (products) => {
    let total = 0;
    products.forEach(product => total = total + product.price);
    dispatch({
      type: "UPDATE_TOTAL",
      payload: {
        total,
      },
    });
  };

  const value = {
    total: state.total,
    cartList: state.cartList,
    addToCart,
    removeFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  return context;
};
