import './checkout.styles.scss';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const Checkout = () => {

  const { cartItems } = useContext(CartContext);

  return (
    <div className='checkout-container'>
      <h1 className='checkout-header'>Cart</h1>
      {cartItems.map((cartItem) => 
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      )}
    </div>
  )
}

export default Checkout;