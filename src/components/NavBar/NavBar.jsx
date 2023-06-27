import { Link } from 'react-router-dom';
import * as userService from "../../utilities/users-service"
import './NavBar.css'

export default function NavBar({ user, setUser }) {
  // console.log('this is setuser in Nav', setUser)
  function handleLogOut() {
    // Delegate to the users-service
    //delete the token from storage 
    userService.logOut();
    // set user to null
    // Update state will also cause a re-render
    setUser(null);
  }
    return (
      <div className='nav'>
        <nav>
          <Link to="/orders">Order History</Link>
          &nbsp; | &nbsp;
          <Link to="/orders/new">New Order</Link>
          &nbsp; | &nbsp;
          <span>Welcome, {user.name}</span>
          &nbsp; | &nbsp;
          <Link to="" onClick={handleLogOut}>Log Out</Link>
        </nav>
        <h1>Second Love</h1>
      </div>
    );
  }