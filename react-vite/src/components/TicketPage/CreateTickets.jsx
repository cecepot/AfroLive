import { useState } from "react"
import { useSelector } from "react-redux"

const addTicket = () => {
    return (
        <>
            <div>
                <label htmlFor="">Section</label>
                <input
                    type="number"
                    name="price" />
            </div>
            <div>
                <label htmlFor="">row</label>
                <input
                    type="number"
                    name="row" />
            </div>
            <div>
                <label htmlFor="amount">number of tickets</label>
                <input
                    type="number"
                    name="amount" />
            </div>
        </>
    )
}
const newTicket = addTicket()

function CreateTickets() {
    const user = useSelector(state => state.session.user)
    const [more, setMore] = useState(false)

    const add = (e) => {
        e.preventDefault()
        setMore(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()







        navigate(`/users/${user.id}/listings`)
    }






    return (
        <>
            <h1>Add tickets to your event</h1>
            <form action="">
                <div>
                    <label htmlFor="price">price</label>
                    <input
                        type="number"
                        name="price" />
                </div>
                <div>
                    <label htmlFor="">Section</label>
                    <input
                        type="number"
                        name="price" />
                </div>
                <div>
                    <label htmlFor="">row</label>
                    <input
                        type="number"
                        name="row" />
                </div>
                <div>
                    <label htmlFor="amount">number of tickets</label>
                    <input
                        type="number"
                        name="amount" />
                </div>
                {more && newTicket}
                <button onClick={add}>Add more tickets</button>
                <button>done</button>
            </form>
        </>
    )
}

export default CreateTickets
