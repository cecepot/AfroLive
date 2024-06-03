import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"


function ProfilePage(){
const currentUser = useSelector((state) => state.session.user)

    return(
        <>
        <h1>User Profile Page</h1>
        <button>My Tickets</button>
        <NavLink to={`/users/${currentUser.id}/listings`}><button>My Listings</button></NavLink>
        <button>Payment Options</button>
        </>
    )
}

export default ProfilePage
