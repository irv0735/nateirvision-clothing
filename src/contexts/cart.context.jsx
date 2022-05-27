import { createContext, useEffect, useState } from 'react';

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
  let updatedCart = [...cartItems];
  return updatedCart.filter((e) => e !== productToRemove)
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
  cartCount: 0
});

export const CartProvider = ({ children }) => {

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
    setCartCount(newCartCount);
  }, [cartItems])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  }

  const decreaseItemCount = (productToDecrease) => {
    setCartItems(decreaseCount(cartItems, productToDecrease));
  }

  const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, decreaseItemCount, cartItems, cartCount };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}