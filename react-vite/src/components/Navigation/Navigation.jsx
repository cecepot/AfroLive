import { NavLink, useLocation } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";



function Navigation() {

  const location = useLocation();
  const showProfileButton = location.pathname !== "/landing" && location.pathname !== "/signup";



  return (
    showProfileButton && 
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li>
        <ProfileButton />
      </li>
    </ul>
  );
}

export default Navigation;
