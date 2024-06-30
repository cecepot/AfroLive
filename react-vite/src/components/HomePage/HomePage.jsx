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
            {/* <section className="upcoming-events">

                <div className="upcoming-events-h1">
                    <h1 className="home-title">Upcoming Events</h1>
                </div>

            </section> */}
            <Calendar/>
            <section className="home-page">
                {events && events.map((event) => {
                    const day = event.date.split(' ')[1]
                    const month = event.date.split(' ')[2]
                    let newDate = event.date.split(" ")
                    return (
                        <NavLink key={event.id} to={`/events/${event.id}`}>
                            <div className="events-container" onClick={(e) => handleNav(e, event.id, event)} key={event.id}>
                                <div className="day-month">
                                    <p>{day}</p>
                                    <p>{month}</p>
                                </div>
                                <div className="event-flyer"  >
                                    <img className="image" src={event.image_url} alt="" />
                                </div>
                                <div className="title-date">
                                    <p className="event-title">{event.title}</p>
                                    <p>{newDate[0]} {newDate[1]} {newDate[2]} {newDate[3]}</p>
                                </div>
                            </div>
                        </NavLink>
                    )
                })}
            </section>
        </>
    )
}


export default HomePage;
