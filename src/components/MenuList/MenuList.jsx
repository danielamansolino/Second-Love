import MenuListItem from '../MenuListItem/MenuListItem';
import './MenuList.css'
import { Link } from 'react-router-dom';


export default function MenuList({ menuItems, handleAddToOrder }) {
  const items = menuItems.map(item =>
    <MenuListItem
      key={item._id}
      menuItem={item}
      handleAddToOrder={handleAddToOrder}
    />  
  );

  // const items = menuItems.map(item => (
  //   <Link key={item._id} to={`/items/${item._id}`} state={{ menuItem: item }} handleAddToOrder={handleAddToOrder}>
  //     <MenuListItem menuItem={item} />
  //   </Link>
  // ));

  // const items = menuItems.map(item => (
  //   <div key={item._id}>
  //     <Link to={`/items/${item._id}`} state={{ menuItem: item }}>
  //       <MenuListItem menuItem={item} />
  //     </Link>
  //     <button className="btn-sm" onClick={() => handleAddToOrder(item._id)}>
  //       Add to Cart
  //     </button>
  //   </div>
  // ));



  return (
    <main className="MenuList">
      {items}
    </main>
  );
}