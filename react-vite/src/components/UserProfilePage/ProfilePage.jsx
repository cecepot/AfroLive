import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { BsFillCreditCard2BackFill } from "react-icons/bs";
import { FaRectangleList } from "react-icons/fa6";
import { HiTicket } from "react-icons/hi2";

function ProfilePage(){
const currentUser = useSelector((state) => state.session.user)

    return(
        <section className="payment-form-background profile-icons-container">
        {/* <h1 className="margin-top">User Profile Page</h1> */}
        <NavLink className="real-container" to={`/users/${currentUser.id}/listings`}><div className="profile-page-icons">< FaRectangleList/><div className="icon-tooltip">My Listings</div></div></NavLink>
        {/* <div className="real-container" ><div className="icon-coming-soon"><HiTicket/></div><span className="icon-tooltip">coming soon!</span></div> */}
        <NavLink className="real-container" to={`/users/${currentUser.id}/cards`}><div className="profile-page-icons"><BsFillCreditCard2BackFill /><div className="icon-tooltip">Payment Options</div></div></NavLink>
        </section>
    )
}

export default ProfilePage
