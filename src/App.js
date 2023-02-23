import { Route, Routes } from "react-router-dom";
import "./App.css";
import Courses from "./Pages/Dashboard/Courses";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DashIndex from "./Pages/Dashboard/DashIndex";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard></Dashboard>}>
          <Route index element={<DashIndex></DashIndex>}></Route>
          <Route path="courses" element={<Courses></Courses>}></Route>
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
