const GET_CARDS = 'cards/getall'
const CREATE_CARD = 'cards/new'
const UPDATE_CARD = 'cards/update'
const GET_CURRENT_CARD = 'cards/current'
// const DELETE_CARD = 'card/delete'

const getCards = (cards) => ({
    type: GET_CARDS,
    payload: cards
})
const createCard = (card) => ({
    type: CREATE_CARD,
    payload: card
})
const updateCard = (cards) => ({
    type: UPDATE_CARD,
    payload: cards
})
const currentCard = (card) => ({
    type: GET_CURRENT_CARD,
    payload: card
})


export const thunkGetCards = (id) => async dispatch => {
    const response = await fetch(`/api/users/${id}/cards`);
    if (response.ok) {
        const cards = await response.json();
        if (cards.errors) {
            return cards.errors
        }
        dispatch(getCards(cards))

    }
}
export const thunkCreateCard = (id, reqBody) => async dispatch => {
    // console.log(reqBody)
    const response = await fetch(`/api/users/${id}/cards`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody)
    });
    if (response.ok) {
        const card = await response.json()
        dispatch(createCard(card))
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        console.log("There was an error making your post!")
    }
}
export const thunkUpdateCards = (id, reqBody, cardId) => async dispatch => {
    const response = await fetch(`/api/users/${id}/cards/${cardId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody)
    });
    if (response.ok) {
        const card = await response.json()
        dispatch(updateCard(card))
    } else if (response.status < 500) {
        const errorMessages = await response.json();
        return errorMessages
    } else {
        console.log("There was an error making your post!")
    }
}
export const thunkGetCurrentCard = (id, cardId) => async dispatch => {
    const response = await fetch(`/api/users/${id}/cards/${cardId}`);
    if (response.ok) {
        const card = await response.json();
        if (card.errors) {
            return card.errors
        }
        dispatch(currentCard(card))

    }
}
export const thunkDeleteCard = (id, cardId) => async () => {
    const res = await fetch(`/api/users/${id}/cards/${cardId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });
    const deleted = await res.json();
    return deleted;
};

const initialState = { cards: [], currentCard: [] }

function cardsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CARDS:
            return { ...state, cards: action.payload }
        case CREATE_CARD:
            return { ...state, cards: action.payload }
        case UPDATE_CARD:
            return { ...state, currentCard: action.payload }
        case GET_CURRENT_CARD:
            return { ...state, currentCard: action.payload }
        // case UPDATE_EVENT:
        //     return { ...state, newEvent: action.payload }
        default:
            return state
    }
}

export default cardsReducer
