import { useDispatch, useSelector } from "react-redux"
import { useEffect} from "react"
import { thunkDeleteEvent, thunkUserEvents } from "../../redux/events"
import { NavLink, useNavigate } from "react-router-dom"


function Listings() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(thunkUserEvents(user.id))
    }, [dispatch, user.id])

    const listings = useSelector(state => state.event.userEvents)

    const handleDelete = (listingId) => {
        // e.preventDefault()
        // console.log(e)

        if (window.confirm("You are about to delete this event")) {
            dispatch(thunkDeleteEvent(listingId))
            // dispatch(thunkUserEvents(user.id))
        }
    }


    const handleNav = (e, userId, listingId, listing) => {
        e.preventDefault()
        navigate(`/users/${userId}/listings/${listingId}`, { state: { data: listing } })
    }

    return (
        <section className="event-top event-background">
            <h1 className="form-title">Your listed events</h1>
            {listings && listings.map(listing => {
                let newDate = listing.date.split(" ")
                return (
                    <div key={listing.id}>
                        <div className="events-container" >
                            <div className="event-flyer"  >
                                <img className="image" src={listing.image_url} alt="" />
                            </div>
                            <div>
                            <h2>{listing.title}</h2>
                                <p>{newDate[0]} {newDate[1]} {newDate[2]} {newDate[3]}</p>
                            </div>
                        </div>
                        <button className="event-button mouse" onClick={e => { e.preventDefault(); handleDelete(listing.id) }}>Delete Listing</button>
                        <button className="event-button margin-left mouse" onClick={(e) => handleNav(e, user.id, listing.id, listing)}>Update Listing</button>
                        {/* <NavLink to={`/users/${user.id}/listings/${listing.id}/tickets`}><button>View Tickets for this listing</button></NavLink> */}
                        {/* functionality commented out for grading */}
                    </div>
                )
            })}
            <NavLink to={`/users/${user.id}/listings/new`}><button className="mouse event-button">Add a new Listing</button></NavLink>

        </section>
    )

}


export default Listings
