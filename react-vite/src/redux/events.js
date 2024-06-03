const GET_EVENTS = 'event/getAll'
const GET_CURRENT_EVENT = 'event/current'

const getEvents = (events) => ({
    type: GET_EVENTS,
    payload: events
})
const currentEvent = (event) => ({
    type: GET_CURRENT_EVENT,
    payload: event
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

const initialState = { events: [], singleEvent: [] }

function eventsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_EVENTS:
            return { ...state, events: action.payload }
        case GET_CURRENT_EVENT:
            return { ...state, singleEvent: action.payload }
        default:
            return state
    }
}

export default eventsReducer
