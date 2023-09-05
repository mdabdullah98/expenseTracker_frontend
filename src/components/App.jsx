import Home from "./Home";
import Login from "./login";
import Signup from "./signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/user/signup" element={<Signup />}></Route>
          <Route path="/user/login" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
