import React, { Suspense } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import white from "../../logos/fdm-white.png";
import black from "../../logos/fdm-black.png";
import Message from "../../components/Message/Message";
import { resetPassword } from "../../firebase-config";

import useLocalStorage from "use-local-storage";

import i18next from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";

const translationEN = {
  welcome: "Welcome! PLease Log in ",
  username: "Username",
  password: "Password",
  submit: "Login",
  ForgotPassword: "Forgot Password?",
};
const translationFr = {
  welcome: "Bienvenue ! Veuillez vous connecter.",
  username: "Nom d'utilisateur",
  password: "Mot de passe",
  submit: "connexion",
  ForgotPassword: "Mot de passe oublié?",
};

const translationGe = {
  welcome: "Willkommen! Bitte loggen Sie sich ein",
  username: "Nutzername",
  password: "Passwort",
  submit: "Anmeldung",
  ForgotPassword: "Passwort vergessen?",
};
const translationSp = {
  welcome: "Bienvenidos! Por favor Iniciar sesión ",
  username: "Nombre de usuario",
  password: "Clave",
  submit: "Acceso",
  ForgotPassword: "Has olvidado tu contraseña?",
};

i18next.use(initReactI18next).init({
  resources: {
    en: { translation: translationEN },
    fr: { translation: translationFr },
    ge: { translation: translationGe },
    sp: { translation: translationSp },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

const Login = () => {
  const [showPasswordResetModal, setShowPasswordResetModal] = useState(false);

  const [theme, setTheme] = useLocalStorage("theme" ? "dark" : "light");

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  // const resetPassword = () => {
  //   //const auth = getAuth();
  //   sendPasswordResetEmail(auth, "fnwachukwu84@gmail.com")
  //     .then(() => {
  //       // Password reset email sent!
  //       // ..
  //     })
  //     .catch((error) => {
  //       //const errorCode = error.code;
  //       //const errorMessage = error.message;
  //       // ..
  //     });
  // };

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
        (s_password === employee_x.password) ||
      (s_username === "fnwachukwu84@gmail.com") & (s_password === "favour123")
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
      <div className="app">
        <div className="login-wrapper" data-theme={theme}>
          {wrongPassword === false ? (
            <>
              <div className="top-icons">
                <div className="theme-toggle">
                  <i onClick={switchTheme} class="fas fa-toggle-on"></i>
                </div>
                <div>
                  <select onChange={onChange}>
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="ge">German</option>
                    <option value="sp">Spanish</option>
                  </select>
                </div>
              </div>

              <h1> {t("welcome")} </h1>
              <form onSubmit={HandleSubmit}>
                <img
                  className="fdm-logo-white"
                  src={theme === "light" ? white : black}
                  alt="fdm logo"
                ></img>
                <label>
                  <p> {t("username")}</p>
                  <input
                    className="login-text-box"
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
                    className="login-text-box"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={s_password}
                    required
                  />
                </label>
                <div>
                  <p
                    onClick={() => {
                      resetPassword();
                      setShowPasswordResetModal(!showPasswordResetModal);
                    }}
                    className="forgot-password"
                  >
                    {t("ForgotPassword")}
                  </p>
                  {showPasswordResetModal === false ? (
                    ""
                  ) : (
                    <>
                      <Message>
                        <p>
                          Password Reset Email has been sent. Please check your
                          email for further Instructions.
                        </p>
                        <button
                          onClick={() => {
                            setShowPasswordResetModal(!showPasswordResetModal);
                          }}
                        >
                          Okay
                        </button>
                      </Message>
                    </>
                  )}
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
      </div>
    </Suspense>
  );
};

export default Login;
