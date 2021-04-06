import { useContext, useEffect } from "react";
import { Redirect } from "react-router";

import UserContext from "../Contexts/UserContext";

const Logout = ({
    history
}) => {
    const [userToken, setUserToken] = useContext(UserContext);

    useEffect(() => {
        setUserToken(null);
        localStorage.removeItem('token');
    }, [])

    return (
        <Redirect to="/" />
    );
}

export default Logout;