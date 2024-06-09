import { useDispatch, useSelector } from "react-redux"
import { thunkDeleteCard, thunkGetCards, thunkGetCurrentCard } from "../../redux/cards"
import { useEffect, useState } from "react"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import Loader from "../LoadingComponent/Loader"
import { IoIosCard } from "react-icons/io";


function PaymentOptions() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true);

    // if (isLoading) {
    //     return <Loader />;
    //   }
    const handleDelete = (id, cardId) => {
        if (window.confirm("You are about to delete this card")) {
            dispatch(thunkDeleteCard(id, cardId))
            dispatch(thunkGetCards(id))
        }
    }

    useEffect(() => {
        dispatch(thunkGetCards(id))
    }, [id, dispatch])
    const cards = useSelector((state) => state.cards.cards)

    const handleCurrent = (e, id, cardId, card) => {
        e.preventDefault()
        dispatch(thunkGetCurrentCard(id, cardId))
        navigate(`/users/${id}/cards/${cardId}/edit`, { state: { data: card } })
    }

    if (!cards.length) {
        return (
            <>
                <h1>Payment Options</h1>
                <p>Looks like you have no cards on your account</p>
                <NavLink to={`/users/${id}/cards/add`}><button>Add new Card</button></NavLink>
            </>
        )
    }

    return (
        <section className="payment-form-background ">
            <div className="payment-container">
                <h1 className="form-title">Payment Options</h1>
                <div className="cards-container">
                    {cards.length && cards.map((card) => {
                        return (
                            <div className="side">
                                <div className="payment-icon">
                                <IoIosCard />
                                </div>
                                <div className="form centre" key={card.id}>
                                    <p>{card.card_company}({card.card_type})</p>
                                    <p>{card.name}</p>
                                    <button className="form-button" onClick={(e) => handleCurrent(e, id, card.id, card)}>Update Card</button>
                                    <button className="form-button" onClick={e => { e.preventDefault(); handleDelete(id, card.id) }}>Delete card</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <NavLink to={`/users/${id}/cards/add`}><button>Add new Card</button></NavLink>
            </div>
        </section>
    )
}

export default PaymentOptions
