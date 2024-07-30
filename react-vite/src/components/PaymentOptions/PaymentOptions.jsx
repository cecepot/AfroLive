import { useDispatch, useSelector } from "react-redux"
import { thunkDeleteCard, thunkGetCards, thunkGetCurrentCard } from "../../redux/cards"
import { useEffect, useState } from "react"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { IoIosCard } from "react-icons/io";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
import { useModal } from "../../context/Modal"


const DeleteCardModal = ({ id, cardId }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleClick = async (e) => {
        e.preventDefault();

        await dispatch(thunkDeleteCard(id, cardId)).then(closeModal);
        dispatch(thunkGetCards(id));
    };

    const close = (e) => {
        e.preventDefault();
        return closeModal();
    };

    return (
        <div className="modal-container">
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to delete this card?</p>
            <div className="">
                <button className="pay-button mouse" onClick={handleClick}>
                    Delete
                </button>
                <button className="pay-button mouse" onClick={close}>
                    Cancel
                </button>
            </div>
        </div>
    );
};




function PaymentOptions() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const navigate = useNavigate()

    // if (isLoading) {
    //     return <Loader />;
    //   }

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
            <section className="payment-form-background ">
                <div className="payment-container">
                    <h1 className="form-title">Payment Options</h1>
                    <p>Looks like you have no cards on your account</p>
                    <NavLink to={`/users/${id}/cards/add`}><button className="pay-button mouse">Add new Card</button></NavLink>
                </div>
            </section>
        )
    }

    return (
        <section className="card-grand-container">
            <h1 className="card-title">Payment Options</h1>
            <div className="card-grid">
                {cards.length && cards.map((card) => {
                    return (
                        <div className="card-main-container" key={card.id}>
                            <div className="card-sub-container" >
                                <div className="card-front">
                                    <div className="payment-icon">
                                        <IoIosCard />
                                    </div>
                                    <p>{card.card_company}({card.card_type})</p>
                                    <p className="card-name">{card.name}</p>
                                </div>
                                <div className="card-back" key={card.id}>
                                    <button className="card-button list-item" onClick={e => { e.preventDefault() }}>
                                        <OpenModalMenuItem

                                            itemText={"Delete Card"}
                                            modalComponent={
                                                <DeleteCardModal
                                                    id={id}
                                                    cardId={card.id}
                                                />
                                            }
                                        />
                                    </button>
                                    <button className="card-button" onClick={(e) => handleCurrent(e, id, card.id, card)}>Update Card</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <NavLink to={`/users/${id}/cards/add`}><button className="mouse card-button">Add new Card</button></NavLink>
        </section>
    )
}

export default PaymentOptions
