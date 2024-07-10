import { NavLink, useLocation } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { HiTicket } from "react-icons/hi2";




function Navigation() {

  const location = useLocation();

  const showProfileButton = location.pathname !== "/landing" && location.pathname !== "/signup";

  return (
    showProfileButton &&
    <>
    <div className="nav-bar">
      <div>
        <NavLink to="/" className="margin-left nav-hover">Home</NavLink>
        {/* <p className={"profile-dropdown"}></p> */}
      </div>
      <div>
        <NavLink to ={'/about'} className="nav-hover">About</NavLink>
        {/* <p className={"profile-dropdown"}>coming soon !</p> */}
      </div>
      {/* <div> */}
        {/* <p>Location</p> */}
        {/* <p className={"profile-dropdown"}>coming soon !</p> */}
      {/* </div> */}
      <div className="margin-right">
        <ProfileButton />
      </div>
      {/* <div> */}
      {/* <div className="profile-button margin-right"> */}
        {/* <HiTicket className="ticket-icon"/> */}
        {/* Cart */}
      {/* </div> */}
      {/* <p className={"profile-dropdown"}>coming soon !</p> */}
      {/* </div> */}
    </div>
    </>
  );
}

export default Navigation;
