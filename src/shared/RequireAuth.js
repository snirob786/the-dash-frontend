import { Navigate, useLocation } from "react-router-dom";
import useAuthentication from "../helpers/useAuth";
import { useEffect, useState } from "react";

const RequireAuth = ({ children }) => {
    let [user, setUser, token, setToken, isLoading, refresh, setRefresh, isLoggedIn, setIsLoggedIn] = useAuthentication();
    let location = useLocation();
    useEffect(() => {
        console.log("isLoading req auth: ", isLoading);
        console.log("user in require req auth: ", user);
    }, [refresh])

    if (!isLoading && !user) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default RequireAuth