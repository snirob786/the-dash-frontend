import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../Dashboard/Dashboard";
import Home from "../Home/Home";
import { Login } from "../Login/Login";
import { Signup } from "../Signup/Signup";
import RequireAuth from "../../shared/RequireAuth";

const RouterSetup = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                <Route path="/dashboard" element={
                    <RequireAuth>
                        <Dashboard></Dashboard>
                    </RequireAuth>
                }></Route>
                <Route path="/signup" element={<Signup></Signup>}></Route>
                <Route path="/login" element={<Login></Login>}></Route>
            </Routes>
        </>
    );
}

export default RouterSetup;