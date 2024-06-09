import LoginFormPage from "../LoginFormPage"
import { NavLink} from "react-router-dom"



function LandingPage() {
    return (
        <section className="form-background">
            <div className="form-container">
                <h1 className="form-title">Welcome to Afrolive</h1>
                <LoginFormPage />
                <NavLink to={"/signup"}><button>signup</button></NavLink>
            </div>
        </section>
    )
}

export default LandingPage
