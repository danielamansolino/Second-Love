import { Link } from 'react-router-dom';
import * as userService from "../../utilities/users-service";
import './NavBar.css';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }
  return (
    <div className='nav'>
       <Link to="/orders/cart" className="nav-link" id='cart'><img src={'https://imgur.com/C0hdTG6.png'} alt={'CART'} /></Link>
       <h1>Second Love</h1>
      <nav>
        <Link to="/orders" className="nav-link">Order History</Link>
        &nbsp; | &nbsp;
        <Link to="/orders/new" className="nav-link">New Order</Link>
        &nbsp; | &nbsp;
        <span>Welcome, {user.name}</span>
        &nbsp; | &nbsp;
        <Link to="" onClick={handleLogOut} className="nav-link">Log Out</Link>
      </nav>
      
    </div>
  );
}
