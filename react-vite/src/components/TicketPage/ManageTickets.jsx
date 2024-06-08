import { useDispatch, useSelector } from "react-redux"
import { thunkGetTickets } from "../../redux/tickets"
import { useEffect } from "react"
import { NavLink, useParams } from "react-router-dom"


function ManageTickets(){
const dispatch = useDispatch()
const {listingId} = useParams()

useEffect(()=>{
    dispatch(thunkGetTickets(listingId))
}, [listingId, dispatch])

const tickets = useSelector((state)=>state.tickets.tickets)

if(!tickets.length){
    return (
        <>
        <h1>listed tickets page</h1>
        <p>there are no tickets available for this event </p>
        </>
    )}

    return (
        <>
        <h1>Your tickets</h1>
        {tickets.map((ticket) =>{
            return (<>
            <div>
                <p>section{ticket.section}. Row{ticket.row}</p>
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
