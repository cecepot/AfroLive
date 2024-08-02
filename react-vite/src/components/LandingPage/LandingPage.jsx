import LoginFormPage from "../LoginFormPage"




function LandingPage() {
    return (

        < section className="landing-container" >
            <div className="background-screen">
                <h1 className="afrolive cagliostro-regular">AfroLive</h1>
                <div className="landing-form-container">
                    <LoginFormPage />
                </div>
            </div>
        </section>


    )
}

export default LandingPage
