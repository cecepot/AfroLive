import { NavLink } from "react-router-dom"

NavLink


function ProfilePage(){


    return(
        <>
        <h1>User Profile Page</h1>
        <button>My Tickets</button>
        <NavLink><button>My Listings</button></NavLink>
        <button>Payment Options</button>
        </>
    )
}

export default ProfilePage
