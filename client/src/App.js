import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Profile from './components/Profile/Profile';
import Navigation from './components/Navigation/Navigation';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import WithAuth from './components/WithAuth/WithAuth';

import './App.css';

export default function App() {
    return (
      <div className="App">
        <BrowserRouter>
        <Navigation />
        <main>
          <Switch>
            <Redirect from="/" to="/login" exact />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/profile" component={WithAuth(Profile)} />
          </Switch>
        </main>
        </BrowserRouter>
      </div>
    );
};