import { useEffect, useRef } from 'react';
import * as itemsAPI from '../../utilities/items-api'
import * as ordersAPI from '../../utilities/orders-api'
import { Link, useNavigate } from 'react-router-dom';
import OrderDetail from '../../components/OrderDetail/OrderDetail';
import UserLogOut from '../../components/UserLogOut/UserLogOut';

export default function Cart({ user, setUser, menuItems, setMenuItems, activeCat, setActiveCat, getCart, cart, setCart}) {
//   const [cart, setCart] = useState(null);
  const categoriesRef = useRef([]);
  const navigate = useNavigate();

  useEffect(function() {
    async function getItems() {
      const items = await itemsAPI.getAll();

      const uniqueCategories = Array.from(new Set(items.map(item => item.category.name)));
      categoriesRef.current = uniqueCategories.map(name => ({
        name,
        picture: items.find(item => item.category.name === name).category.picture
      }));
      setMenuItems(items);
      setActiveCat(categoriesRef.current[0]);
    }
    getItems();

  getCart();

  }, [getCart, setActiveCat, setMenuItems]);

  /*--- Event Handlers  ---*/ 

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