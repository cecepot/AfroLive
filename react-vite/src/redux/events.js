const GET_EVENTS = 'event/getAll'
const GET_CURRENT_EVENT = 'event/current'
const GET_EVENTS_OF_USER = 'event/userEvents'
const CREATE_EVENT = 'event/create'
const UPDATE_EVENT = 'event/update'
const DELETE_EVENT = 'event/delete'


const getEvents = (events) => ({
    type: GET_EVENTS,
    payload: events
})
const currentEvent = (event) => ({
    type: GET_CURRENT_EVENT,
    payload: event
})
const userEvents = (events) => ({
    type: GET_EVENTS_OF_USER,
    payload: events
})
const createEvent = (event) => ({
    type: CREATE_EVENT,
    payload: event
})
const updateEvent = (event) => ({
    type: UPDATE_EVENT,
    payload: event
})
const deleteEvent = (events) => ({
    type: DELETE_EVENT,
    payload: events
})

export const thunkGetEvents = () => async dispatch => {
    const response = await fetch('/api/events/');
    if (response.ok) {
        const events = await response.json();
        if (events.errors) {
            return events.errors
        }
        dispatch(getEvents(events))
    }
}
export const thunkCurrentEvent = (id) => async dispatch => {
    const response = await fetch(`/api/events/${id}`);
    if (response.ok) {
        const event = await response.json();
        if (event.errors) {
            return event.errors
        }
        dispatch(currentEvent(event))
    }
}
export const thunkUserEvents = (id) => async dispatch => {
    const response = await fetch(`/api/users/${id}/events`);
    if (response.ok) {
        const events = await response.json();
        if (events.errors) {
            return events.errors
        }
        dispatch(userEvents(events))
    }
}
export const thunkCreateEvent = (reqBody) => async dispatch => {
    console.log('=========================>', reqBody)
    const response = await fetch(`/api/events/`, {
        method: "POST",
        body: reqBody
    });
    if (response.ok) {
        const event = await response.json();
        console.log(event)
        dispatch(createEvent(event));
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    }
}
export const thunkUpdateEvent = (reqBody, id) => async dispatch => {
    const response = await fetch(`/api/events/${id}`, {
        method: "PUT",
        body: reqBody
    });
    if (response.ok) {
        const event = await response.json();
        console.log(event)
        dispatch(updateEvent(event));
        return event
    } else {
        console.log("There was an error making your post!")
    }
}
export const thunkDeleteEvent = (id) => async () => {
    const res = await fetch(`/api/events/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });
    const deleted = await res.json();
    return deleted;
};

const initialState = { events: [], singleEvent: [], userEvents: [], newEvent: [] }

function eventsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_EVENTS:
            return { ...state, events: action.payload }
        case GET_CURRENT_EVENT:
            return { ...state, singleEvent: action.payload }
        case GET_EVENTS_OF_USER:
            return { ...state, userEvents: action.payload }
        case CREATE_EVENT:
            return { ...state, newEvent: action.payload }
        case UPDATE_EVENT:
            return { ...state, newEvent: action.payload }
        default:
            return state
    }
}

export default eventsReducer
