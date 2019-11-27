import React from 'react';
import GoogleLogin from 'react-google-login';
import config from '../../config';
import Profile from '../Profile/Profile';

export default class LoginGoogle extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            userID: '',
            name: '',
            email: '',
            picture: ''
        };
    };

    responseGoogle = response => {
        console.log(response);

        this.setState({
            isLoggedIn: true,
            userID: response.profileObj.googleId,
            name: response.profileObj.givenName,
            email: response.profileObj.email,
            picture: response.profileObj.imageUrl
        });
    };

    onFailure = response => {
        console.log(response);
    };

    handleSubmit = async e => {
        e.preventDefault();

        await fetch('/emails/send', {
            method: 'POST',
            body: JSON.stringify({
                subject: this.state.subject, 
                message: this.state.message
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'applicaton/json'
            }
        }).then((response) => {
            console.log(response);
            if (response.status === 200) {
                console.log('Email has been sent');
                this.setState({responseToPost : {type: 'success', message: 'Your email was sent!'}})
                // this.props.history.push("/"); // Redirect
            } else if (response.status === 400) {
                response.json().then(function(object){
                    const errorMsg = object.message;
                    console.log(errorMsg);
                });
                this.setState({responseToPost : {type: 'error', message: 'Something went wrong. Please try again.'}})
            };
        });
    };

    render() {
        let googleContent;  
        if(this.state.isLoggedIn) {
            googleContent = (
                <div className="profileContainer">
                    <div className="profileinfo">
                        <img src={this.state.picture} alt={this.state.name}/>
                        <h2>Welcome, {this.state.name}</h2>
                        <h5>With the email: {this.state.email}</h5>
                    </div>
                    <Profile/>
                </div>
            );
        } else {
            googleContent = (
                <GoogleLogin
                    clientId={config.GOOGLE_CLIENT_ID}
                    buttonText="Login"
                    onSuccess={this.responseGoogle}
                    onFailure={this.onFailure}
                    cookiePolicy={'single_host_origin'}
                />
            );
        };

        return(
           <div className="GoogleContainer">
               {googleContent}
           </div>
        );
    };
};
