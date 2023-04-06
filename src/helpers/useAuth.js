import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuthentication = () => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setIsLoggedIn(true)
        }
        else {
            setIsLoggedIn(false)
        }
    }, [user, refresh])

    useEffect(() => {
        setIsLoading(true);
        console.log("refresh: ", refresh);
        let tokenData = localStorage.getItem("accessToken");
        if (tokenData) {
            setToken(tokenData);
            axios
                .post(
                    `${process.env.REACT_APP_API_BASE_PATH}/jwt-verify`,
                    JSON.stringify({ jwt: tokenData }),
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then((data) => {
                    if (data.data) {
                        console.log("auth data: ", data.data.user);
                        setUser(data.data.user);
                        setIsLoading(false);
                        setRefresh(false)
                    }
                })
                .catch((error) => {
                    console.error(error);
                    setIsLoading(false);
                    setRefresh(false)
                    return error;
                });
        } else {
            setIsLoading(false);
            setRefresh(false)
        }
    }, [token, refresh]);

    return [user, setUser, token, setToken, isLoading, refresh, setRefresh, isLoggedIn, setIsLoggedIn];
};

export default useAuthentication;
