import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [s_username, setUserName] = useState("");
  const [s_password, setPassword] = useState("");

  const navigate = useNavigate();

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

    // const usernmayy = "e";
    // const passwordy = "e";

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
      navigate("/");
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
      <h1>Please Log In</h1>
      <form onSubmit={HandleSubmit}>
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
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
