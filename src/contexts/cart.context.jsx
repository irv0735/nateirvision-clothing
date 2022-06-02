import { createContext, useEffect, useReducer } from 'react';

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
  ADD_ITEM_TO_CART: 'ADD_ITEM_TO_CART',
  REMOVE_ITEM_FROM_CART: 'REMOVE_ITEM_FROM_CART',
  DECREASE_ITEM_COUNT: 'DECREASE_ITEM_COUNT', 
  SET_CART_COUNT: 'SET_CART_COUNT',
  SET_CART_TOTAL: 'SET_CART_TOTAL'
}

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch(type) {
    case CART_ACTION_TYPES.TOGGLE_CART_OPEN:
      return {
        ...state,
        isCartOpen: !payload
      }
    case CART_ACTION_TYPES.ADD_ITEM_TO_CART:
      return {
        ...state,
        cartItems: [...addCartItem(payload.cartItems, payload.productToAdd)]
      }
    case CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: [...removeCartItem(payload.cartItems, payload.productToRemove)]
      }
    case CART_ACTION_TYPES.DECREASE_ITEM_COUNT:
      return {
        ...state,
        cartItems: [...decreaseCount(payload.cartItems, payload.productToDecrease)]
      }
    case CART_ACTION_TYPES.SET_CART_COUNT:
      return {
        ...state,
        cartCount: payload
      }
    case CART_ACTION_TYPES.SET_CART_TOTAL:
      return {
        ...state,
        cartTotal: payload
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

  const [ { isCartOpen, cartItems, cartCount, cartTotal }, dispatch ] = useReducer(cartReducer, INITIAL_STATE)
  // const [isCartOpen, setIsCartOpen] = useState(false);
  // const [cartItems, setCartItems] = useState([]);
  // const [cartCount, setCartCount] = useState(0);
  // const [cartTotal, setCartTotal] = useState(0);

  const setIsCartOpen = () => {
    dispatch({ type: CART_ACTION_TYPES.TOGGLE_CART_OPEN });
  }
  
  const addItemToCart = (productToAdd) => {
    dispatch({ type:CART_ACTION_TYPES.ADD_ITEM_TO_CART, payload: {cartItems, productToAdd} });
  }

  const removeItemFromCart = (productToRemove) => {
    dispatch({ type:CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART, payload: {cartItems, productToRemove} });
  }

  const decreaseItemCount = (productToDecrease) => {
    dispatch({ type:CART_ACTION_TYPES.DECREASE_ITEM_COUNT, payload: {cartItems, productToDecrease} });
  }

  const setCartCount = (count) => {
    dispatch({ type:CART_ACTION_TYPES.SET_CART_COUNT, payload: count});
  }
  
  const setCartTotal = (total) => {
    dispatch({ type:CART_ACTION_TYPES.SET_CART_TOTAL, payload: total});
  }

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
    setCartCount(newCartCount);
  }, [cartItems])

  useEffect(() => {
    const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity*cartItem.price, 0)
    setCartTotal(newCartTotal);
  }, [cartItems])

  const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, decreaseItemCount, cartItems, cartCount, cartTotal };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}