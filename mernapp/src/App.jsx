
import "./App.css";
import Home from "./screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";

import SignUp from "./screens/SignUp.jsx";
import { CartProvidor } from "./components/ContextReducer.jsx";
import MyOrder from "./screens/MyOrder.jsx";

function App() {
  return (
    <CartProvidor>
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/createuser" element={<SignUp />} />
          <Route exact path="/myOrder" element={<MyOrder />} />
        </Routes>
      </div>
    </Router>
    </CartProvidor>
  );
}

export default App;
