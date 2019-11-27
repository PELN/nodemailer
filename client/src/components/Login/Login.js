import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import LoginGoogle from './LoginGoogle';
import './Login.css';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            responseToPost: {
                type: null,
                message: null
            },
            loggedIn: ''
        }
    }

    handleSubmit = async e => {
        e.preventDefault();
        const email = this.state.email;
        const password = this.state.password;
        console.log(email, password);

        await fetch('/users/login', {
            method: 'POST',
            body: JSON.stringify({
                email: this.state.email, 
                password: this.state.password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            // console.log(response);
            if (response.status === 200) {
                this.setState({ loggedIn: true });
                console.log('logged in:', this.state.loggedIn);
                this.props.history.push('/profile'); // Redirect
                this.setState({responseToPost : {type: 'success', message: 'You have been successfully logged in!'}})

            } else if (response.status === 401) {
                response.json().then(function(object){
                    const errorMsg = object.message;
                    console.log(errorMsg);                    
                });
                this.setState({responseToPost : {type: 'error', message: 'Something went wrong. Please try again.'}})
            };
        });
    };

    render() {
        const { responseToPost, email, password } = this.state;

        return(
            <div>
                <h2>Login</h2>
                <div className="formContainer">
                    <p className={responseToPost.type}>{responseToPost.message}</p>
                    <form onSubmit={this.handleSubmit} method="POST">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => this.setState({email: e.target.value })}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" value={password} onChange={e => this.setState({password: e.target.value })}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">Login</Button>
                    </form>
                </div>
                <p>Don't have an account? <a href="/signup">Sign up now</a></p>
                <LoginGoogle/>
            </div>
        );
    };
}
