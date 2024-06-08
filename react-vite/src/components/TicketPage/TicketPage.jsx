import { useDispatch, useSelector } from "react-redux"
import { thunkGetTickets } from "../../redux/tickets"
import { useEffect } from "react"
import { useParams } from "react-router-dom"


function ListedTickets(){
const dispatch = useDispatch()
const {id} = useParams()

useEffect(()=>{
    dispatch(thunkGetTickets(id))
}, [id, dispatch])


const handleAlert = (e) =>{
    e.preventDefault()
    return alert("feature coming")
}


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
        <h1>listed tickets page</h1>
        {tickets.map((ticket) =>{
            return (<>
            <div>
                <p>Section{ticket.section}. Row{ticket.row}</p>
                <p>$ {ticket.price}</p>
                <button onClick={e => handleAlert(e)}>add to cart</button>
            </div>
            </>)
        })}
        </>
    )
}

export default ListedTickets
