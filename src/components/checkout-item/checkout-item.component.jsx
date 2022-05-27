import './checkout-item.styles.scss';

import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CheckoutItem = ({ cartItem } ) => {

  const { name, imageUrl, quantity, price } = cartItem;
  const { removeItemFromCart, decreaseItemCount, addItemToCart } = useContext(CartContext);

  const decreaseQuantity = () => decreaseItemCount(cartItem)
  const increaseQuantity = () => addItemToCart(cartItem)
  const handleDelete = () => removeItemFromCart(cartItem)

  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={name}></img>
      </div>
      <div className='name'>{name}</div>
      <div className='quantity'>
        <span className='arrow' onClick={decreaseQuantity}>&#10094;</span>
        <span className='value'>{quantity}</span>
        <span className='arrow' onClick={increaseQuantity}>&#10095;</span>
      </div>
      <div className='price'>{price * quantity}</div>
      <div className='remove-button' onClick={handleDelete}>&#10005;</div>
    </div>
  )
}

export default CheckoutItem;