import { useDispatch, useSelector } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart.selector.js';
import { removeItemFromCart, decreaseItemCount, addItemToCart } from '../../store/cart/cart.action.js';

import { 
  CheckoutItemContainer, 
  ImageContainer, 
  Image, 
  Quantity,
  Arrow, 
  Value, 
  RemoveButton } from './checkout-item.styles.jsx';

const CheckoutItem = ({ cartItem }) => {

  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);

  const { name, imageUrl, quantity, price } = cartItem;

  const decreaseQuantity = () => dispatch(decreaseItemCount(cartItems, cartItem));
  const increaseQuantity = () => dispatch(addItemToCart(cartItems, cartItem));
  const handleDelete = () => dispatch(removeItemFromCart(cartItems, cartItem));

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <Image src={imageUrl} alt={name}></Image>
      </ImageContainer>
      <div className='name' style={{width: '23%'}}>{name}</div>
      <Quantity>
        <Arrow onClick={decreaseQuantity}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={increaseQuantity}>&#10095;</Arrow>
      </Quantity>
      <div className='price' style={{width: '23%'}}>{price * quantity}</div>
      <RemoveButton onClick={handleDelete}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  )
}

export default CheckoutItem;