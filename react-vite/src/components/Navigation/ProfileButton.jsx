import { useState,useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink } from "react-router-dom";
import { MdEmail } from "react-icons/md";




function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [blur, setBlur] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  // const toggleMenu = (e) => {
  //   e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
  //   setShowMenu(!showMenu);
  //   setBlur(!blur)

  // };

  // useEffect(() => {
  //   if (!showMenu) return;

  //   const closeMenu = (e) => {
  //     if (ulRef.current && !ulRef.current.contains(e.target)) {
  //       setShowMenu(false);
  //     }
  //   };

  //   document.addEventListener("click", closeMenu);

  //   return () => document.removeEventListener("click", closeMenu);
  // }, [showMenu]);

  // const closeMenu = () => setShowMenu(false);

  // const logout = (e) => {
  //   e.preventDefault();
  //   dispatch(thunkLogout());
  //   closeMenu();
  // };

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
    setBlur(!blur)

  };

  // useEffect(() => {
  //   if (!showMenu) return;

  //   const closeMenu = (e) => {
  //     if (ulRef.current && !ulRef.current.contains(e.target)) {
  //       setShowMenu(false);
  //     }
  //   };

  //   document.addEventListener("click", closeMenu);

  //   return () => document.removeEventListener("click", closeMenu);
  // }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };

  return (
    <>
      <div className="mouse" onMouseEnter={toggleMenu}>
        <FaUserCircle className="profile-button nav-hover"/>
      </div>
      {showMenu && (
        <>
        <div onMouseLeave={toggleMenu} className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <>
              <p>Welcome to AfroLive, {user.username}</p>
              <div className="mail-side">
              <MdEmail/>
              <p>{user.email}</p>
              </div>
              {/* <NavLink onClick={toggleMenu} className={"click"} to={`/users/${user.id}`}>Profile Page</NavLink> */}
              <NavLink onClick={toggleMenu} className={"click"} to={`/users/${user.id}`}>Profile Page</NavLink>
              <p>
                <div className="mouse click" onClick={logout}>Log Out</div>
              </p>
            </>
          ) : (
            <>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </>
          )}
        </div>
        <div className="blur">

        </div>
        </>
      )}

    </>
  );

}

export default ProfileButton;
