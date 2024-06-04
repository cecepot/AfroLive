import { useState } from "react"




function EditListing() {
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [date, setDate] = useState()
    const [start_time, setStart_time] = useState()
    const [end_time, setEnd_time] = useState()
    const [venue, setVenue] = useState()
    const [city, setCity] = useState()
    const [state, setState] = useState()
    const [image_url, setImage_url] = useState()
    const [tickets_available, setTickets_available] = useState()
    const [ticket_price, setTicket_price] = useState()
    const [organizer_name, setOrganizer_name] = useState()
    const [organizer_contact, setOrganizer_contact] = useState()
    const [category, setCategory] = useState()
    const [event_website, setEvent_website] = useState()
    const [additional_notes, setAdditional_notes] = useState()

    return (
        <>
            <h1>Update your listing</h1>
            <form action="">
                <div>
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
                    <label htmlFor="end time">End Time</label>
                    <input
                        type="text"
                        name="end time"
                        value={end_time}
                        onChange={(e) => setEnd_time(e.target.value)}
                        onFocus={(e) => e.target.showPicker()}
                        placeholder="end time"
                        required
                    />
                </div>
                <div>
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
                    <input
                        type="text"
                        name="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="state"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="image File">Image File</label>
                    <input
                        type="text"
                        name="image File"
                        value={title}
                        onChange={(e) => setImage_url(e.target.value)}
                        placeholder="image File"
                        required
                    />
                </div>
                <div>
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
                </div>
                <div>
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
                    <label htmlFor="category">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="category"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="event website">Event website</label>
                    <input
                        type="text"
                        name="event website"
                        value={event_website}
                        onChange={(e) => event_website(e.target.value)}
                        placeholder="event website"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="additional notes">Additional notes</label>
                    <input
                        type="text"
                        name="additional notes"
                        value={additional_notes}
                        onChange={(e) => setAdditional_notes(e.target.value)}
                        placeholder="additional notes"
                        required
                    />
                </div>
                <div>
                    <label htmlFor=""></label>
                </div>
                <button type="submit">Add Event</button>
            </form>
        </>
    )
}

export default EditListing
