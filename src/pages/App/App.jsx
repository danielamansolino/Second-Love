import { useState, useEffect, useRef } from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import './App.css';
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import AuthPage from '../AuthPage/AuthPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import NavBar from '../../components/NavBar/NavBar'
import MenuItemDetail from '../../components/MenuItemDetail/MenuItemDetail';
import Cart from '../Cart/Cart'
import { getUser } from '../../utilities/users-service';
import * as itemsAPI from '../../utilities/items-api'
import * as ordersAPI from '../../utilities/orders-api'
import { useLocation } from 'react-router-dom';

export default function App() {
  const [user, setUser] = useState(getUser());
  const [menuItems, setMenuItems] = useState([]);
  const [activeCat, setActiveCat] = useState('');
  const [cart, setCart] = useState(null);
  const categoriesRef = useRef([]);
  const { itemId } = useParams();
  const location = useLocation();
  
  async function getCart() {
    const cart = await ordersAPI.getCart();
    setCart(cart);
  }

  useEffect(function() {
    async function getItems() {
      const items = await itemsAPI.getAll();
      // Remove dups of category names using a Set, then spread Set back into an array literal
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
  //  async function handleAddToOrder(itemId) {
  //   // Baby step
  //   // alert(`add item: ${itemId}`);
  //   // alert(`add item: ${itemId}`);
  //   // 1. Call the addItemToCart function in ordersAPI, passing to it the itemId, and assign the resolved promise to a variable named cart.
  //   // 2. Update the cart state with the updated cart received from the server
  //   const updatedCart = await ordersAPI.addItemToCart(itemId)
  //   setCart(updatedCart)
  // }



  return (
    <main className="App">
      { user ?
        <>
        <NavBar user={user} setUser={setUser}/>
        <Routes>
          <Route 
            path="/orders/new" 
            element={
              <NewOrderPage 
                user={user} 
                setUser={setUser} 
                menuItems={menuItems} 
                setMenuItems={setMenuItems} 
                activeCat={activeCat} 
                setActiveCat={setActiveCat} 
                cart={cart} setCart={setCart} 
                categoriesRef={categoriesRef} 
                // handleAddToOrder={handleAddToOrder}
                />
              } 
            />
          {/* <Route path="/orders/new" element={<NewOrderPage user={user} setUser={setUser} menuItems={menuItems} setMenuItems={setMenuItems} activeCat={activeCat} setActiveCat={setActiveCat} cart={cart} setCart={setCart} categoriesRef={categoriesRef} handleAddToOrder={handleAddToOrder}/>} /> */}
          <Route 
          path="/orders" 
          element={
            <OrderHistoryPage 
              user={user} 
              setUser={setUser} 
            />
            } 
          />
          <Route 
            path="/orders/cart" 
            element={
            <Cart 
              user={user} 
              setUser={setUser} 
              menuItems={menuItems} 
              setMenuItems={setMenuItems} 
              activeCat={activeCat} 
              setActiveCat={setActiveCat} 
              getCart={getCart} 
              cart={cart} 
              setCart={setCart}
              />
            } 
          />
          <Route 
          path="/items/:itemId" 
          element={
            <MenuItemDetail 
              user={user} 
              setUser={setUser} 
              menuItems={menuItems} 
              setMenuItems={setMenuItems} 
              activeCat={activeCat} 
              setActiveCat={setActiveCat} 
              // itemId={itemId}
              // menuItem={menuItems.find(item => item._id === itemId)}
              // menuItem={location.state?.menuItem}
              // handleAddToOrder={handleAddToOrder}
              />
            } 
          />
          {/* <Route path="/orders/new/items/:itemId" element={<MenuItemDetail />} /> */}
          {/* redirect to /orders/new if path in address bar hasn't matched a <Route> above */}
          <Route path="/*" element={<Navigate to="/orders/new" />} />
        </Routes>
        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
    
}


