import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as ordersAPI from '../../utilities/orders-api';
import UserLogOut from '../../components/UserLogOut/UserLogOut';
import OrderDetail from '../../components/OrderDetail/OrderDetail';
import OrderList from '../../components/OrderList/OrderList';
import './OrderHistoryPage.css'

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
      <div className="order-container">
      <OrderList
        orders={orders}
        activeOrder={activeOrder}
        setActiveOrder={setActiveOrder}
      />
      <div className="order-column">
      <OrderDetail order={activeOrder} />
      <br/><br/>
      <UserLogOut user={user} setUser={setUser} />
      </div>
      </div>
    </main>
  );
}