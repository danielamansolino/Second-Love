import MenuListItem from '../MenuListItem/MenuListItem';
import './MenuList.css'
import { Link } from 'react-router-dom';

export default function MenuList({ menuItems, handleAddToOrder }) {
  // const items = menuItems.map(item =>
  //   <MenuListItem
  //     key={item._id}
  //     menuItem={item}
  //     handleAddToOrder={handleAddToOrder}
  //   />  
  // );

  const items = menuItems.map(item => (
    <Link key={item._id} to={`/items/${item._id}`}>
      <MenuListItem menuItem={item} />
    </Link>
  ));
  return (
    <main className="MenuList">
      {items}
    </main>
  );
}