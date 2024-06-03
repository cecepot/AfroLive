import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { thunkGetEvents } from "../../redux/events";
import { NavLink } from "react-router-dom";


function HomePage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkGetEvents())
    }, [dispatch])

    const events = useSelector(state => state.event.events)
    // console.log(events)


    return (
        <>
            <h1>Homepage</h1>
            <h2>events</h2>
            {events && events.map((event) => {
                return (
                    <NavLink key={event.id} to={`/events/${event.id}`}>
                        <div >
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
