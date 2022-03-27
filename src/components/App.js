import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Employees from "../Pages/Employee/Employees";
import Manager from "../Pages/Manger/Manager";
import Finance from "../Pages/FianceDepartment/FinanceDepartment";
import NotFound from "../Pages/NotFound/NotFound";

import "../App.css";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/managers" element={<Manager />} />
          <Route path="/finances" element={<Finance />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
