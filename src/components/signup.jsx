import { useState } from "react";

import "../styles/signup.css";
import { AiOutlineEyeInvisible, AiFillEye } from "react-icons/ai";
const Signup = () => {
  const [pswToggle, setPswToggle] = useState({
    showPsw: false,
    showRepeatPsw: false,
  });

  const [input, setInput] = useState({
    username: null,
    email: null,
    psw: null,
    pswRepeat: null,
  });

  const ShowPswHandler = () => {
    setPswToggle({
      ...pswToggle,
      showPsw: !pswToggle.showPsw,
    });
  };
  const ShowRepeatPswHandler = () => {
    setPswToggle({
      ...pswToggle,
      showRepeatPsw: !pswToggle.showRepeatPsw,
    });
  };

  const inputHandler = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  console.log(input);
  return (
    <>
      <div className="signup-form">
        <form className="modal-content" action="/action_page.php">
          <div className="container">
            <h1 className="my-1">Sign Up</h1>
            <p>Please fill in this form to create an account.</p>
            <label htmlFor="username">
              <b>Username</b>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              name="username"
              id="username"
              required
              onChange={inputHandler}
            />
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
                type={pswToggle.showPsw ? "text" : "password"}
                placeholder="Enter Password"
                name="psw"
                id="psw"
                required
                onChange={inputHandler}
              />
              <span className={`${input.psw ? "check-psw" : ""}`}>
                {input.psw ? (
                  pswToggle.showPsw ? (
                    <AiOutlineEyeInvisible onClick={ShowPswHandler} />
                  ) : (
                    <AiFillEye onClick={ShowPswHandler} />
                  )
                ) : (
                  ""
                )}
              </span>
            </div>

            <label htmlFor="pswRepeat">
              <b>Repeat Password</b>
            </label>
            <div className="d-flex justify-content-center align-items-center">
              <input
                type={pswToggle.showRepeatPsw ? "text" : "password"}
                placeholder="Repeat Password"
                name="pswRepeat"
                id="pswRepeat"
                required
                onChange={inputHandler}
              />
              <span className={`${input.pswRepeat ? "check-psw" : ""}`}>
                {input.pswRepeat ? (
                  pswToggle.showRepeatPsw ? (
                    <AiOutlineEyeInvisible onClick={ShowRepeatPswHandler} />
                  ) : (
                    <AiFillEye onClick={ShowRepeatPswHandler} />
                  )
                ) : (
                  ""
                )}
              </span>
            </div>

            <div className="clearfix">
              <button type="button" className="cancelbtn">
                Cancel
              </button>
              <button type="submit" className="signupbtn">
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
