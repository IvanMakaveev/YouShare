import { Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import Privacy from './components/Privacy';
import Footer from './components/Footer';
import Welcome from './components/Welcome';

import './App.css';

function App() {
    return (
        <div className="App">
            <Header />

            <div class="container">
                <main className="main">
                    <Switch>
                        <Route path="/" component={Welcome} />
                        <Route path="/privacy" component={Privacy} />
                    </Switch>
                </main>
            </div>

            <Footer />
        </div>
    );
}

export default App;
