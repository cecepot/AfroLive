import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { thunkUpdateCards, thunkGetCards } from "../../redux/cards";



function EditCardForm() {
    const [name, setName] = useState("")
    const [owner_name, setOwner_name] = useState("")
    const [card_number, setCard_number] = useState("")
    const [expiration_date, setExpiration_date] = useState("")
    const [cvv, setCvv] = useState("")
    const [billing_address, setBilling_address] = useState("")
    const [validationErrors, setValidationErrors] = useState({})
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch()
    const { id, cardId } = useParams()
    const navigate = useNavigate()
    let location = useLocation()
    const card = location.state.data

    useEffect(() => {
        setName(card.name)
        setOwner_name(card.owner)
        setExpiration_date(new Date(card.expiration_date).toISOString().split("T")[0])
        setCvv(parseInt(card.cvv))
        setBilling_address(card.billing_address)
    }, [card])


    const handleSubmit = async (e) => {
        e.preventDefault()

        let errors = {}
        if (!(owner_name.split(" ")[1]) || !owner_name) { errors.owner_name = 'Please provide your full name as is on the card' }
        if (new Date(expiration_date).getTime() <= Date.now()) { errors.expiration_date = 'Please provide a card with a valid expiration date.' }
        if (!(billing_address.split(" ")[1]) || !billing_address) { errors.billing_address = 'Please provide a valid address' }
        if (100 > cvv > 999 || !cvv) { errors.cvv = 'Please provide a valid cvv. These are the three digits behind your card' }


        if (Object.values(errors).length > 0) {
            console.log(Object.values(errors))
            setValidationErrors(errors)
            return
        }

        const formData = {
            name,
            owner_name,
            expiration_date,
            cvv,
            billing_address
        }


        const newCard = await dispatch(thunkUpdateCards(id, formData, cardId))
        console.log(newCard)
        if (newCard) {
            return setErrors(newCard)
        } else {
            dispatch(thunkGetCards(id))
            navigate(`/users/${id}/cards`)
        }
    }


    return (
        <>
            <h1>Edit Card Form</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <p className="error">{errors.name && errors.name}</p>
                    <label htmlFor="name">Name</label>
                    <p>update the unique name which identifies your card. This card's number will not be viewable after it is added</p>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="name of card"
                        required
                    />
                </div>
                <div>
                    <p className="error">{validationErrors.owner_name && validationErrors.owner_name || errors.name && errors.name}</p>
                    <p>What is the name on your card ?</p>
                    <label htmlFor="owner_name">Name on card</label>
                    <input
                        type="text"
                        name="owner_name"
                        value={owner_name}
                        onChange={(e) => setOwner_name(e.target.value)}
                        placeholder="name on card"
                        required
                    />
                </div>
                <div>
                    <p className="error">{validationErrors.expiration_date && validationErrors.expiration_date || errors.expiration_date && errors.expiration_date}</p>
                    <label htmlFor="expiration_date">expiration date</label>
                    <input
                        type="date"
                        name="expiration_date"
                        value={expiration_date}
                        onChange={(e) => setExpiration_date(e.target.value)}
                        onFocus={(e) => e.target.showPicker()}
                        placeholder="expiration date"
                        required
                    />
                </div>
                <div>
                    <p className="error">{validationErrors.billing_address && validationErrors.billing_address || errors.billing_address && errors.billing_address}</p>
                    <label htmlFor="billing_address">Billing Address</label>
                    <input
                        type="text"
                        name="billing_address"
                        value={billing_address}
                        onChange={(e) => setBilling_address(e.target.value)}
                        placeholder="Billing Address"
                        required
                    />
                </div>
                <div>
                <p className="error">{validationErrors.cvv && validationErrors.cvv || errors.cvv && errors.cvv}</p>
                    <label htmlFor="cvv">cvv</label>
                    <input
                        type="number"
                        name="cvv"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        placeholder="cvv"
                        required
                    />
                </div>
                <button type="submit">Update Card</button>
            </form>
        </>
    )
}


export default EditCardForm
