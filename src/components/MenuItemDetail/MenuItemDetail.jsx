import '../MenuListItem/MenuListItem.css';

export default function MenuItemDetail({ menuItem, handleAddToOrder }) {
  console.log('this is menuItem in MenuItemDetail', menuItem)
  const isItemAvailable = menuItem.stock > 0;

  const handleAddToCart = () => {
    if (isItemAvailable) {
      handleAddToOrder(menuItem._id);
    }
  };
  console.log('this is menuItem', menuItem)
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