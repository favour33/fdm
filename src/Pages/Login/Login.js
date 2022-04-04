import React from "react";
// import { useRef } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { signup } from "../../firebase-config";
import "./Login.css";
import white from "../../logos/fdm-white.png";
import Message from "../../components/Message/Message";

const Login = () => {
  // const emailRef = useRef();
  // const passwordRef = useRef();
  const [s_username, setUserName] = useState("");
  const [s_password, setPassword] = useState("");
  const navigate = useNavigate();

  const [wrongPassword, setWrongPassword] = useState(false);

  // const HandleSubmit = async () => {
  //   await signup(emailRef.current.value, passwordRef.current.value);
  // };

  // return (
  //   <div className="login-wrapper">
  //     <h1>Please Log In</h1>
  //     <form>
  //       <label>
  //         <p>Username</p>
  //         <input ref={emailRef} id="username" type="text" required />
  //       </label>
  //       <label>
  //         <p>Password</p>
  //         <input ref={passwordRef} type="password" required />
  //       </label>
  //       <div>
  //         <button onClick={HandleSubmit}>Log in</button>
  //       </div>
  //     </form>
  //   </div>
  // );

  // employees
  const employee_x = {
    username: "e",
    password: "e",
  };

  // employees
  const manager_x = {
    username: "m",
    password: "m",
  };

  // employees
  const financeDepartment_x = {
    username: "fd",
    password: "fd",
  };

  const HandleSubmit = (e) => {
    e.preventDefault();

    //   // const usernmayy = "e";
    //   // const passwordy = "e";

    if (
      (s_username === employee_x.username) &
      (s_password === employee_x.password)
    ) {
      navigate("/employees");
    } else if (
      (s_username === manager_x.username) &
      (s_password === manager_x.password)
    ) {
      navigate("/managers");
    } else if (
      (s_username === financeDepartment_x.username) &
      (s_password === financeDepartment_x.password)
    ) {
      navigate("/finances");
    } else {
      // navigate("/");
      // alert("Incorrect Username/Password");
      // setUserName("");
      // setPassword("");
      setWrongPassword(!wrongPassword);
      setUserName("");
      setPassword("");
    }

    // navigate("/employees");
    // navigate("/managers");
    // navigate("/finances");
    // navigate("/");
  };

  return (
    <div className="login-wrapper">
      {wrongPassword === false ? (
        <>
          <h1>Log In</h1>
          <form onSubmit={HandleSubmit}>
            <img className="fdm-logo-white" src={white} alt="fdm logo"></img>
            <label>
              <p>Username</p>
              <input
                id="username"
                type="text"
                onChange={(e) => setUserName(e.target.value)}
                value={s_username}
                required
              />
            </label>
            <label>
              <p>Password</p>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={s_password}
                required
              />
            </label>
            <div>
              <p className="forgot-password">Forgot Password?</p>
              <button className="submit-button" type="submit">
                Submit
              </button>
            </div>
          </form>
        </>
      ) : (
        <Message>
          <div className="wrong-password-content">
            <p className="login-incorrect-password-message">
              Incorrect Password/Username
            </p>
            <button
              className="login-wrong-password-button"
              onClick={() => {
                setWrongPassword(!wrongPassword);
              }}
            >
              Try again.
            </button>
          </div>
        </Message>
      )}
    </div>
  );
};

export default Login;
