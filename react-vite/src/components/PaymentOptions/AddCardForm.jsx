import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { thunkCreateCard, thunkGetCards } from "../../redux/cards";

function AddCardForm() {
    const [name, setName] = useState("")
    const [owner_name, setOwner_name] = useState("")
    const [card_type, setCard_type] = useState("")
    const [card_number, setCard_number] = useState("")
    const [expiration_date, setExpiration_date] = useState("")
    const [cvv, setCvv] = useState("")
    const [billing_address, setBilling_address] = useState("")
    const dispatch = useDispatch()
    const {id} = useParams()
    const navigate = useNavigate()
    const [errors, setErrors] = useState({});
    const [validationErrors, setValidationErrors] = useState({})

    const handleSubmit = async(e) =>{
        e.preventDefault()
        setErrors({})
        setValidationErrors({})
        let errors = {}
        if (!(owner_name.split(" ")[1]) || !owner_name){ errors.owner_name = 'Please provide your full name as is on the card' }
        if ( +card_number.length !== 15 && +card_number.length !== 16 || ! +card_number){ errors.card_number = 'Please provide a valid card number  (15 - 16 numbers long, without spaces)' }
        if (new Date(expiration_date).getTime() <= Date.now()){ errors.expiration_date = 'Please provide a card with a valid expiration date.' }
        if (!(billing_address.split(" ")[1]) || !billing_address){ errors.billing_address = 'Please provide a valid address' }
        if (cvv < 100 || cvv > 999 || !cvv){ errors.cvv = 'Please provide a valid cvv. These are the three digits behind your card' }
        // console.log(Object.values(errors).length > 0)

        if (Object.values(errors).length > 0) {
            console.log(card_number.length)
            setValidationErrors(errors)
            return
        }



        let card_company
        const company_name = (card_number) =>{
            if (card_number[0] == '3') card_company = 'American Express'
            else if ( card_number[0] == '4') card_company = 'Visa'
            else if ( card_number[0] == '2' || card_number[0] == '5') card_company = 'Mastercard'
            else if ( card_number[0] == '6') card_company = 'Discover'
            else card_company = 'Unknown'

        }
        company_name(card_number)

       const formData =  { name,
            owner_name,
            card_type,
            card_number,
            expiration_date,
            cvv,
            card_company,
            billing_address}


        const newCard = await dispatch(thunkCreateCard(id, formData))
        if (newCard){
           return setErrors(newCard)
        }else{
            dispatch(thunkGetCards(id))
            navigate(`/users/${id}/cards`)
        }
    }


    return (
        <>
            <h1>Add a Card</h1>
            <form onSubmit={handleSubmit}>
                <div>
                <p className="error">{errors.name && errors.name}</p>
                    <label htmlFor="name">Name</label>
                    <p>choose a unique name to identify your card by. This card's number will not be viewable after it is added</p>
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
                <p className="error">{validationErrors.owner_name && validationErrors.owner_name || errors.owner_name && errors.owner_name}</p>
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
                <p className="error">{errors.card_type && errors.card_type}</p>
                    <label htmlFor="card_type">Type</label>
                    <select name="card_type" onChange={(e) => setCard_type(e.target.value)} required>
                        <option value="">Select a card type</option>
                        <option value="debit card">Debit</option>
                        <option value="credit card">Credit</option>
                    </select>
                </div>
                <div>
                <p className="error">{validationErrors.card_number && validationErrors.card_number|| errors.card_number && errors.card_number}</p>
                    <label htmlFor="card_number">card number</label>
                    <input
                        type="text"
                        name="card_number"
                        value={card_number}
                        onChange={(e) => setCard_number(e.target.value)}
                        placeholder="card number"
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
                <button type="submit">Add Card</button>
            </form>
        </>
    )
}

export default AddCardForm
