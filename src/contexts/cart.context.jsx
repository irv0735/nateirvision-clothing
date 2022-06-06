import { createContext, useReducer } from 'react';

import { createAction } from '../utils/reducer/reducer.utils';

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  if(existingCartItem) {
    return cartItems.map((cartItem) => cartItem.id === productToAdd.id 
    ? {...cartItem, quantity: cartItem.quantity + 1 }
    : cartItem
    );
  }
  return [...cartItems, {...productToAdd, quantity: 1}];
};

const removeCartItem = (cartItems, productToRemove) => {
  return cartItems.filter((cartItem) => cartItem !== productToRemove)
};

const decreaseCount = (cartItems, productToDecrease) => {
  if (productToDecrease.quantity === 1) {
    const newCart = removeCartItem(cartItems, productToDecrease)
    return newCart
  } else {
    return cartItems.map((cartItem) => cartItem.id === productToDecrease.id 
    ? {...cartItem, quantity: cartItem.quantity - 1 }
    : cartItem
    );
  }
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [], 
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  decreaseItemCount: () => {}, 
  cartCount: 0, 
  cartTotal: 0
});

export const CART_ACTION_TYPES = {
  TOGGLE_CART_OPEN: 'TOGGLE_CART_OPEN',
  SET_CART_ITEMS: 'SET_CART_ITEMS'
}

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch(type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      }
    case CART_ACTION_TYPES.TOGGLE_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload
      }
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0, 
}

export const CartProvider = ({ children }) => {

  const [ { cartItems, cartCount, cartTotal, isCartOpen }, dispatch ] = useReducer(cartReducer, INITIAL_STATE)

  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.TOGGLE_CART_OPEN, bool));
  };
  
  const updateCartItemsReducer = (newCartItems) => {
    
    const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity*cartItem.price, 0)

    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, { cartItems: newCartItems, cartTotal: newCartTotal, cartCount: newCartCount }));
  }

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const decreaseItemCount = (productToDecrease) => {
    const newCartItems = decreaseCount(cartItems, productToDecrease);
    updateCartItemsReducer(newCartItems);
  };

  const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, decreaseItemCount, cartItems, cartCount, cartTotal };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}