import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Users from './pages/users';

export default () => (
    <Router>
        <Switch>
            <Route path="/users" component={Users}/>
        </Switch>
    </Router>
);