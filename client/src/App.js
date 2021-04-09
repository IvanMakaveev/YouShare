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
import ClientErrorBoundary from './components/ClientErrorBoundary/';
import ServerErrorHandler from './components/ServerErrorHandler';
import isAuthenticated from './hoc/isAuthenticated';
import UserContext from './components/Contexts/UserContext';

import './App.css';

function App() {
    const [userToken, setUserToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        setUserToken(localStorage.getItem('token'))
    }, [])

    return (
        <div className="App">
            <ClientErrorBoundary>
                <UserContext.Provider value={[userToken, setUserToken]}>
                    <Header />

                    <main className="main">
                        <Switch>
                            <Route path="/" exact component={Welcome} />
                            <Route path="/home" component={isAuthenticated(Home)} />
                            <Route path="/search/:searchText" component={Search} />
                            <Route path="/privacy" component={Privacy} />
                            <Route path="/register" component={Register} />
                            <Route path="/login" component={Login} />
                            <Route path="/logout" component={Logout} />
                            <Route path="/profile/:profileId" component={Profile} />
                            <Route path="/error" component={ServerErrorHandler} />
                        </Switch>
                    </main>
                </UserContext.Provider>

                <Footer />
            </ClientErrorBoundary>
        </div>
    );
}

export default App;
