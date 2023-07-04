import './MenuListItem.css';
import { Link } from 'react-router-dom'

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
        <Link to={`/items/${menuItem._id}`}>
        <img src={menuItem.picture} alt={menuItem.name} />
        </Link>
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