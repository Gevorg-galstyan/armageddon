import {Router, Route, Switch, Redirect} from 'react-router-dom';
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";
import Home from "./components/pages/home/Home";
import Destruction from "./components/pages/destruction/Destruction";
import Single from "./components/pages/single/Single";
import NotFound from "./components/pages/404/NotFound";
import {createBrowserHistory} from 'history';
import 'bootstrap/dist/css/bootstrap.min.css';

export const history = createBrowserHistory();

function App() {
    return (
        <Router history={history}>
            <Header/>

            <Switch>
                {/*HOME*/}
                <Route
                    path={'/'}
                    component={Home}
                    exact
                />
                {/*Destruction*/}
                <Route
                    path={'/destruction'}
                    component={Destruction}
                    exact
                />


                {/*SINGLE ASTEROID*/}
                <Route
                    path={'/asteroid/:id'}
                    component={Single}
                    exact
                />


                {/*    404*/}
                <Route
                    path={'/404'}
                    component={NotFound}
                    exact
                />
                <Redirect to={'/404'}/>

            </Switch>

            <Footer/>
        </Router>
    );
}

export default App;
