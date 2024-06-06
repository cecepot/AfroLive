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

const tickets = useSelector((state)=>state.tickets.tickets)


    return (
        <>
        <h1>listed tickets page</h1>
        {tickets.map((ticket) =>{
            return (<>
            <div>
                <p>Section{ticket.section}. Row{ticket.row}</p>
                <p>$ {ticket.price}</p>
                <button>add to cart</button>
            </div>
            </>)
        })}
        </>
    )
}

export default ListedTickets
