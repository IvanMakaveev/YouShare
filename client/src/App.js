import { Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import Privacy from './components/Privacy';
import Footer from './components/Footer';
import Welcome from './components/Welcome';
import Register from './components/Register/Register';

import './App.css';

function App() {
    return (
        <div className="App">
            <Header />

            <main className="main">
                <Switch>
                    <Route path="/" exact component={Welcome} />
                    <Route path="/privacy" component={Privacy} />
                    <Route path="/register" component={Register} />
                </Switch>
            </main>

            <Footer />
        </div>
    );
}

export default App;
