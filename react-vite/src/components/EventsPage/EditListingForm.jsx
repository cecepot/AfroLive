import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkCurrentEvent, thunkUpdateEvent, thunkUserEvents } from "../../redux/events"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Loader from "../LoadingComponent/Loader";



function EditListing() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [start_time, setStart_time] = useState("")
    const [end_time, setEnd_time] = useState("")
    const [venue, setVenue] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [image_url, setImage_url] = useState("")
    // const [tickets_available, setTickets_available] = useState("")
    // const [ticket_price, setTicket_price] = useState("")
    const [organizer_name, setOrganizer_name] = useState("")
    const [organizer_contact, setOrganizer_contact] = useState("")
    const [category, setCategory] = useState("")
    const [event_website, setEvent_website] = useState("")
    const [additional_notes, setAdditional_notes] = useState("")
    const [imageURL, setImageURL] = useState("")
    const [errors, setErrors] = useState({});
    const [validationErrors, setValidationErrors] = useState({})
    const [imageLoading, setImageLoading] = useState(false);
    const location = useLocation()
    const navigate = useNavigate()
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const { listingId } = useParams()


    // useEffect(() => {
    //     dispatch(thunkCurrentEvent(listingId))
    // }, [dispatch, listingId])
    // const currentEvent = useSelector((state) => state.event.singleEvent)
    const currentEvent = location.state.data

    // console.log(currentEvent.start_time) //14:44:00
    const formatTime = (time) => {
        let timeArray = time.split(':')
        let hours = +timeArray[0]
        let minutes = +timeArray[1]
        let seconds = +timeArray[2]
        let date = new Date()
        date.setHours(hours, minutes, seconds)
        // let newTime = date.toISOString().split("T")[1].split('.')[0]
        // let options = {timeStyle: 'short', hour12: true}
        let newTime = date.toLocaleTimeString('en-GB', { hour: "2-digit", minute: "2-digit" }).split(' ')[0]
        // console.log(newTime)
        return newTime
    }

    useEffect(() => {
        setTitle(currentEvent.title)
        setDescription(currentEvent.description)
        setDate(new Date(currentEvent.date).toISOString().split("T")[0])
        setStart_time(formatTime(currentEvent.start_time))
        setEnd_time(formatTime(currentEvent.end_time))
        setVenue(currentEvent.venue)
        setCity(currentEvent.city)
        setState(currentEvent.state)
        setImage_url(currentEvent.image_url)
        setImageURL(currentEvent.image_url)
        // setTickets_available(currentEvent.tickets_available)
        // setTicket_price(currentEvent.ticket_price)
        setOrganizer_name(currentEvent.organizer_name)
        setOrganizer_contact(currentEvent.organizer_contact)
        setCategory(currentEvent.category)
        setEvent_website(currentEvent.event_website)
        setAdditional_notes(currentEvent.additional_notes)

    }, [currentEvent])

    const fileWrap = (e) => {
        e.stopPropagation();

        const tempFile = e.target.files[0];
        setImage_url(tempFile)
        const newImageURL = URL.createObjectURL(tempFile); // Generate a local URL to render the image file inside of the <img> tag.
        setImageURL(newImageURL);

    }
    // console.log('current========', currentEvent)
    // console.log('===========url=>', image_url)

    const compareTimes = (date, start, end) => {
        const startHours = +start.split(':')[0]
        const startMinutes = +start.split(':')[1]
        const endHours = +end.split(':')[0]
        const endMinutes = +end.split(':')[1]
        let newStartDate = new Date(date).setHours(startHours, startMinutes)
        let newEndDate = new Date(date).setHours(endHours, endMinutes)
        return newStartDate < newEndDate
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let errors = {}
        if (title.length > 200) { errors.title = "Your title should be between 3 and 200 characters long. It seems you've exceeded the limit—please shorten it a bit!" }
        if (title.length < 3) { errors.title = "Your title needs to be between 3 and 200 characters long. Just add a few more characters, and you're all set!" }
        if (description.length < 50) { errors.description = "Please share more about your event with at least 50 characters. We'd love to hear all the exciting details!" }
        if (description.length > 1000) { errors.description = "You've reached the maximum limit. Could you please describe your event in fewer than a 1000 characters?" }
        if (new Date(date).getTime() <= Date.now()) { errors.date = "It appears you've entered a date that is either in the past or today. To proceed, please select a date that is at least one day in the future." }
        if (compareTimes(date, start_time, end_time) === false) { errors.start_time = "To ensure everything goes smoothly, please make sure the event's start time is before its end time." }
        if (compareTimes(date, end_time, start_time) === true) { errors.end_time = "To ensure everything goes smoothly, please make sure the event's end time is after its start time." }
        // if (tickets_available < 20) { errors.tickets_available = "To organize an event, you must have a minimum of twenty tickets available." }
        // if (ticket_price <= 0) { errors.ticket_price = 'Events should cost at least $ 1.00' }
        if (organizer_contact.length !== 10 || !(+organizer_contact)) { errors.organizer_contact = 'Please provide a valid phone number' }
        if (venue.length < 3 || venue.length > 100) { errors.venue = "Are you sure this venue exists? Please enter a venue name between 3 and 100 characters." }
        if (city.length < 4 || city.length > 16) { errors.city = "Are you sure this city exists? All cities in the DMV and New York are at least four letters long and at most 16 letters. Please enter a valid city." }
        if (organizer_name.length > 200 || organizer_name.length < 3) { errors.organizer_name = "Uh-oh! The organizer's name cannot exceed 100 or be less than 3 characters.Please provide a valid name" }
        if (additional_notes && (additional_notes.length > 1000 || additional_notes.length < 50)) { errors.additional_notes = "Looks like you provided either more or less than the limit. Please ensure your additional notes are between 50 and 1000 characters long." }


        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors)
            return
        }




        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("date", date);
        formData.append("start_time", start_time);
        formData.append("end_time", end_time);
        formData.append("venue", venue);
        formData.append("city", city);
        formData.append("state", state);
        formData.append("image_url", image_url);
        // formData.append("tickets_available", tickets_available);
        // formData.append("ticket_price", ticket_price);
        formData.append("organizer_name", organizer_name);
        formData.append("event_website", event_website);
        formData.append("organizer_contact", organizer_contact);
        formData.append("category", category);
        formData.append("additional_notes", additional_notes);

        setImageLoading(true);

        for (const [key, value] of formData.entries()) {
            // console.log(`${key}: ${value}`);
        }
        const updatedEvent = await dispatch(thunkUpdateEvent(formData, listingId))
        if (updatedEvent) {
            setImageLoading(false)
            return setErrors(updatedEvent)
        } else {
            dispatch(thunkUserEvents(user.id))
            navigate(`/users/${user.id}/listings`)

        }
    }

    if (imageLoading) {
        return <Loader />
    }


    return (
        <section className="form-background">
            <div className="form-container">
                <h1 className="form-title">Update your listing</h1>
                <form className="form"
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                >
                    <div>
                        <p className="error">{validationErrors.title && validationErrors.title || errors.title && errors.title}</p>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="title"
                            required
                        />
                    </div>
                    <div>
                        <p className="error">{validationErrors.description && validationErrors.description || errors.description && errors.description}</p>
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="description"
                            required
                        />
                    </div>
                    <div>
                        <p className="error">{validationErrors.date && validationErrors.date || errors.date && errors.date}</p>
                        <label htmlFor="date">Date</label>
                        <input
                            type="date"
                            name="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            onFocus={(e) => e.target.showPicker()}
                            placeholder="date"
                            required
                        />
                    </div>
                    <div>
                        <p className="error">{validationErrors.start_time && validationErrors.start_time || errors.start_time && errors.start_time}</p>
                        <label htmlFor="start time">Start Time</label>
                        <input
                            type="time"
                            name="start time"
                            value={start_time}
                            onChange={(e) => setStart_time(e.target.value)}
                            onFocus={(e) => e.target.showPicker()}
                            placeholder="start time"
                            required
                        />
                    </div>
                    <div>
                        <p className="error">{validationErrors.end_time && validationErrors.end_time || errors.end_time && errors.end_time}</p>
                        <label htmlFor="end time">End Time</label>
                        <input
                            type="time"
                            name="end time"
                            value={end_time}
                            onChange={(e) => setEnd_time(e.target.value)}
                            onFocus={(e) => e.target.showPicker()}
                            placeholder="end time"
                            required
                        />
                    </div>
                    <div>
                        <p className="error">{validationErrors.venue && validationErrors.venue || errors.venue && errors.venue}</p>
                        <label htmlFor="venue">Venue</label>
                        <input
                            type="text"
                            name="venue"
                            value={venue}
                            onChange={(e) => setVenue(e.target.value)}
                            placeholder="venue"
                            required
                        />
                    </div>
                    <div>
                        <p className="error">{validationErrors.city && validationErrors.city || errors.city && errors.city}</p>
                        <label htmlFor="city">City</label>
                        <input
                            type="text"
                            name="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="city"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="state">State</label>
                        <label htmlFor="state">State</label>
                        <select name="state" onChange={(e) => setState(e.target.value)} >
                            <option value="">Select a state</option>
                            <option value="Maryland">Maryland</option>
                            <option value="New York">New York</option>
                            <option value="Virginia">Virginia</option>
                        </select>
                    </div>
                    <div>
                        <p className="error">{errors.image_url && errors.image_url}</p>
                        <label htmlFor="image File">Image File</label>
                        <input
                            id="post-image-input2"
                            type="file"
                            accept="image/png, image/jpeg, image/jpg"
                            onChange={(e) => fileWrap(e)}
                            placeholder="image File"
                        />
                        <label htmlFor="post-image-input2"><img src={imageURL} className="thumbnails-noname"></img></label>
                        {/* {(imageLoading) && <p>Loading...</p>} */}
                    </div>
                    {/* <div>
                    <p className="error">{validationErrors.tickets_available && validationErrors.tickets_available}</p>
                    <label htmlFor="number of tickets">Number of Tickets</label>
                    <input
                        type="number"
                        name="number of tickets"
                        value={tickets_available}
                        onChange={(e) => setTickets_available(e.target.value)}
                        onFocus={(e) => e.target.showPicker()}
                        placeholder="number of tickets"
                        required
                    />
                </div>
                <div>
                    <p className="error">{validationErrors.ticket_price && validationErrors.ticket_price}</p>
                    <label htmlFor="price of ticket">Price of ticket</label>
                    <input
                        type="number"
                        name="price of ticket"
                        value={ticket_price}
                        onChange={(e) => setTicket_price(e.target.value)}
                        onFocus={(e) => e.target.showPicker()}
                        placeholder="price of ticket"
                        required
                    />
                </div> */}
                    <div>
                        <p className="error">{validationErrors.organizer_name && validationErrors.organizer_name || errors.organizer_name && errors.organizer_name}</p>
                        <label htmlFor="organizer's name">Name of Organizer</label>
                        <input
                            type="text"
                            name="organizer's name"
                            value={organizer_name}
                            onChange={(e) => setOrganizer_name(e.target.value)}
                            placeholder="organizer's name"
                            required
                        />
                    </div>
                    <div>
                        <p className="error">{validationErrors.organizer_contact && validationErrors.organizer_contact || errors.organizer_contact && errors.organizer_contact}</p>
                        <label htmlFor="organizer's contact">Phone number of Organizer</label>
                        <input
                            type="text"
                            name="organizer's contact"
                            value={organizer_contact}
                            onChange={(e) => setOrganizer_contact(e.target.value)}
                            placeholder="eg. 1236752348"
                            required
                        />
                    </div>
                    <div>
                        <p className="error"></p>
                        <label htmlFor="category">Category</label>
                        <select name="category" onChange={(e) => setCategory(e.target.value)}>
                            <option value="">Select a category</option>
                            <option value="concert">concert</option>
                            <option value="festival">festival</option>
                            <option value="live performance">live performance</option>
                            <option value="album release party">album release party</option>
                        </select>
                    </div>
                    <div>
                        <p className="error"></p>
                        <label htmlFor="event website">Event website</label>
                        <input
                            type="url"
                            name="event website"
                            value={event_website}
                            onChange={(e) => setEvent_website(e.target.value)}
                            placeholder='https://example.com'
                        />
                    </div>
                    <div>
                        <p className="error">{validationErrors.additional_notes && validationErrors.additional_notes || errors.additional_notes && errors.additional_notes}</p>
                        <label htmlFor="additional notes">Additional notes</label>
                        <input
                            type="text"
                            name="additional notes"
                            value={additional_notes}
                            onChange={(e) => setAdditional_notes(e.target.value)}
                            placeholder="additional notes"
                        />
                    </div>
                    <div>
                        <label htmlFor=""></label>
                    </div>
                    <button className="form-button mouse" type="submit">Update Event</button>
                </form>
            </div>
        </section>
    )
}

export default EditListing
