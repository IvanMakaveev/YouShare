import { Redirect } from "react-router";

const Home = () => {
    const isLoggedIn = localStorage.getItem('token') != null;

    if (!isLoggedIn) {
        return (<Redirect to="/"/>)
    }

    return(
        <div>
            
        </div>
    );
}

export default Home;