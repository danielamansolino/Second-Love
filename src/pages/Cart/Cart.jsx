import * as ordersAPI from '../../utilities/orders-api'
import { Link, useNavigate } from 'react-router-dom';
import OrderDetail from '../../components/OrderDetail/OrderDetail';
import UserLogOut from '../../components/UserLogOut/UserLogOut';

export default function Cart({ user, setUser, cart, setCart}) {

  const navigate = useNavigate();

  async function handleChangeQty(itemId, newQty) {
    const updatedCart = await ordersAPI.setItemQtyInCart(itemId, newQty);
    setCart(updatedCart);
  }

  async function handleCheckout() {
    await ordersAPI.checkout();
    navigate('/orders');
  }
  
  return (
    <div className="NewOrderPage">
        <br/><br/>
        <Link to="/orders/new" className="button btn-sm">CONTINUE SHOOPING</Link>
        <br/><br/>
        <br/>
        <OrderDetail order={cart} handleChangeQty={handleChangeQty} handleCheckout={handleCheckout} />
        <br/>
        <Link to="/orders" className="button btn-sm">PREVIOUS ORDERS</Link>
        <br/><br/>
        <UserLogOut user={user} setUser={setUser} />
    </div>
    );
  }