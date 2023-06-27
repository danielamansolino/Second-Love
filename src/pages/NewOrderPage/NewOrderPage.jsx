import { useState, useEffect, useRef } from 'react';
import * as itemsAPI from '../../utilities/items-api'
import * as ordersAPI from '../../utilities/orders-api'
import { Link, useNavigate } from 'react-router-dom';
import MenuList from '../../components/MenuList/MenuList';
import CategoryList from '../../components/CategoryList/CategoryList';
import OrderDetail from '../../components/OrderDetail/OrderDetail';
import UserLogOut from '../../components/UserLogOut/UserLogOut';

export default function NewOrderPage({ user, setUser }) {
  const [menuItems, setMenuItems] = useState([]);
  const [activeCat, setActiveCat] = useState('');
  const [cart, setCart] = useState(null);
  const categoriesRef = useRef([]);
  const navigate = useNavigate();

  useEffect(function() {
    async function getItems() {
      const items = await itemsAPI.getAll();
      // Remove dups of category names using a Set, then spread Set back into an array literal
      // categoriesRef.current = [...new Set(items.map(item => item.category.name))];
      // categoriesRef.current = [...new Set(items.map(item => item.category))];
      // categoriesRef.current = [...new Set(items.map(item => ({ name: item.category.name, picture: item.category.picture})))];
      const uniqueCategories = Array.from(new Set(items.map(item => item.category.name)));
      categoriesRef.current = uniqueCategories.map(name => ({
        name,
        picture: items.find(item => item.category.name === name).category.picture
      }));
      setMenuItems(items);
      setActiveCat(categoriesRef.current[0]);
    }
    getItems();
     // Load cart (a cart is the unpaid order for the logged in user)
    async function getCart() {
      const cart = await ordersAPI.getCart();
      setCart(cart);
  }
  getCart();

  }, []);

  /*--- Event Handlers  ---*/ 
  async function handleAddToOrder(itemId) {
    // Baby step
    // alert(`add item: ${itemId}`);
    // alert(`add item: ${itemId}`);
    // 1. Call the addItemToCart function in ordersAPI, passing to it the itemId, and assign the resolved promise to a variable named cart.
    // 2. Update the cart state with the updated cart received from the server
    const updatedCart = await ordersAPI.addItemToCart(itemId)
    setCart(updatedCart)
  }

  async function handleChangeQty(itemId, newQty) {
    const updatedCart = await ordersAPI.setItemQtyInCart(itemId, newQty);
    setCart(updatedCart);
  }

  async function handleCheckout() {
    await ordersAPI.checkout();
    navigate('/orders');
  }
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
        handleAddToOrder={handleAddToOrder}
      />
      <br/>
      <OrderDetail order={cart} handleChangeQty={handleChangeQty} handleCheckout={handleCheckout}/>
      <br/>
      <Link to="/orders" className="button btn-sm">PREVIOUS ORDERS</Link>
      <br/><br/>
      <UserLogOut user={user} setUser={setUser} />
    </main>
    );
  }