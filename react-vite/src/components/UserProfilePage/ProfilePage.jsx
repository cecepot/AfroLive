import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { IoIosCard } from "react-icons/io";
import { IoNewspaperOutline } from "react-icons/io5";
import { HiTicket } from "react-icons/hi2";

function ProfilePage(){
const currentUser = useSelector((state) => state.session.user)

    return(
        <section className="payment-form-background profile-icons-container">
        {/* <h1 className="margin-top">User Profile Page</h1> */}
        <NavLink className="real-container" to={`/users/${currentUser.id}/listings`}><div className="profile-page-icons">< IoNewspaperOutline /></div><span className="icon-tooltip">My Listings</span></NavLink>
        {/* <div className="real-container" ><div className="icon-coming-soon"><HiTicket/></div><span className="icon-tooltip">coming soon!</span></div> */}
        <NavLink className="real-container" to={`/users/${currentUser.id}/cards`}><div className="profile-page-icons"><IoIosCard /></div><span className="icon-tooltip">Payment Options</span></NavLink>
        </section>
    )
}

export default ProfilePage
