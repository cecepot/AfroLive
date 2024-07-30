import { useDispatch } from "react-redux";
import { useEffect} from "react";
import { thunkGetEvents } from "../../redux/events";
import Calendar from "./Calendar";


function HomePage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkGetEvents())
    }, [dispatch])

    return (
        <>
            <div className="upcoming"><p>Upcoming Events</p></div>
            <Calendar />
        </>
    )
}


export default HomePage;
