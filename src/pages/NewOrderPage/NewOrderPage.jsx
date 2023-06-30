import * as ordersAPI from '../../utilities/orders-api'
import MenuList from '../../components/MenuList/MenuList';
import CategoryList from '../../components/CategoryList/CategoryList';
import UserLogOut from '../../components/UserLogOut/UserLogOut';


export default function NewOrderPage({ user, setUser,menuItems, setMenuItems, activeCat, setActiveCat, cart, setCart, categoriesRef }) {
  
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

  // async function handleChangeQty(itemId, newQty) {
  //   const updatedCart = await ordersAPI.setItemQtyInCart(itemId, newQty);
  //   setCart(updatedCart);
  // }

  // async function handleCheckout() {
  //   await ordersAPI.checkout();
  //   navigate('/orders');
  // }
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
      {/* <OrderDetail order={cart} handleChangeQty={handleChangeQty} handleCheckout={handleCheckout} /> */}
      <br/>
      {/* <Link to="/orders" className="button btn-sm">PREVIOUS ORDERS</Link> */}
      <br/><br/>
      <UserLogOut user={user} setUser={setUser} />
    </main>
    );
  }