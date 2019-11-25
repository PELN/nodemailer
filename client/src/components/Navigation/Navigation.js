import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
// import 'font-awesome/css/font-awesome.min.css';

export default function Navigation() {
    return(
        <header className="navBar-header">
            <div className="navBar-items">
                <h1 className="h1-logo">NODEMAILER</h1>
                <NavLink to="/home" className="navlink">Home</NavLink>
                <NavLink to="/profile" className="navlink">Profile</NavLink>
                <NavLink to="/login" className="navlink">Login</NavLink>
                <NavLink to="/signup" className="navlink">Signup</NavLink>
            </div>
        </header>
    );
};


