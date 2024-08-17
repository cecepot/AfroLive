import { useDispatch, useSelector} from "react-redux"
import { useEffect, useState } from "react"
import { thunkDeleteEvent, thunkUserEvents } from "../../redux/events"
import { NavLink, useNavigate } from "react-router-dom"
// import OpenModalButton from "../OpenModalButton/OpenModalButton"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
import { useModal } from "../../context/Modal"
import Loader from "../LoadingComponent/Loader";




const DeleteListingModal = ({ id }) => {
    const { closeModal } = useModal();
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();




    const handleClick = async (e) => {
        e.preventDefault();

        await dispatch(thunkDeleteEvent(id)).then(closeModal);
        dispatch(thunkUserEvents(user.id));
    };

    const close = (e) => {
        e.preventDefault();
        return closeModal();
    };

    return (
        <div className="modal-container">
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to delete this listing?</p>
            <div className="">
                <button className="pay-button mouse" onClick={handleClick}>
                    Delete
                </button>
                <button className="pay-button mouse" onClick={close}>
                    Cancel
                </button>
            </div>
        </div>
    );
};



function Listings() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(thunkUserEvents(user.id))
        // setLoading(true)
    }, [dispatch, user.id])

    const listings = useSelector(state => state.event.userEvents)


    useEffect(()=>{
        listings && setLoading(false)
    },[listings])
    // const handleDelete = (listingId) => {
    //     // e.preventDefault()
    //     // console.log(e)
    //     return (<DeleteListingModal id = {listingId}/>)
    //     // if (window.confirm("You are about to delete this event")) {
    //     //     dispatch(thunkDeleteEvent(listingId))
    //     //     // dispatch(thunkUserEvents(user.id))
    //     // }
    // }


    const handleNav = (e, userId, listingId, listing) => {
        e.preventDefault()
        navigate(`/users/${userId}/listings/${listingId}`, { state: { data: listing } })
    }


    if (loading) {
        return <Loader />
    }



    return (

        <section className="listing-grand-container">
            <h1 className="listing-title">Your listed events</h1>
            <div className="listing-grid">
                {
                listings && listings.map(listing => {
                    let newDate = listing.date.split(" ")
                    return (
                        <div key={listing.id} className="listing-main-container">
                            <div className="listing-sub-container" >
                                <div className="listing-front"  >
                                    <img className="image" src={listing.image_url} alt="" />
                                </div>
                                <div className="listing-back">
                                    <h2 className="white">{listing.title}</h2>
                                    <p className="white">{newDate[0]} {newDate[1]} {newDate[2]} {newDate[3]}</p>
                                    <div className="manage">
                                        <button className="event-button eigthy mouse list-item" onClick={e => { e.preventDefault() }}>
                                            <OpenModalMenuItem
                                                itemText={"Delete Listing"}
                                                modalComponent={
                                                    <DeleteListingModal
                                                        id={listing.id}
                                                    />
                                                }
                                            />
                                        </button>

                                        {/* <button className="event-button eigthy mouse" onClick={e => { e.preventDefault(); handleDelete(listing.id) }}>Delete Listing</button> */}
                                        <button className="event-button eigthy mouse" onClick={(e) => handleNav(e, user.id, listing.id, listing)}>Update Listing</button>
                                    </div>
                                </div>
                            </div>
                            {/* <NavLink to={`/users/${user.id}/listings/${listing.id}/tickets`}><button>View Tickets for this listing</button></NavLink> */}
                            {/* functionality commented out for grading */}
                        </div>
                    )
                })

                }
            </div>
            <NavLink to={`/users/${user.id}/listings/new`}><button className="mouse event-button">Add a new Listing</button></NavLink>

        </section>

    )

}


export default Listings
