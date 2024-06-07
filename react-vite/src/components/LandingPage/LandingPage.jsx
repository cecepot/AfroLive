import LoginFormPage from "../LoginFormPage"
import { NavLink, useNavigate } from "react-router-dom"
import { thunkLogin } from "../../redux/session"
import { useDispatch } from "react-redux"


function LandingPage(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogin = (e) => {
        e.preventDefault()
        let email = 'demo@aa.io'
        let password = 'password'
        dispatch(thunkLogin({email, password}))
        .then(navigate('/'))
      }


    return (
        <>
        <h1>Landing page</h1>
        <LoginFormPage/>
        <button onClick={(e) => handleLogin(e)}>Login as demo user</button>
        <NavLink to = {"/signup"}><button>signup</button></NavLink>
        </>
    )
}

export default LandingPage
