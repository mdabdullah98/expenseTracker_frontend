import { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { AiOutlineCloseCircle } from "react-icons/ai";

import { BASE_URL } from "../../utils/utils";

import axios from "axios";

import "../../styles/signup.css";

const ResetPasword = () => {
  const getIsactive = async () => {
    const { data } = await axios(
      BASE_URL + `user/password/authenticate_link/${id}`
    );

    const isActive = data.isActive;
    if (isActive) {
      setIsActive(isActive);
    } else {
      setStatus({
        status: true,
        statusTxt:
          "Link is already been used Please generate new fresh link to reset your password",
      });
    }
  };

  //usenavigte
  const navigate = useNavigate();

  //userparams return an object with and id , getting value using object destructure
  const params = useParams();
  const { id } = params;

  //isactive status if the user used the pasword rest link then hide the reset form

  const [isActive, setIsActive] = useState(false);

  const [pswStatus, setStatus] = useState({
    status: false,
    statusTxt: null,
  });

  // onchange input handler value
  const [pswInput, setPswInput] = useState({
    password: null,
    retype_password: null,
  });

  // passwrod handlet to get the inpust value feild
  const passwrdInputHandler = (e) => {
    e.preventDefault();
    setPswInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const onsumbitHandler = async (e) => {
    e.preventDefault();
    try {
      setStatus({
        status: false,
        statusTxt: null,
      });

      if (pswInput.password === pswInput.retype_password) {
        const { data } = await axios.post(
          BASE_URL + `user/password/update_password/${id}`,
          { password: pswInput.password }
        );
        if (data.success) {
          setStatus({
            status: true,
            statusTxt: data.message,
          });
        }

        //redirect to user/login after sepecified time
        setTimeout(() => {
          navigate("/user/login");
        }, 1500);
      }
      return;
    } catch (err) {
      setStatus({
        status: true,
        statusTxt: "something went wrong !",
      });
    }
  };

  const closeResetPswHandler = () => {
    window.close();
  };
  //useEffect to get isActive sttaus from the forgotPassword table;
  useEffect(() => {
    getIsactive();
  }, []);

  return (
    <>
      <div className="signup-form reset-password ">
        <div className="w1-00 d-flex justify-content-end align-items-center mx-3">
          <span
            className="close-btn-resetPasword fs-3"
            title="close"
            onClick={closeResetPswHandler}
          >
            <AiOutlineCloseCircle />
          </span>
        </div>
        <div className="py-5">
          {pswStatus.status && (
            <p className="status p-1 bg-danger text-light rounded">
              {pswStatus.statusTxt}
            </p>
          )}
        </div>
        <form className="modal-content" onSubmit={onsumbitHandler}>
          {isActive && (
            <div className="container">
              <h6 className="my-4">Recover your password</h6>
              <div>
                <label htmlFor="password">
                  <b>Password</b>
                </label>
                <input
                  type="password"
                  placeholder="Enter your new password"
                  name="password"
                  id="password"
                  autoComplete="on"
                  required
                  className="my-3"
                  onChange={passwrdInputHandler}
                />
              </div>
              <div>
                <label htmlFor="retype_password">
                  <b>Re-Enter Password</b>
                </label>
                <input
                  type="password"
                  placeholder="Re-Enter your password"
                  name="retype_password"
                  id="retype_password"
                  autoComplete="on"
                  required
                  className="my-3"
                  onChange={passwrdInputHandler}
                />
                {/* checking password and retype password if they ar not equal then it will show pass does not match */}
                {pswInput.retype_password ? (
                  pswInput.password !== pswInput.retype_password ? (
                    <p className=" my-1 p-1 bg-danger text-light rounded">
                      Password Does Not Match
                    </p>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
              </div>
            </div>
          )}
          <div className="clearfix">
            {isActive && (
              <button type="submit" className="signupbtn">
                Reset Password
              </button>
            )}
            {/* {!isActive && (
              <button type="button" className="signupbtn mt-5">
                <NavLink to={"/user/login"}> generate link</NavLink>
              </button>
            )} */}
          </div>
        </form>
      </div>
    </>
  );
};

export default ResetPasword;
