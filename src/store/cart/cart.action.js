import { createAction } from '../../utils/reducer/reducer.utils'
import { CART_ACTION_TYPES } from './cart.types';

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

export const setCartItems = (cartItemsArray) => 
  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItemsArray);

export const toggleCartStatus = (bool) => 
  createAction(CART_ACTION_TYPES.TOGGLE_CART_STATUS, bool);

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, productToRemove) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const decreaseItemCount = (cartItems, productToDecrease) => {
  const newCartItems = decreaseCount(cartItems, productToDecrease);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};