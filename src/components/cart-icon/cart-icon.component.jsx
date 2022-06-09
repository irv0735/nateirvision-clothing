import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { useSelector, useDispatch } from 'react-redux';

import { selectIsCartOpen, selectCartCount } from '../../store/cart/cart.selector';
import { toggleCartStatus } from '../../store/cart/cart.action';

import { CartIconContainer, ItemCount } from './cart-icon.styles.jsx';

const CartIcon = () => {

  const dispatch = useDispatch();

  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);

  const toggleIsCartOpen = () => dispatch(toggleCartStatus(!isCartOpen));

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon style={{width: '24px', height: '24px'}} />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )

}

export default CartIcon;