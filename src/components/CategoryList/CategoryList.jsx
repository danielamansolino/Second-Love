import './CategoryList.css'
export default function CategoryList({ categories, activeCat, setActiveCat }) {
    const cats = categories.map(cat =>
      <div
        key={cat}
        className={cat === activeCat ? 'active' : ''}
        onClick={() => setActiveCat(cat)}
        id='itemsCategory'
      >
        <img src={cat.picture} alt={cat.name} /> 
        {cat} 
        
      </div>
    );
    return (
      <div className="CategoryList">
        
        {cats}
      </div>
    );
  }