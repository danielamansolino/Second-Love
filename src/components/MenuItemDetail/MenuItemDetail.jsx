// import '../MenuListItem/MenuListItem.css';
// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';


// export default function MenuItemDetail({ menuItems, handleAddToOrder}) {
//   console.log('this is menuItems in MenuItemDetail', menuItems)
//   const menuItem = menuItems.find(item => item._id === itemId)

//   const { itemId } = useParams();
//   console.log('this is itemId', itemId)
//   // const [ item, setItem ] = useState(null);

//   // function getItem(){
//   //   return menuItems.find(item => item.id === itemId)
//   // }

//   // useEffect(() => {
//   //   const foundItem = getItem(); 
//   //   setItem(foundItem);
//   // }, [] )

//     if (!menuItem) {
//       // Handle case when menuItem is not found or still loading
//       return <div>Loading...</div>;
//     }
//   // const items = menuItems.map(item => (
//   //   <Link key={item._id} to={`/items/${item._id}`}>
//   //     <MenuListItem menuItem={item} />
//   //   </Link>
//   // ));
//   // const isItemAvailable = menuItem.stock > 0;

//   // const handleAddToCart = () => {
//   //   if (isItemAvailable) {
//   //     handleAddToOrder(menuItem._id);
//   //   }
//   // };
//   console.log('this is menuItem', menuItem)
//   return (
//     // <div className="MenuListItem">
//     //   <div className="picture">
//     //     <img src={menuItem.picture} alt={menuItem.name} />
//     //   </div>
//       <div className="name">{menuItems.name}</div>
//     //   <div className="buy">
//     //     {isItemAvailable ? (
//     //       <>
//     //         <span>${menuItem.price.toFixed(2)}</span>
//     //         <br />
//     //         <button className="btn-sm" onClick={handleAddToCart}>
//     //           Add to Cart
//     //         </button>
//     //       </>
//     //     ) : (
//     //       <div className="unavailable">Item not available</div>
//     //     )}
//     //   </div>
//     // </div>
//   );
// }


import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function MenuItemDetail({ menuItems, handleAddToOrder }) {
  const { itemId } = useParams();
  const menuItem = menuItems.find(item => item._id === itemId);

  useEffect(() => {
    // Additional logic or API calls if needed
  }, [itemId]);

  if (!menuItem) {
    // Handle case when menuItem is not found or still loading
    return <div>Loading...</div>;
  }

  const isItemAvailable = menuItem.stock > 0;

  const handleAddToCart = () => {
    if (isItemAvailable) {
      handleAddToOrder(itemId);
    }
  };

  return (
    <div className="MenuListItem">
      <div className="picture">
        <img src={menuItem.picture} alt={menuItem.name} />
      </div>
      <div className="name">{menuItem.name}</div>
      <div className="buy">
        {isItemAvailable ? (
          <>
            <span>${menuItem.price.toFixed(2)}</span>
            <br />
            <button className="btn-sm" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </>
        ) : (
          <div className="unavailable">Item not available</div>
        )}
      </div>
    </div>
  );
}
