import { CartDropDownContainer, CartItems, EmptyCart } from './cart-dropdown.styles';

import { useNavigate } from 'react-router-dom';

import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

const CartDropdown = () => {

  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate('/checkout')
  }

  return (
    <CartDropDownContainer>
      <CartItems>
        {
          cartItems.length ? 
          (
            cartItems.map(item => <CartItem key={item.id} cartItem={item} />)
          ) :
          (
            <EmptyCart>Your cart is empty</EmptyCart>
          )
        }
      </CartItems>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </CartDropDownContainer>
  );
};

export default CartDropdown;