import './CategoryList.css'
export default function CategoryList({ categories, activeCat, setActiveCat }) {
    const cats = categories.map(cat =>
      <div
      style={{ height: '80px', width: '80px' }}
      key={cat}
      className={cat.name === activeCat ? 'active' : ''}
      onClick={() => setActiveCat(cat.name)}
      id="itemsCategory"
    >
      <img src={cat.picture} style={{ height: '150px', width: '150px' }} alt={cat.name} />
      {cat.name}
    </div>
    );
    console.log("this is cats", cats)
    return (
      <div className="CategoryList">
        {cats}
      </div>
    );
  }