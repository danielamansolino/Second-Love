// import './MenuListItem.css'
// export default function MenuListItem({ menuItem, handleAddToOrder }) {
//   return (
//     <div className="MenuListItem">
//       <div className="picture">
//         <img src={menuItem.picture} alt={menuItem.name} />
//       </div>
//       <div className="name">{menuItem.name}</div>
//       <div className="buy">
//         <span>${menuItem.price.toFixed(2)}</span>
//         <br/>
//         <button className="btn-sm"  onClick={() => handleAddToOrder(menuItem._id)}>
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// }



import './MenuListItem.css';

export default function MenuListItem({ menuItem, handleAddToOrder }) {
  const isItemAvailable = menuItem.stock > 0;

  const handleAddToCart = () => {
    if (isItemAvailable) {
      handleAddToOrder(menuItem._id);
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