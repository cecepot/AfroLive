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
            <h1>Homepage</h1>
            <h2>events</h2>
            {events && events.map((event) => {
                return (
                    <NavLink key={event.id} to={`/events/${event.id}`}>
                        <div onClick={(e) => handleNav(e, event.id, event)} key={event.id}>
                            <p>{event.title}</p>
                            <p>{event.date}</p>
                        </div>
                    </NavLink>
                )
            })}
        </>
    )
}


export default HomePage;
