import Home from "./home/Home";

import Login from "./pages/login";

import Signup from "./pages/signup";

import ResetPasword from "./pages/ResetPasword";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/user/signup" element={<Signup />}></Route>
          <Route path="/user/login" element={<Login />}></Route>
          <Route
            path="/user/password/reset_password/:id"
            element={<ResetPasword />}
          ></Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
