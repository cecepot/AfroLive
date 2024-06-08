import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { thunkCurrentEvent } from "../../redux/events";
import { NavLink, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

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
        <>

            <div className="event-display">
                <div className="image-flyer">
                    <img className='image' src={currentEvent.image_url} alt="" />
                </div>
                <div className="event-display-left">
                    <h1>{currentEvent.title}</h1>
                    <div className="event-time">
                        <p>{currentEvent.start_time}</p>
                        <p> - </p>
                        <p>{currentEvent.end_time}</p>
                    </div>
                    <p>{currentEvent.venue}</p>
                    <p>{currentEvent.description}</p>
                    <p>{currentEvent.organizer_name}</p>

                    {/* <NavLink to={`/events/${currentEvent.id}/tickets`}><button>buy ticket</button></NavLink>  */}
                    {/* ticket feature commented out for initial grading */}
                </div>
            </div>
        </>
    )
}

export default EventPage;
