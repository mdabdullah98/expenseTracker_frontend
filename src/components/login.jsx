import React, { useState } from "react";
import "../styles/signup.css";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiFillEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { tokenLoader } from "../store/slices/user";
import axios from "axios";

const Login = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [pswToggle, setPswToggle] = useState(false);
  const [status, setStatus] = useState(null);

  const [input, setInput] = useState({
    email: null,
    psw: null,
  });

  const ShowPswHandler = () => {
    setPswToggle((prev) => !prev);
  };

  const inputHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setStatus(null);
    try {
      setStatus("sending...");

      const res = await axios.post("http://localhost:8080/user/login", input);

      if (res.data === "password do not match") {
        setStatus("password do not match");
      } else if (res.data === "email does not exist please signup") {
        setStatus("Email does not exist please signup");
        setTimeout(() => {
          navigate("/user/signup");
        }, 3000);
      } else {
        setStatus("login succesfully");
        dispatch(tokenLoader(res.data));
        sessionStorage.setItem("token", JSON.stringify(res.data));
        navigate("/home");
      }
    } catch (err) {
      console.log(err);
      setStatus(err.response.data);
    }
  };
  return (
    <>
      <div className="signup-form">
        <form className="modal-content" onSubmit={loginHandler}>
          <div className="container">
            <p className="alert-danger">{status}</p>
            <h1 className="my-1">Login</h1>
            <label htmlFor="email">
              <b>Email</b>
            </label>
            <input
              type="text"
              placeholder="Enter Email"
              name="email"
              id="email"
              required
              onChange={inputHandler}
            />

            <label htmlFor="psw">
              <b>Password</b>
            </label>
            <div className="d-flex justify-content-center align-items-center">
              <input
                type={pswToggle ? "text" : "password"}
                placeholder="Enter Password"
                name="psw"
                id="psw"
                required
                autoComplete="new-password"
                onChange={inputHandler}
              />
              <span className={`${input.psw ? "check-psw" : ""}`}>
                {input.psw ? (
                  pswToggle ? (
                    <AiFillEye onClick={ShowPswHandler} />
                  ) : (
                    <AiOutlineEyeInvisible onClick={ShowPswHandler} />
                  )
                ) : (
                  ""
                )}
              </span>
            </div>

            <div className="clearfix">
              <button type="submit" className="signupbtn">
                Login
              </button>
              <p>do not have an account signup ?</p>
              <button type="button" className="signupbtn">
                <NavLink to={"/user/signup"}>Signup</NavLink>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
