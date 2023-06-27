import { useState, useEffect, useRef } from 'react';
import * as itemsAPI from '../../utilities/items-api'
import { Link } from 'react-router-dom';
import MenuList from '../../components/MenuList/MenuList';
import CategoryList from '../../components/CategoryList/CategoryList';
import OrderDetail from '../../components/OrderDetail/OrderDetail';
import UserLogOut from '../../components/UserLogOut/UserLogOut';

export default function NewOrderPage({ user, setUser }) {
  const [menuItems, setMenuItems] = useState([]);
  const [activeCat, setActiveCat] = useState('');
  const categoriesRef = useRef([]);

  useEffect(function() {
    async function getItems() {
      const items = await itemsAPI.getAll();
      // Remove dups of category names using a Set, then spread Set back into an array literal
      categoriesRef.current = [...new Set(items.map(item => item.category.name))];
      setMenuItems(items);
      setActiveCat(categoriesRef.current[0]);
    }
    getItems();
  }, []);

  return (
    <main className="NewOrderPage">
      <aside>
      <br/>
        <CategoryList
        categories={categoriesRef.current}
        activeCat={activeCat}
        setActiveCat={setActiveCat}
        /> <br/>
      </aside>
      <MenuList
        menuItems={menuItems.filter(item => item.category.name === activeCat)}
      />
      <br/>
      <OrderDetail />
      <br/>
      <Link to="/orders" className="button btn-sm">PREVIOUS ORDERS</Link>
      <br/><br/>
      <UserLogOut user={user} setUser={setUser} />
    </main>
    );
  }