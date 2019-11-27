import React from 'react';
import GoogleLogin from 'react-google-login';
import config from '../../config';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Profile.css';
import SentEmails from './SentEmails';

export default class Google_login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            userID: '',
            name: '',
            email: '',
            picture: '',
            subject: '',
            html: '',
            responseToPost: {
                type: null,
                message: null
            }
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
        const { responseToPost, subject, message } = this.state;

        let googleContent;  
        if(this.state.isLoggedIn) {
            googleContent = (
                <div className="profileContainer">
                    <img src={this.state.picture} alt={this.state.name}/>
                    <h2>Welcome {this.state.name}</h2>
                    <p>With email: {this.state.email}</p>

                    <div>
                        <h2>Profile page</h2>
                        <div className="emailFormContainer">
                            <h3>Send an email</h3>
                            <p className={responseToPost.type}>{responseToPost.message}</p>
                            <form onSubmit={this.handleSubmit} method="POST">
                                <Form.Group>
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Control type="text" placeholder="Subject" value={subject} onChange={e => this.setState({subject: e.target.value })}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Message</Form.Label>
                                    <Form.Control as="textarea" rows="7" type="textarea" placeholder="Enter message" value={message} onChange={e => this.setState({message: e.target.value })}/>
                                </Form.Group>
                                <Button variant="primary" type="submit">Send email</Button>
                            </form>
                        </div>
                        <div className="sentEmailsContainer">
                            <SentEmails/>
                        </div>
                    </div>

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
        )
    }
}
