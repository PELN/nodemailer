import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Profile.css';
import SentEmails from './SentEmails';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            subject: '',
            html: '',
            responseToPost: ''
        }
    }

    handleSubmit = async e => {
        e.preventDefault();
        const subject = this.state.subject;
        const message = this.state.message;
        console.log(subject, message);

        const response = await fetch('/emails/send', {
            method: 'POST',
            body: JSON.stringify({
                subject: this.state.subject, 
                message: this.state.message
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
                <h2>Profile page</h2>
                <h3>Send an email</h3>
                <p>{this.state.responseToPost}</p>
                <form onSubmit={this.handleSubmit} method="POST">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Subject</Form.Label>
                        <Form.Control type="text" placeholder="subject" value={this.state.subject} onChange={e => this.setState({subject: e.target.value })}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="text" placeholder="Enter message" value={this.state.message} onChange={e => this.setState({message: e.target.value })}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">Send email</Button>
                </form>

                <SentEmails/>
            </div>
            
        );
    };
}
