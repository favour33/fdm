import React, { Suspense } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import white from "../../logos/fdm-white.png";
import Message from "../../components/Message/Message";

import i18next from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";

const translationEN = {
  welcome: "Welcome! PLease Log in ",
  username: "Username",
  password: "Password!",
  submit: "Submit!",
};
const translationFr = {
  welcome: "Bienvenue ! Veuillez vous connecter!",
  username: "nom d'utilisateur",
  password: "Mot de passe!",
  submit: "nous faire parvenir!",
};

i18next.use(initReactI18next).init({
  resources: {
    en: { translation: translationEN },
    fr: { translation: translationFr },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

const Login = () => {
  const onChange = (event) => {
    i18next.changeLanguage(event.target.value);
  };

  const { t } = useTranslation();

  const [s_username, setUserName] = useState("");
  const [s_password, setPassword] = useState("");
  const navigate = useNavigate();

  const [wrongPassword, setWrongPassword] = useState(false);

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
      setWrongPassword(!wrongPassword);
      setUserName("");
      setPassword("");
    }
  };

  return (
    <Suspense fallback="Loading...">
      <div className="login-wrapper">
        {wrongPassword === false ? (
          <>
            <select onChange={onChange}>
              <option value="en">English</option>
              <option value="fr">French</option>
            </select>
            <h1> {t("welcome")} </h1>
            <form onSubmit={HandleSubmit}>
              <img className="fdm-logo-white" src={white} alt="fdm logo"></img>
              <label>
                <p> {t("username")}</p>
                <input
                  id="username"
                  type="text"
                  onChange={(e) => setUserName(e.target.value)}
                  value={s_username}
                  required
                />
              </label>
              <label>
                <p> {t("password")}</p>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={s_password}
                  required
                />
              </label>
              <div>
                {/* <p className="forgot-password">Forgot Password?</p> */}
                <button className="submit-button" type="submit">
                  <p> {t("submit")}</p>
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
    </Suspense>
  );
};

export default Login;
