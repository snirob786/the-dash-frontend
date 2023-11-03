import { Route, Routes } from "react-router-dom";
import { DashboardContainer } from "../Dashboard/DashboardContainer";
import Home from "../Home/Home";
import { Login } from "../Login/Login";
import { Signup } from "../Signup/Signup";
import RequireAuth from "../../shared/RequireAuth";
import Profile from '../Dashboard/Profile/Profile'
import Dashboard from "../Dashboard/Dashboard";

const RouterSetup = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home></Home>}></Route>

                <Route path="/dashboard" element={
                    <RequireAuth>
                        <DashboardContainer></DashboardContainer>
                    </RequireAuth>
                }>
                    <Route
                        index
                        element={<Dashboard />}
                    />
                    <Route
                        path="profile"
                        element={<Profile />}
                    />
                </Route>
                <Route path="/signup" element={<Signup></Signup>}></Route>
                <Route path="/login" element={<Login></Login>}></Route>
            </Routes>
        </>
    );
}

export default RouterSetup;