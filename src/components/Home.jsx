import { useState } from "react";
import { NavLink } from "react-router-dom";
import { CiMenuFries } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import AddExpense from "./addExpense";
import ExpenseMain from "./ExpenseMain";
import "../styles/home.css";
const Home = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(true);
  const token = JSON.parse(sessionStorage.getItem("token"));
  const menuShow = () => {
    setMenu((prev) => !prev);
  };

  const logouthandler = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };
  return (
    <>
      <div>
        <div className={`main-expense-div ${menu ? "active" : ""}`}>
          <div className="brand-logo d-flex justify-content-center align-items-center my-3">
            <div className="content d-flex justify-content-center align-items-center mx-3">
              <img
                src="/day-to-day-expenses.png"
                alt="expense avatar"
                width={100}
              />
              <h3 className="ms-2">welcome to day-to-day expenses</h3>
            </div>
            <div className="login-logout">
              {!token && (
                <button className="btn btn-sm btn-outline-warning me-1 ">
                  <NavLink
                    to={"/user/signup"}
                    className="text-decoration-none text-black"
                  >
                    I am New User
                  </NavLink>
                </button>
              )}

              {token ? (
                <button
                  className="logout-button btn btn-outline-danger m-1"
                  onClick={logouthandler}
                >
                  logout
                </button>
              ) : (
                <button className="btn btn-sm btn-outline-info m-1">
                  <NavLink
                    to={"/user/login"}
                    className="text-decoration-none text-black  "
                  >
                    Login
                  </NavLink>
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="menu" onClick={menuShow}>
          <CiMenuFries />
        </div>
      </div>

      {token && <ExpenseMain />}
      {token && <AddExpense />}
    </>
  );
};

export default Home;
