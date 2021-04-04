import { Redirect } from "react-router";

const Logout = ({
    history
}) => {
    localStorage.removeItem('token');

    return (
        <Redirect to="/"/>
    );
}

export default Logout;