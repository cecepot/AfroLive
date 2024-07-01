import { NavLink } from "react-router-dom"
import { FaGithub } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";
import { BsBriefcaseFill } from "react-icons/bs";

function AboutPage(){
    return (
        <section className="payment-form-background profile-icons-container">
        {/* <h1 className="margin-top">User Profile Page</h1> */}
        <NavLink className="real-container" to={`https://github.com/cecepot`} target = '#'><div className="profile-page-icons"><FaGithub /></div></NavLink>
        <NavLink className="real-container" to={`https://www.linkedin.com/in/cecepot`} target = '#'><div className="profile-page-icons"><IoLogoLinkedin  /></div></NavLink>
        <NavLink className="real-container" to={`https://cecepot.github.io`} target = '#'><div className="profile-page-icons"><BsBriefcaseFill   /></div></NavLink>
        </section>
    )
}

export default AboutPage
