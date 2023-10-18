import React from 'react'
import { useState,useRef } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import classes from './SignUp.module.css'
import { Link } from 'react-router-dom/cjs/react-router-dom';
import {authActions} from '../Store/auth';
import { useDispatch } from 'react-redux';

const SignUp = () => {
  const emailref = useRef()
  const passwordref = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const dispatch=useDispatch();



  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // window.location.reload();
    const enteredemail = emailref.current.value;
    const enteredpassword = passwordref.current.value;
    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB4mcS-F5h8tJYVTPw1pFJM93TgPV1YzQ8";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB4mcS-F5h8tJYVTPw1pFJM93TgPV1YzQ8";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredemail,
        password: enteredpassword,
        returnSecureToken: true,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        console.log(data.email);
        // authCtx.login(data.idToken, data.email);
        dispatch(authActions.login({token:data.idToken,email:data.email}))

        history.replace("/Mailbox");
        // window.location.reload()
      })
      .catch((err) => {
        alert(err.message);
      });
      // window.location.reload()
  };
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailref} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordref} />
        </div>

        <div className={classes.actions}>
        {isLogin && <Link to='/ForgetPassword' className={classes.toggle}> Forget Password?</Link>}<br></br>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending request......</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  )
}

export default SignUp;