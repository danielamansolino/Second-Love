import MenuList from '../../components/MenuList/MenuList';
import CategoryList from '../../components/CategoryList/CategoryList';
import UserLogOut from '../../components/UserLogOut/UserLogOut';

export default function NewOrderPage({ user, setUser,menuItems, setMenuItems, activeCat, setActiveCat, cart, setCart, categoriesRef, handleAddToOrder }) {
  
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
      <br/><br/>
      <UserLogOut user={user} setUser={setUser} />
    </main>
    );
  }