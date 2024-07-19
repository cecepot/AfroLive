import LoginFormPage from "../LoginFormPage"
import { Canvas } from '@react-three/fiber'



function LandingPage() {
    return (

        <div className="payment-form-background">
            <div className="form-container">
                <h1 className="form-title">Welcome to Afrolive</h1>
                <LoginFormPage />
            </div>
        </div>

    )
}

export default LandingPage
