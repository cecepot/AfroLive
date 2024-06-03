const GET_EVENTS = 'event/getAll'
const GET_CURRENT_EVENT = 'event/current'
const GET_EVENTS_OF_USER = 'event/userEvents'


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

const initialState = { events: [], singleEvent: [], userEvents: [] }

function eventsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_EVENTS:
            return { ...state, events: action.payload }
        case GET_CURRENT_EVENT:
            return { ...state, singleEvent: action.payload }
        case GET_EVENTS_OF_USER:
            return { ...state, userEvents: action.payload }
        default:
            return state
    }
}

export default eventsReducer
