import MenuListItem from '../MenuListItem/MenuListItem';
import './MenuList.css'


export default function MenuList({ menuItems, handleAddToOrder }) {
  const items = menuItems.map(item =>
    <MenuListItem
      key={item._id}
      menuItem={item}
      handleAddToOrder={handleAddToOrder}
    />  
  );

  return (
    <main className="MenuList">
      {items}
    </main>
  );
}