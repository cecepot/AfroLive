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
      <form onSubmit={handleSubmit} className="form">
        <div>
          <p className="error">{errors.email && errors.email}</p>
          <label className="landing-white">
            Email :
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <p className="error">{errors.password && errors.password}</p>
          <label className="landing-white">
            Password :
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="log-button-container">
          <button type="submit" className="log-button mouse">Log In</button>
          <button onClick={(e) => handleLogin(e)} className="log-button mouse">Login demo user</button>
        </div>
        <NavLink to={"/signup"}><button className="log-button-diff mouse">signup</button></NavLink>
      </form>
    </>
  );
}

export default LoginFormPage;
