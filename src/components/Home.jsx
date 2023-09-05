import React from "react";

import { NavLink } from "react-router-dom";

const Home = () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  return (
    <>
      <div>Home</div>
      <div>
        {!token && <NavLink to={"/user/login"}>login</NavLink>}
        {token && <div>logout</div>}
      </div>
    </>
  );
};

export default Home;
