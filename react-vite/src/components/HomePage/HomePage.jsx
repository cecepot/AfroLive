import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { thunkGetEvents } from "../../redux/events";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Calendar from "./Calendar";


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
        navigate(`/events/${eventId}`, { state: { data: event } })
    }

    return (
        <>
            <div className="upcoming"><p>Upcoming Events</p></div>
            <Calendar />
        </>
    )
}


export default HomePage;
