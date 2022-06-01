import { 
  CheckoutItemContainer, 
  ImageContainer, 
  Image, 
  Quantity,
  Arrow, 
  Value, 
  RemoveButton } from './checkout-item.styles.jsx';

import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CheckoutItem = ({ cartItem } ) => {

  const { name, imageUrl, quantity, price } = cartItem;
  const { removeItemFromCart, decreaseItemCount, addItemToCart } = useContext(CartContext);

  const decreaseQuantity = () => decreaseItemCount(cartItem)
  const increaseQuantity = () => addItemToCart(cartItem)
  const handleDelete = () => removeItemFromCart(cartItem)

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