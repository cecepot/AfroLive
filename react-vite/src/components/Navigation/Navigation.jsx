import { NavLink, useLocation } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { HiTicket } from "react-icons/hi2";


function Navigation() {

  const location = useLocation();
  const showProfileButton = location.pathname !== "/landing" && location.pathname !== "/signup";



  return (
    showProfileButton &&
    <div className="nav-bar">
      <div>
        <NavLink to="/">Home</NavLink>
      </div>
      <div>
        <NavLink>About</NavLink>
      </div>
      <div>
        <NavLink>Location</NavLink>
      </div>
      <div>
        <ProfileButton />
      </div>
      <div className="profile-button">
        <HiTicket className="ticket-icon"/>
        Cart
      </div>
    </div>
  );
}

export default Navigation;
