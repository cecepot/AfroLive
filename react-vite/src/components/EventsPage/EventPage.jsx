import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { thunkCurrentEvent } from "../../redux/events";
import { NavLink, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";


function EventPage() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const location = useLocation()

    useEffect(() => {
        dispatch(thunkCurrentEvent(id))
    }, [dispatch, id])

    // const currentEvent = useSelector(state => state.event.singleEvent)
    const currentEvent = location.state.data
    // console.log(currentEvent)
    return (
        <section className="event-background">
            <div className="event-display">
                <div className="image-flyer">
                    <img className='event-image' src={currentEvent.image_url} alt="" />
                </div>
                <div className="event-display-left">
                    <h1>{currentEvent.title}</h1>
                    <div className="event-time">
                        <p>{currentEvent.start_time}</p>
                        <p> - </p>
                        <p>{currentEvent.end_time}</p>
                    </div>
                    <span className="side"><FaLocationDot /> <h2> {currentEvent.venue}</h2></span>
                    <p>{currentEvent.description}</p>
                    <p>Organized by <strong><em>{currentEvent.organizer_name}</em></strong></p>

                    {/* <NavLink to={`/events/${currentEvent.id}/tickets`}><button>buy ticket</button></NavLink>  */}
                    {/* ticket feature commented out for initial grading */}
                </div>
            </div>
        </section>
    )
}

export default EventPage;
