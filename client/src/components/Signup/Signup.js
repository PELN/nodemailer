import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Signup.css';

export default class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            responseToPost: {
                type: null,
                message: null
            }
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
                this.setState({responseToPost : {type: 'success', message: 'Your account was created, go ahead and login!'}})
                // this.props.history.push("/login"); // Redirect
            } else if (response.status === 400) {
                response.json().then(function(object){
                    const errorMsg = object.message;
                    console.log(errorMsg);
                    // this.setState({responseToPost: this.state.errorMsg});
                });
                this.setState({responseToPost : {type: 'error', message: 'Something went wrong. Try another email.'}})
            };
        });
    };


    render() {
        const { responseToPost, email, password } = this.state;
        return(
            <div>
                <h2>Signup</h2>
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
                        <Button variant="primary" type="submit">Signup</Button>
                    </form>
                </div>
                <p>Already have an account? <a href="/login">Log in</a></p>
            </div>
            
        );
    };
}
