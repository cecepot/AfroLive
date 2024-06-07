import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { thunkDeleteEvent, thunkUserEvents } from "../../redux/events"
import { NavLink, Navigate, useNavigate } from "react-router-dom"
useNavigate

function Listings() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(thunkUserEvents(user.id))
    }, [dispatch, user.id])


    const handleDelete = (listingId) =>{
        // e.preventDefault()
        // console.log(e)

        if (window.confirm("You are about to delete this event")) {
            dispatch(thunkDeleteEvent(listingId))
        }
        dispatch(thunkUserEvents(user.id))
    }
    const listings = useSelector(state => state.event.userEvents)

    const handleNav = (e, userId, listingId, listing) =>{
        e.preventDefault()
        navigate(`/users/${userId}/listings/${listingId}`, {state : {data :listing}})
    }

    return (
        <>
            <h1>listings for current user</h1>
            {listings && listings.map(listing =>{
                return(
                    <div key={listing.id}>
                        <p>{listing.title}</p>
                        <button onClick={e => {e.preventDefault();handleDelete(listing.id)}}>Delete Listing</button>
                        <button onClick={(e)=>handleNav(e, user.id, listing.id, listing)}>Update Listing</button>
                        <NavLink to={`/users/${user.id}/listings/${listing.id}/tickets`}><button>View Tickets for this listing</button></NavLink>
                    </div>
                )
            })}
            <NavLink to={`/users/${user.id}/listings/new`}><button>Add a new Listing</button></NavLink>

        </>
    )

}


export default Listings
