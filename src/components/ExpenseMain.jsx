import { useDebugValue, useEffect, useState } from "react";
import axios from "axios";
import Expense from "./expense";
const ExpenseMain = () => {
  useEffect(() => {
    getExpenses();
  }, []);

  const [expense, setExpense] = useState([]);
  const [income, setIncome] = useState([]);

  const getExpenses = async () => {
    const resExpesne = await axios.get("http://localhost:8080/user/getExpense");
    const resIncome = await axios.get("http://localhost:8080/user/getIncomes");

    if (resExpesne.data) {
      setExpense(resExpesne.data);
    }

    if (resIncome) {
      setIncome(resIncome.data);
    }
  };

  return (
    <>
      <Expense
        expenseHeading={"expense"}
        expense={expense}
        incomeHeading={"income"}
        income={income}
      />
    </>
  );
};

export default ExpenseMain;
