import { useDispatch, useSelector } from "react-redux"
import { thunkGetTickets } from "../../redux/tickets"
import { useEffect } from "react"
import { NavLink, useParams } from "react-router-dom"


function ManageTickets(){
const dispatch = useDispatch()
const {id} = useParams()

useEffect(()=>{
    dispatch(thunkGetTickets(id))
}, [id, dispatch])

const tickets = useSelector((state)=>state.tickets.tickets)


    return (
        <>
        <h1>Your tickets</h1>
        {tickets.map((ticket) =>{
            return (<>
            <div>
                <p>{ticket.section}.{ticket.row}</p>
                <p>$ {ticket.price}</p>
                <button>delete ticket</button>
            </div>
            </>)
        })}
        <NavLink><button>Add Tickets</button></NavLink>
        </>
    )
}

export default ManageTickets
