import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { thunkUpdateCards, thunkGetCards } from "../../redux/cards";



function EditCardForm(){
    const [name, setName] = useState("")
    const [owner_name, setOwner_name] = useState("")
    const [card_type, setCard_type] = useState("")
    const [card_number, setCard_number] = useState("")
    const [expiration_date, setExpiration_date] = useState("")
    const [cvv, setCvv] = useState("")
    const [billing_address, setBilling_address] = useState("")
    const dispatch = useDispatch()
    const {id, cardId} = useParams()
    const navigate = useNavigate()
    let location = useLocation()
    const card = location.state.data

    useEffect(() => {
        setName(card.name)
        setOwner_name(card.owner)
        setCard_type(card.card_type)
        setCard_number(card.card_number)
        setExpiration_date(new Date(card.expiration_date).toISOString().split("T")[0])
        setCvv(parseInt(card.cvv))
        setBilling_address(card.billing_address)
    }, [card])


    const handleSubmit = async(e) =>{
        e.preventDefault()

        // let card_company
        // const company_name = (card_number) =>{
        //     if (card_number[0] == '3') card_company = 'American Express'
        //     else if ( card_number[0] == '4') card_company = 'Visa'
        //     else if ( card_number[0] == '2' || card_number[0] == '5') card_company = 'Mastercard'
        //     else if ( card_number[0] == '6') card_company = 'Discover'
        //     else card_company = 'Unknown'

        // }
        // company_name(card_number)

       const formData =  {
            name,
            owner_name,
            card_type,
            expiration_date,
            cvv,
            billing_address}


        const newCard = await dispatch(thunkUpdateCards(id, formData, cardId))
        console.log(newCard)
        if (newCard){
            dispatch(thunkGetCards(id))
            navigate(`/users/${id}/cards`)
        }
    }


    return (
        <>
        <h1>Edit Card Form</h1>
        <form onSubmit={handleSubmit}>
                <div>
                <p className="error"></p>
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
                <p className="error"></p>
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
                <p className="error"></p>
                    <label htmlFor="card_type">Type</label>
                    <select name="card_type" onChange={(e) => setCard_type(e.target.value)}>
                        <option value="">Select a card type</option>
                        <option value="debit card">Debit</option>
                        <option value="credit card">Credit</option>
                    </select>
                </div>
                <div>
                <p className="error"></p>
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
                <p className="error"></p>
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
                <p className="error"></p>
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
