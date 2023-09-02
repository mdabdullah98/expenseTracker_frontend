import { useState } from "react";
import "../styles/signup.css";
import { AiOutlineEyeInvisible, AiFillEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../store/slices/user";

const Signup = () => {
  const dispatch = useDispatch();
  const { status, message } = useSelector((state) => state.user);

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
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const sumbitForm = async (e) => {
    e.preventDefault();
    if (input.psw === input.pswRepeat) {
      dispatch(signupUser(input));
    }
  };

  return (
    <>
      <div className="signup-form">
        <form className="modal-content" onSubmit={sumbitForm}>
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
                minLength={6}
                maxLength={12}
                name="psw"
                id="psw"
                required
                autoComplete="new-password"
                onChange={inputHandler}
              />
              <span className={`${input.psw ? "check-psw" : ""}`}>
                {input.psw ? (
                  pswToggle.showPsw ? (
                    <AiFillEye onClick={ShowPswHandler} />
                  ) : (
                    <AiOutlineEyeInvisible onClick={ShowPswHandler} />
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
                minLength={6}
                maxLength={12}
                name="pswRepeat"
                id="pswRepeat"
                required
                autoComplete="new-password"
                onChange={inputHandler}
              />
              <span className={`${input.pswRepeat ? "check-psw" : ""}`}>
                {input.pswRepeat ? (
                  pswToggle.showRepeatPsw ? (
                    <AiFillEye onClick={ShowRepeatPswHandler} />
                  ) : (
                    <AiOutlineEyeInvisible onClick={ShowRepeatPswHandler} />
                  )
                ) : (
                  ""
                )}
              </span>
            </div>
            {input.psw != input.pswRepeat && input.pswRepeat ? (
              <p className="text-bg-danger p-1 ">password do not match</p>
            ) : (
              ""
            )}

            <div className="clearfix">
              {/* <button type="button" className="cancelbtn">
                Cancel
              </button> */}
              <button type="submit" className="signupbtn">
                Sign Up
              </button>
            </div>
            <p className="status">{status}</p>
            <p className="message">{message}</p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
