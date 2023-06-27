import './CategoryList.css'
export default function CategoryList({ categories, activeCat, setActiveCat }) {
    const cats = categories.map(cat =>
      // <div
      //   key={cat}
      //   className={cat === activeCat ? 'active' : ''}
      //   onClick={() => setActiveCat(cat)}
      //   id='itemsCategory'
      // >
      //   <img src={'https://imgur.com/yDOPADJ.png'} style={{height:'80px', width:'80px' }} alt={cat.name} />
      //   <br/>
      //   <div>{cat}</div>
        
      // </div>
      <div
      style={{ height: '80px', width: '80px' }}
      key={cat}
      className={cat.name === activeCat ? 'active' : ''}
      onClick={() => setActiveCat(cat.name)}
      id="itemsCategory"
    >
      <img src={cat.picture} style={{ height: '50px', width: '50px' }} alt={cat.name} />
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