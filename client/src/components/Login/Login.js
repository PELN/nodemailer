import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Login.css';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            responseToPost: ''
        }
    }

    handleSubmit = async e => {
        e.preventDefault();
        const email = this.state.email;
        const password = this.state.password;
        console.log(email, password);

        const response = await fetch('/users/login', {
            method: 'POST',
            body: JSON.stringify({
                email: this.state.email, 
                password: this.state.password
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const body = await response.text();
        this.setState({ responseToPost: body });
    };


    render() {
        return(
            <div>
                <h2>Login</h2>
                <p>{this.state.responseToPost}</p>
                <form onSubmit={this.handleSubmit} method="POST">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={e => this.setState({email: e.target.value })}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password" value={this.state.password} onChange={e => this.setState({password: e.target.value })}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">Login</Button>
                </form>
                <p>Don't have an account? <a href="/signup">Sign up now</a></p>
            </div>
        );
    };
}
