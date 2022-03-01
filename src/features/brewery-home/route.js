import React from 'react';
import { Router, Route, Switch, withRouter } from 'react-router-dom';
import { BreweryPage, BreweryDetailPage } from './pages';
import {AppContainer} from "../../common/header";
import { createBrowserHistory } from "history";

const newHistory = createBrowserHistory();

const BreweryHomePage = () => (
    <AppContainer>
        <Router history={newHistory}>
            <Switch>
                <Route exact path="/" component={BreweryPage} />
                <Route path="/details/:breweryid" component={BreweryDetailPage} />
            </Switch>
        </Router>
    </AppContainer>
);

export default withRouter(BreweryHomePage);
