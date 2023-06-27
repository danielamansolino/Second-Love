import './MenuListItem.css'
export default function MenuListItem({ menuItem, handleAddToOrder }) {
  return (
    <div className="MenuListItem">
      <div className="picture">
        <img src={menuItem.picture} alt={menuItem.name} />
      </div>
      <div className="name">{menuItem.name}</div>
      <div className="buy">
        <span>${menuItem.price.toFixed(2)}</span>
        <br/>
        <button className="btn-sm" onClick={() => handleAddToOrder(menuItem._id)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}