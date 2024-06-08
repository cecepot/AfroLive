import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { thunkSignup } from "../../redux/session";

function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [validationErrors, setValidationErrors] = useState({})
  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (password !== confirmPassword) {
    //   return setErrors({
    //     confirmPassword:
    //       "Confirm Password field must be the same as the Password field",
    //   });
    // }
    let frontendValidators = {}
    if(username.length < 3){
      frontendValidators.username = 'Username should be more than three characters'
    }
    if(password.length < 8){
      frontendValidators.password = 'password should be at least eight characters long'
    }
    if (password !== confirmPassword){
      frontendValidators.confirmPassword = "Confirm Password field must be the same as the Password field"
    }
    if(Object.keys(frontendValidators).length){
      return setValidationErrors(frontendValidators)
    }





    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <p className="error">{errors.email && errors.email}</p>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
              placeholder="eg.janeDoe@google.com"
              required
            />
          </label>
        </div>
        <div>
          <p className="error">{errors.username && errors.username || validationErrors.username && validationErrors.username}</p>
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <p className="error">{errors.password && errors.password|| validationErrors.password && validationErrors.password}</p>
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
        <div>
          <p className="error">{errors.confirmPassword && errors.confirmPassword || validationErrors.confirmPassword && validationErrors.confirmPassword}</p>
          <label>
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormPage;
