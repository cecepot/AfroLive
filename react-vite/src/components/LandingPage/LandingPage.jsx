import LoginFormPage from "../LoginFormPage"




function LandingPage() {
    return (

        < section className="landing-container" >
            <div className="background-screen">
            {/* <img className="landing-image" src="https://res.cloudinary.com/dv9oyy79u/image/upload/v1722553954/IMG_0109_mhdhi7.png" alt="" /> */}
            <div className="form-container">
                <LoginFormPage />
            </div>
            </div>
        </section>


    )
}

export default LandingPage
