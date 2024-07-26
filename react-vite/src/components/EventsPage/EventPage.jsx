import { useDispatch} from "react-redux";
import { useEffect } from "react";
import { thunkCurrentEvent } from "../../redux/events";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { FaClock } from "react-icons/fa6";

function EventPage() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const location = useLocation()

    useEffect(() => {
        dispatch(thunkCurrentEvent(id))
    }, [dispatch, id])

    // const currentEvent = useSelector(state => state.event.singleEvent)
    const currentEvent = location.state.data
    const start = currentEvent.start_time.slice(0, 5)
    const end = currentEvent.end_time.slice(0, 5)

    return (
        <section className="event-card-container mouse">
            <div className="event-card-sub-container">
                <div className="event-card-front">
                    <img className='event-image' src={currentEvent.image_url} alt="" />
                </div>
                <div className="event-card-back">
                    <h1 className="white">{currentEvent.title}</h1>
                    <div className="side">
                    <FaClock className="fill-white"/>
                    <div className="event-time">
                        <p className="white">{start}</p>
                        <p className="white"> - </p>
                        <p className="white">{end}</p>
                    </div>
                    <h2 className="white">GMT</h2>
                    </div>
                    <span className="side"><FaLocationDot className="fill-white" /> <h2 className="white"> {currentEvent.venue}</h2></span>
                    <p className="white event-description">{currentEvent.description}</p>
                    <p className="white">Organized by <strong><em className="white">{currentEvent.organizer_name}</em></strong></p>

                    {/* <NavLink to={`/events/${currentEvent.id}/tickets`}><button>buy ticket</button></NavLink>  */}
                    {/* ticket feature commented out for initial grading */}
                </div>
            </div>
        </section>
    )
}

export default EventPage;
