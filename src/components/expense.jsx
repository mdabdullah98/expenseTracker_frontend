import React from "react";
import "../styles/expense.css";
const Expense = (props) => {
  return (
    <>
      <div className="expense-income-details">
        <h3>{props.expenseHeading}</h3>
        <div className="expense-cards">
          {props.expense.length > 0
            ? props.expense.map(({ spent, describe, catagory }, index) => {
                return (
                  <React.Fragment key={index}>
                    <div className="inner-card">
                      <div>
                        <span>Spend Amount </span>
                        <span>{spent}</span>
                      </div>
                      <div>
                        <span>Description</span>
                        <span>{describe}</span>
                      </div>
                      <div>
                        <span>Catagory</span>
                        <span>{catagory}</span>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })
            : "expense not found"}
        </div>

        <div className="total-expense-income  w-100 d-flex justify-content-end text-capitalize align-items-center">
          <h6>Total {props.expenseHeading} ( Credit )</h6>
          <h5>
            <span className="text-danger mx-2">₹</span>0.00
          </h5>
        </div>

        <div className="expense-cards">
          {props.income.length > 0
            ? props.income.map(({ earnings, describe }, index) => {
                return (
                  <React.Fragment key={index}>
                    <div className="inner-card">
                      <div>
                        <span>Earnings</span>
                        <span>{earnings}</span>
                      </div>
                      <div>
                        <span>Description</span>
                        <span>{describe}</span>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })
            : "expense not found"}
        </div>
        <div className="total-expense-income  w-100 d-flex justify-content-end text-capitalize align-items-center">
          <h6>Total {props.incomeHeading} ( Credit )</h6>
          <h5>
            <span className="text-danger mx-2">₹</span>0.00
          </h5>
        </div>
      </div>
    </>
  );
};

export default Expense;
