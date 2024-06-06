const GET_TICKETS = 'tickets/getall'


const getTickets = (tickets) => ({
    type: GET_TICKETS,
    payload: tickets
})

export const thunkGetTickets = (id) => async dispatch => {
    const response = await fetch(`/api/events/${id}/tickets`);
    if (response.ok) {
        const events = await response.json();
        if (events.errors) {
            return events.errors
        }
        dispatch(getEvents(events))
    }
}
