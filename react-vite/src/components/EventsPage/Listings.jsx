import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { thunkUserEvents } from "../../redux/events"
import { NavLink } from "react-router-dom"

function Listings() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(thunkUserEvents(user.id))
    }, [dispatch, user.id])

    const listings = useSelector(state => state.event.userEvents)

    return (
        <>
            <h1>listings for current user</h1>
            {listings.map(listing =>{
                return(
                    <div key={listing.id}>
                        <p>{listing.title}</p>
                        <button>Delete Listing</button>
                        <NavLink to={`/users/${user.id}/listings/${listing.id}`}><button>Update Listing</button></NavLink>
                    </div>
                )
            })}
            <NavLink to={`/users/${user.id}/listings/new`}><button>Add a new Listing</button></NavLink>
        </>
    )

}


export default Listings
