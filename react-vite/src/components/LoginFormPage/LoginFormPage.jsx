import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { NavLink} from "react-router-dom"
import "./LoginForm.css";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

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


  const handleLogin = (e) => {
    e.preventDefault()
    let email = 'demo@aa.io'
    let password = 'password'
    dispatch(thunkLogin({ email, password }))
      .then(navigate('/'))
  }


  return (
    <>
      {errors.length > 0 &&
        errors.map((message) => <p key={message}>{message}</p>)}
      <form onSubmit={handleSubmit} className="form">
        <div>
          <p className="error">{errors.email && errors.email}</p>
          <label>
            Email
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
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit" className="form-button mouse">Log In</button>
        <button onClick={(e) => handleLogin(e)} className="form-button margin-left mouse">Login as demo user</button>
        <NavLink to={"/signup"}><button className="form-button margin-left mouse">signup</button></NavLink>
      </form>

    </>
  );
}

export default LoginFormPage;
