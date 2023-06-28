import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as ordersAPI from '../../utilities/orders-api';
import UserLogOut from '../../components/UserLogOut/UserLogOut';
import OrderDetail from '../../components/OrderDetail/OrderDetail';
import OrderList from '../../components/OrderList/OrderList';


export default function OrderHistoryPage({ user, setUser }) {
  console.log('this is user in OrderHistoryPage', user)
  const [orders, setOrders] = useState([]);
  const [activeOrder, setActiveOrder] = useState(null);
  console.log('this is activeOrder', activeOrder)
  useEffect(function() {
    async function getOrders() {
      const orders = await ordersAPI.getAllForUser();
      setActiveOrder(orders[0] || null);
      setOrders(orders);
    }
    getOrders();
  }, []);

  return (
    <main className="OrderHistoryPage">
      <aside>
        <br/>
        <Link to="/orders/new" className="button btn-sm">NEW ORDER</Link>
        <br/><br/>
      </aside>
      {/* Render an OrderList component (needs to be coded) */}
      <OrderList
        orders={orders}
        activeOrder={activeOrder}
        setActiveOrder={setActiveOrder}
      />
      <UserLogOut user={user} setUser={setUser} />
      {/* Render the existing OrderDetail component */}
      <OrderDetail order={activeOrder} />
    </main>
  );
}