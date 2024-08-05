import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Loader from "../LoadingComponent/Loader";
import "./LoginForm.css";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);


  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };


  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    let email = 'demo@aa.io'
    let password = 'password'
    const demoUser = await dispatch(thunkLogin({ email, password }))
    if (demoUser){
      setLoading(false)
      setErrors(demoUser)
    }else{
      navigate('/')
    }

  }

  if (loading) {
    return <Loader />
}

  return (
    <>
      {errors.length > 0 &&
        errors.map((message) => <p key={message}>{message}</p>)}
      <form onSubmit={handleSubmit} className="form landing-form">
        <p className="landing-white landing-sub-title">Welcome to Afrolive!</p>
        <div >
          <p className="error">{errors.email && errors.email}</p>
          <label className="landing-white landing-label-flex">
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="landing-input"
            />
          </label>
        </div>
        <div>
          <p className="error">{errors.password && errors.password}</p>
          <label className="landing-white landing-label-flex">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="landing-input"
            />
          </label>
        </div>
        <div className="log-button-container">
          <p className="landing-white">Already have an account ?</p><button type="submit" className="log-button mouse">Log In</button>
          <p className="landing-white"> Or try out a</p>
          <button onClick={(e) => handleLogin(e)} className="log-button mouse"> Demo Account .</button>
        </div>
        <p className="landing-white">Don&apos;t have an account yet ? <NavLink to={"/signup"}><span className=" mouse sign-up">Join the community.</span></NavLink></p>
      </form>
    </>
  );
}

export default LoginFormPage;
