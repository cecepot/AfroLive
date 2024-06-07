import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { thunkCurrentEvent } from "../../redux/events";
import { NavLink, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

function EventPage(){
    const dispatch = useDispatch()
    const {id} = useParams()
    const location = useLocation()

    useEffect(() => {
        dispatch(thunkCurrentEvent(id))
    }, [dispatch, id])

    // const currentEvent = useSelector(state => state.event.singleEvent)
    const currentEvent = location.state.data
    // console.log(currentEvent)
    return(
        <>
        <h1>Event Page</h1>
        <p>{currentEvent.title}</p>
        <span>
        <p>{currentEvent.start_time}</p>
        <p> - {currentEvent.end_time}</p>
        <p>{currentEvent.venue}</p>
        <p>{currentEvent.description}</p>
        <p>{currentEvent.organizer_name}</p>
        <img src={currentEvent.image_url} alt="" />
        </span>
        <NavLink to={`/events/${currentEvent.id}/tickets`}><button>buy ticket</button></NavLink>
        </>
    )
}

export default EventPage;
