import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import Navigation from './components/Navigation/Navigation';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';

import './App.css';

export default function App() {
    return (
      <div className="App">
        <BrowserRouter>
        <Navigation />
        <main>
          <Switch>
            <Redirect from="/" to="/home" exact />
            <Route path="/home" component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        </main>
        {/* <Login/>
        <Signup/> */}
        </BrowserRouter>
      </div>
    );
};