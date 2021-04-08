import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import Privacy from './components/Privacy';
import Footer from './components/Footer';
import Welcome from './components/Welcome';
import Register from './components/Register/';
import Login from './components/Login/';
import Logout from './components/Logout';
import Profile from './components/Profile';
import Search from './components/Search';
import Error from './components/Error';
import UserContext from './components/Contexts/UserContext';

import './App.css';

function App() {
    const [userToken, setUserToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        setUserToken(localStorage.getItem('token'))
    }, [])

    return (
        <div className="App">
            <UserContext.Provider value={[userToken, setUserToken]}>
                <Header />

                <main className="main">
                    <Switch>
                        <Route path="/" exact component={Welcome} />
                        <Route path="/home" component={Home} />
                        <Route path="/search/:text" component={Search}/>
                        <Route path="/privacy" component={Privacy} />
                        <Route path="/register" component={Register} />
                        <Route path="/login" component={Login} />
                        <Route path="/logout" component={Logout} />
                        <Route path="/profile/:profileId" component={Profile} />
                        <Route path="/error" component={Error} />
                    </Switch>
                </main>
            </UserContext.Provider>

            <Footer />
        </div>
    );
}

export default App;
