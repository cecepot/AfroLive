import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"


function ProfilePage(){
const currentUser = useSelector((state) => state.session.user)

    return(
        <>
        <h1 className="margin-top">User Profile Page</h1>
        <NavLink to={`/users/${currentUser.id}/listings`}><button>My Listings</button></NavLink>
        <NavLink to={`/users/${currentUser.id}/cards`}><button>Payment Options</button></NavLink>
        </>
    )
}

export default ProfilePage
