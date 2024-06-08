import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { thunkGetEvents } from "../../redux/events";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function HomePage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(thunkGetEvents())
    }, [dispatch])

    const events = useSelector(state => state.event.events)
    // console.log(events)
    const handleNav = (e, eventId, event) => {
            e.preventDefault()
            navigate(`/events/${eventId}`, {state : {data: event}})
    }

    return (
        <>
            <h1 className="margin-top">Homepage</h1>
            <h2>events</h2>
            {events && events.map((event) => {
                return (
                    <NavLink key={event.id} to={`/events/${event.id}`}>
                        <div className="events-container" onClick={(e) => handleNav(e, event.id, event)} key={event.id}>
                            <div className="event-flyer"  >
                            <img className="image" src={event.image_url} alt="" />
                            </div>
                            <div>
                            <p>{event.title}</p>
                            <p>{event.date}</p>
                            </div>
                        </div>
                    </NavLink>
                )
            })}
        </>
    )
}


export default HomePage;
