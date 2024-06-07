import { useDispatch, useSelector } from "react-redux"
import { thunkDeleteCard, thunkGetCards, thunkGetCurrentCard } from "../../redux/cards"
import { useEffect, useState } from "react"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import Loader from "../LoadingComponent/Loader"

function PaymentOptions(){
    const dispatch = useDispatch()
    const {id} = useParams()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true);

    // if (isLoading) {
    //     return <Loader />;
    //   }
    const handleDelete = (id, cardId) =>{
        if (window.confirm("You are about to delete this card")) {
            dispatch(thunkDeleteCard(id, cardId))
            dispatch(thunkGetCards(id))
          }
    }

    useEffect(()=>{
        dispatch(thunkGetCards(id))
    }, [id, dispatch])
    const cards = useSelector((state)=>state.cards.cards)

    const handleCurrent = (e, id, cardId, card) =>{
        e.preventDefault()
        dispatch(thunkGetCurrentCard(id, cardId))
        navigate(`/users/${id}/cards/${cardId}/edit`, { state: { data: card } })
    }

    return (
        <>
        <h1>Payment Options</h1>
        {cards.length && cards.map((card)=>{
            console.log(card)
            return(
                <div key={card.id}>
                <p>{card.card_company}({card.card_type})</p>
                <p>{card.name}</p>
                <button onClick={(e)=> handleCurrent(e,id, card.id, card)}>Update Card</button>
                <button onClick={e => {e.preventDefault();handleDelete(id, card.id)}}>Delete card</button>
                </div>
            )
        })}
        <NavLink to={`/users/${id}/cards/add`}><button>Add new Card</button></NavLink>
        </>
    )
}

export default PaymentOptions
