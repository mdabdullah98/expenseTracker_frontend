import { useState } from "react";
import "../styles/addExpense.css";
import { GrAdd } from "react-icons/gr";
import { AiOutlineCheck, AiOutlineCloseCircle } from "react-icons/ai";
import axios from "axios";

const AddExpense = () => {
  const getToken = () => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    if (token) {
      return token;
    }
    return null;
  };
  const [addExpMode, setAddExpMode] = useState({
    addExpense: false,
    expense: "",
    income: "",
  });

  const [input, setInput] = useState({
    earnings: null,
    spent: null,
    describe: null,
    catagory: null,
  });

  const fullformEnable = (e) => {
    setAddExpMode({
      ...addExpMode,
      addExpense: !addExpMode.addExpense,
    });
  };

  const expenseBtn = () => {
    setAddExpMode({
      ...addExpMode,
      expense: "active",
      income: "",
    });
  };

  const earningBtn = () => {
    setAddExpMode({
      ...addExpMode,
      expense: "",
      income: "active",
    });
  };

  const inputHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const sumbitExpense = async (e) => {
    e.preventDefault();
    let url;
    const token = getToken();

    try {
      if (addExpMode.expense || addExpMode.income) {
        setAddExpMode({
          ...addExpMode,
          addExpense: !addExpMode.addExpense,
        });
      }

      if (addExpMode.expense) {
        url = "http://localhost:8080/user/expense";
      } else if (addExpMode.income) {
        url = "http://localhost:8080/user/income";
      } else {
        return;
      }

      const res = await axios.post(url, {
        input: input,
        token: token,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add-expense">
      <form
        className={`expense-form ${addExpMode.addExpense ? "active" : ""}`}
        onSubmit={sumbitExpense}
      >
        <div className="d-flex justify-content-end align-items-center">
          <span className="close-form" onClick={fullformEnable}>
            <AiOutlineCloseCircle />
          </span>
        </div>

        <div className="expense-earning">
          <button
            type="button"
            onClick={expenseBtn}
            className={`${addExpMode.expense}`}
          >
            expense
          </button>
          <button
            type="button"
            onClick={earningBtn}
            className={`${addExpMode.income}`}
          >
            Income
          </button>
        </div>
        <div>
          <label htmlFor="spent">
            {addExpMode.income ? "earnings" : "Spent"}
          </label>
          <input
            type="text"
            name={addExpMode.income ? "earnings" : "spent"}
            id="spent"
            placeholder="Amount here"
            onChange={inputHandler}
            required
            autoComplete="on"
          />
        </div>

        <div>
          <label htmlFor="describe">describe here </label>
          <input
            type="text"
            name="describe"
            id="describe"
            placeholder="describe here"
            onChange={inputHandler}
            required
            autoComplete="on"
          />
        </div>

        {!addExpMode.income ? (
          <div>
            <label htmlFor="catagory">catagory </label>
            <select name="catagory" id="catagory" onChange={inputHandler}>
              <option value="">Select</option>
              <option value="food">food</option>
              <option value="rent">rent</option>
              <option value="parking">parking</option>
              <option value="library">library</option>
              <option value="fuel">fuel</option>
              <option value="travel">travel</option>
            </select>
          </div>
        ) : (
          ""
        )}
        <div className="checkbox">
          <label>
            <AiOutlineCheck />
            <input type="submit" className="visually-hidden" />
          </label>
        </div>
      </form>

      <div
        className={`add-exp-button ${addExpMode.addExpense ? "active" : ""}`}
      >
        <button onClick={fullformEnable}>
          <GrAdd />
        </button>
      </div>
    </div>
  );
};

export default AddExpense;
