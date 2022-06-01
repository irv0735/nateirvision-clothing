import { CartIconContainer, ItemCount } from './cart-icon.styles.jsx';

import { useContext } from 'react';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import { CartContext } from '../../contexts/cart.context';

const CartIcon = () => {

  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon style={{width: '24px', height: '24px'}} />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )

}

export default CartIcon;