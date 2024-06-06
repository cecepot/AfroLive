const GET_TICKETS = 'tickets/getall'


const getTickets = (tickets) => ({
    type: GET_TICKETS,
    payload: tickets
})



export const thunkGetTickets = (id) => async dispatch => {
    const response = await fetch(`/api/events/${id}/tickets`);
    if (response.ok) {
        const tickets = await response.json();
        if (tickets.errors) {
            return tickets.errors
        }
        dispatch(getTickets(tickets))
    }
}


const initialState = { tickets:[]}

function ticketsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_TICKETS:
            return { ...state, tickets: action.payload }
        // case GET_EVENTS_OF_USER:
        //     return { ...state, userEvents: action.payload }
        // case CREATE_EVENT:
        //     return { ...state, newEvent: action.payload }
        // case UPDATE_EVENT:
        //     return { ...state, newEvent: action.payload }
        default:
            return state
    }
}

export default ticketsReducer
