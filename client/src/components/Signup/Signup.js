import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Signup.css';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            responseToPost: ''
        };
    };

    handleSubmit = async e => {
        e.preventDefault();
        const email = this.state.email;
        const password = this.state.password;
        console.log(email, password);

        await fetch('/users/signup', {
            method: 'POST',
            body: JSON.stringify({
                email: this.state.email, 
                password: this.state.password
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            console.log(response);
            if (response.status === 200) {
                console.log('successful signup')
                this.props.history.push("/login"); // Redirect
            } else if (response.status === 400) {
                response.json().then(function(object){
                    const errorMsg = object.message;
                    console.log(errorMsg);
                    // this.setState({responseToPost: this.state.errorMsg});
                });
            };
        });
    };


    render() {
        return(
            <div>
                <h2>Signup</h2>
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
                    <Button variant="primary" type="submit">Signup</Button>
                </form>
                <p>Already have an account? <a href="/login">Log in</a></p>
            </div>
            
        );
    };
}
